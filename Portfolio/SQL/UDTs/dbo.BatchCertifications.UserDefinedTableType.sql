USE [wepairhealth]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchCertifications]    Script Date: 2/15/2024 12:15:46 PM ******/
CREATE TYPE [dbo].[BatchCertifications] AS TABLE(
	[UserId] [int] NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](500) NOT NULL,
	[ExpireDate] [date] NOT NULL,
	[IssueDate] [date] NOT NULL,
	[FileId] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[Name] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
