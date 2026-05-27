﻿-- ============================================================
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
        [ImagesJson]      NVARCHAR(MAX)  NOT NULL DEFAULT '[]'
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
        [Id]          INT           NOT NULL PRIMARY KEY IDENTITY(1,1),
        [FrenchName]  NVARCHAR(100) NOT NULL DEFAULT '',
        [EnglishName] NVARCHAR(100) NOT NULL DEFAULT '',
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
-- Table: areas
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'areas')
BEGIN
    CREATE TABLE [areas] (
        [Id]             NVARCHAR(100) NOT NULL PRIMARY KEY,
        [Name]           NVARCHAR(200) NOT NULL DEFAULT '',
        [NameFr]         NVARCHAR(200) NOT NULL DEFAULT '',
        [NameEn]         NVARCHAR(200) NOT NULL DEFAULT '',
        [Description]    NVARCHAR(500) NOT NULL DEFAULT '',
        [DescriptionEn]  NVARCHAR(500) NOT NULL DEFAULT '',
        [Link]           NVARCHAR(500) NOT NULL DEFAULT ''
    );
END
GO

-- -----------------------------------------------
-- Table: apartment_images
-- -----------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'apartment_images')
BEGIN
    CREATE TABLE [apartment_images] (
        [Id]          INT            NOT NULL PRIMARY KEY IDENTITY(1,1),
        [ApartmentId] NVARCHAR(50)   NOT NULL,
        [FileName]    NVARCHAR(500)  NOT NULL DEFAULT '',
        FOREIGN KEY ([ApartmentId]) REFERENCES [apartments]([Id]) ON DELETE CASCADE
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

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpHost')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpHost', '');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpPort')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpPort', '587');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpUser')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpUser', '');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpPassword')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpPassword', '');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpUseTls')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpUseTls', 'true');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpFromEmail')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpFromEmail', '');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpFromName')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpFromName', 'Web Companion Support');
END
GO

IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = 'smtpToEmail')
BEGIN
    INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue])
    VALUES ('smtpToEmail', 'daniel@seguin.dev');
END
GO

-- -----------------------------------------------
-- Seed: features (toggles)
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [features])
BEGIN
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Animaux acceptés', 'Pet Friendly', N'🐾');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Stationnement disponible', 'Parking Available', N'🚗');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Ascenseur', 'Elevator', N'🏢');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Laveuse/Sécheuse dans l''unité', 'Washer/Dryer in Unit', N'🧺');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Gym', 'Gym', N'💪');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Piscine', 'Pool', N'🏊');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Terrasse sur le toit', 'Roof top patio', N'🏙️');
    INSERT INTO [features] ([FrenchName], [EnglishName], [ToggleImage]) VALUES ('Lave-auto', 'Car wash', N'🚿');
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
-- Seed: areas
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [areas])
BEGIN
    INSERT INTO [areas] ([Id], [Name], [NameFr], [NameEn], [Description], [DescriptionEn], [Link])
    VALUES ('lachine', 'Lachine', 'Lachine', 'Lachine', 
            'Quartier paisible en bordure du fleuve Saint-Laurent et du Canal Lachine', 
            'Peaceful neighborhood along the Saint Lawrence River and Lachine Canal', 
            'https://en.wikipedia.org/wiki/Lachine,_Montreal');

    INSERT INTO [areas] ([Id], [Name], [NameFr], [NameEn], [Description], [DescriptionEn], [Link])
    VALUES ('pierrefonds', 'Pierrefonds', 'Pierrefonds', 'Pierrefonds', 
            'Secteur résidentiel familial avec espaces verts', 
            'Family-friendly residential area with green spaces', 
            'https://en.wikipedia.org/wiki/Pierrefonds-Roxboro');

    INSERT INTO [areas] ([Id], [Name], [NameFr], [NameEn], [Description], [DescriptionEn], [Link])
    VALUES ('downtown', 'Centre-ville', 'Centre-ville', 'Downtown', 
            'Cœur urbain dynamique avec toutes les commodités', 
            'Dynamic urban heart with all amenities', 
            'https://en.wikipedia.org/wiki/Downtown_Montreal');

    INSERT INTO [areas] ([Id], [Name], [NameFr], [NameEn], [Description], [DescriptionEn], [Link])
    VALUES ('cote-des-neiges', 'Côte-des-Neiges', 'Côte-des-Neiges', 'Côte-des-Neiges', 
            'Quartier multiculturel près des universités', 
            'Multicultural neighborhood near universities', 
            'https://en.wikipedia.org/wiki/C%C3%B4te-des-Neiges');

    INSERT INTO [areas] ([Id], [Name], [NameFr], [NameEn], [Description], [DescriptionEn], [Link])
    VALUES ('plateau-mont-royal', 'Plateau-Mont-Royal', 'Plateau-Mont-Royal', 'Plateau-Mont-Royal', 
            'Quartier artistique et branché de Montréal', 
            'Artistic and trendy neighborhood of Montreal', 
            'https://en.wikipedia.org/wiki/Le_Plateau-Mont-Royal');
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

