import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  useTheme,
  alpha,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface CheckAgreeSectionProps {
  isAgreed: boolean;
  handleAgreeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

const CheckAgreeSection = ({
  isAgreed,
  handleAgreeChange,
}: CheckAgreeSectionProps) => {
  const theme = useTheme();
  const mainColor = "#03cb84";
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "15px 10px", sm: "20px" },
        borderRadius: "12px",
        backgroundColor: isDarkMode ? alpha("#fff", 0.05) : alpha("#000", 0.02),
        mb: 3,
      }}
    >
      <Box sx={{ mb: { xs: 2, sm: 0 } }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            color: isDarkMode ? "#fff" : "#333",
            mb: 0.5,
          }}
        >
          약관 동의 확인
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "14px",
            color: isDarkMode ? alpha("#fff", 0.6) : alpha("#000", 0.6),
          }}
        >
          서비스 이용을 위해 위 약관에 동의해 주세요.
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={isAgreed}
            onChange={handleAgreeChange}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon sx={{ color: mainColor }} />}
            sx={{
              color: isDarkMode ? alpha("#fff", 0.5) : alpha("#000", 0.4),
              "&.Mui-checked": {
                color: mainColor,
              },
            }}
          />
        }
        label={
          <Typography
            sx={{
              fontWeight: isAgreed ? 600 : 500,
              fontSize: "15px",
              color: isAgreed
                ? isDarkMode
                  ? mainColor
                  : "#02b279"
                : isDarkMode
                ? alpha("#fff", 0.7)
                : alpha("#000", 0.7),
            }}
          >
            약관을 읽고 동의합니다.
          </Typography>
        }
      />
    </Box>
  );
};

export default CheckAgreeSection;
