import { Button } from "@mui/material";

const ButtonSecondary = ({ icon, children, type, disabled, ...props }) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      sx={{
        fontSize: "1.5rem",
        color: "#fff",
        letterSpacing: "1px",
        backgroundColor: "secondary.main",
        "&:hover": {
          backgroundColor: "secondary.dark",
        },
        "&:disabled": {
          color: "#fff",
          backgroundColor: "secondary.dark",
          cursor: "not-allowed",
        },
      }}
      startIcon={icon}
      {...props}
    >
      {children}
    </Button>
  );
};

ButtonSecondary.defaultProps = {
  type: "button",
  icon: undefined,
};

export default ButtonSecondary;
