import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CollectionsIcon from "@mui/icons-material/Collections";
import TagIcon from "@mui/icons-material/Tag";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

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
    route: "/tags",
    label: "태그",
    Icon: TagIcon,
  },
  {
    route: "/ask-a-question",
    label: "질문하기",
    Icon: QuestionAnswerIcon,
  },
  {
    route: "/ask-ai",
    label: "AI에게 묻기",
    Icon: ChatIcon,
  },
];

const LeftSidebar = () => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  return (
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
        {/* 네비게이션 링크 */}
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

        {/* 로그인 및 회원가입 버튼 */}
        <Box
          sx={{
            mb: 15,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Button
            component={Link}
            to="/sign-in"
            sx={{
              bgcolor: "grey.100",
              color: "black",
              border: "1px solid #03cb84",
              borderRadius: 1,
            }}
            fullWidth
            startIcon={<LoginIcon />}
          >
            <Typography variant="body1" fontWeight="bold">
              로그인
            </Typography>
          </Button>

          <Button
            component={Link}
            to="/sign-up"
            fullWidth
            startIcon={<PersonAddIcon />}
            sx={{
              bgcolor: "grey.100",
              color: "black",
              border: "1px solid #03cb84",
              borderRadius: 1,
            }}
          >
            <Typography variant="body1">회원가입</Typography>
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default LeftSidebar;
