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
    cta_label NVARCHAR(80) NOT NULL CONSTRAINT DF_cms_news_posts_cta_label DEFAULT N'Learn More →',
    visual_variant NVARCHAR(30) NOT NULL CONSTRAINT DF_cms_news_posts_visual_variant DEFAULT N'feature',
    sort_order INT NOT NULL CONSTRAINT DF_cms_news_posts_sort_order DEFAULT 0,
    author NVARCHAR(120) NOT NULL,
    tags_json NVARCHAR(MAX) NOT NULL CONSTRAINT DF_cms_news_posts_tags DEFAULT N'[]',
    body_json NVARCHAR(MAX) NOT NULL CONSTRAINT DF_cms_news_posts_body DEFAULT N'[]',
    created_at DATETIME2 NOT NULL CONSTRAINT DF_cms_news_posts_created DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_cms_news_posts_updated DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_cms_news_posts_slug UNIQUE (slug),
    CONSTRAINT CK_cms_news_posts_status CHECK (status IN (N'draft', N'published')),
    CONSTRAINT CK_cms_news_posts_visual_variant CHECK (visual_variant IN (N'feature', N'training', N'release', N'maintenance', N'image')),
    CONSTRAINT CK_cms_news_posts_tags_json CHECK (ISJSON(tags_json) = 1),
    CONSTRAINT CK_cms_news_posts_body_json CHECK (ISJSON(body_json) = 1)
  );
END;

IF COL_LENGTH(N'dbo.cms_news_posts', N'cta_label') IS NULL
  ALTER TABLE dbo.cms_news_posts ADD cta_label NVARCHAR(80) NOT NULL
    CONSTRAINT DF_cms_news_posts_cta_label DEFAULT N'Learn More →';

IF COL_LENGTH(N'dbo.cms_news_posts', N'visual_variant') IS NULL
  ALTER TABLE dbo.cms_news_posts ADD visual_variant NVARCHAR(30) NOT NULL
    CONSTRAINT DF_cms_news_posts_visual_variant DEFAULT N'feature';

IF COL_LENGTH(N'dbo.cms_news_posts', N'sort_order') IS NULL
  ALTER TABLE dbo.cms_news_posts ADD sort_order INT NOT NULL
    CONSTRAINT DF_cms_news_posts_sort_order DEFAULT 0;

IF OBJECT_ID(N'dbo.CK_cms_news_posts_visual_variant', N'C') IS NULL
  ALTER TABLE dbo.cms_news_posts ADD CONSTRAINT CK_cms_news_posts_visual_variant
    CHECK (visual_variant IN (N'feature', N'training', N'release', N'maintenance', N'image'));

IF OBJECT_ID(N'dbo.cms_roadmap_items', N'U') IS NULL
BEGIN
  CREATE TABLE dbo.cms_roadmap_items (
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_cms_roadmap_items PRIMARY KEY,
    title NVARCHAR(160) NOT NULL,
    description NVARCHAR(600) NOT NULL,
    status NVARCHAR(20) NOT NULL,
    product NVARCHAR(80) NOT NULL CONSTRAINT DF_cms_roadmap_items_product DEFAULT N'Platform',
    roadmap_year SMALLINT NOT NULL CONSTRAINT DF_cms_roadmap_items_year DEFAULT 2026,
    quarter NVARCHAR(24) NOT NULL,
    sort_order INT NOT NULL CONSTRAINT DF_cms_roadmap_items_sort DEFAULT 0,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_cms_roadmap_items_created DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_cms_roadmap_items_updated DEFAULT SYSUTCDATETIME(),
    CONSTRAINT CK_cms_roadmap_items_status CHECK (status IN (N'planned', N'in_progress', N'launched')),
    CONSTRAINT CK_cms_roadmap_items_product CHECK (product IN (N'Platform', N'Databricks', N'Dremio', N'Data Lab')),
    CONSTRAINT CK_cms_roadmap_items_year CHECK (roadmap_year BETWEEN 2000 AND 2100),
    CONSTRAINT CK_cms_roadmap_items_quarter CHECK (quarter IN (N'Q1', N'Q2', N'Q3', N'Q4'))
  );
END;

IF COL_LENGTH(N'dbo.cms_roadmap_items', N'product') IS NULL
  ALTER TABLE dbo.cms_roadmap_items ADD product NVARCHAR(80) NOT NULL
    CONSTRAINT DF_cms_roadmap_items_product DEFAULT N'Platform';

IF COL_LENGTH(N'dbo.cms_roadmap_items', N'roadmap_year') IS NULL
  ALTER TABLE dbo.cms_roadmap_items ADD roadmap_year SMALLINT NOT NULL
    CONSTRAINT DF_cms_roadmap_items_year DEFAULT 2026;

UPDATE dbo.cms_roadmap_items
SET roadmap_year = TRY_CONVERT(SMALLINT, RIGHT(RTRIM(quarter), 4))
WHERE quarter LIKE N'Q[1-4] [12][0-9][0-9][0-9]'
  AND TRY_CONVERT(SMALLINT, RIGHT(RTRIM(quarter), 4)) BETWEEN 2000 AND 2100;

UPDATE dbo.cms_roadmap_items
SET quarter = LEFT(UPPER(LTRIM(quarter)), 2)
WHERE quarter LIKE N'Q[1-4] [12][0-9][0-9][0-9]';

IF OBJECT_ID(N'dbo.CK_cms_roadmap_items_product', N'C') IS NULL
  ALTER TABLE dbo.cms_roadmap_items ADD CONSTRAINT CK_cms_roadmap_items_product
    CHECK (product IN (N'Platform', N'Databricks', N'Dremio', N'Data Lab'));

IF OBJECT_ID(N'dbo.CK_cms_roadmap_items_year', N'C') IS NULL
  ALTER TABLE dbo.cms_roadmap_items ADD CONSTRAINT CK_cms_roadmap_items_year
    CHECK (roadmap_year BETWEEN 2000 AND 2100);
