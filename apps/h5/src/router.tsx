import { useRoutes } from "react-router-dom";
import { Home, User } from "./app/conatiners";
import { MainLayout, UserLayout } from "./layouts";

export function HomeRoute() {
  return useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [{
        path: '',
        element: <Home />
      }]
    }
  ])
}

export function UserRoute() {
  return useRoutes([
    {
      path: '',
      element: <UserLayout usfe={false} />,
      children: [{
        path: 'info',
        element: <User />
      }]
    }
  ])
}

export function AllRoute() {
  return useRoutes([
    {
      path: '/*',
      element: <HomeRoute />
    },
    {
      path: '/user/*',
      element: <UserRoute />
    }
  ])
}
