USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Certifications_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/17/2023
-- Description:		Updates Certifications table by Id
-- Code Reviewer:

-- MODIFIED BY:		Brandon Polk
-- MODIFIED DATE:	11/16/2023
-- Code Reviewer:
-- Note:			Modified to batch update and insert new certs.
-- =============================================

CREATE proc [dbo].[Certifications_Update]
				@BatchCertifications dbo.BatchUpdateCertifications READONLY
				,@UserId int

/*
	DECLARE @BatchCertifications dbo.BatchUpdateCertifications
			,@UserId int = 3

	INSERT INTO @BatchCertifications (	Id
										,Name
										,Description
										,ExpireDate
										,IssueDate
										,FileId)

	VALUES
			(4
			,'Test Update'
			,'Test Desc'
			,'11/11/1991'
			,'12/12/2121'
			,4),
			(0
			,'Test Insert plus Update'
			,'Test Insert plus Update Desc'
			,'11/11/1991'
			,'12/12/2121'
			,4)

	EXECUTE [dbo].[Certifications_Update]
			@BatchCertifications
			,@UserId
*/

AS

BEGIN

	Insert into dbo.Certifications
				(UserId,
				Name,
				Description,
				ExpireDate,
				IssueDate,
				FileId)
		Select 
				@UserId
				,bc.Name
				,bc.Description
				,bc.ExpireDate
				,bc.IssueDate
				,bc.FileId

			FROM @BatchCertifications AS bc
			Where bc.Id = 0 and NOT EXISTS (
			SELECT 1 
			FROM dbo.Certifications AS c
			WHERE	@UserId = c.UserId AND
					bc.Name = c.Name)
		

	UPDATE [dbo].[Certifications]
	   SET [Name] = bc.[Name]
		  ,[Description] = bc.[Description]
		  ,[ExpireDate] = bc.[ExpireDate]
		  ,[IssueDate] = bc.[IssueDate]
		  ,[FileId] = bc.[FileId]
	FROM @BatchCertifications AS bc
	INNER JOIN [dbo].[Certifications] AS c ON c.Id = bc.Id
	Where bc.Id > 0

END
GO
