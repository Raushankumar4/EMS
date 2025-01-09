import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorRoute from "./components/ErrorRoute.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RegisterUser from "./components/RegisterUser.jsx";
import UpdateProfile from "./components/UpdateProfile.jsx";
import GetProfile from "./components/GetProfile.jsx";
import Home from "./components/Home.jsx";
import EmployeDashBoad from "./components/EmployeDashBoad.jsx";
import AdminDashBoard from "./components/Amin/AdminDashBoard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterUser />,
      },
      {
        path: "updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "profile",
        element: <GetProfile />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "dashboard",
        element: <EmployeDashBoad />,
      },
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// const queryClient = new QueryClient();

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
        <Toaster />
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
