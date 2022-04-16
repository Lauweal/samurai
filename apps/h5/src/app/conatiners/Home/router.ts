import { RouterConfig } from 'apps/h5/src/navigators'
import { MainLayout } from 'apps/h5/src/layouts'
import { Home } from './Home'

const routers: RouterConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [{
      path: '/',
      component: Home
    }]
  }
]

export default routers
