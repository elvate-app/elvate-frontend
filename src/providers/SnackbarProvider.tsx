import { SnackbarProvider } from "notistack";

const CustomSnackbarProvider = ({ children }: any) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
