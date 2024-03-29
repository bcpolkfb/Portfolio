USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[ExperienceDetails_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/17/2023
-- Description:		Updates ExperienceDetails table by Id
-- Code Reviewer:

-- MODIFIED BY:		Author
-- MODIFIED DATE:	11/20/2023
-- Code Reviewer:
-- Note:			Modified to batch update
-- =============================================


CREATE proc [dbo].[ExperienceDetails_Update]
				@BatchExperience dbo.BatchUpdateExperienceDetails READONLY
				,@UserId int

/*
	DECLARE @BatchExperience dbo.BatchUpdateExperienceDetails
			,@UserId int = 3

	INSERT INTO @BatchExperience (	Id
									,IsCurrent
									,StartDate
									,EndDate
									,JobTitle
									,CompanyName
									,City
									,StateId
									,Country
									,Description)

	VALUES 
			(5
			,0
			,'11/11/2121'
			,'12/12/1993'
			,'Job title Update'
			,'Comp Name Update'
			,'City Update'
			,4
			,'Country Update'
			,'Description Update')

	EXECUTE [dbo].[ExperienceDetails_Update]
			@BatchExperience
			,@UserId
*/

AS

BEGIN

	Insert into dbo.[ExperienceDetails]
				(UserId,
				IsCurrent,
				StartDate,
				EndDate,
				JobTitle,
				CompanyName,
				City,
				StateId,
				Country,
				Description)
		Select 
				@UserId
				,be.IsCurrent
				,be.StartDate
				,be.EndDate
				,be.JobTitle
				,be.CompanyName
				,be.City
				,be.StateId
				,be.Country
				,be.Description

			FROM @BatchExperience AS be
			Where be.Id = 0 and NOT EXISTS (
			SELECT 1 
			FROM dbo.[ExperienceDetails] AS ed
			WHERE	@UserId = ed.UserId AND
					be.StartDate = ed.StartDate
					and be.EndDate = be.EndDate)

	UPDATE [dbo].[ExperienceDetails]
	   SET [IsCurrent] = b.IsCurrent
		  ,[StartDate] = b.StartDate
		  ,[EndDate] = b.EndDate
		  ,[JobTitle] = b.JobTitle
		  ,[CompanyName] = b.CompanyName
		  ,[City] = b.City
		  ,[StateId] = b.StateId
		  ,[Country] = b.Country
		  ,[Description] = b.Description
	 FROM @BatchExperience AS b
	 INNER JOIN [dbo].[ExperienceDetails] AS e ON e.Id = b.Id

END

GO
