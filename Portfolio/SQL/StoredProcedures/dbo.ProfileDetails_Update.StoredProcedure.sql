USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[ProfileDetails_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/17/2023
-- Description:		Updates ProfileDetails table by Id
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[ProfileDetails_Update]
				@Id int
				,@TitleTypeId int
				,@GenderTypeId int
				,@Phone varchar(50)
				,@Fax varchar(50)
				,@IsSearchable bit
				,@HasActiveEmailNotification bit
				,@CurrentSalary decimal(18,0) = null
				,@Currency varchar(50) = null
				,@TargetSalary decimal(18,0) =null

/*
	DECLARE @Id int = 1
			,@TitleTypeId int = 2
			,@GenderTypeId int = 2
			,@Phone varchar(50) = 'TEST UPDATE PHONE'
			,@Fax varchar(50) = 'TEST UPDATE FAX'
			,@IsSearchable bit = 1
			,@HasActiveEmailNotification bit = 1
			,@CurrentSalary decimal(18,0) = 12
			,@Currency varchar(50) = 'TEST UPDATE CURRENCY'
			,@TargetSalary decimal = 13

	EXECUTE [dbo].[ProfileDetails_Update]
			@Id
			,@TitleTypeId
			,@GenderTypeId
			,@Phone
			,@Fax
			,@IsSearchable
			,@HasActiveEmailNotification
			,@CurrentSalary
			,@Currency
			,@TargetSalary
*/

AS

BEGIN

	UPDATE [dbo].[ProfileDetails]
	   SET [TitleTypeId] = @TitleTypeId
		  ,[GenderTypeId] = @GenderTypeId
		  ,[Phone] = @Phone
		  ,[Fax] = @Fax
		  ,[IsSearchable] = @IsSearchable
		  ,[HasActiveEmailNotification] = @HasActiveEmailNotification
		  ,[CurrentSalary] = @CurrentSalary
		  ,[Currency] = @Currency
		  ,[TargetSalary] = @TargetSalary
	 WHERE Id = @Id

END
GO
