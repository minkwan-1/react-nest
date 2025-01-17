// 서버 컴포넌트에서 fs, path를 사용해서 구조 추출해야 함
// import packageJson from "../package.json";
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

  fs.writeFileSync(
    "./public/project-structure.json",
    JSON.stringify(node, null, 2)
  );

  return node;
}

extractProjectStructure("./src", [
  ".git",
  "node_modules",
  "dist",
  "build",
  ".DS_Store",
  ".next",
  "coverage",
]);
