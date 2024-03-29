USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Brandon Polk
-- Create date: 9/25/2023
-- Description:	Updates the subject and text of a comment
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Comments_Update]
			@Subject nvarchar(50)
			,@Text nvarchar(3000)
			,@Id int

/*
	DECLARE @Subject nvarchar(50) = 'UPDATE TEST SUBJECT'
			,@Text nvarchar(3000) = 'UPDATE TEST TEXT'
			,@Id int = 1

	SELECT [Subject], [Text] from dbo.Comments
		WHERE Id = @Id

	EXECUTE dbo.Comments_Update
			@Subject
			,@Text
			,@Id

	SELECT [Subject], [Text] from dbo.Comments
		WHERE Id = @Id
*/

AS

BEGIN

	UPDATE [dbo].[Comments]
	   SET [Subject] = @Subject
		  ,[Text] = @Text
		  ,[DateModified] = getutcdate()
	 WHERE Id = @Id

 END
GO
