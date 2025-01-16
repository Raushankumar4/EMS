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
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "./components/Loading/Loading.jsx";

const Login = lazy(() => import("./components/Login.jsx"));
const RegisterUser = lazy(() => import("./components/RegisterUser.jsx"));
const UpdateProfile = lazy(() => import("./components/UpdateProfile.jsx"));
const GetProfile = lazy(() => import("./components/GetProfile.jsx"));
const AdminDashBoard = lazy(() =>
  import("./components/Amin/AdminDashBoard.jsx")
);
const EmployeDashBoad = lazy(() => import("./components/EmployeDashBoad.jsx"));
const AssignWork = lazy(() => import("./components/Amin/Work/AssignWork.jsx"));
const Home = lazy(() => import("./components/Home.jsx"));
const WorkerDashBoard = lazy(() =>
  import("./components/Amin/Work/WorkerDashBoard.jsx")
);

const UpadateWork = lazy(() =>
  import("./components/Amin/Work/UpadateWork.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <RegisterUser />
          </Suspense>
        ),
      },
      {
        path: "updateProfile",
        element: (
          <Suspense fallback={<Loading />}>
            <UpdateProfile />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <GetProfile />
          </Suspense>
        ),
      },
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "admin-dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminDashBoard />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <EmployeDashBoad />
          </Suspense>
        ),
      },
      {
        path: "/worker-dashboard/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <WorkerDashBoard />
          </Suspense>
        ),
      },
      {
        path: "/worker-dashboard/:id/create-work",
        element: (
          <Suspense fallback={<Loading />}>
            <AssignWork />
          </Suspense>
        ),
      },
      {
        path: "/update-work/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <UpadateWork />
          </Suspense>
        ),
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
