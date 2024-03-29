USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[ProfileDetails_Insert]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/08/2023
-- Description:		Insert procedure for ProfileDetails, EducationDetails, ExperienceDetails, Certifications, UserSkills, and UserTools
-- Code Reviewer:	

-- MODIFIED BY:		Author
-- MODIFIED DATE:	10/09/2023
-- Code Reviewer:	Austin Scroggins
-- Note:			Removed Insert to Users and Files tables. Modified EducationDetails, ExperienceDetails, and Certifications inserts as batch inserts.
-- =============================================


CREATE proc [dbo].[ProfileDetails_Insert]
------------EducationDetails------------
			@UserId int
            ,@Education dbo.BatchEducationDetails READONLY
------------ExperienceDetails-----------
			,@Experience dbo.BatchExperienceDetails READONLY
------------Certifications--------------
			,@Certifications dbo.BatchCertifications READONLY 
------------ProfileDetails--------------
			,@TitleTypeId int = null
			,@GenderTypeId int
			,@Phone varchar(50)
			,@Fax varchar(50)
			,@IsSearchable bit
			,@HasActiveEmailNotification bit
			,@CurrentSalary decimal(18,0) = null
			,@Currency nvarchar(50) = null
			,@TargetSalary decimal(18,0) = null
------------UserSkills------------------
			,@Skills dbo.BatchUserSkills READONLY
------------UserTools-------------------
			,@Tools dbo.BatchUserTools READONLY
			,@Id int output

/*
	DECLARE 
------------EducationDetails------------
			@UserId int = 9
            ,@Education dbo.BatchEducationDetails
------------ExperienceDetails-----------
			,@Experience dbo.BatchExperienceDetails
------------Certifications--------------
			,@Certifications dbo.BatchCertifications
------------ProfileDetails--------------
			,@TitleTypeId int = 2
			,@GenderTypeId int = 2
			,@Phone varchar(50) = '(555)123-4567'
			,@Fax varchar(50) = '(555)765-4321'
			,@IsSearchable bit = 1
			,@HasActiveEmailNotification bit = 1
			,@CurrentSalary decimal(18,0) = 32000
			,@Currency nvarchar(50) = 'USD'
			,@TargetSalary decimal(18,0) = 50000
------------UserSkills------------------
			,@Skills dbo.BatchUserSkills
------------UserTools-------------------
			,@Tools dbo.BatchUserTools
			,@Id int = 0

------------EducationDetails------------
	INSERT INTO @Education	(UserId 
							,DegreeTypeId
							,Major
							,InstituteName
							,StartDate
							,EndDate
							,GPA
							,Percentage)
	VALUES
			(@UserId
			,1
			,'Science'
			,'University of Science'
			,'2012-08-12'
			,'2014-05-12'
			,'4.0'
			,'100'),
			(@UserId
			,1
			,'Other Science'
			,'Other University'
			,'2014-08-12'
			,'2016-05-12'
			,'3.8'
			,'96');

------------ExperienceDetails-----------
	INSERT INTO @Experience (UserId
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
			(@UserId
			,0
			,'2016-08-12'
			,'2016-12-12'
			,'Patient Care Tech'
			,'University Hospital'
			,'Vista Nihila'
			,3
			,'United States'
			,'Direct Patient Care, etc...'),
			(@UserId
			,1
			,'2019-08-12'
			,'2023-10-09'
			,'Patient Care Tech'
			,'Hospital University'
			,'Vista Nihila'
			,4
			,'United States'
			,'Vitals Monitoring, etc...');

------------Certifications--------------
	INSERT INTO @Certifications (UserId
								,Name
								,Description
								,ExpireDate
								,IssueDate
								,FileId)
	VALUES
			(@UserId
			,'BLS'
			,'Basic Life Support Certification'
			,'2024-07-01'
			,'2023-07-01'
			,14),
			(@UserId
			,'CHW'
			,'Community Health Worker Certification'
			,'2024-05-12'
			,'2023-05-12'
			,13);

------------UserSkills------------------
	INSERT INTO @Skills (SkillId)
	VALUES 
			(1)
			,(2);

------------UserTools-------------------
	INSERT INTO @Tools (ToolsUtilizedId)
	VALUES 
			(1)
			,(2);

	EXECUTE [dbo].[ProfileDetails_Insert]
			@UserId
            ,@Education
			,@Experience
			,@Certifications
			,@TitleTypeId
			,@GenderTypeId
			,@Phone
			,@Fax
			,@IsSearchable
			,@HasActiveEmailNotification
			,@CurrentSalary
			,@Currency
			,@TargetSalary
			,@Skills
			,@Tools
			,@Id

*/

AS

