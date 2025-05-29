import Editor from "@monaco-editor/react";
import React from "react";
import "./CodeEditor.css";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "typescript",
  height = "400px",
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onChange(value ?? "");
  };

  return (
    <div className="code-editor-container">
      <Editor
        height={height}
        language={language}
        theme="vs-light"
        value={value}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          lineHeight: 20,
          wordWrap: "on",
          automaticLayout: true,
          tabSize: 4,
          insertSpaces: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
