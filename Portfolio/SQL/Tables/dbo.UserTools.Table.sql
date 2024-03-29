USE [wepairhealth]
GO
/****** Object:  Table [dbo].[UserTools]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserTools](
	[Id] [int] NOT NULL,
	[ToolUtilizedId] [int] NOT NULL,
 CONSTRAINT [PK_UserTools] PRIMARY KEY CLUSTERED 
(
	[Id] ASC,
	[ToolUtilizedId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[UserTools]  WITH CHECK ADD  CONSTRAINT [FK_UserTools_ToolsUtilized] FOREIGN KEY([ToolUtilizedId])
REFERENCES [dbo].[ToolsUtilized] ([Id])
GO
ALTER TABLE [dbo].[UserTools] CHECK CONSTRAINT [FK_UserTools_ToolsUtilized]
GO
ALTER TABLE [dbo].[UserTools]  WITH CHECK ADD  CONSTRAINT [FK_UserTools_Users] FOREIGN KEY([Id])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[UserTools] CHECK CONSTRAINT [FK_UserTools_Users]
GO
