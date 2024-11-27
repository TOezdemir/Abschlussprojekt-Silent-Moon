import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import RemindersPage from "./pages/RemindersPage";
import HomePage from "./pages/HomePage";
import YogaDetailPage from "./pages/YogaDetailPage";
import MeditationDetailPage from "./pages/MeditationDetailPage";
import YogaPage from "./pages/YogaPage";
import MeditationsPage from "./pages/MeditationsPage";
import MusicPage from "./pages/MusicPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import FirstPage from "./pages/FirstPage";
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoutes from "./ui/ProtectedRoute";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // {
      //   path: "/home",
      //   element: <HomePage />,
      // },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/welcome",
        element: <WelcomePage />,
      },
      {
        path: "/reminders",
        element: <RemindersPage />,
      },
      {
        path: "/firstpage",
        element: <FirstPage />,
      },
      {
        element: <ProtectedRoutes/>,
        children: [{
          path: "/profile",
          element: <ProfilePage/>
        },
        {
          path: "/home",
          element: <HomePage/>
        },
        {
          path: "/yoga",
          element: <YogaPage/>
        },
        {
          path: "/yoga/:name/:id",
          element: <YogaDetailPage/>,
        },
        {
          path: "/meditation",
          element: <MeditationsPage />,
        },
        {
          path: "/meditation/:name/:id",
          element: <MeditationDetailPage/>,
        },
        {
          path: "/music",
          element: <MusicPage />,
        },
        ]
      }
    ],
  },
]);

export default function App() {
  return (
    <div>
      <QueryClientProvider client={client}>
        <UserContextProvider>
          <RouterProvider router={router} />
        </UserContextProvider>
      </QueryClientProvider>
    </div>
  );
}