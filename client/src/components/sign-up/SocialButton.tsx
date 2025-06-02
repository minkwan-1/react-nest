import { Button, ButtonProps, useTheme } from "@mui/material";
import { ReactNode } from "react";

type ButtonPropsWithoutColor = Omit<ButtonProps, "color">;

interface SocialButtonProps extends ButtonPropsWithoutColor {
  provider: string;
  icon: ReactNode;
  label: string;
  customColor?: string;
  isOutlined?: boolean;
}

const SocialButton = ({
  provider,
  icon,
  label,
  customColor,
  isOutlined = false,
  ...props
}: SocialButtonProps): JSX.Element => {
  const theme = useTheme();

  const handleOAuthLogin = (provider: string): void => {
    console.log("#회원가입 버튼 클릭 시 provider: ", provider);
    try {
      window.location.href = `http://localhost:3000/auth/${provider}/callback`;
    } catch (error) {
      console.error(`${provider} 로그인 중 오류가 발생했습니다:`, error);
    }
  };

  if (isOutlined) {
    return (
      <Button
        variant="outlined"
        startIcon={icon}
        onClick={() => handleOAuthLogin(provider)}
        sx={{
          mb: 2,
          py: 1.2,
          borderRadius: 50,
          transition: "all 0.2s",
          textTransform: "none",
          ...theme.applyStyles("light", {
            borderColor: "#00000015",
            color: "#444",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            "&:hover": {
              borderColor: "#00000030",
              boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
            },
          }),
          ...theme.applyStyles("dark", {
            borderColor: "#ffffff25",
            color: "#f0f0f0",
            fontWeight: 500,
            boxShadow: "0 2px 6px rgba(255,255,255,0.05)",
            "&:hover": {
              borderColor: "#ffffff40",
              boxShadow: "0 4px 8px rgba(255,255,255,0.08)",
            },
          }),
          ...props.sx,
        }}
        {...props}
      >
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      startIcon={icon}
      onClick={() => handleOAuthLogin(provider)}
      sx={{
        mb: 2,
        py: 1.2,
        borderRadius: 50,
        bgcolor: customColor || "#03C75A",
        fontWeight: 500,
        textTransform: "none",
        transition: "all 0.2s",
        ...theme.applyStyles("light", {
          boxShadow: `0 2px 8px ${
            customColor ? `${customColor}30` : "rgba(3,199,90,0.3)"
          }`,
          "&:hover": {
            bgcolor: customColor ? `${customColor}dd` : "#02b350",
            boxShadow: `0 4px 10px ${
              customColor ? `${customColor}40` : "rgba(3,199,90,0.4)"
            }`,
          },
        }),
        ...theme.applyStyles("dark", {
          color: "white",
          boxShadow: `0 2px 8px ${
            customColor ? `${customColor}20` : "rgba(3,199,90,0.2)"
          }`,
          "&:hover": {
            bgcolor: customColor ? `${customColor}dd` : "#02b350",
            boxShadow: `0 4px 10px ${
              customColor ? `${customColor}30` : "rgba(3,199,90,0.3)"
            }`,
          },
        }),
        ...props.sx,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default SocialButton;
