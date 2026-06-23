import type { CmsBlock, RichTextDocument } from "@cms-demo/cms-contract";

export function RichText({ blocks }: { blocks: RichTextDocument }) {
  return (
    <div className="rich-text">
      {blocks.map((block, index) => (
        <RichTextBlock block={block} key={`${block.type}-${index}`} />
      ))}
    </div>
  );
}

function RichTextBlock({ block }: { block: CmsBlock }) {
  if (block.type === "heading") {
    const HeadingTag = block.level === 3 ? "h3" : "h2";
    return (
      <HeadingTag
        dangerouslySetInnerHTML={{
          __html: sanitizeInlineHtml(block.html ?? escapeHtml(block.text))
        }}
      />
    );
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item, index) => (
          <li
            dangerouslySetInnerHTML={{
              __html: sanitizeInlineHtml(block.itemsHtml?.[index] ?? escapeHtml(item))
            }}
            key={`${item}-${index}`}
          />
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote
        dangerouslySetInnerHTML={{
          __html: sanitizeInlineHtml(block.html ?? escapeHtml(block.text))
        }}
      />
    );
  }

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: sanitizeInlineHtml(block.html ?? escapeHtml(block.text))
      }}
    />
  );
}

function sanitizeInlineHtml(input: string) {
  const template = document.createElement("template");
  template.innerHTML = input;
  const allowedTags = new Set(["A", "B", "BR", "CODE", "EM", "I", "STRONG"]);

  const visit = (node: ParentNode) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType !== Node.ELEMENT_NODE) {
        continue;
      }

      const element = child as HTMLElement;
      if (!allowedTags.has(element.tagName)) {
        element.replaceWith(document.createTextNode(element.textContent ?? ""));
        continue;
      }

      for (const attribute of Array.from(element.attributes)) {
        const keepHref =
          element.tagName === "A" &&
          attribute.name === "href" &&
          /^(https?:|mailto:|\/)/.test(attribute.value);
        if (!keepHref) {
          element.removeAttribute(attribute.name);
        }
      }

      if (element.tagName === "A") {
        element.setAttribute("target", "_blank");
        element.setAttribute("rel", "noreferrer");
      }

      visit(element);
    }
  };

  visit(template.content);
  return template.innerHTML.trim();
}

function escapeHtml(input: string) {
  return input.replace(/[&<>"']/g, (char) => {
    return (
      {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[char] ?? char
    );
  });
}
