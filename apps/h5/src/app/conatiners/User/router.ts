import { RouterConfig } from '../../../navigators'
import { MainLayout } from '../../../layouts'
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
