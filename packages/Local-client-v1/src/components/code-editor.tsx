import "./code-editor.css";
import Editor, { OnChange, OnMount } from "@monaco-editor/react";
import React, { useRef } from "react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import { RingLoader as Loader } from "react-spinners";

interface CodeEditorProps {
  defaultValue: string;
  passValue: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ defaultValue, passValue }) => {
  const editorRef = useRef<any>();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange: OnChange = (value, event) => {
    if (value) {
      passValue(value);
    }
  };

  const onFormatClick = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .trim();
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        defaultValue={defaultValue}
        onMount={handleEditorDidMount}
        loading={<Loader color="white" />}
        onChange={handleEditorChange}
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={{
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          showUnused: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
