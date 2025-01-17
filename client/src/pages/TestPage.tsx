import { extractProjectStructure } from "test/extractFn";
import { ProjectStructureViewer } from "test/projectStructureViewer";

// 서버 컴포넌트에서 fs, path를 사용해서 구조 추출해야 함
import packageJson from "@/package.json";
import fs from "fs";
import path from "path";

export interface MindMapNode {
  text: string;
  children?: MindMapNode[];
}

export async function extractProjectStructure(
  rootPath: string,
  ignore: string[] = [
    ".git",
    "node_modules",
    "dist",
    "build",
    ".DS_Store",
    ".next",
    "coverage",
  ]
): Promise<MindMapNode> {
  const stats = await fs.promises.stat(rootPath);

  const name = path.basename(rootPath);
  console.log("rootPath", rootPath);
  console.log("stats", stats);
  console.log("name", name);
  const node: MindMapNode = {
    text: name,
  };

  if (stats.isDirectory()) {
    const entries = await fs.promises.readdir(rootPath, {
      withFileTypes: true,
    });
    const children: MindMapNode[] = [];

    for (const entry of entries) {
      if (ignore.includes(entry.name)) continue;

      const childPath = path.join(rootPath, entry.name);
      const childNode = await extractProjectStructure(childPath, ignore);
      children.push(childNode);
    }

    if (children.length > 0) {
      node.children = children;
    }
  }

  return node;
}

export default async function Page() {
  // 서버 컴포넌트에서 프로젝트 구조 추출
  const structure = await extractProjectStructure("./src", [
    ".git",
    "node_modules",
    "dist",
    "build",
    ".DS_Store",
    ".next",
    "coverage",
  ]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Project Structure Explorer</h1>
      <ProjectStructureViewer structure={structure} />
    </div>
  );
}
