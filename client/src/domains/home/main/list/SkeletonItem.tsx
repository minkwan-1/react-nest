import { Box, Card, CardContent, Skeleton } from "@mui/material";

const SkeletonItem = ({
  withThumbnail = false,
}: {
  withThumbnail?: boolean;
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="circular" width={28} height={28} sx={{ mr: 1 }} />
          <Skeleton variant="text" width={80} height={20} />
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="text" width={60} height={20} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={28} sx={{ mb: 1 }} />

            <Skeleton variant="text" width="90%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />

            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <Skeleton variant="rounded" width={60} height={24} />
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={50} height={24} />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton variant="rounded" width={80} height={32} />
              <Box sx={{ flexGrow: 1 }} />
              <Skeleton
                variant="rounded"
                width={60}
                height={32}
                sx={{ mr: 1 }}
              />
              <Skeleton variant="rounded" width={60} height={32} />
            </Box>
          </Box>

          {withThumbnail && (
            <Box sx={{ flexShrink: 0 }}>
              <Skeleton
                variant="rounded"
                width={120}
                height={90}
                sx={{ borderRadius: 1 }}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SkeletonItem;
