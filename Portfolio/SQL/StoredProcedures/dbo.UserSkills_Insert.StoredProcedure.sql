USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[UserSkills_Insert]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/31/2023
-- Description:		Inserts into UserSkills table
-- Code Reviewer:

-- MODIFIED BY:		
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note:			
-- =============================================


CREATE proc [dbo].[UserSkills_Insert]
			@BatchSkills dbo.BatchUserSkills READONLY
			,@UserId int

/*
	DECLARE @BatchSkills dbo.BatchUserSkills
			,@UserId int = 282

	INSERT INTO @BatchSkills (	SkillId)

	VALUES	
			(2)

	EXECUTE [dbo].[UserSkills_Insert]
			@BatchSkills
			,@UserId
*/

AS

BEGIN

	INSERT INTO dbo.UserSkills
				([UserId],
				 [SkillId])                    
	SELECT		 
				 @UserId,
				 s.SkillId

				 FROM    @BatchSkills AS s
				 WHERE   NOT EXISTS (
				 SELECT 1
				 FROM    dbo.UserSkills AS us
				 WHERE   @UserId = us.UserId AND 
						 s.SkillId = us.SkillId)

END
GO
