-- ============================================================
-- Migration Script: Features & Apartments Schema Changes
-- Run this against an existing realestatewebcompanion database
-- to apply the changes from the updated create-database.sql
-- ============================================================

USE [realestatewebcompanion];
GO

-- -----------------------------------------------
-- 1. Add FrenchName and EnglishName to features table
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('features') AND name = 'FrenchName')
BEGIN
    ALTER TABLE [features] ADD [FrenchName] NVARCHAR(100) NOT NULL DEFAULT '';
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('features') AND name = 'EnglishName')
BEGIN
    ALTER TABLE [features] ADD [EnglishName] NVARCHAR(100) NOT NULL DEFAULT '';
END
GO

-- Copy ToggleName into FrenchName and EnglishName where still empty
UPDATE [features] SET [FrenchName] = [ToggleName] WHERE [FrenchName] = '';
UPDATE [features] SET [EnglishName] = [ToggleName] WHERE [EnglishName] = '';
GO

-- Update French names to proper French
UPDATE [features] SET [FrenchName] = N'Animaux accept\u00e9s' WHERE [ToggleName] = 'Pet Friendly' AND [FrenchName] = 'Pet Friendly';
UPDATE [features] SET [FrenchName] = N'Stationnement disponible' WHERE [ToggleName] = 'Parking Available' AND [FrenchName] = 'Parking Available';
UPDATE [features] SET [FrenchName] = N'Ascenseur' WHERE [ToggleName] = 'Elevator' AND [FrenchName] = 'Elevator';
UPDATE [features] SET [FrenchName] = N'Laveuse/S\u00e9cheuse dans l''unit\u00e9' WHERE [ToggleName] = 'Washer/Dryer in Unit' AND [FrenchName] = 'Washer/Dryer in Unit';
UPDATE [features] SET [FrenchName] = N'Piscine' WHERE [ToggleName] = 'Pool' AND [FrenchName] = 'Pool';
UPDATE [features] SET [FrenchName] = N'Terrasse sur le toit' WHERE [ToggleName] = 'Roof top patio' AND [FrenchName] = 'Roof top patio';
UPDATE [features] SET [FrenchName] = N'Lave-auto' WHERE [ToggleName] = 'Car wash' AND [FrenchName] = 'Car wash';
GO

-- -----------------------------------------------
-- 2. Add Car wash feature if not already present
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [features] WHERE [ToggleName] = 'Car wash')
BEGIN
    INSERT INTO [features] ([ToggleName], [FrenchName], [EnglishName], [ToggleImage])
    VALUES ('Car wash', N'Lave-auto', 'Car wash', N'🚿');
END
GO

-- -----------------------------------------------
-- 3. Migrate apartments table:
--    - Add FeaturesJson (for feature IDs) as new column
--    - Migrate ToggleNamesJson data to feature IDs
--    - Drop FeaturesJson (French bullets), FeaturesEnJson, ToggleNamesJson
-- -----------------------------------------------

-- Step 3a: Add temporary column for new feature IDs
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('apartments') AND name = 'FeaturesJsonNew')
BEGIN
    ALTER TABLE [apartments] ADD [FeaturesJsonNew] NVARCHAR(MAX) NOT NULL DEFAULT '[]';
END
GO

-- Step 3b: Convert ToggleNamesJson (string array) to feature ID JSON array
-- This maps feature names to their IDs from the features table
DECLARE @featureMap TABLE (ToggleName NVARCHAR(100), FeatureId INT);
INSERT INTO @featureMap SELECT [ToggleName], [Id] FROM [features];

