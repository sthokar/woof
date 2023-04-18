import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import EditEventPage from './pages/EditEvent';
// import ErrorPage from './pages/Error';
// import EventDetailPage, {
//   loader as eventDetailLoader,
//   action as deleteEventAction,
// } from './pages/EventDetail';
// import EventsPage, { loader as eventsLoader } from './pages/Events';
// import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home'
// import NewEventPage from './pages/NewEvent';
import RootLayout from "./pages/Root";
import { Suspense } from "react";

// import { action as manipulateEventAction } from './components/EventForm';
// import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
// import { action as logoutAction } from './pages/Logout';
import { checkAuthLoader, authCookieLoader } from "./util/auth";
import ErrorPage from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>,
        loader: checkAuthLoader,
            },
      {
        path: "login",
        element: <AuthenticationPage />,
        action: authAction      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
