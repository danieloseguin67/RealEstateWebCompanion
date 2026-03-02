-- ============================================================
-- RealEstateWebCompanion Database Setup Script
-- Run this script against your SQL Server instance to create
-- the database and all required tables.
-- ============================================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'realestatewebcompanion')
BEGIN
    CREATE DATABASE [realestatewebcompanion];
END
GO

USE [realestatewebcompanion];
GO

-- -----------------------------------------------
-- Table: apartments
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'apartments')
BEGIN
    CREATE TABLE [apartments] (
        [Id]              NVARCHAR(50)   NOT NULL PRIMARY KEY,
        [Title]           NVARCHAR(500)  NOT NULL DEFAULT '',
        [TitleEn]         NVARCHAR(500)  NOT NULL DEFAULT '',
        [UnitTypeName]    NVARCHAR(100)  NOT NULL DEFAULT '',
        [Bathrooms]       INT            NOT NULL DEFAULT 0,
        [SquareFootage]   INT            NOT NULL DEFAULT 0,
        [Price]           DECIMAL(18,2)  NOT NULL DEFAULT 0,
        [Area]            NVARCHAR(100)  NOT NULL DEFAULT '',
        [Furnished]       BIT            NOT NULL DEFAULT 0,
        [RoomToRent]      BIT            NOT NULL DEFAULT 0,
        [CondoRentals]    BIT            NOT NULL DEFAULT 0,
        [Available]       BIT            NOT NULL DEFAULT 1,
        [Description]     NVARCHAR(MAX)  NOT NULL DEFAULT '',
        [DescriptionEn]   NVARCHAR(MAX)  NOT NULL DEFAULT '',
        [FeaturesJson]    NVARCHAR(MAX)  NOT NULL DEFAULT '[]',
        [FeaturesEnJson]  NVARCHAR(MAX)  NOT NULL DEFAULT '[]',
        [ImagesJson]      NVARCHAR(MAX)  NOT NULL DEFAULT '[]',
        [ToggleNamesJson] NVARCHAR(MAX)  NOT NULL DEFAULT '[]'
    );
END
GO

-- -----------------------------------------------
-- Table: appversion
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'appversion')
BEGIN
    CREATE TABLE [appversion] (
        [Id]         INT           NOT NULL PRIMARY KEY IDENTITY(1,1),
        [Version]    NVARCHAR(50)  NOT NULL DEFAULT '',
        [AppName]    NVARCHAR(200) NOT NULL DEFAULT '',
        [Author]     NVARCHAR(100) NOT NULL DEFAULT '',
        [Company]    NVARCHAR(200) NOT NULL DEFAULT '',
        [Copyright]  NVARCHAR(20)  NOT NULL DEFAULT '',
        [UpdateDate] NVARCHAR(50)  NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Table: customer
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'customer')
BEGIN
    CREATE TABLE [customer] (
        [CustomerId]    NVARCHAR(50)  NOT NULL PRIMARY KEY,
        [CustomerName]  NVARCHAR(200) NOT NULL DEFAULT '',
        [CustomerEmail] NVARCHAR(200) NOT NULL DEFAULT '',
        [UserId]        NVARCHAR(100) NOT NULL DEFAULT '',
        [Password]      NVARCHAR(500) NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Table: preferences
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'preferences')
BEGIN
    CREATE TABLE [preferences] (
        [Id]              INT            NOT NULL PRIMARY KEY IDENTITY(1,1),
        [PreferenceKey]   NVARCHAR(100)  NOT NULL DEFAULT '',
        [PreferenceValue] NVARCHAR(1000) NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Table: seo
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'seo')
BEGIN
    CREATE TABLE [seo] (
        [Id]              NVARCHAR(100) NOT NULL PRIMARY KEY,
        [PageName]        NVARCHAR(200) NOT NULL DEFAULT '',
        [PageUrl]         NVARCHAR(300) NOT NULL DEFAULT '',
        [Title]           NVARCHAR(300) NOT NULL DEFAULT '',
        [MetaName]        NVARCHAR(100) NOT NULL DEFAULT '',
        [MetaDescription] NVARCHAR(500) NOT NULL DEFAULT '',
        [LastModified]    NVARCHAR(50)  NULL,
        [ChangeFrequency] NVARCHAR(20)  NULL,
        [Priority]        FLOAT         NULL
    );
