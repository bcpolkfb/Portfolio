USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[UserSkills_SelectByUserId]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Brandon Polk
-- Create date: 10-28-2023
-- Description:	Selects skills attached to a specific user.
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

Create   proc [dbo].[UserSkills_SelectByUserId]
					@UserId int

as

/*

	Declare @UserId int = 285

	EXEC [dbo].[UserSkills_SelectByUserId]
			@UserId

*/

Begin

	Select s.Id
			,s.Name
	From dbo.UserSkills as us
	inner join dbo.Skills as s
	on us.SkillId = s.Id
	Where us.UserId = @UserId

End
GO
