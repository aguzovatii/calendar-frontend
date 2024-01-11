import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import RichTextEditorConfig from "./config";
import { useEffect, useRef } from "react";
import { LexicalEditor } from "lexical";

export default function RichTextViewer({
  editorState,
  className,
}: {
  editorState: string;
  className: string;
}) {
  const editorRef = useRef<LexicalEditor>(null);

  useEffect(() => {
    if (editorRef.current) {
      const newState = editorRef.current.parseEditorState(editorState);
      editorRef.current.setEditorState(newState);
    }
  }, [editorState]);

  const editorConfig = {
    namespace: "RichTextViewer",
    editable: false,
    editorState: editorState,
    ...RichTextEditorConfig,
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={
              "outline-none py-[15px] px-2.5 overflow-hidden text-ellipsis border rounded-md focus-visible:border-lime-500 " +
              className
            }
          />
        }
        placeholder={() => null}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <LinkPlugin />
      <EditorRefPlugin editorRef={editorRef} />
    </LexicalComposer>
  );
}
