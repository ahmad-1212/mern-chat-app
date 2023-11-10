import { Box } from "@mui/material";

const FullPageLoading = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: "0",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Box>
  );
};

export default FullPageLoading;
