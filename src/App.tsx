import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import RemindersPage from "./pages/RemindersPage";
import HomePage from "./pages/HomePage";
import YogaDetailPage from "./pages/YogaDetailPage";
import MeditationDetailPage from "./pages/MeditationDetailPage";
import YogaPage from "./pages/YogaPage";
import YogaMantra from "./toBeRevisited/YogaMantra";
import YogaPiano from "./toBeRevisited/YogaPiano";
import YogaBinaural from "./toBeRevisited/YogaBinaural";
import YogaVideo from "./toBeRevisited/YogaVideo";
import MeditationsPage from "./pages/MeditationsPage";
import MusicPage from "./pages/MusicPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import FirstPage from "./pages/FirstPage";
import { UserContextProvider } from "./context/userContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
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
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/yoga/:name/:id",
        element: <YogaDetailPage/>,
      },
      {
        path: "/meditation/:name/:id",
        element: <MeditationDetailPage/>,
      },
      {
        path: "/yoga",
        element: <YogaPage />,
      },
      {
        path: "/meditation",
        element: <MeditationsPage />,
      },
      {
        path: "/music",
        element: <MusicPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/yogabinaural",
        element: <YogaBinaural />,
      },
      {
        path: "/yogapiano",
        element: <YogaPiano />,
      },
      {
        path: "/yogamantra",
        element: <YogaMantra />,
      },
      {
        path: "/yogavideo",
        element: <YogaVideo />,
      },
      {
        path: "/firstpage",
        element: <FirstPage />,
      },
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
