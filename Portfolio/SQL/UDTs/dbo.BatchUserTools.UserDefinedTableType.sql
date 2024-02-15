USE [wepairhealth]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchUserTools]    Script Date: 2/15/2024 12:15:46 PM ******/
CREATE TYPE [dbo].[BatchUserTools] AS TABLE(
	[ToolsUtilizedId] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[ToolsUtilizedId] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
