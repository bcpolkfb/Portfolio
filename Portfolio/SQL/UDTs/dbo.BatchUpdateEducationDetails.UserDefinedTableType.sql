USE [wepairhealth]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchUpdateEducationDetails]    Script Date: 2/15/2024 12:15:46 PM ******/
CREATE TYPE [dbo].[BatchUpdateEducationDetails] AS TABLE(
	[Id] [int] NOT NULL,
	[DegreeTypeId] [int] NOT NULL,
	[Major] [varchar](50) NOT NULL,
	[InstituteName] [varchar](50) NOT NULL,
	[StartDate] [date] NOT NULL,
	[EndDate] [date] NOT NULL,
	[GPA] [decimal](18, 0) NOT NULL,
	[Percentage] [decimal](18, 0) NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[StartDate] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
