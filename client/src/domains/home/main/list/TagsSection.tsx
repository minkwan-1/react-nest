import { Stack, Chip } from "@mui/material";

interface TagsSectionProps {
  tags: string[];
}

const TagsSection = ({ tags }: TagsSectionProps) => {
  return (
    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
      {tags.map((tag: string) => (
        <Chip key={tag} label={tag} size="small" />
      ))}
    </Stack>
  );
};

export default TagsSection;
