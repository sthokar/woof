import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit, useLocation } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getAuthCookieDuration } from '../util/auth';

function RootLayout() {
  const authCookie = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  const location = useLocation();

  const showMainNavigation = location.pathname !== '/login';


  useEffect(() => {
    if (!authCookie) {
      return;
    }

    if (authCookie === 'EXPIRED') {
      submit(null, { action: '/login', method: 'post' });
      return;
    }

    const authCookieDuration = getAuthCookieDuration();
    console.log(authCookieDuration);

    setTimeout(() => {
      submit(null, { action: '/login', method: 'post' });
    }, authCookieDuration);
  }, [authCookie, submit]);

  return (
    <>
    {showMainNavigation && <MainNavigation />}
    <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;