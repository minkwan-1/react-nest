import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Tabs,
  Tab,
  Badge,
  TextField,
  InputAdornment,
  Chip,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonIcon from "@mui/icons-material/Person";
import JavascriptIcon from "@mui/icons-material/Javascript";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import SettingsIcon from "@mui/icons-material/Settings";
import AlarmIcon from "@mui/icons-material/Alarm";
import EventIcon from "@mui/icons-material/Event";

const CodeQnA = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDay, setSelectedDay] = useState(1); // 0-3 for days

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Sample question data
  const questions = [
    {
      id: 1,
      title: "React Hooks 최적화하기",
      time: "7 am",
      tags: ["react", "hooks", "최적화"],
      color: "linear-gradient(135deg, #4a00e0, #8e2de2)",
      image: null,
    },
    {
      id: 2,
      title: "Node.js 비동기 처리 방법",
      time: "7 am",
      tags: ["node.js", "async", "promise"],
      color: "linear-gradient(135deg, #f12711, #f5af19)",
      image: "/api/placeholder/400/400",
    },
    {
      id: 3,
      title: "TypeScript 타입 정의하기",
      time: "7 am",
      tags: ["typescript", "interface", "type"],
      color: "linear-gradient(135deg, #11998e, #38ef7d)",
      image: null,
    },
    {
      id: 4,
      title: "GraphQL 쿼리 최적화",
      time: "Set Alarm",
      tags: ["graphql", "apollo", "query"],
      color: null,
      image: "/api/placeholder/400/400",
    },
  ];

  const days = ["일", "월", "화", "수"];
  const dates = [11, 12, 13, 14];

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ px: 2, py: 1, display: "flex", alignItems: "center" }}
      >
        <CodeIcon sx={{ mr: 1 }} />
        CodeQnA
        <Typography variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
          v2.1.0
        </Typography>
      </Typography>

      <List>
        <ListItem>
          <Typography variant="subtitle2" color="text.secondary">
            개인 관리
          </Typography>
        </ListItem>

        <ListItem button selected>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="내 질문" />
        </ListItem>

        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary="최근 질문" />
        </ListItem>

        <ListItem sx={{ pl: 4 }} selected>
          <ListItemText primary="Q&A 모음" />
        </ListItem>

        <ListItem sx={{ pl: 4 }}>
          <ListItemText primary="북마크" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="코딩 문제 해결" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="스터디 그룹" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="데이터베이스" />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItem>
          <Typography variant="subtitle2" color="text.secondary">
            팀 프로젝트
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <JavascriptIcon />
          </ListItemIcon>
          <ListItemText primary="프론트엔드 개발" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <CloudIcon />
          </ListItemIcon>
          <ListItemText primary="백엔드 개발" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <StorageIcon />
          </ListItemIcon>
          <ListItemText primary="데이터베이스 설계" />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      <List>
        <ListItem>
          <Typography variant="subtitle2" color="text.secondary">
            새 워크스페이스
          </Typography>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CodeIcon sx={{ mr: 1 }} />
            CodeQnA
            <Typography variant="body2" sx={{ ml: 1, opacity: 0.7 }}>
              v2.1.0
            </Typography>
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button color="inherit">홈</Button>
              <Button color="primary" variant="contained" sx={{ mx: 1 }}>
                내 질문
                <Badge badgeContent={2} color="error" sx={{ ml: 1 }}></Badge>
              </Button>
              <Button color="inherit">카테고리</Button>
              <Button color="inherit">커뮤니티</Button>
            </Box>
          </Box>

          <Box>
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src="/api/placeholder/100/100"
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{ mb: 0.5 }}
              >
                Q&A 모음
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    개인 관리 /
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    내 질문 /
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Q&A 모음
                  </Typography>
                </Box>
                <Chip
                  label="업데이트 2시간 전"
                  size="small"
                  color="primary"
                  variant="outlined"
                  icon={<AlarmIcon fontSize="small" />}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", mr: 2 }}>
                <Avatar
                  src="/api/placeholder/100/100"
                  sx={{ width: 30, height: 30 }}
                />
                <Avatar
                  src="/api/placeholder/100/100"
                  sx={{ width: 30, height: 30, ml: -0.5 }}
                />
              </Box>
              <IconButton size="small">
                <AddIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{ ml: 2 }}
              >
                질문 추가
              </Button>
              <IconButton>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{ minHeight: 0 }}
            >
              <Tab label="전체" />
              <Tab label="답변 대기" />
              <Tab label="진행 중" />
              <Tab label="완료" />
            </Tabs>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <Typography variant="body1" sx={{ mr: 1 }}>
                  보기:
                </Typography>
                <Button variant="outlined" endIcon={<FilterListIcon />}>
                  년도
                </Button>
              </Box>

              <Box sx={{ display: "flex" }}>
                <IconButton>
                  <FilterListIcon />
                </IconButton>
                <IconButton>
                  <EventIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", mb: 1 }}>
              <Button
                onClick={() => handleDayChange(0)}
                variant={selectedDay === 0 ? "contained" : "text"}
                color={selectedDay === 0 ? "primary" : "inherit"}
                sx={{ borderRadius: 0, py: 1, flexGrow: 1 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2">{days[0]}</Typography>
                  <Typography variant="h6">{dates[0]}</Typography>
                </Box>
              </Button>

              <Button
                onClick={() => handleDayChange(1)}
                variant={selectedDay === 1 ? "contained" : "text"}
                color={selectedDay === 1 ? "primary" : "inherit"}
                sx={{ borderRadius: 0, py: 1, flexGrow: 1 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2">{days[1]}</Typography>
                  <Typography variant="h6">{dates[1]}</Typography>
                </Box>
              </Button>

              <Button
                onClick={() => handleDayChange(2)}
                variant={selectedDay === 2 ? "contained" : "text"}
                color={selectedDay === 2 ? "primary" : "inherit"}
                sx={{ borderRadius: 0, py: 1, flexGrow: 1 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2">{days[2]}</Typography>
                  <Typography variant="h6">{dates[2]}</Typography>
                </Box>
              </Button>

              <Button
                onClick={() => handleDayChange(3)}
                variant={selectedDay === 3 ? "contained" : "text"}
                color={selectedDay === 3 ? "primary" : "inherit"}
                sx={{ borderRadius: 0, py: 1, flexGrow: 1 }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2">{days[3]}</Typography>
                  <Typography variant="h6">{dates[3]}</Typography>
                </Box>
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {/* 시간대 라벨 및 질문 카드들 */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{ pr: 2 }}>
                <Box sx={{ textAlign: "right", pt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    6 am
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        position: "relative",
                        bgcolor: "#f5f5f5",
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="Set Alarm"
                            icon={<AlarmIcon fontSize="small" />}
                          />
                          <IconButton size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="h6">질문 준비하기</Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* 7am 타임라인 */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{ pr: 2 }}>
                <Box sx={{ textAlign: "right", pt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    7 am
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={11}>
                <Grid container spacing={2}>
                  {questions.map((question, index) => (
                    <Grid item xs={12} sm={6} md={3} key={question.id}>
                      {question.color ? (
                        <Card
                          sx={{
                            background: question.color,
                            color: "white",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                              }}
                            >
                              <Chip
                                size="small"
                                label={question.time}
                                icon={<AlarmIcon fontSize="small" />}
                                sx={{
                                  bgcolor: "rgba(255,255,255,0.2)",
                                  color: "white",
                                }}
                              />
                              <IconButton size="small" sx={{ color: "white" }}>
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="h6">
                              {question.title}
                            </Typography>
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {question.tags.map((tag) => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{
                                    bgcolor: "rgba(255,255,255,0.2)",
                                    color: "white",
                                    fontSize: "0.7rem",
                                  }}
                                />
                              ))}
                            </Box>
                          </CardContent>
                          {question.image && (
                            <Box
                              sx={{
                                position: "absolute",
                                right: -20,
                                bottom: -20,
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                overflow: "hidden",
                                opacity: 0.2,
                              }}
                            >
                              <img
                                src={question.image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          )}
                        </Card>
                      ) : (
                        <Card
                          sx={{
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                              }}
                            >
                              <Chip
                                size="small"
                                label={question.time}
                                icon={<AlarmIcon fontSize="small" />}
                              />
                              <IconButton size="small">
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="h6">
                              {question.title}
                            </Typography>
                            <Box
                              sx={{
                                mt: 1,
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {question.tags.map((tag) => (
                                <Chip key={tag} label={tag} size="small" />
                              ))}
                            </Box>
                          </CardContent>
                          {question.image && (
                            <Box
                              sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <img
                                src={question.image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  opacity: 0.2,
                                }}
                              />
                            </Box>
                          )}
                        </Card>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* 8am 타임라인 */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{ pr: 2 }}>
                <Box sx={{ textAlign: "right", pt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    8 am
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        background: "linear-gradient(135deg, #FF9800, #F57C00)",
                        color: "white",
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="7 am"
                            icon={<AlarmIcon fontSize="small" />}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                            }}
                          />
                          <IconButton size="small" sx={{ color: "white" }}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="h6">코드 리뷰</Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="Set Alarm"
                            icon={<AlarmIcon fontSize="small" />}
                          />
                          <IconButton size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">
                              알고리즘 스터디
                            </Typography>
                          </Box>
                          <Avatar src="/api/placeholder/400/400" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="Set Alarm"
                            icon={<AlarmIcon fontSize="small" />}
                          />
                          <IconButton size="small">
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6">코드 리뷰</Typography>
                          </Box>
                          <Avatar src="/api/placeholder/400/400" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* 9am 타임라인 */}
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} sx={{ pr: 2 }}>
                <Box sx={{ textAlign: "right", pt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    9 am
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={11}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        background: "linear-gradient(135deg, #7b4397, #dc2430)",
                        color: "white",
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="Set Alarm"
                            icon={<AlarmIcon fontSize="small" />}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                            }}
                          />
                          <IconButton size="small" sx={{ color: "white" }}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="h6">API 개발 질문</Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
                      <CardContent>
                        <Typography variant="body1" color="text.secondary">
                          일정 없음
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Card
                      sx={{
                        background: "linear-gradient(135deg, #FF9800, #F57C00)",
                        color: "white",
                        height: "100%",
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            size="small"
                            label="7 am"
                            icon={<AlarmIcon fontSize="small" />}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                            }}
                          />
                          <IconButton size="small" sx={{ color: "white" }}>
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography variant="h6">
                          React 컴포넌트 분석
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CodeQnA;
