import { extractProjectStructure } from "test/extractFn";
import { ProjectStructureViewer } from "test/projectStructureViewer";

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
