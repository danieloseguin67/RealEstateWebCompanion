-- ============================================================
-- Migration Script: UnitTypes Bilingual Schema
-- Renames UnitTypeName -> UnitTypeNameEn and adds UnitTypeNameFr
-- Run this against an existing realestatewebcompanion database
-- ============================================================

USE [realestatewebcompanion];
GO

-- 1. Add UnitTypeNameEn (copy from existing UnitTypeName)
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('unittypes') AND name = 'UnitTypeNameEn')
BEGIN
    ALTER TABLE [unittypes] ADD [UnitTypeNameEn] NVARCHAR(200) NOT NULL DEFAULT '';
END
GO

-- 2. Add UnitTypeNameFr
IF NOT EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('unittypes') AND name = 'UnitTypeNameFr')
BEGIN
    ALTER TABLE [unittypes] ADD [UnitTypeNameFr] NVARCHAR(200) NOT NULL DEFAULT '';
END
GO

-- 3. Copy existing English names into UnitTypeNameEn
UPDATE [unittypes] SET [UnitTypeNameEn] = [UnitTypeName] WHERE [UnitTypeNameEn] = '';
GO

-- 4. Seed French names where still empty (matching known English values)
UPDATE [unittypes] SET [UnitTypeNameFr] = N'Studio'           WHERE [UnitTypeName] = 'Studio'     AND [UnitTypeNameFr] = '';
UPDATE [unittypes] SET [UnitTypeNameFr] = N'1 Chambre'        WHERE [UnitTypeName] = '1 Bedroom'  AND [UnitTypeNameFr] = '';
UPDATE [unittypes] SET [UnitTypeNameFr] = N'2 Chambres'       WHERE [UnitTypeName] = '2 Bedrooms' AND [UnitTypeNameFr] = '';
UPDATE [unittypes] SET [UnitTypeNameFr] = N'3 Chambres'       WHERE [UnitTypeName] = '3 Bedrooms' AND [UnitTypeNameFr] = '';
UPDATE [unittypes] SET [UnitTypeNameFr] = [UnitTypeName]      WHERE [UnitTypeNameFr] = '';
GO

-- 5. Drop the old UnitTypeName column
IF EXISTS (SELECT 1 FROM sys.columns WHERE object_id = OBJECT_ID('unittypes') AND name = 'UnitTypeName')
BEGIN
    ALTER TABLE [unittypes] DROP COLUMN [UnitTypeName];
END
GO

SELECT Id, UnitTypeNameEn, UnitTypeNameFr FROM [unittypes];
GO
