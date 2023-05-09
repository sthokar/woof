import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';

import classes from './MainNavigation.module.css';

function FavoritesIcon() {
  const favoriteDogs = useSelector((state) => state.favoriteDogs);

  return (
    <div className={classes.favoritesIcon}>
      <FavoriteIcon />
      {favoriteDogs.length > 0 && <span>{favoriteDogs.length}</span>}
    </div>
  );
}

function MainNavigation() {
  const authCookie = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Find a dog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          <li>
            <FavoritesIcon />
          </li>
          {!authCookie && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {authCookie && (
            <li>
              <Form action="/auth/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
