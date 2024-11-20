import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import WelcomePage from "./pages/WelcomePage"
import RemindersPage from "./pages/RemindersPage"
import HomePage from "./pages/HomePage"
import YogaDetailPage from "./pages/YogaDetailPage"
import MeditationDetailPage from "./pages/MeditationDetailPage"
import YogaPosesPage from "./pages/YogaPosesPage"
import MeditationsPage from "./pages/MeditationsPage"
import MusicPage from "./pages/MusicPage"
import ProfilePage from "./pages/ProfilePage"
import Layout from "./components/Layout"
import { UserContextProvider } from "./context/userContext"

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
        element: <YogaDetailPage />,
      },
      {
        path: "/meditation/:name/:id",
        element: <MeditationDetailPage />,
      },
      {
        path: "/yoga",
        element: <YogaPosesPage />,
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
    ],
  },
]);

export default function App() {
  return (
    <div>
      <UserContextProvider>
      <RouterProvider router={router}/>
      </UserContextProvider>
    </div>
  );
}
