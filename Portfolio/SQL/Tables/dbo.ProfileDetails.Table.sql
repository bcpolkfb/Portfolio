USE [wepairhealth]
GO
/****** Object:  Table [dbo].[ProfileDetails]    Script Date: 2/15/2024 12:15:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProfileDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TitleTypeId] [int] NULL,
	[UserId] [int] NOT NULL,
	[GenderTypeId] [int] NOT NULL,
	[Phone] [varchar](50) NOT NULL,
	[Fax] [varchar](50) NOT NULL,
	[IsSearchable] [bit] NOT NULL,
	[HasActiveEmailNotification] [bit] NOT NULL,
	[CurrentSalary] [decimal](18, 0) NULL,
	[Currency] [nvarchar](50) NULL,
	[TargetSalary] [decimal](18, 0) NULL,
 CONSTRAINT [PK_ProfileDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [IX_ProfileDetails_UserId] UNIQUE NONCLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ProfileDetails] ADD  CONSTRAINT [DF_ProfileDetails_IsSearchable]  DEFAULT ((0)) FOR [IsSearchable]
GO
ALTER TABLE [dbo].[ProfileDetails] ADD  CONSTRAINT [DF_ProfileDetails_HasActiveEmailNotification]  DEFAULT ((0)) FOR [HasActiveEmailNotification]
GO
ALTER TABLE [dbo].[ProfileDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProfileDetails_GenderTypes] FOREIGN KEY([GenderTypeId])
REFERENCES [dbo].[GenderTypes] ([Id])
GO
ALTER TABLE [dbo].[ProfileDetails] CHECK CONSTRAINT [FK_ProfileDetails_GenderTypes]
GO
ALTER TABLE [dbo].[ProfileDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProfileDetails_ProfileDetails] FOREIGN KEY([Id])
REFERENCES [dbo].[ProfileDetails] ([Id])
GO
ALTER TABLE [dbo].[ProfileDetails] CHECK CONSTRAINT [FK_ProfileDetails_ProfileDetails]
GO
ALTER TABLE [dbo].[ProfileDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProfileDetails_TitleTypes] FOREIGN KEY([TitleTypeId])
REFERENCES [dbo].[TitleTypes] ([Id])
GO
ALTER TABLE [dbo].[ProfileDetails] CHECK CONSTRAINT [FK_ProfileDetails_TitleTypes]
GO
ALTER TABLE [dbo].[ProfileDetails]  WITH CHECK ADD  CONSTRAINT [FK_ProfileDetails_Users] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[ProfileDetails] CHECK CONSTRAINT [FK_ProfileDetails_Users]
GO
