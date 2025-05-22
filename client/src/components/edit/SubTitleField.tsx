// import React from "react";
// import { Box, TextField, Typography, useTheme, alpha } from "@mui/material";

// interface SubTitleFieldProps {
//   subTitle: string;
//   setSubTitle: React.Dispatch<React.SetStateAction<string>>;
// }

// const SubTitleField: React.FC<SubTitleFieldProps> = ({
//   subTitle,
//   setSubTitle,
// }) => {
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const mainColor = "#c5a3d5";

//   return (
//     <Box sx={{ mb: 3 }}>
//       <Typography
//         variant="subtitle1"
//         sx={{
//           mb: 1,
//           fontWeight: 500,
//           color: isDarkMode ? "#ddd" : "#444",
//           display: "flex",
//           alignItems: "center",
//           "&::before": {
//             content: '""',
//             display: "inline-block",
//             width: "3px",
//             height: "14px",
//             borderRadius: "2px",
//             marginRight: "8px",
//             background: `linear-gradient(to bottom, ${mainColor}, #02b279)`,
//           },
//         }}
//       >
//         부제목 (선택)
//       </Typography>
//       <TextField
//         label="질문의 부제목을 입력하세요"
//         fullWidth
//         value={subTitle}
//         onChange={(e) => setSubTitle(e.target.value)}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "10px",
//             backgroundColor: isDarkMode
//               ? alpha("#fff", 0.03)
//               : alpha("#f5f5f5", 0.5),
//             "& fieldset": {
//               borderColor: isDarkMode ? alpha("#fff", 0.1) : alpha("#000", 0.1),
//               transition: "border-color 0.2s ease",
//             },
//             "&:hover fieldset": {
//               borderColor: mainColor,
//             },
//             "&.Mui-focused fieldset": {
//               borderColor: mainColor,
//               borderWidth: "2px",
//             },
//           },
//           "& .MuiInputLabel-root": {
//             color: isDarkMode ? alpha("#fff", 0.6) : alpha("#000", 0.6),
//             "&.Mui-focused": {
//               color: mainColor,
//             },
//           },
//           "& .MuiInputBase-input": {
//             padding: "13px 16px",
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default SubTitleField;

// content의 초반부가 카드 컴포넌트에서 나오도록
// 최종 데이터로 카드 데이터 렌더링 해보기

// https://www.youtube.com/watch?v=AAMBoENvfnE
