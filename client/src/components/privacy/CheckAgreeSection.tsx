import { Box, FormControlLabel, Checkbox, Button } from "@mui/material";

interface CheckAgreeSectionProps {
  isAgreed: boolean;
  handleAgreeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const CheckAgreeSection = ({
  isAgreed,
  handleAgreeChange,
  handleSubmit,
}: CheckAgreeSectionProps) => {
  return (
    <Box
      sx={{
        margin: "100px 0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={isAgreed} onChange={handleAgreeChange} />}
        label="약관을 읽고 동의합니다."
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!isAgreed}
        sx={{ marginLeft: 2 }}
      >
        동의하기
      </Button>
    </Box>
  );
};

export default CheckAgreeSection;