-- -----------------------------------------------
-- Seed: customer
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [customer])
BEGIN
    INSERT INTO [customer] ([CustomerId], [CustomerName], [CustomerEmail], [UserId], [Password])
    VALUES ('CUST-1001', 'Jane Doe', 'jane.doe@example.com', 'jane.doe', 'HwYRCh4dOC4oVwQLJQ==');

    INSERT INTO [customer] ([CustomerId], [CustomerName], [CustomerEmail], [UserId], [Password])
    VALUES ('CUST-1002', 'Daniel.Seguin', 'daniel@seguin.dev', 'daniel.seguin', 'FgQLASAHRlFGRw==');

    INSERT INTO [customer] ([CustomerId], [CustomerName], [CustomerEmail], [UserId], [Password])
    VALUES ('CUST-1003', 'Jessica Larmour', 'larmour.j.a@gmail.com', 'jessica.larmour', 'MQAXXn0/ERdQ');
END
GO

-- -----------------------------------------------
-- Seed: apartments
-- -----------------------------------------------
IF NOT EXISTS (SELECT 1 FROM [apartments])
BEGIN
    -- apt_032
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_032', N'#1607 - 2170 Ave Lincoln', N'#1607 - 2170 Ave Lincoln', N'Studio', 1, 337, 1150, N'Downtown', 1, 0, 0, 1, 
    N'🏙DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙AVAILABLE NOW – 2170 Lincoln, Montreal
🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'["1607-2170lincoln_1.jpg","1607-2170lincoln_2.jpg","1607-2170lincoln_3.jpg","1607-2170lincoln_4.jpg","1607-2170lincoln_5.jpg","1607-2170lincoln_6.jpg","1607-2170lincoln_7.jpg","1607-2170lincoln_8.jpg","1607-2170lincoln_9.jpg","1607-2170lincoln_10.jpg","1607-2170lincoln_11.jpg"]',
    N'[2,3,5]');

    -- apt_031
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_031', N'#1910 - 2170 Ave Lincoln', N'#1910 - 2170 Ave Lincoln', N'1 Bedroom', 1, 490, 1400, N'Downtown', 1, 0, 0, 1,
    N'🏙DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙AVAILABLE NOW – 2170 Lincoln, Montreal
🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[3,5,2]',`n    N'["1910-2170lincoln_1.jpg","1910-2170lincoln_2.jpg","1910-2170lincoln_3.jpg","1910-2170lincoln_4.jpg","1910-2170lincoln_5.jpg","1910-2170lincoln_6.jpg","1910-2170lincoln_7.jpg","1910-2170lincoln_8.jpg","1910-2170lincoln_9.jpg","1910-2170lincoln_10.jpg","1910-2170lincoln_11.jpg","1910-2170lincoln_12.jpg"]');

    -- apt_030
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_030', N'#312 - 2170 Ave Lincoln', N'#312 - 2170 Ave Lincoln', N'', 1, 337, 1400, N'Downtown', 1, 0, 0, 1,
    N'🏙DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙AVAILABLE NOW – 2170 Lincoln, Montreal
🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[2,3,5]',`n    N'["312-2170lincoln_1.jpg","312-2170lincoln_2.jpg","312-2170lincoln_3.jpg","312-2170lincoln_4.jpg","312-2170lincoln_5.jpg","312-2170lincoln_6.jpg","312-2170lincoln_7.jpg","312-2170lincoln_8.jpg","312-2170lincoln_9.jpg","312-2170lincoln_10.jpg"]');

    -- apt_029
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_029', N'#805 - 2170 Ave Lincoln', N'#805 - 2170 Ave Lincoln', N'1 Bedroom', 1, 337, 1400, N'Downtown', 1, 0, 0, 1,
    N'🏙DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙AVAILABLE NOW – 2170 Lincoln, Montreal
🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[3,5,2]',`n    N'["805-2170lincoln_1.jpg","805-2170lincoln_2.jpg","805-2170lincoln_3.jpg","805-2170lincoln_4.jpg","805-2170lincoln_5.jpg","805-2170lincoln_6.jpg","805-2170lincoln_7.jpg","805-2170lincoln_8.jpg","805-2170lincoln_9.jpg"]');

    -- apt_028
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_028', N'#1506 - 2170 Ave Lincoln', N'#1506 - 2170 Ave Lincoln', N'Studio', 1, 342, 1150, N'Downtown', 1, 0, 0, 1,
    N'🏙 DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙AVAILABLE NOW – 2170 Lincoln, Montreal
🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[2,5,3]',`n    N'["1506-2170AveLincoln_1.jpg","1506-2170AveLincoln_2.jpg","1506-2170AveLincoln_3.jpg","1506-2170AveLincoln_4.jpg","1506-2170AveLincoln_5.jpg","1506-2170AveLincoln_6.jpg","1506-2170AveLincoln_7.jpg","1506-2170AveLincoln_8.jpg"]');

    -- apt_027
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_027', N'#401 - 2170 Ave Lincoln', N'#401 - 2170 Ave Lincoln', N'2 Bedrooms', 1, 765, 2000, N'Downtown', 1, 0, 0, 1,
    N'🏙 DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙 AVAILABLE NOW – 2170 Lincoln, Montreal

🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[2,3]',`n    N'["401-2170lincoln1.jpeg","401-2170lincoln2.jpeg","401-2170lincoln3.jpeg","401-2170lincoln4.jpeg","401-2170lincoln5.jpeg","401-2170lincoln6.jpeg","401-2170lincoln7.jpeg","401-2170lincoln8.jpeg","401-2170lincoln9.jpeg","401-2170lincoln10.jpeg","401-2170lincoln11.jpeg","401-2170lincoln12.jpeg","401-2170lincoln13.jpeg","401-2170lincoln14.jpeg"]');

    -- apt_026
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_026', N'#1109 - 2170 Ave Lincoln ', N'#1109 - 2170 Ave Lincoln ', N'1 Bedroom', 1, 490, 1400, N'Downtown', 0, 0, 0, 1,
    N'🏙 DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙 AVAILABLE NOW – 2170 Lincoln, Montreal

🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'[3,5,2]',`n    N'["1109-2170lincoln_1.jpg","1109-2170lincoln_2.jpg","1109-2170lincoln_3.jpg","1109-2170lincoln_4.jpg","1109-2170lincoln_5.jpg","1109-2170lincoln_6.jpg","1109-2170lincoln_7.jpg","1109-2170lincoln_8.jpg","1109-2170lincoln_9.jpg","1109-2170lincoln_10.jpg"]');

    -- apt_025
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_025', N'#907 - 2170 Ave Lincoln', N'#907 - 2170 lincoln', N'', 1, 337, 1150, N'Downtown', 1, 0, 0, 1,
    N'🏙 DISPONIBLE MAINTENANT - 2170 Lincoln, Montréal

🚇 À 2 minutes à pied du métro Atwater

🏡 Unités meublées - Location de 12 mois uniquement

💰 Prix promotionnels :

• Studios à partir de 1 150 $

• 1 chambre à coucher à partir de 1 400 $

• 2 chambres à coucher à partir de 2 000 $

🎉 2 MOIS GRATUITS (amorti sur 12 mois) - offre à durée limitée pour emménager d''ici le 1er avril.

✅ Appareils inclus

✅ Salle de sport dans le bâtiment

✅ Blanchisserie sur place

🚗 Parking intérieur : 250 $/mois

🐾 Pas d''animaux

🌇 Balcons privés (la plupart des unités)

☀️ Unités lumineuses orientées au sud

🏢 Bâtiment propre, calme et bien géré

📩 Envoyez-moi un message pour plus de détails ou pour planifier une visite !',
    N'🏙 AVAILABLE NOW – 2170 Lincoln, Montreal

🚇 2-minute walk to Atwater Metro
🏡 Furnished Units – 12-Month Lease Only

💰 Promo Pricing:
• Studios from $1,150
• 1 Bedroom from $1,400
• 2 Bedrooms from $2,000

🎉 2 MONTHS FREE (amortized over 12 months) – limited-time offer for move-in by April 1.

✅ Appliances included
✅ Gym in the building
✅ Laundry on-site
🚗 Indoor parking: $250/month
🐾 No pets

🌇 Private balconies (most units)
☀️ Bright south-facing units
🏢 Clean, quiet, well-managed building

📩 Message me for more details or to schedule a viewing!',
    N'["907-2170lincoln_1.jpg","907-2170lincoln_2.jpg","907-2170lincoln_3.jpg","907-2170lincoln_4.jpg","907-2170lincoln_5.jpg","907-2170lincoln_6.jpg","907-2170lincoln_7.jpg","907-2170lincoln_8.jpg"]',
    N'["Gym","Elevator","Parking Available"]');

    -- apt_024
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_024', N'814 2e Avenue #305', N'814 2e Avenue #305', N'2 Bedrooms', 2, 909, 1950, N'Lachine', 0, 0, 0, 1,
    N'Soyez le premier à vivre dans ce magnifique condo avec vue sur le sud ! Profitez de grandes chambres avec dressing, 2 salles de bains complètes, cuisine moderne avec îlot et appareils électroménagers en acier inoxydable. Détendez-vous sur votre balcon privé donnant sur une cour tranquille. Le bâtiment offre une salle de sport, un parking intérieur (facultatif) et l''accès à de belles commodités. Renseignez-vous sur nos promotions actuelles - jusqu''à 2 mois de location gratuite ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué deux mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction. (45327345)',
    N'Be the first to live in this stunning condo with southern views! Enjoy large bedrooms with walk-in closet, 2 full bathrooms, modern kitchen with island & stainless steel appliances. Relax on your private balcony overlooking a quiet courtyard. Building offers a gym, indoor parking (optional), and access to beautiful amenities. Ask about our current promotions--up to 2 months free rent! Promotional offer: Advertised rent reflects the equivalent monthly rate after applying two free month on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability. (45327345)',
    N'["305-8082eAvenue_1.jpg","305-8082eAvenue_2.jpg","305-8082eAvenue_3.jpg","305-8082eAvenue_4.jpg","305-8082eAvenue_5.jpg","305-8082eAvenue_6.jpg","305-8082eAvenue_7.jpg","305-8082eAvenue_8.jpg","305-8082eAvenue_9.jpg","305-8082eAvenue_10.jpg","305-8082eAvenue_11.jpg","305-8082eAvenue_12.jpg"]',
    N'["Washer/Dryer in Unit","Parking Available","Pet Friendly","Elevator","Gym","Roof top patio"]');

    -- apt_023
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_023', N'814 2e Avenue #304', N'814 2e Avenue #304', N'2 Bedrooms', 2, 1070, 2720, N'Lachine', 0, 0, 0, 1,
    N'Soyez le premier à vivre dans ce magnifique condo avec vue sur le sud ! Profitez de grandes chambres avec dressing, 2 salles de bains complètes, cuisine moderne avec îlot et appareils électroménagers en acier inoxydable. Détendez-vous sur votre balcon privé donnant sur une cour tranquille. Le bâtiment offre une salle de sport, un parking intérieur (facultatif) et l''accès à de belles commodités. Renseignez-vous sur nos promotions actuelles - jusqu''à 2 mois de location gratuite ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué deux mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction. (45327345)',
    N'Be the first to live in this stunning condo with southern views! Enjoy large bedrooms with walk-in closet, 2 full bathrooms, modern kitchen with island & stainless steel appliances. Relax on your private balcony overlooking a quiet courtyard. Building offers a gym, indoor parking (optional), and access to beautiful amenities. Ask about our current promotions--up to 2 months free rent! Promotional offer: Advertised rent reflects the equivalent monthly rate after applying two free month on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability. (45327345)',
    N'["304-8082e Avenue_1.jpg","304-8082e Avenue_2.jpg","304-8082e Avenue_3.jpg","304-8082e Avenue_4.jpg","304-8082e Avenue_5.jpg","304-8082e Avenue_6.jpg","304-8082e Avenue_7.jpg","304-8082e Avenue_8.jpg","304-8082e Avenue_9.jpg","304-8082e Avenue_10.jpg","304-8082e Avenue_11.jpg","304-8082e Avenue_12.jpg","304-8082e Avenue_13.jpg","304-8082e Avenue_14.jpg","304-8082e Avenue_15.jpg","304-8082e Avenue_16.jpg","304-8082e Avenue_17.jpg","304-8082e Avenue_18.jpg"]',
    N'["Washer/Dryer in Unit","Parking Available","Pet Friendly","Elevator","Gym","Roof top patio"]');

    -- apt_022
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_022', N'814 2e Avenue #301', N'814 2e Avenue #301', N'3 Bedrooms', 2, 1128, 2920, N'Lachine', 0, 0, 0, 1,
    N'Spacieux condo de 3 chambres avec dressing, 2 salles de bains complètes (une avec une fenêtre pour la lumière naturelle) et une cuisine moderne avec îlot en quartz. Profitez d''un grand balcon fermé orienté au sud avec une vue sereine sur la cour. Les équipements de l''immeuble comprennent une salle de sport, un parking intérieur (en option) et un parking électrique également disponible. Profitez des promotions actuelles - jusqu''à 2 mois de loyer gratuit ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué 2 mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction. (49137776)',
    N'Spacious 3-bedroom condo with walk-in closet, 2 full bathrooms (one with a window for natural light), and a modern kitchen with quartz island. Enjoy a large enclosed balcony facing south with serene courtyard views. Building amenities include a gym, indoor parking (optional), and electric parking also available. Take advantage of current promotions--up to 2 months free rent!Promotional offer: Advertised rent reflects the equivalent monthly rate after applying 2 free months on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability. (49137776)',
    N'["301-8082e Avenue_1.jpg","301-8082e Avenue_2.jpg","301-8082e Avenue_3.jpg","301-8082e Avenue_4.jpg","301-8082e Avenue_5.jpg","301-8082e Avenue_6.jpg","301-8082e Avenue_7.jpg","301-8082e Avenue_8.jpg","301-8082e Avenue_9.jpg","301-8082e Avenue_10.jpg","301-8082e Avenue_11.jpg"]',
    N'["Washer/Dryer in Unit","Parking Available","Pet Friendly","Elevator","Gym","Roof top patio"]');

    -- apt_021
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_021', N'814 2e Avenue #300', N'814 2e Avenue #300', N'1 Bedroom', 1, 642, 1680, N'Lachine', 0, 0, 0, 1,
    N'Unité d''angle lumineuse orientée sud-ouest avec une vue imprenable sur le coucher du soleil. Les fenêtres du sol au plafond remplissent l''espace de lumière. Salon/salle à manger ouvert avec espace pour un coin bureau et cuisine moderne avec îlot. Comprend 6 appareils électroménagers. Soyez le premier à vivre dans cette toute nouvelle unité ! Pas de balcon, mais profitez de l''immense terrasse commune avec barbecues pour vivre en plein air. Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué un mois gratuit sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction.',
    N'Bright corner unit facing south-west with stunning sunset views. Floor-to-ceiling windows fill the space with light. Open-concept living/dining area with room for an office nook and modern kitchen with island. Includes 6 appliances. Be the first to live in this brand-new unit! No balcony, but enjoy the huge shared terrace with BBQs for outdoor living. Promotional offer: Advertised rent reflects the equivalent monthly rate after applying one free month on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability.',
    N'[2,4,7,5,3,1]',`n    N'["300-8082e Avenue_1.jpg","300-8082e Avenue_2.jpg","300-8082e Avenue_3.jpg","300-8082e Avenue_4.jpg","300-8082e Avenue_5.jpg","300-8082e Avenue_6.jpg","300-8082e Avenue_7.jpg","300-8082e Avenue_8.jpg","300-8082e Avenue_9.jpg","300-8082e Avenue_10.jpg","300-8082e Avenue_11.jpg"]');

    -- apt_020
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_020', N'814 2e Avenue #314', N'814 2e Avenue #314', N'2 Bedrooms', 2, 1000, 2191, N'Lachine', 0, 0, 0, 1,
    N'Soyez le premier à vivre dans ce magnifique condo avec vue sur le sud ! Profitez de grandes chambres avec dressing, 2 salles de bains complètes, cuisine moderne avec îlot et appareils électroménagers en acier inoxydable. Détendez-vous sur votre balcon privé donnant sur une cour tranquille. Le bâtiment offre une salle de sport, un parking intérieur (facultatif) et l''accès à de belles commodités. Renseignez-vous sur nos promotions actuelles - jusqu''à 2 mois de location gratuite ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué deux mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction. (45327345)',
    N'Be the first to live in this stunning condo with southern views! Enjoy large bedrooms with walk-in closet, 2 full bathrooms, modern kitchen with island & stainless steel appliances. Relax on your private balcony overlooking a quiet courtyard. Building offers a gym, indoor parking (optional), and access to beautiful amenities. Ask about our current promotions--up to 2 months free rent! Promotional offer: Advertised rent reflects the equivalent monthly rate after applying two free month on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability. (45327345)',
    N'[2,4,7,5,3,1]',`n    N'["314-8082eAvenue_2.jpg","314-8082eAvenue_3.jpg","314-8082eAvenue_4.jpg","314-8082eAvenue_5.jpg","314-8082eAvenue_6.jpg","314-8082eAvenue_7.jpg","314-8082eAvenue_8.jpg","314-8082eAvenue_9.jpg","314-8082eAvenue_10.jpg","314-8082eAvenue_11.jpg","314-8082eAvenue_12.jpg","314-8082eAvenue_1.jpg"]');

    -- apt_019
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_019', N' 814 2e Avenue #315', N' 814 2e Avenue #315', N'3 Bedrooms', 2, 1100, 2658, N'Lachine', 0, 0, 0, 1,
    N'Spacieux condo de 3 chambres avec dressing, 2 salles de bains complètes (une avec une fenêtre pour la lumière naturelle) et une cuisine moderne avec îlot en quartz. Profitez d''un grand balcon fermé orienté au sud avec une vue sereine sur la cour. Les équipements de l''immeuble comprennent une salle de sport, un parking intérieur (en option) et un parking électrique également disponible. Profitez des promotions actuelles - jusqu''à 2 mois de loyer gratuit ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué 2 mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer. Sous réserve de l''approbation et de la disponibilité de la direction. (49137776)',
    N'Spacious 3-bedroom condo with walk-in closet, 2 full bathrooms (one with a window for natural light), and a modern kitchen with quartz island. Enjoy a large enclosed balcony facing south with serene courtyard views. Building amenities include a gym, indoor parking (optional), and electric parking also available. Take advantage of current promotions--up to 2 months free rent!Promotional offer: Advertised rent reflects the equivalent monthly rate after applying 2 free months on a 12-month lease term. Actual rent before promotion may differ. Subject to management approval and availability. (49137776)',
    N'[2,4,1,5,3,7]',`n    N'["315-8082eAvenue_2.jpg","315-8082eAvenue_3.jpg","315-8082eAvenue_4.jpg","315-8082eAvenue_5.jpg","315-8082eAvenue_6.jpg","315-8082eAvenue_7.jpg","315-8082eAvenue_8.jpg","315-8082eAvenue_9.jpg","315-8082eAvenue_10.jpg","315-8082eAvenue_11.jpg","315-8082eAvenue_12.jpg","315-8082eAvenue_13.jpg","315-8082eAvenue_14.jpg","315-8082eAvenue_15.jpg","315-8082eAvenue_1.jpg"]');

    -- apt_018
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_018', N'814 2e Avenue #316', N'814 2e Avenue #316', N'2 Bedrooms', 1, 900, 2016, N'Lachine', 1, 0, 0, 1,
    N'Condo spacieux avec des chambres séparées divisées par la salle de bain pour plus d''intimité. Salon ouvert et lumineux avec un îlot de cuisine parfait pour manger, ainsi qu''une grande entrée avec placard et espace pour ajouter un beau bureau de console et un décor. Il dispose d''une douche à l''italienne moderne, d''une grande terrasse privée donnant sur une cour verdoyante et paisible et d''un accès à une superbe salle de sport et d''un hall design avec salon. Parking couvert disponible moyennant des frais supplémentaires. Un endroit élégant et paisible pour appeler chez soi ! Offre promotionnelle : Le loyer annoncé reflète le taux mensuel équivalent après avoir appliqué 2 mois gratuits sur une durée de location de 12 mois. Le loyer réel avant la promotion peut différer.',
    N'Spacious condo with separated bedrooms divided by the bathroom for added privacy. Bright open-concept living with a kitchen island perfect for dining, plus a large entryway with closet and space to add a beautiful console desk and décor. Features a modern walk-in shower, Large private terrace overlooking a quiet green courtyard, and access to a stunning gym and designer lobby with lounge. Indoor parking available for an extra fee. A stylish and peaceful place to call home! Promotional offer: Advertised rent reflects the equivalent monthly rate after applying 2 free month on a 12-month lease term. Actual rent before promotion may differ.',
    N'[2,4,1,7,5,3]',`n    N'["316-8082eAvenue_2.jpg","316-8082eAvenue_3.jpg","316-8082eAvenue_4.jpg","316-8082eAvenue_5.jpg","316-8082eAvenue_6.jpg","316-8082eAvenue_7.jpg","316-8082eAvenue_8.jpg","316-8082eAvenue_9.jpg","316-8082eAvenue_10.jpg","316-8082eAvenue_11.jpg","316-8082eAvenue_12.jpg","316-8082eAvenue_13.jpg","316-8082eAvenue_1.jpg"]');

    -- apt_017
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_017', N'1419 Pierce', N'1419 Pierce', N'3 Bedrooms', 1, 0, 3200, N'', 1, 0, 0, 1,
    N'🔥 ENTIÈREMENT MEUBLÉ 🔥

🏡 Appartement 3 chambres / 1 salle de bain – 3 200 $/mois WIFI INCLUS

Spacieux appartement 3 chambres et 1 salle de bain, entièrement meublé, disponible le 1er mai.

Parfait pour les étudiants ou colocataires.

✨ Inclusions :
• Entièrement meublé
• Cuisinière et four
• Lave-vaisselle
• Laveuse et sécheuse
• Réfrigérateur
• Micro-ondes
• Wi-Fi inclus

📍 Points forts de l''emplacement :
• À 2 minutes à pied du métro Guy 🚇
• À distance de marche de l''Université Concordia
• Proche du centre-ville
• Près des commerces, cafés et restaurants

🐾 Animaux :
• Animaux non acceptés
📅 Disponible le 1er mai
📩 Écrivez-moi pour plus d''informations ou pour planifier une visite !',
    N'🏡 3-Bedroom / 1-Bathroom FULLY FURNISHED Apartment – $3,200/month

Spacious 3-bedroom, 1-bathroom apartment, fully furnished, available May 1st.

Perfect for students and roommates looking for a prime downtown location.

✨ Inclusions:
• Fully furnished
• Stove & oven
• Dishwasher
• Washer & dryer
• Refrigerator
• Microwave
• Wi-Fi included
• AC

📍 Location Highlights:
• 2-minute walk to Guy Metro 🚇
• Walking distance to Concordia University
• Close to downtown
• Surrounded by shops, cafés, restaurants, and services

🐾 Pets:
• No pets allowed
📅 Available May 1st
📩 Message for more details or to book a visit!',
    N'[2]',`n    N'["1419-1_2.jpg","1419-1_3.jpg","1419-1_4.jpg","1419-1_5.jpg","1419-1_6.jpg","1419-1_7.jpg","1419-1_8.jpg","1419-1_9.jpg","1419-1_10.jpg","1419-1_11.jpg","1419-1_12.jpg","1419-1_13.jpg","1419-1_14.jpg","1419-1_15.jpg","1419-1_16.jpg","1419-1_17.jpg","1419-1_18.jpg","1419-1_1.jpg"]');

    -- apt_016
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_016', N'1419 Pierce', N'1419 Pierce', N'3 Bedrooms', 1, 0, 2590, N'', 1, 0, 0, 1,
    N'🔥 ENTIÈREMENT MEUBLÉ 🔥
