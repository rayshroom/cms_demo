IF OBJECT_ID(N'dbo.cms_news_posts', N'U') IS NULL
BEGIN
  CREATE TABLE dbo.cms_news_posts (
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_cms_news_posts PRIMARY KEY,
    slug NVARCHAR(180) NOT NULL,
    title NVARCHAR(220) NOT NULL,
    excerpt NVARCHAR(500) NOT NULL,
    status NVARCHAR(20) NOT NULL CONSTRAINT DF_cms_news_posts_status DEFAULT N'draft',
    published_at DATETIME2 NULL,
    hero_image_url NVARCHAR(1000) NULL,
    author NVARCHAR(120) NOT NULL,
    tags_json NVARCHAR(MAX) NOT NULL CONSTRAINT DF_cms_news_posts_tags DEFAULT N'[]',
    body_json NVARCHAR(MAX) NOT NULL CONSTRAINT DF_cms_news_posts_body DEFAULT N'[]',
    created_at DATETIME2 NOT NULL CONSTRAINT DF_cms_news_posts_created DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_cms_news_posts_updated DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_cms_news_posts_slug UNIQUE (slug),
    CONSTRAINT CK_cms_news_posts_status CHECK (status IN (N'draft', N'published')),
    CONSTRAINT CK_cms_news_posts_tags_json CHECK (ISJSON(tags_json) = 1),
    CONSTRAINT CK_cms_news_posts_body_json CHECK (ISJSON(body_json) = 1)
  );
END;

IF OBJECT_ID(N'dbo.cms_roadmap_items', N'U') IS NULL
BEGIN
  CREATE TABLE dbo.cms_roadmap_items (
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_cms_roadmap_items PRIMARY KEY,
    title NVARCHAR(160) NOT NULL,
    description NVARCHAR(600) NOT NULL,
    status NVARCHAR(20) NOT NULL,
    quarter NVARCHAR(24) NOT NULL,
    sort_order INT NOT NULL CONSTRAINT DF_cms_roadmap_items_sort DEFAULT 0,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_cms_roadmap_items_created DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_cms_roadmap_items_updated DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_cms_roadmap_items_status CHECK (status IN (N'planned', N'in_progress', N'launched'))
  );
END;
