USE [wepairhealth]
GO
/****** Object:  UserDefinedTableType [dbo].[BatchUserSkills]    Script Date: 2/15/2024 12:15:46 PM ******/
CREATE TYPE [dbo].[BatchUserSkills] AS TABLE(
	[SkillId] [int] NOT NULL,
	PRIMARY KEY CLUSTERED 
(
	[SkillId] ASC
)WITH (IGNORE_DUP_KEY = OFF)
)
GO