END
GO

-- -----------------------------------------------
-- Table: features  (toggles)
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'features')
BEGIN
    CREATE TABLE [features] (
        [Id]          INT          NOT NULL PRIMARY KEY IDENTITY(1,1),
        [ToggleName]  NVARCHAR(100) NOT NULL DEFAULT '',
        [ToggleImage] NVARCHAR(10)  NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Table: unittypes
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'unittypes')
BEGIN
    CREATE TABLE [unittypes] (
        [Id]           INT           NOT NULL PRIMARY KEY IDENTITY(1,1),
        [UnitTypeName] NVARCHAR(100) NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Seed: appversion
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [appversion])
BEGIN
    INSERT INTO [appversion] ([Version], [AppName], [Author], [Company], [Copyright], [UpdateDate])
    VALUES ('1.0.2', 'Real Estate Web Companion', 'SeguinDev', '16272649 Canada Inc.', '2026', '2026-02-23');
END
GO

-- -----------------------------------------------
-- Seed: preferences
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'googledrive')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('googledrive', 'https://drive.google.com/open?id=1X5DucomHUNQluHHXTqrlffG3B2J0Mf4b&usp=drive_fs');
END
GO

-- -----------------------------------------------
-- Seed: features (toggles)
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [features])
BEGIN
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Pet Friendly', N'🐾');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Parking Available', N'🚗');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Elevator', N'🏢');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Washer/Dryer in Unit', N'🧺');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Gym', N'💪');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Pool', N'🏊');
    INSERT INTO [features] ([ToggleName], [ToggleImage]) VALUES ('Roof top patio', N'🏙️');
END
GO

-- -----------------------------------------------
-- Seed: unittypes
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [unittypes])
BEGIN
    INSERT INTO [unittypes] ([UnitTypeName]) VALUES ('Studio');
    INSERT INTO [unittypes] ([UnitTypeName]) VALUES ('1 Bedroom');
    INSERT INTO [unittypes] ([UnitTypeName]) VALUES ('2 Bedrooms');
    INSERT INTO [unittypes] ([UnitTypeName]) VALUES ('3 Bedrooms');
END
GO

-- -----------------------------------------------
-- Seed: seo
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [seo])
BEGIN
    INSERT INTO [seo] ([Id], [PageName], [PageUrl], [Title], [MetaName], [MetaDescription], [LastModified], [ChangeFrequency], [Priority])
    VALUES ('home', 'Home', '/', 'Real Estate Web Companion - Home', 'description', 'Find your perfect rental property with our comprehensive real estate listings.', '2026-02-19', 'daily', 1.0);

    INSERT INTO [seo] ([Id], [PageName], [PageUrl], [Title], [MetaName], [MetaDescription], [LastModified], [ChangeFrequency], [Priority])
    VALUES ('listings', 'Listings', '/listings', 'Property Listings - Real Estate Web Companion', 'description', 'Browse our extensive collection of rental properties including apartments, condos, and more.', '2026-02-19', 'daily', 0.9);

    INSERT INTO [seo] ([Id], [PageName], [PageUrl], [Title], [MetaName], [MetaDescription], [LastModified], [ChangeFrequency], [Priority])
    VALUES ('areas', 'Areas', '/areas', 'Explore Areas - Real Estate Web Companion', 'description', 'Discover different neighborhoods and areas to find your ideal location.', '2026-02-19', 'weekly', 0.7);
END
GO
