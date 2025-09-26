import { useAtom } from "jotai";
import { naverInspectionAtom } from "@atom/inspectionAtom";
import { PageContainer } from "@domains/layout/common";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";

const NaverInspectionPanel = () => {
  const [inspectionData] = useAtom(naverInspectionAtom);

  if (!inspectionData) {
    return (
      <PageContainer>
        <Typography variant="h6">검수 데이터가 없습니다.</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Typography variant="h5" gutterBottom>
        네이버 검수 정보
      </Typography>
      <Card
        sx={{
          maxWidth: 900,
          mx: "auto",
          mt: 3,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Avatar
              src={inspectionData.profileUrl}
              alt={inspectionData.name}
              sx={{ width: 80, height: 80 }}
            />
            <Typography variant="subtitle1">
              이름: {inspectionData.name}
            </Typography>
            <Typography variant="subtitle1">
              이메일: {inspectionData.email}
            </Typography>
            <Typography variant="subtitle1">
              닉네임: {inspectionData.nickname}
            </Typography>
            <Typography variant="subtitle1">
              프로필: {inspectionData.profileUrl}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default NaverInspectionPanel;
