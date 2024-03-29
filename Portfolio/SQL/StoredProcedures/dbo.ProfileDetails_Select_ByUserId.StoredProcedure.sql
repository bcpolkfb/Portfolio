USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[ProfileDetails_Select_ByUserId]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/16/2023
-- Description:		Selects from tables ProfileDetails, EducationDetails, ExperienceDetails, Certifications, UserSkills, and UserTools by UserId
-- Code Reviewer:

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE proc [dbo].[ProfileDetails_Select_ByUserId]
					@UserId int

/*
	DECLARE @UserId int = 285

	EXECUTE [dbo].[ProfileDetails_Select_ByUserId]
			@UserId
*/

AS

BEGIN
------------ProfileDetails------------
	SELECT	[Id]
			,[TitleTypeId]
			,[GenderTypeId]
			,[Phone]
			,[Fax]
			,[IsSearchable]
			,[HasActiveEmailNotification]
			,[CurrentSalary]
			,[Currency]
			,[TargetSalary]
	  FROM [dbo].[ProfileDetails]
	WHERE UserId = @UserId
------------Certifications------------
	SELECT	[Id]
			,[Name]
			,[Description]
			,[ExpireDate]
			,[IssueDate]
			,[FileId]
	  FROM [dbo].[Certifications]
	WHERE UserId = @UserId
------------EducationDetails----------
	SELECT	[Id]
			,[DegreeTypeId]
			,[Major]
			,[InstituteName]
			,[StartDate]
			,[EndDate]
			,[GPA]
			,[Percentage]
	  FROM [dbo].[EducationDetails]
	WHERE UserId = @UserId
------------ExperienceDetails---------
	SELECT	[Id]
			,[IsCurrent]
			,[StartDate]
			,[EndDate]
			,[JobTitle]
			,[CompanyName]
			,[City]
			,[StateId]
			,[Country]
			,[Description]
	  FROM [dbo].[ExperienceDetails]
	WHERE UserId = @UserId
------------Skills--------------------
	SELECT	s.[Id]
			,s.[Name]
	  FROM [dbo].[UserSkills] AS us
	  INNER JOIN [dbo].[Skills] AS s ON us.SkillId = s.Id
	WHERE [UserId] = @UserId
------------Tools---------------------
	SELECT	t.[Id]
			,t.[Name]
	  FROM [dbo].[UserTools] AS ut
	  INNER JOIN [dbo].[ToolsUtilized] AS t ON ut.ToolUtilizedId = t.Id
	WHERE ut.[Id] = @UserId

END
GO
