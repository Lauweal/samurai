import { RouterConfig } from 'apps/h5/src/navigators'
import { MainLayout } from 'apps/h5/src/layouts'
import { User } from './User'

const routers: RouterConfig[] = [
  {
    path: '/user',
    component: MainLayout,
    children: [{
      path: 'we',
      component: User
    }]
  }
]

export default routers
