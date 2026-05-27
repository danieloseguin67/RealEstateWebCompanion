USE [realestatewebcompanion];
GO

-- Generates idempotent preference inserts.
-- Optional filter example:
-- WHERE [PreferenceKey] IN ('googledrive', 'smtpHost', 'smtpPort')
SELECT
    'IF NOT EXISTS (SELECT 1 FROM [preferences] WHERE [PreferenceKey] = ''' +
    REPLACE([PreferenceKey], '''', '''''') +
    ''') INSERT INTO [preferences] ([PreferenceKey], [PreferenceValue]) VALUES (''' +
    REPLACE([PreferenceKey], '''', '''''') +
    ''', ''' +
    REPLACE([PreferenceValue], '''', '''''') +
    ''');'
AS [InsertStatement]
FROM [preferences]
ORDER BY [PreferenceKey];
