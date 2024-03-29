USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Insert]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Brandon Polk
-- Create date: 9/25/2023
-- Description:	Creates a comment on an entity
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[Comments_Insert]
			@Subject nvarchar(50)
			,@Text nvarchar(3000)
			,@ParentId int
			,@EntityTypeId int
			,@EntityId int
			,@CreatedBy int
			,@Id int output

/*
	DECLARE @Subject nvarchar(50) = 'TEST SUBJECT ORG 3'
			,@Text nvarchar(3000) = 'TEST TEXT ORG 3'
			,@ParentId int = 45
			,@EntityTypeId int = 8
			,@EntityId int = 3
			,@CreatedBy int = 2
			,@Id int = 0

	EXECUTE dbo.Comments_Insert
			@Subject
			,@Text
			,@ParentId
			,@EntityTypeId
			,@EntityId
			,@CreatedBy
			,@Id

	EXECUTE dbo.Comments_Select_ByEntityId
			@EntityTypeId
			,@EntityId

			select * from dbo.comments
*/

AS

BEGIN
	
	INSERT INTO [dbo].[Comments]
			   ([Subject]
			   ,[Text]
			   ,[ParentId]
			   ,[EntityTypeId]
			   ,[EntityId]
			   ,[DateCreated]
			   ,[DateModified]
			   ,[CreatedBy]
			   ,[IsDeleted])
		 VALUES
			   (@Subject
			   ,@Text
			   ,@ParentId
			   ,@EntityTypeId
			   ,@EntityId
			   ,getutcdate()
			   ,getutcdate()
			   ,@CreatedBy
			   ,0)
	SET @Id = SCOPE_IDENTITY()

END
GO
