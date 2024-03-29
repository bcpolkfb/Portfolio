USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[ProfileDetails_CheckUserId]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/13/2023
-- Description:		Checks if a supplied UserId has an associated entry in the ProfileDetails table
-- Code Reviewer:	Austin Scroggins

-- MODIFIED BY:		
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note:			
-- =============================================


CREATE proc [dbo].[ProfileDetails_CheckUserId]
				@UserId int

/*
	DECLARE @UserId int = 3

	EXECUTE [dbo].[ProfileDetails_CheckUserId]
				@UserId
*/

AS

IF EXISTS (
	SELECT 
		[UserId]
	  FROM [dbo].[ProfileDetails]
	WHERE UserId = @UserId)

BEGIN

	SELECT 1

END
ELSE
BEGIN

	SELECT 0

END
GO
