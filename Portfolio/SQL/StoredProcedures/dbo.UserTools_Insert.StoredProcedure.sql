USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[UserTools_Insert]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/31/2023
-- Description:		Inserts into UserTools table
-- Code Reviewer:

-- MODIFIED BY:		
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note:			
-- =============================================


CREATE proc [dbo].[UserTools_Insert]
			@BatchTools dbo.BatchUserTools READONLY
			,@UserId int

/*
	DECLARE @BatchTools dbo.BatchUserTools
			,@UserId int = 282

	INSERT INTO @BatchTools (	ToolsUtilizedId)

	VALUES	
			(2)

	EXECUTE [dbo].[UserTools_Insert]
			@BatchTools
			,@UserId
*/

AS

BEGIN

	INSERT INTO dbo.UserTools
				([Id],
				 [ToolUtilizedId])                    
	SELECT		 
				 @UserId,
				 b.ToolsUtilizedId

				 FROM    @BatchTools AS b
				 WHERE   NOT EXISTS (
				 SELECT 1
				 FROM    dbo.UserTools AS ut
				 WHERE   @UserId = ut.Id AND 
						 b.ToolsUtilizedId = ut.ToolUtilizedId)

END
GO
