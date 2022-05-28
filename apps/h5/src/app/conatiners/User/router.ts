import { RouterConfig } from '../../../navigators'
import { UserLayout } from '../../../layouts'
import { User } from './User'

const routers: RouterConfig[] = [
  {
    path: '/user',
    component: UserLayout,
    children: [{
      path: 'we',
      component: User
    }]
  }
]

export default routers
