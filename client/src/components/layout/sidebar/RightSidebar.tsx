import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RightSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: 266,
          backgroundColor: "background.paper",
          borderLeft: "2px solid",
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
        {/* 인기 질문 */}
        <Box>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            HOT 질문 🙋‍♂️
          </Typography>
          <Box
            sx={{
              mt: 2,
              flex: 1,
              overflowY: "auto",
            }}
          >
            <List>
              {[
                { id: 1, title: "리액트 사용법은?" },
                { id: 2, title: "타입스크립트란?" },
                { id: 3, title: "MUI 사용 시 베스트 프랙티스?" },
              ].map((question) => (
                <ListItem
                  key={question.id}
                  disableGutters
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                  }}
                >
                  <ListItemButton component="a" href="#" sx={{ p: 0 }}>
                    <ListItemText
                      primary={question.title}
                      primaryTypographyProps={{
                        variant: "body2",
                        color: "text.secondary",
                        noWrap: true,
                      }}
                    />
                  </ListItemButton>
                  <ListItemIcon>
                    <ChevronRightIcon
                      fontSize="small"
                      sx={{ color: "text.secondary" }}
                    />
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>

        {/* 인기 태그 */}
        <Box>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            HOT 태그 🏷️
          </Typography>
          <Box
            sx={{
              mt: 2,
              mb: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[
              { id: 1, name: "리액트", totalQuestions: 100 },
              { id: 2, name: "자바스크립트", totalQuestions: 150 },
              { id: 3, name: "CSS", totalQuestions: 75 },
            ].map((tag) => (
              <Box
                key={tag.id}
                sx={{
                  gap: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  bgcolor: "grey.100",
                  border: "1px solid #18ffb6",
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.primary"
                >
                  {tag.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {tag.totalQuestions}개의 질문
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RightSidebar;
