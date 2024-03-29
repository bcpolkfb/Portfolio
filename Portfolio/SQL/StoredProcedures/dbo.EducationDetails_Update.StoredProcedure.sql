USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[EducationDetails_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/17/2023
-- Description:		Updates EducationDetails table by Id
-- Code Reviewer:

-- MODIFIED BY:		Author
-- MODIFIED DATE:	11/20/2023
-- Code Reviewer:
-- Note:			Modified to batch update or insert
-- =============================================


CREATE proc [dbo].[EducationDetails_Update]
					@BatchEducation dbo.BatchUpdateEducationDetails READONLY
					,@UserId int

/*
	DECLARE @BatchEducation dbo.BatchUpdateEducationDetails
			,@UserId int = 2

	INSERT INTO @BatchEducation (	Id
									,DegreeTypeId
									,Major
									,InstituteName
									,StartDate
									,EndDate
									,GPA
									,Percentage)

	VALUES
			(5
			,3
			,'UPDATE MAJOR'
			,'UPDATE SCHOOL NAME'
			,'11/11/1991'
			,'12/12/2121'
			,'4'
			,'100')

	EXECUTE [dbo].[EducationDetails_Update]
			@BatchEducation
			,@UserId
*/

AS

BEGIN

	Insert into dbo.EducationDetails
				(UserId,
				DegreeTypeId,
				Major,
				InstituteName,
				StartDate,
				EndDate,
				GPA,
				Percentage)
		Select 
				@UserId
				,be.DegreeTypeId
				,be.Major
				,be.InstituteName
				,be.StartDate
				,be.EndDate
				,be.GPA
				,be.Percentage

			FROM @BatchEducation AS be
			Where be.Id = 0 and NOT EXISTS (
			SELECT 1 
			FROM dbo.[EducationDetails] AS ed
			WHERE	@UserId = ed.UserId AND
					be.StartDate = ed.StartDate AND
					be.EndDate = ed.EndDate And
					be.Major = ed.Major)

	UPDATE [dbo].[EducationDetails]
	   SET [DegreeTypeId] = b.DegreeTypeId
		  ,[Major] = b.Major
		  ,[InstituteName] = b.InstituteName
		  ,[StartDate] = b.StartDate
		  ,[EndDate] = b.EndDate
		  ,[GPA] = b.GPA
		  ,[Percentage] = b.Percentage
	 FROM @BatchEducation AS b
	 INNER JOIN [dbo].[EducationDetails] AS e ON e.Id = b.Id

END
GO
