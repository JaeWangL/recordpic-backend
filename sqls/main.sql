IF EXISTS (SELECT name
FROM sys.schemas
WHERE name = N'main4')
	BEGIN
    DROP SCHEMA [main4]
END


GO
CREATE SCHEMA [main4] AUTHORIZATION [dbo]


GO
CREATE TABLE [main4].[Users]
(
    [Id] BIGINT IDENTITY (1, 1) NOT NULL,
    [Email] NVARCHAR (256) NULL,
    [PasswordHash] NVARCHAR (MAX) NULL,
    [EmailConfirmed] BIT NOT NULL,
    [Name] NVARCHAR (30) NOT NULL,
    [ImageUrl]             NVARCHAR (MAX)          NULL,
    [SocialType] TINYINT NULL,
    [SocialId] NVARCHAR (MAX) NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [main4].[Tokens]
(
    [Id] BIGINT IDENTITY (1, 1) NOT NULL,
    [UserId] BIGINT NOT NULL,
    [Type] TINYINT NOT NULL,
    [RefreshToken] NVARCHAR (1024) NULL,
    [ExpirationDate] DATETIMEOFFSET (7) NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Tokens] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [main4].[Albums] (
    [Id]                   BIGINT                  IDENTITY (1, 1) NOT NULL,
    [Name]                 NVARCHAR (30)           NOT NULL,
    [Description]          NVARCHAR (30)           NULL,
    [Coverolor]             NVARCHAR (16)           NOT NULL,
    [CoverUrl]             NVARCHAR (MAX)          NOT NULL,
    [InviteCode]          NVARCHAR (16)           NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Albums] PRIMARY KEY CLUSTERED ([Id] ASC)
);

CREATE TABLE [main4].[Members] (
    [Id]                   BIGINT                  IDENTITY (1, 1) NOT NULL,
    [AlbumId]              BIGINT                  NOT NULL,
    [UserId]               BIGINT                  NOT NULL,
    [UserEmail]            NVARCHAR (256)          NOT NULL,
    [UserName]             NVARCHAR (30)           NOT NULL,
    [UserImageUrl]         NVARCHAR (MAX)          NULL,
    [Rank]                 TINYINT                 NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Members] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Members_Albums_AlbumId] FOREIGN KEY ([AlbumId]) REFERENCES [main4].[Albums] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [main4].[Moments] (
    [Id]                   BIGINT                  IDENTITY (1, 1) NOT NULL,
    [AlbumId]              BIGINT                  NOT NULL,
    [Name]                 NVARCHAR (30)           NOT NULL,
    [MomentDate]          DATETIMEOFFSET (7)      NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Moments] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Moments_Albums_AlbumId] FOREIGN KEY ([AlbumId]) REFERENCES [main4].[Albums] ([Id]) ON DELETE CASCADE
);

CREATE TABLE [main4].[Photos] (
    [Id]                       BIGINT                  IDENTITY (1, 1) NOT NULL,
    [AlbumId]                  BIGINT                  NOT NULL,
    [MomentId]                 BIGINT                  NOT NULL,
    [PhotoUrl]                 NVARCHAR (MAX)          NOT NULL,
    [Title]                    NVARCHAR (30)           NOT NULL,
    [Description]              NVARCHAR (50)           NOT NULL,
    [CreatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    [UpdatedAt] DATETIMEOFFSET (7) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_Photos] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Photos_Moments_MomentId] FOREIGN KEY ([MomentId]) REFERENCES [main4].[Moments] ([Id]),
    CONSTRAINT [FK_Photos_Albums_AlbumId] FOREIGN KEY ([AlbumId]) REFERENCES [main4].[Albums] ([Id]) ON DELETE CASCADE
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Albums_InviteCode]
    ON [main4].[Albums]([InviteCode] ASC) WHERE ([InviteCode] IS NOT NULL);