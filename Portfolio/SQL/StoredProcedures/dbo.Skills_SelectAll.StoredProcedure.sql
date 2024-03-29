USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Skills_SelectAll]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:			Brandon Polk
-- Create date:		10/12/2023
-- Description:		SelectAll proc for Skills lookup table
-- Code Reviewer:

-- MODIFIED BY:		
-- MODIFIED DATE:	
-- Code Reviewer:
-- Note:			
-- =============================================


CREATE proc [dbo].[Skills_SelectAll]

/*
EXECUTE [dbo].[Skills_SelectAll]
*/

AS

BEGIN

	SELECT [Id]
		  ,[Name]
	  FROM [dbo].[Skills]

END
GO
