USE [{{DB_DATABASE}}]
GO

-- Migration name defined here
DECLARE @MigrationId NVARCHAR(255) = 'Init{{SERVICE_NAME}}Module'

IF NOT EXISTS (SELECT TOP 1 1 FROM MigrationHistory WHERE MigrationId = @MigrationId) 
BEGIN
    PRINT 'Running migration [' + @MigrationId + ']';

    BEGIN TRY
        BEGIN TRANSACTION  
    
        -- Migration code starts here
    
        -- TODO
    
        -- Migration code ends here
    
        INSERT INTO MigrationHistory (MigrationId, AppliedOn)
        VALUES (@MigrationId, GETDATE());
    
        COMMIT;
    END TRY
    BEGIN CATCH    
        ROLLBACK;
        
        PRINT 'An error occurred when running migration [' + @MigrationId + ']: ' + ERROR_MESSAGE();
    END CATCH;
END;