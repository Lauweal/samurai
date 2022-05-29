import { Outlet, useNavigate } from 'react-router-dom'
import { palette, sizes } from '@samurai/design'
import { MagnifyingGlassIcon, PersonIcon, BellIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { Icon, ITheme, Navigation, ThemedStyledWidthProps } from '@samurai/components'
import { getStatusBarHeight } from '@samurai/bridge'
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props: ThemedStyledWidthProps) => props.theme.backgroundColor};
`

const Content = styled.div<{ top?: number }>`
  flex: 1;
  padding: ${(props) => props.top}px ${sizes.spacing_16}px;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {display:none}
`

export function UserLayout() {
  const navigate = useNavigate()
  function goHome() { navigate('/') }
  function goUser() { navigate('/user') }
  function goChat() { navigate('/chat') }

  return (
    <Layout>
      <Content top={getStatusBarHeight(20)}>
        <Outlet />
      </Content>
      <Navigation fixed>
        <Navigation.Item name='动态' icon={<Icon type='HomeIcon' color={palette.bg} stroke={palette.bg} width={20} height={20} />} onClick={goHome} />
        <Navigation.Item name='发现' icon={<MagnifyingGlassIcon stroke={palette.bg} width={20} height={20} />} />
        <Navigation.Item icon={<Icon type='PlusIcon' stroke={palette.bg} width={24} height={24} />} />
        <Navigation.Item name='通知' icon={<BellIcon stroke={palette.bg} width={20} height={20} onClick={goChat} />} />
        <Navigation.Item name='我的' icon={<PersonIcon stroke={palette.bg} width={20} height={20} onClick={goUser} />} />
      </Navigation>
    </Layout>
  )
}
