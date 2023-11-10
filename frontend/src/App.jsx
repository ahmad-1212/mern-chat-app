import { Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import "./index.css";
import theme from "./theme";

import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import { OnlineUsersProvider } from "./context/OnlineUsers";
import { NotificationProvider } from "./context/Notification";
import { SidebareProvider } from "./context/Sidebare";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <OnlineUsersProvider>
            <NotificationProvider>
              <SidebareProvider>
                <Routes>
                  <Route
                    element={
                      <ProtectedRoute>
                        <AppLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate replace to="/chats" />} />
                    <Route path="chats" element={<Chat />} />
                  </Route>
                  <Route
                    path="auth"
                    element={
                      <ProtectedRoute authPage={true}>
                        <Auth />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Toaster
                  position="top-center"
                  gutter={12}
                  toastOptions={{
                    style: {
                      background: "#f9f9f9",
                      color: "#575757",
                      fontSize: "16px",
                      maxWidth: "500px",
                      padding: "10px 20px",
                    },
                    success: {
                      duration: 3000,
                    },
                    error: {
                      duration: 7000,
                    },
                  }}
                />
              </SidebareProvider>
            </NotificationProvider>
          </OnlineUsersProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
