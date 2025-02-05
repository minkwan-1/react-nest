import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagIcon from "@mui/icons-material/Tag";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";
import { ComponentWrapper } from "../common";

const sidebarLinks = [
  {
    route: "/home",
    label: "홈",
    Icon: HomeIcon,
  },
  {
    route: "/community",
    label: "커뮤니티",
    Icon: GroupIcon,
  },
  {
    route: "/collection",
    label: "컬렉션",
    Icon: CollectionsIcon,
  },
  {
    route: "/tag",
    label: "태그",
    Icon: TagIcon,
  },
  {
    route: "/edit",
    label: "질문하기",
    Icon: QuestionAnswerIcon,
  },
  {
    route: "/ask-ai",
    label: "AI에게 묻기",
    Icon: ChatIcon,
  },
];

interface LeftSidebarProps {
  setMobileSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftSidebar = ({ setMobileSidebarVisible }: LeftSidebarProps) => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChipClick = () => {
    setMobileSidebarVisible((prevState: boolean) => !prevState);
  };

  return (
    <>
      {/* 데스크탑에서 Drawer 형태로 표시 */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            "& .MuiDrawer-paper": {
              width: 266,
              backgroundColor: "background.paper",
              borderRight: "2px solid",
              borderColor: "divider",
              boxShadow: 2,
              top: "80px",
            },
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              py: 3,
              px: 2,
            }}
          >
            <List>
              {sidebarLinks.map((item) => {
                let route = item.route;
                if (item.route === "/profile") {
                  if (userId) {
                    route = `${item.route}/${userId}`;
                  } else {
                    return null;
                  }
                }

                const isActive = location.pathname === route;

                return (
                  <ListItem key={item.route} disablePadding>
                    <ListItemButton
                      component={Link}
                      to={route}
                      sx={{
                        bgcolor: isActive ? "#03cb84" : "transparent",
                        color: isActive ? "white" : "text.primary",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        "&:hover": {
                          bgcolor: "#03cb84",
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 32,
                          color: isActive ? "white" : "text.secondary",
                        }}
                      >
                        <item.Icon
                          sx={{
                            color: isActive ? "white" : "text.secondary",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          variant: isActive ? "body1" : "body2",
                          fontWeight: isActive ? "bold" : "normal",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}

      {/* 모바일에서 Chip 형태로 표시 */}
      {isMobile && (
        <Box
          sx={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            px: 2,
            zIndex: 100,
          }}
        >
          {/* ComponentWrapper로 Chip 영역 감싸기 */}
          <ComponentWrapper sx={{ padding: 2, marginTop: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: 1,
                overflowX: "auto",
                paddingBottom: "8px",
              }}
            >
              {sidebarLinks.map((item) => {
                let route = item.route;
                if (item.route === "/profile") {
                  if (userId) {
                    route = `${item.route}/${userId}`;
                  } else {
                    return null;
                  }
                }

                const isActive = location.pathname === route;

                return (
                  <Chip
                    key={item.route}
                    label={item.label}
                    onClick={() => {
                      window.location.href = route;
                      handleChipClick();
                    }}
                    color={isActive ? "primary" : "default"}
                    sx={{
                      minWidth: "150px",
                      bgcolor: isActive ? "#03cb84" : "transparent",
                      color: isActive ? "white" : "text.primary",
                      borderRadius: 1,

                      "&:hover": {
                        bgcolor: "#03cb84",
                        cursor: "pointer",
                      },
                    }}
                    icon={
                      <item.Icon
                        sx={{ color: isActive ? "white" : "text.secondary" }}
                      />
                    }
                  />
                );
              })}
            </Box>
          </ComponentWrapper>
        </Box>
      )}
    </>
  );
};

export default LeftSidebar;
