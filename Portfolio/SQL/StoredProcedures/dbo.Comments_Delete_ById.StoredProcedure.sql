USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Delete_ById]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Brandon Polk
-- Create date: 9/25/2023
-- Description:	Sets a comments "IsDeleted" property to "true"
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Comments_Delete_ById]
				@Id int

/*
	DECLARE @Id int = 1

	SELECT IsDeleted from dbo.Comments
		WHERE Id = @Id

	EXECUTE dbo.Comments_Delete_ById
			@Id

	SELECT IsDeleted from dbo.Comments
		WHERE Id = @Id
*/

AS

BEGIN

	UPDATE [dbo].[Comments]
	   SET [IsDeleted] = 1
		  ,[DateModified] = getutcdate()
	 WHERE Id = @Id

END
GO
