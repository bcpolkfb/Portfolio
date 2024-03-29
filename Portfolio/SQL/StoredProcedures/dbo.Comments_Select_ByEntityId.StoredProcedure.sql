USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Select_ByEntityId]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Brandon Polk
-- Create date: 9/25/2023
-- Description:	Selects all comments associated with a particular enitity
-- Code Reviewer:

-- MODIFIED BY:		Author
-- MODIFIED DATE:	9/26/2023
-- Code Reviewer:
-- Note:			Added "Replies" to return
-- =============================================


CREATE proc [dbo].[Comments_Select_ByEntityId]
				@EntityTypeId int
				,@EntityId int

/*
	DECLARE @EntityTypeId int = 8
			,@EntityId int = 3

	Execute dbo.Comments_Select_ByEntityId
			@EntityTypeId
			,@EntityId
*/


AS

BEGIN

	SELECT c.[Id]
		  ,c.[Subject]
		  ,c.[Text]
		  ,c.[ParentId]
		  ,c.[EntityTypeId]
		  ,et.[Name]
		  ,c.[EntityId]
		  ,c.[DateCreated]
		  ,c.[DateModified]
		  ,CreatedBy =  dbo.fn_GetBaseUserJSON(c.CreatedBy)
		  ,c.[IsDeleted]
	
	  FROM [dbo].[Comments] as c  
	  join dbo.EntityTypes as et on c.EntityTypeId = et.Id
	  WHERE EntityTypeId = @EntityTypeId AND EntityId = @EntityId and ParentId = 0 


	  SELECT					rc.[Id] 
							  ,rc.[Subject]
							  ,rc.[Text]
							  ,rc.[ParentId]
							  ,rc.[EntityTypeId] 
							  ,ret.[Name] 
							  ,rc.[EntityId]
							  ,rc.[DateCreated]
							  ,rc.[DateModified]
							  ,CreatedBy =  dbo.fn_GetBaseUserJSON(rc.CreatedBy) 
							  ,rc.[IsDeleted]
						  FROM [dbo].[Comments] as rc  
						  join dbo.EntityTypes as ret on rc.EntityTypeId = ret.Id
						  WHERE EntityTypeId = @EntityTypeId AND EntityId = @EntityId and ParentId > 0

END

GO
