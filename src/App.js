import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useSelector,ReactReduxContext } from 'react-redux';

import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import { Suspense } from 'react';
import Auth from './components/Auth/AuthForm';
import ErrorPage from './pages/Error';
import Favorites from './components/Favorites';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        ),
      },
      {
        path: 'home',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/favorites',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Favorites />,
      },
    ],
  },
]);

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <RouterProvider router={router} store={store}>
          <Suspense fallback={<div>Loading...</div>}>
            {isAuthenticated ? <HomePage /> : <Auth />}
          </Suspense>
        </RouterProvider>
      )}
    </ReactReduxContext.Consumer>
  );
}

export default App;
