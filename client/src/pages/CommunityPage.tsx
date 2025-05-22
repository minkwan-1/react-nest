import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from "@mui/material";
import { PageContainer, ComponentWrapper } from "../components/layout/common";
import SearchIcon from "@mui/icons-material/Search";

const userData = [
  {
    id: 1,
    name: "김민수",
    role: "개발자",
    joined: "2023-12-01",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "이정민",
    role: "디자이너",
    joined: "2023-11-15",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "박수진",
    role: "기획자",
    joined: "2023-10-20",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "최수영",
    role: "개발자",
    joined: "2023-09-25",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    name: "정서연",
    role: "디자이너",
    joined: "2023-08-30",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: 6,
    name: "김하늘",
    role: "기획자",
    joined: "2023-07-12",
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: 7,
    name: "이유진",
    role: "개발자",
    joined: "2023-06-22",
    avatar: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: 8,
    name: "유민정",
    role: "디자이너",
    joined: "2023-05-10",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: 9,
    name: "한소영",
    role: "기획자",
    joined: "2023-04-05",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
];

const CommunityPage = () => {
  return (
    <PageContainer>
      <ComponentWrapper sx={{ padding: 2 }}>
        <Typography
          sx={{
            color: (theme) => {
              return {
                ...theme.applyStyles("light", {
                  color: "black",
                }),
                ...theme.applyStyles("dark", {
                  color: "white",
                }),
              };
            },
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          커뮤니티
        </Typography>

        {/* 유저 검색바 */}
        <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
          <TextField
            variant="outlined"
            placeholder="유저를 찾아보세요"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#b8dae1",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#b8dae1",
                },
              },
            }}
            InputProps={{
              startAdornment: <SearchIcon />,
            }}
          />
          <Button variant="contained" sx={{ bgcolor: "#b8dae1" }}>
            검색
          </Button>
        </Box>

        {/* 유저 카드들 */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {userData.map((user) => (
            <Card
              key={user.id}
              sx={{
                width: "calc(33.33% - 16px)",
                display: "flex",
                flexDirection: "column",
                marginBottom: 3,
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  sx={{
                    width: 56,
                    height: 56,
                    marginBottom: 2,
                    marginX: "auto",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.role}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "14px", marginTop: 1 }}
                >
                  가입일: {user.joined}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", padding: 2 }}>
                <Button size="small" sx={{ color: "#b8dae1" }}>
                  팔로우
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </ComponentWrapper>
    </PageContainer>
  );
};

export default CommunityPage;