-- Update each apartment to convert toggle names to IDs
DECLARE @aptId NVARCHAR(50), @toggleJson NVARCHAR(MAX), @featureIds NVARCHAR(MAX);
DECLARE aptCursor CURSOR FOR SELECT [Id], [ToggleNamesJson] FROM [apartments];
OPEN aptCursor;
FETCH NEXT FROM aptCursor INTO @aptId, @toggleJson;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @featureIds = '[]';
    -- Parse JSON array and convert names to IDs
    IF @toggleJson IS NOT NULL AND @toggleJson != '[]'
    BEGIN
        SELECT @featureIds = '[' + STRING_AGG(CAST(fm.FeatureId AS NVARCHAR), ',') + ']'
        FROM OPENJSON(@toggleJson) AS j
        JOIN @featureMap fm ON fm.ToggleName = j.value;
        IF @featureIds IS NULL OR @featureIds = '[' SET @featureIds = '[]';
    END
    UPDATE [apartments] SET [FeaturesJsonNew] = @featureIds WHERE [Id] = @aptId;
    FETCH NEXT FROM aptCursor INTO @aptId, @toggleJson;
END
CLOSE aptCursor;
DEALLOCATE aptCursor;
GO

-- Step 3c: Drop old columns (run these in order)
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('apartments') AND name = 'ToggleNamesJson')
BEGIN
    ALTER TABLE [apartments] DROP COLUMN [ToggleNamesJson];
END
GO

IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('apartments') AND name = 'FeaturesEnJson')
BEGIN
    ALTER TABLE [apartments] DROP COLUMN [FeaturesEnJson];
END
GO

-- Drop old FeaturesJson (French bullet points)
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('apartments') AND name = 'FeaturesJson')
BEGIN
    ALTER TABLE [apartments] DROP COLUMN [FeaturesJson];
END
GO

-- Rename FeaturesJsonNew to FeaturesJson
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('apartments') AND name = 'FeaturesJsonNew')
BEGIN
    EXEC sp_rename 'apartments.FeaturesJsonNew', 'FeaturesJson', 'COLUMN';
END
GO

-- -----------------------------------------------
-- 4. Drop apartment_features table (no longer needed)
-- -----------------------------------------------
IF EXISTS (SELECT * FROM sys.tables WHERE name = 'apartment_features')
BEGIN
    DROP TABLE [apartment_features];
END
GO

-- -----------------------------------------------
-- 5. Remove ToggleName column from features table
--    (data already migrated to FrenchName/EnglishName above)
-- -----------------------------------------------
IF OBJECT_ID(N'dbo.features', N'U') IS NULL
BEGIN
    RAISERROR('Table dbo.features does not exist.', 16, 1);
    RETURN;
END

-- Prevent accidental removal if ToggleName is part of an index
IF EXISTS (
    SELECT 1
    FROM sys.index_columns ic
    JOIN sys.columns c ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    WHERE ic.object_id = OBJECT_ID(N'dbo.features')
      AND c.name = N'ToggleName'
)
BEGIN
    RAISERROR('Column dbo.features.ToggleName is part of an index. Drop dependent indexes first.', 16, 1);
    RETURN;
END

-- Prevent accidental removal if ToggleName is referenced by a foreign key
IF EXISTS (
    SELECT 1
    FROM sys.foreign_key_columns fkc
    JOIN sys.columns c ON fkc.parent_object_id = c.object_id AND fkc.parent_column_id = c.column_id
    WHERE fkc.parent_object_id = OBJECT_ID(N'dbo.features')
      AND c.name = N'ToggleName'
)
BEGIN
    RAISERROR('Column dbo.features.ToggleName is referenced by a foreign key. Drop or alter the FK first.', 16, 1);
    RETURN;
END

-- Drop the known default constraint
IF EXISTS (
    SELECT 1 FROM sys.default_constraints dc
    WHERE dc.parent_object_id = OBJECT_ID(N'dbo.features')
      AND dc.name = N'DF__features__Toggle__619B8048'
)
BEGIN
    ALTER TABLE dbo.features DROP CONSTRAINT [DF__features__Toggle__619B8048];
END
GO

-- Drop ToggleName column if it exists and is not computed
IF EXISTS (
    SELECT 1 FROM sys.columns c
    WHERE c.object_id = OBJECT_ID(N'dbo.features')
      AND c.name = N'ToggleName'
      AND c.is_computed = 0
)
BEGIN
    ALTER TABLE dbo.features DROP COLUMN ToggleName;
END
GO

PRINT 'Migration completed successfully.';
GO
