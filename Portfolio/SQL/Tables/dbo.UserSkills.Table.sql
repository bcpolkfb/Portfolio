USE [wepairhealth]
GO
/****** Object:  Table [dbo].[UserSkills]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserSkills](
	[UserId] [int] NOT NULL,
	[SkillId] [int] NOT NULL,
 CONSTRAINT [PK_UserSkills] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[SkillId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserSkills]  WITH CHECK ADD  CONSTRAINT [FK_UserSkills_Skills] FOREIGN KEY([SkillId])
REFERENCES [dbo].[Skills] ([Id])
GO
ALTER TABLE [dbo].[UserSkills] CHECK CONSTRAINT [FK_UserSkills_Skills]
GO
ALTER TABLE [dbo].[UserSkills]  WITH CHECK ADD  CONSTRAINT [FK_UserSkills_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserSkills] CHECK CONSTRAINT [FK_UserSkills_Users]
GO
