USE [realestatewebcompanion];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'apartment_images')
BEGIN
    CREATE TABLE [apartment_images] (
        [Id]          INT            NOT NULL PRIMARY KEY IDENTITY(1,1),
        [ApartmentId] NVARCHAR(50)   NOT NULL,
        [FileName]    NVARCHAR(500)  NOT NULL DEFAULT '',
        FOREIGN KEY ([ApartmentId]) REFERENCES [apartments]([Id]) ON DELETE CASCADE
    );
    PRINT 'Table apartment_images created.';
END
ELSE
BEGIN
    PRINT 'Table apartment_images already exists.';
END
GO
