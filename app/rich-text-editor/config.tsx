import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

const RichTextEditorConfig = {
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through",
    },
    link: "font-semibold leading-6 text-slate-600 hover:text-slate-500 underline",
    heading: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      h5: "text-base",
    },
    list: {
      nested: {
        listitem: "list-none",
      },
      ol: "ml-4 list-decimal",
      ul: "ml-4 list-disc",
      listitem: "ml-8 mt-2 mr-8 mb-2",
    },
    quote: "border-l-8 border-gray-300 text-gray-600 pl-4 ml-2",
  },
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

export default RichTextEditorConfig;
