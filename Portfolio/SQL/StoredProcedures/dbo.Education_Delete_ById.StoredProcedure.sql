USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[Education_Delete_ById]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Brandon Polk
-- Create date: 11-17-2023
-- Description:	Removes an education
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


CREATE   proc [dbo].[Education_Delete_ById]
						@Id int

as

/*

	Declare @Id int = 30

	EXEC dbo.Education_Delete_ById
					@Id

*/

Begin

	Delete from dbo.EducationDetails
	Where Id = @Id

End
GO
