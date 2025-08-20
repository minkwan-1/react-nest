import { Box } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import FeatureItem from "./FeatureItem";
import { float2, float3, float4 } from "./animation";

interface FeatureListProps {
  keyColor: string;
}

const FeatureList = ({ keyColor }: FeatureListProps) => {
  return (
    <Box sx={{ textAlign: "left", mb: 6 }}>
      <FeatureItem
        icon={
          <HelpOutlineIcon
            sx={{
              color: "#b8dae1",
            }}
          />
        }
        title="질문하고 답변받기"
        description="원하는 질문을 하고 빠르게 답변을 받으세요"
        keyColor={keyColor}
        animation={`${float2} 7s ease-in-out infinite`}
      />

      <FeatureItem
        icon={
          <CodeIcon
            sx={{
              color: keyColor,
            }}
          />
        }
        title="코드 리뷰 & 공유"
        description="코드를 공유하고 전문가의 피드백을 받으세요"
        keyColor={keyColor}
        animation={`${float3} 9s ease-in-out infinite 1s`}
      />

      <FeatureItem
        icon={
          <ChatIcon
            sx={{
              color: keyColor,
            }}
          />
        }
        title="커뮤니티와 교류"
        description="다른 개발자들과 지식과 경험을 공유하세요"
        keyColor={keyColor}
        animation={`${float4} 8s ease-in-out infinite 0.5s`}
      />
    </Box>
  );
};

export default FeatureList;
