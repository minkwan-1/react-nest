import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface MindMapNode {
  text: string;
  children?: MindMapNode[];
}

async function extractProjectStructure(
  rootPath: string,
  ignore: string[] = [
    '.git',
    'node_modules',
    'dist',
    'build',
    '.DS_Store',
    'coverage',
  ]
): Promise<MindMapNode> {
  const stats = await fs.promises.stat(rootPath);
  const name = path.basename(rootPath);

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

// 프로젝트 루트 경로 계산
const projectRoot = path.resolve(__dirname, '..');

// 구조 추출 실행
const structure = await extractProjectStructure(projectRoot);

// 결과를 public 폴더에 저장
fs.writeFileSync(
  path.join(projectRoot, 'public', 'project-structure.json'),
  JSON.stringify(structure, null, 2)
);

console.log('프로젝트 구조가 생성되었습니다.');