🏡 Appartement 3 chambres / 1 salle de bain – 2,950 $/mois Sous-Sol

Spacieux appartement 3 chambres et 1 salle de bain, entièrement meublé, disponible le 1er mai.
Parfait pour les étudiants ou colocataires.

✨ Inclusions :
• Entièrement meublé
• Cuisinière et four
• Lave-vaisselle
• Laveuse et sécheuse
• Réfrigérateur
• Micro-ondes
• Wi-Fi inclus

📍 Points forts de l''emplacement :
• À 2 minutes à pied du métro Guy 🚇
• À distance de marche de l''Université Concordia
• Proche du centre-ville
• Près des commerces, cafés et restaurants

🐾 Animaux :
• Animaux non acceptés

📅 Disponible le maintenant
📩 Écrivez-moi pour plus d''informations ou pour planifier une visite !',
    N'🔥 FULLY FURNISHED 🔥
🏡 3-Bedroom / 1-Bathroom Apartment Basement– $2,590/month WIFI

Spacious 3-bedroom, 1-bathroom apartment, fully furnished,  Available immediately .

Perfect for students and roommates looking for a prime downtown location.

✨ Inclusions:
• Fully furnished
• Stove & oven
• Dishwasher
• Washer & dryer
• Refrigerator
• Microwave
• Wi-Fi included

