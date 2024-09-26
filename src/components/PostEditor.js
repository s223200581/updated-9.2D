// src/components/PostEditor.js
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactMarkdown from 'react-markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/markdown/markdown'; // Markdown mode for editor
import 'codemirror/mode/javascript/javascript'; // Add support for JavaScript
import 'codemirror/mode/python/python'; // Add support for Python
import 'codemirror/mode/xml/xml'; // Add support for HTML/XML
import 'codemirror/mode/css/css'; // Add support for CSS
import './PostEditor.css';
import remarkGfm from 'remark-gfm'; // For GitHub flavored markdown (tables, task lists, etc.)

const PostEditor = () => {
  const [markdownContent, setMarkdownContent] = useState(''); // Text editor content
  const [selectedLanguage, setSelectedLanguage] = useState('markdown'); // Default language is markdown

  // Language options for CodeMirror
  const languageOptions = [
    { label: 'Markdown', value: 'markdown' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'HTML/XML', value: 'xml' },
    { label: 'CSS', value: 'css' },
  ];

  // Function to handle language selection from the dropdown
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="post-editor-container">
      <div className="editor-header">
        <h2>Create a New Post</h2>
        <label htmlFor="language-select">Select Language:</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="editor-section">
        <h3>Write Code or Markdown</h3>
        <CodeMirror
          value={markdownContent}
          options={{
            mode: selectedLanguage, // Dynamic language selection
            theme: 'material',
            lineNumbers: true,
            autofocus: true, // Focus on the editor when loaded
          }}
          onBeforeChange={(editor, data, value) => {
            setMarkdownContent(value); // Update content on change
          }}
        />
      </div>

      <div className="preview-section">
        <h3>Markdown Preview</h3>
        <div className="markdown-preview">
          {/* Render markdown with code blocks */}
          <ReactMarkdown
            children={markdownContent}
            remarkPlugins={[remarkGfm]} // Support for tables, strikethrough, etc.
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className={className}>
                    <code>{String(children).replace(/\n$/, '')}</code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
