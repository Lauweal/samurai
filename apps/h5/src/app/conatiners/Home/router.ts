import { RouterConfig } from '../../../navigators';
import { MainLayout } from '../../../layouts';
import { Home } from './Home';

const routers: RouterConfig[] = [
  {
    path: '',
    component: MainLayout,
    children: [{
      path: '',
      component: Home
    }]
  }
]

export default routers
