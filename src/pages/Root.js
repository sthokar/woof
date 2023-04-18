import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { getAuthCookieDuration } from '../util/auth';

function RootLayout() {
  const authCookie = useLoaderData();
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!authCookie) {
      return;
    }

    if (authCookie === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const authCookieDuration = getAuthCookieDuration();
    console.log(authCookieDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, authCookieDuration);
  }, [authCookie, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;