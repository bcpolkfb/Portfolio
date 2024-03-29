USE [wepairhealth]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchExperienceDetails]    Script Date: 2/15/2024 12:15:46 PM ******/
CREATE TYPE [dbo].[BatchExperienceDetails] AS TABLE(
	[UserId] [int] NOT NULL,
	[IsCurrent] [bit] NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[JobTitle] [varchar](50) NOT NULL,
	[CompanyName] [varchar](100) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[StateId] [int] NOT NULL,
	[Country] [varchar](50) NOT NULL,
	[Description] [varchar](4000) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[StartDate] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