📍 Location Highlights:
• 2-minute walk to Guy Metro 🚇
• Walking distance to Concordia University
• Close to downtown
• Surrounded by shops, cafés, restaurants, and services

🐾 Pets:
• No pets allowed

📅 Available Now
📩 Message for more details or to book a visit!',
    N'[2]',`n    N'["AI3A1069-Edit_LR.jpg","AI3A1072-Edit_LR.jpg","AI3A1078-Edit_LR.jpg","AI3A1083-Edit_LR.jpg","AI3A1088-Edit_LR.jpg","AI3A1092-Edit_LR.jpg","AI3A1101-Edit_LR.jpg","AI3A1105-Edit_LR.jpg","AI3A1108-Edit_LR.jpg","AI3A1111-Edit_LR.jpg","AI3A1115-Edit_LR.jpg","AI3A1127-Edit_LR.jpg","AI3A1129-Edit_LR.jpg","AI3A1134-Edit_LR.jpg","AI3A1137-Edit_LR.jpg","AI3A1139-Edit_LR.jpg"]');

    -- apt_015
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_015', N'1419 Pierce', N'1419 Pierce', N'2 Bedrooms', 1, 0, 2195, N'', 1, 0, 0, 1,
    N'🏡 Appartement 2 chambres sur deux étages – 2 195 $/mois - meublé - WIFI inclus - Animaux non accepter

📍 1419 rue Pierce

Superbe appartement 2 chambres entièrement meublé, réparti sur deux étages, disponible immédiatement. A quelques pas du centre ville, Idéal pour professionnels ou colocataires recherchant espace et confort.

✨ Caractéristiques et inclusions :
• Entièrement meublé
• Cuisinière et four
• Lave-vaisselle
• Laveuse et sécheuse dans l''unité
• Réfrigérateur
• Micro-ondes
• Wi-Fi inclus
• Climatisation

🐾 Animaux :
• Animaux non acceptés

📅 Disponible immédiatement
📩 Écrivez-moi pour plus d''informations ou pour planifier une visite !',
    N'🏡 2-Bedroom FURNISHED Apartment on Two Floors – $2,195/month - Pets not allowed- WIFI included

📍 1419 Pierce Street

Beautiful fully furnished two-bedroom apartment on two floors, available immediately. Next to downtown.
Perfect for professionals or roommates looking for comfort and space.

✨ Features & Inclusions:
• Fully furnished
• Stove & oven
• Dishwasher
• Washer & dryer in unit
• Refrigerator
• Microwave
• Wi-Fi included
• AC

🐾 Pets:
• Pets not allowed

📅 Available immediately
📩 Message for more information or to schedule a visit!',
    N'[2]',`n    N'["1421-2_1.jpg","1421-2_2.jpg","1421-2_3.jpg","1421-2_4.jpg","1421-2_5.jpg","1421-2_6.jpg","1421-2_7.jpg","1421-2_8.jpg","1421-2_9.jpg","1421-2_10.jpg","1421-2_11.jpg","1421-2_12.jpg","1421-2_13.jpg","1421-2_14.jpg","1421-2_15.jpg","1421-2_16.jpg","1421-2_17.jpg","1421-2_18.jpg"]');

    -- apt_014
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_014', N'#306 - 3977 Saint Dominique', N'#306 - 3977 Saint Dominique', N'Studio', 1, 0, 1450, N'', 0, 0, 0, 1,
    N'🏡 Studio à louer – 1 450 $
