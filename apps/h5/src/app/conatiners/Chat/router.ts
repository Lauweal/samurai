import { RouterConfig } from '../../../navigators';
import { MainLayout } from '../../../layouts';
import { Chat } from './Chat';

const routers: RouterConfig[] = [
  {
    path: '/chat',
    component: MainLayout,
    children: [{
      path: '',
      component: Chat
    }]
  }
]

export default routers
