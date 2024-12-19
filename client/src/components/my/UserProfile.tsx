import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

interface UserProfileProps {
  username: string;
  avatarUrl: string;
  reputation: number;
  badges: string[];
  questionsAnswered: number;
  questionsAsked: number;
  bio: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  avatarUrl,
  reputation,
  badges,
  questionsAnswered,
  questionsAsked,
  bio,
}) => {
  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
      {/* Profile Section */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }} // Adjusts layout at 600px width
        alignItems="center"
        gap={3}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexBasis: { xs: "100%", sm: "33%" } }} // Full width on small screens
        >
          <Avatar
            alt={username}
            src={avatarUrl}
            sx={{ width: 150, height: 150 }}
          />
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "66%" } }}>
          {" "}
          {/* Full width on small screens */}
          <Typography variant="h4">{username}</Typography>
          <Typography variant="body2" color="text.secondary">
            Reputation: {reputation}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginTop: 2 }}>
            {badges.map((badge, index) => (
              <Typography
                key={index}
                variant="body2"
                color="primary"
                sx={{ background: "#e0e0e0", padding: 1, borderRadius: 3 }}
              >
                {badge}
              </Typography>
            ))}
          </Box>
          <Button variant="contained" sx={{ marginTop: 2 }}>
            Edit Profile
          </Button>
        </Box>
      </Box>

      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

      {/* Stats Section */}
      <Box display="flex" gap={3} flexDirection={{ xs: "column", sm: "row" }}>
        <Box sx={{ flexBasis: { xs: "100%", sm: "33%" } }}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Questions Answered</Typography>
            <Typography variant="h4">{questionsAnswered}</Typography>
          </Paper>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "33%" } }}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Questions Asked</Typography>
            <Typography variant="h4">{questionsAsked}</Typography>
          </Paper>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "33%" } }}>
          <Paper sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Bio</Typography>
            <Typography variant="body2">{bio}</Typography>
          </Paper>
        </Box>
      </Box>

      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

      {/* Recent Activities Section */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Recent Activities
      </Typography>

      <Box display="flex" gap={3} flexDirection={{ xs: "column", sm: "row" }}>
        <Box sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6">
                Answered Question: "How to implement React Hooks?"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 days ago
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6">
                Asked Question: "What is TypeScript?"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 days ago
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6">
                Asked Question: "What is TypeScript?"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 days ago
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6">
                Asked Question: "What is TypeScript?"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 days ago
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flexBasis: { xs: "100%", sm: "50%" } }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6">
                Asked Question: "What is TypeScript?"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                5 days ago
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
