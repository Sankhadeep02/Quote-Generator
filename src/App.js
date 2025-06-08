import { Box, CssBaseline } from "@mui/material";
import QuoteCard from "./components/QuoteCard";
import { useState, useEffect } from "react";

const colors = [
  "#77b255",
  "#5dade2",
  "#af7ac5",
  "#f4d03f",
  "#ec7063",
  "#45b39d",
  "#e67e22",
];

function App() {
  const [themeColor, setThemeColor] = useState("black");

  return (
    <>
      <CssBaseline></CssBaseline>
      <Box
        sx={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          bgcolor: themeColor,
          p: 0,
          m: 0,
          transition: "background-color 1s ease",
        }}
      >
        <QuoteCard
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          colors={colors}
        ></QuoteCard>
      </Box>
    </>
  );
}

export default App;
