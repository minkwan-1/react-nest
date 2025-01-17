"use client";

import React from "react";

import packageJson from "@/package.json";

interface MindMapNode {
  text: string;
  children?: MindMapNode[];
}

interface ProjectStructureViewerProps {
  structure: MindMapNode;
}

export function ProjectStructureViewer({
  structure,
}: ProjectStructureViewerProps) {
  const handleDownload = () => {
    const jsonContent = JSON.stringify(structure, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = packageJson.name || "Project.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // 재귀적으로 구조를 표시하는 함수
  const renderStructure = (node: MindMapNode, level: number = 0) => {
    const paddingLeft = level * 20;

    return (
      <div key={node.text} style={{ paddingLeft }}>
        <div className="flex items-center py-2">
          <span className="mr-2">{node?.children ? "📁" : "📄"}</span>
          <span>{node.text}</span>
        </div>
        {node?.children && (
          <div className="ml-2 border-l-2 border-gray-200">
            {node.children.map((child) => renderStructure(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{packageJson?.name || "Project"}</h2>
        <button
          onClick={handleDownload}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Download Structure
        </button>
      </div>
      <div className="rounded-lg bg-white p-4 shadow">
        {renderStructure(structure)}
      </div>
    </div>
  );
}
