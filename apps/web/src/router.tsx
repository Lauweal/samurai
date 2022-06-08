import { useRoutes } from "react-router-dom";
import { Home } from "./app/containers";
import { MainLayout } from "./layouts";

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

export function AllRoute() {
  return useRoutes([
    {
      path: '/*',
      element: <HomeRoute />
    }
  ])
}