📍 3965 rue St-Dominique

Studio lumineux non meublé, disponible immédiatement, situé dans un secteur central et animé — idéal pour les étudiants ou jeunes professionnels.

✨ Caractéristiques et inclusions :
• Cuisinière et four
• Lave-vaisselle
• Laveuse et sécheuse
• Réfrigérateur
• Micro-ondes
• Air climatisé
• Animaux acceptés 🐾

🚗 Options supplémentaires :
• Stationnement extérieur : 300$/mois
• Rangement au sous-sol : 40 $/mois

📍 Points forts de l''emplacement :
• À distance de marche du métro Berri-UQAM
• À distance de marche du centre-ville
• Près des stations de métro
• Proche des bars, restaurants, commerces et pharmacies
• Emplacement parfait pour les étudiants

📅 Disponible immédiatement
📩 Écrivez-moi pour plus d''informations ou pour planifier une visite !',
    N'🏡 Studio Apartment for Rent – $1,450

📍 3965 St. Dominique Street
Bright unfurnished studio unit available immediately in a vibrant and central location — ideal for students or young professionals. PET FRIENDLY

✨ Features & Inclusions:
• Stove & oven
• Dishwasher
• Washer & dryer
• Refrigerator
• Microwave
• Air conditioning
• Pet friendly 🐾

