import { PageContainer, ComponentWrapper } from "@components/layout/common";
import { Box, CircularProgress } from "@mui/material";

const keyColor = "#b8dae1";

const LoadingComponent = () => {
  return (
    <PageContainer>
      <ComponentWrapper>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress sx={{ color: keyColor }} />
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default LoadingComponent;
