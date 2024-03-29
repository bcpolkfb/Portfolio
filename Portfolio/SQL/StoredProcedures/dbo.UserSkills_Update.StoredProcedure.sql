USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[UserSkills_Update]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/31/2023
-- Description:		Updates UserSkills table by UserId
-- Code Reviewer:

-- MODIFIED BY:		
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note:			
-- =============================================


CREATE proc [dbo].[UserSkills_Update]
			@BatchSkills dbo.BatchUserSkills READONLY
			,@UserId int

/*
	DECLARE @BatchSkills dbo.BatchUserSkills
			,@UserId int = 281

	INSERT INTO @BatchSkills (	SkillId)

	VALUES	
			(2)

	EXECUTE [dbo].[UserSkills_Update]
			@BatchSkills
			,@UserId
*/

AS

BEGIN

	UPDATE [dbo].[UserSkills]
	   SET [SkillId] = b.SkillId
	FROM @BatchSkills AS b
	INNER JOIN [dbo].[UserSkills] AS s ON s.UserId = @UserId
	WHERE	NOT EXISTS (
	SELECT 1
	FROM dbo.UserSkills AS s
	WHERE	@UserId = s.UserId AND
			b.SkillId = s.SkillId)

END
GO