🚗 Optional Add-ons:
• Outdoor parking: $300/month
• Basement storage: $40/month

📍 Location Highlights:
• Walking distance to Berri-UQAM metro
• Walking distance to downtown
• Close to metro stations
• Near bars, restaurants, shops, and pharmacies
• Excellent location for students

📅 Available immediately
',
    N'[1,2]',`n    N'["306-saintdom1 Large.jpeg","306-saintdom2 Large.jpeg","306-saintdom3 Large.jpeg","306-saintdom4 Large.jpeg","306-saintdom5 Large.jpeg","306-saintdom6 Large.jpeg","306-saintdom7 Large.jpeg"]');

    -- apt_013
    INSERT INTO [apartments] ([Id], [Title], [TitleEn], [UnitTypeName], [Bathrooms], [SquareFootage], [Price], [Area], [Furnished], [RoomToRent], [CondoRentals], [Available], [Description], [DescriptionEn], [ImagesJson], [FeaturesJson])
    VALUES (N'apt_013', N'#101 - 3977 Saint-Dominique', N'#101 - 3977 Saint-Dominique', N'', 2, 1400, 2690, N'', 0, 0, 0, 1,
    N'🏡 Appartement 3 chambres NON meublé à louer – 2 690 $ Animaux accepte

📍 3965 rue Saint-Dominique
Spacieux appartement 3 chambres et 2 salles de bains  disponible immédiatement, situé dans un secteur central et animé — idéal pour les étudiants ou les professionnels.

✨ Caractéristiques et inclusions :
• Cuisinière et four
• Lave-vaisselle
• Laveuse et sécheuse
• Réfrigérateur
• Micro-ondes
• Air climatisé

🚗 Options supplémentaires :
• Stationnement : 300 $/mois
• Espace de rangement au sous-sol : 40 $/mois

📍 Points forts de l''emplacement :
• À distance de marche du métro Berri-UQAM
• Proche des bars, cafés et restaurants
• À proximité de tous les commerces et pharmacies
• Emplacement parfait pour les étudiants
• Quartier central et très vivant

📅 Disponible immédiatement
📩 Écrivez-moi pour plus d''informations ou pour planifier une visite !',
    N'🏡 3-Bedroom NOT Furnished Apartment for Rent – $2,690 Pet friendly

📍 3965 Saint Dominic Street
Spacious  3-bedroom 2 bathrooms unit available immediately, located in a prime and lively area — great for students or professionals.

✨ Features & Inclusions:
• Stove & oven
• Dishwasher
• Washer & dryer
• Refrigerator
• Microwave
• Air conditioning

🚗 Optional Add-ons:
• Parking: $300/month
• Basement storage: $40/month

📍 Location Highlights:
• Walking distance to Berri-UQAM metro
• Close to bars, cafés, and restaurants
• Near shops and pharmacies
• Excellent location for students
• Central, vibrant neighborhood

📅 Available immediately
📩 Message for more details or to schedule a visit!
',
    N'[1,2]',`n    N'["101-saintdom1 Large.jpeg","101-saintdom2 Large.jpeg","101-saintdom3 Large.jpeg","101-saintdom5 Large.jpeg","101-saintdom6 Large.jpeg","101-saintdom8 Large.jpeg","101-saintsom4 Large.jpeg","101-saintsom7 Large.jpeg"]');
END
GO