BEGIN

	SET XACT_ABORT ON
	DECLARE @Tran nvarchar(50)  = 'Users_Insert_Trans'

BEGIN TRY

	BEGIN TRANSACTION @Tran
---------------EducationDetails----------
	INSERT INTO [dbo].[EducationDetails]
			   ([UserId]
			   ,[DegreeTypeId]
			   ,[Major]
			   ,[InstituteName]
			   ,[StartDate]
			   ,[EndDate]
			   ,[GPA]
			   ,[Percentage])
		 SELECT
				bed.UserId
				,bed.DegreeTypeId
				,bed.Major
				,bed.InstituteName
				,bed.StartDate
				,bed.EndDate
				,bed.GPA
				,bed.Percentage

			FROM @Education AS bed
			WHERE NOT EXISTS (
			SELECT 1
			FROM dbo.EducationDetails AS ed
			WHERE	ed.UserId = bed.UserId AND
					ed.DegreeTypeId = bed.DegreeTypeId AND
					ed.Major = bed.Major)
---------------ExperienceDetails---------
	INSERT INTO [dbo].[ExperienceDetails]
			   ([UserId]
			   ,[IsCurrent]
			   ,[StartDate]
			   ,[EndDate]
			   ,[JobTitle]
			   ,[CompanyName]
			   ,[City]
			   ,[StateId]
			   ,[Country]
			   ,[Description])
		 SELECT
				bex.UserId
				,bex.IsCurrent
				,bex.StartDate
				,bex.EndDate
				,bex.JobTitle
				,bex.CompanyName
				,bex.City
				,bex.StateId
				,bex.Country
				,bex.Description

			FROM @Experience AS bex
			WHERE NOT EXISTS (
			SELECT 1
			FROM dbo.ExperienceDetails AS ex
			WHERE	ex.UserId = bex.UserId AND
					ex.StartDate = bex.StartDate AND
					ex.EndDate = bex.EndDate)
---------------Certification-------------
	INSERT INTO [dbo].[Certifications]
			   ([UserId]
			   ,[Name]
			   ,[Description]
			   ,[ExpireDate]
			   ,[IssueDate]
			   ,[FileId])
		 SELECT
				bc.UserId
				,bc.Name
				,bc.Description
				,bc.ExpireDate
				,bc.IssueDate
				,bc.FileId

			FROM @Certifications AS bc
			WHERE NOT EXISTS (
			SELECT 1 
			FROM dbo.Certifications AS c
			WHERE	bc.UserId = c.UserId AND
					bc.Name = c.Name)
---------------ProfileDetails------------
	INSERT INTO [dbo].[ProfileDetails]
			   ([TitleTypeId]
			   ,[UserId]
			   ,[GenderTypeId]
			   ,[Phone]
			   ,[Fax]
			   ,[IsSearchable]
			   ,[HasActiveEmailNotification]
			   ,[CurrentSalary]
			   ,[Currency]
			   ,[TargetSalary])
		 VALUES
			   (@TitleTypeId
			   ,@UserId
			   ,@GenderTypeId
			   ,@Phone
			   ,@Fax
			   ,@IsSearchable
			   ,@HasActiveEmailNotification
			   ,@CurrentSalary
			   ,@Currency
			   ,@TargetSalary)

	SET @Id = SCOPE_IDENTITY()
---------------UserSkills----------------
	INSERT INTO dbo.UserSkills
				([UserId],
				 [SkillId])                    
	SELECT		 
				 @UserId,
				 s.SkillId

				 FROM    @Skills AS s
				 WHERE   NOT EXISTS (
				 SELECT 1
				 FROM    dbo.UserSkills AS us
				 WHERE   @UserId = us.UserId AND 
						 s.SkillId = us.SkillId)
---------------UserTools-----------------
	INSERT INTO dbo.UserTools
				([Id],
				 [ToolUtilizedId])                    
	SELECT		 
				 @UserId,
				 t.ToolsUtilizedId

				 FROM    @Tools AS t
				 WHERE   NOT EXISTS (
				 SELECT 1
				 FROM    dbo.UserTools AS ut
				 WHERE   @UserId = ut.Id AND 
						 t.ToolsUtilizedId = ut.ToolUtilizedId)

COMMIT TRANSACTION @Tran
END TRY

BEGIN CATCH

    IF (XACT_STATE()) = -1
    BEGIN
        PRINT 'The transaction is in an uncommittable state.' +
              ' Rolling back transaction.'
        ROLLBACK TRANSACTION @Tran;;
    END;

    IF (XACT_STATE()) = 1
    BEGIN
        PRINT 'The transaction is committable.' +
              ' Committing transaction.'
        COMMIT TRANSACTION @Tran;;
    END;

    THROW

END CATCH
SET XACT_ABORT OFF

END
GO
