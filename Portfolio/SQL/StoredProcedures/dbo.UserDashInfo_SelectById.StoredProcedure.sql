USE [wepairhealth]
GO
/****** Object:  StoredProcedure [dbo].[UserDashInfo_SelectById]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Brandon Polk
-- Create date: 11-13-2023
-- Description:	Brings Back upcoming appts, jobs applied to and orgs followed for a specific user
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE   proc [dbo].[UserDashInfo_SelectById]
					@Id int

as

/*

	Declare @Id int = 285

	EXEC dbo.UserDashInfo_SelectById
				@Id

*/

Begin

	Declare @DateNow datetime2(7) = GETUTCDATE()

	Select Top 5 AptWith =(Select o.name
							From dbo.Organizations as o
							Where o.CreatedBy = a.ModifiedBy and a.ClientId = @Id)
				,a.IsConfirmed
				,a.AppointmentStart
	From dbo.Appointments as a
	Where a.ClientId = @Id and a.AppointmentStart > @DateNow
	order by a.AppointmentStart

	Select Top 5 JobName = (select j.Title
							From dbo.Jobs as j
							where jpa.JobPostId = j.Id and jpa.UserId = @Id and j.IsActive = 1)
				,jpa.ApplyDate
	From dbo.JobPostActivity as jpa 
	Where UserId = @Id
	order by ApplyDate desc

	Select o.Id
			,o.Name
	From dbo.UserOrgs as uo
	inner join dbo.Organizations as o
	on uo.OrganizationId = o.Id
	Where uo.UserId = @Id
End
GO
