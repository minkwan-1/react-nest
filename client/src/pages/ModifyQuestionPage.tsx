import { useParams } from "react-router-dom";

const ModifyQuestionPage = () => {
  const { id } = useParams();
  return <div>글 수정 페이지 - ID: {id}</div>;
};

export default ModifyQuestionPage;
