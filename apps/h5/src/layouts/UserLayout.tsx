import { Outlet, useNavigate } from 'react-router-dom'
import { palette, sizes } from '@samurai/design'
import { MagnifyingGlassIcon, PersonIcon, BellIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { Icon, NavigationRef, Navigation, ThemedStyledWidthProps } from '@samurai/components'
import { getStatusBarHeight } from '@samurai/bridge'
import { useRef } from 'react'

interface UserLayoutProps {
  usfe?: boolean
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props: ThemedStyledWidthProps) => props.theme.backgroundColor};
`

const Content = styled.div<{ top?: number, bottom?: number }>`
  flex: 1;
  padding: ${(props) => props.top}px ${sizes.spacing_0}px;
  padding-bottom: ${props => props.bottom ? `${props.bottom}px` : ''};
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {display:none}
`

export function UserLayout(props: UserLayoutProps) {
  const { usfe = true } = props;
  const navigationr = useRef<NavigationRef>({ height: 80 })
  const navigate = useNavigate()
  function goHome() { navigate('/') }
  function goUser() { navigate('/user/info') }
  function goChat() { navigate('/chat') }

  return (
    <Layout>
      <Content top={usfe ? getStatusBarHeight(20) : 0}>
        <Outlet />
      </Content>
      <Navigation fixed ref={navigationr as any}>
        <Navigation.Item name='动态' icon={<Icon type='HomeIcon' color={palette.bg} stroke={palette.bg} width={20} height={20} />} onClick={goHome} />
        <Navigation.Item name='发现' icon={<MagnifyingGlassIcon stroke={palette.bg} width={20} height={20} />} />
        <Navigation.Item icon={<Icon type='PlusIcon' stroke={palette.bg} width={24} height={24} />} />
        <Navigation.Item name='通知' icon={<BellIcon stroke={palette.bg} width={20} height={20} onClick={goChat} />} />
        <Navigation.Item name='我的' icon={<PersonIcon stroke={palette.bg} width={20} height={20} onClick={goUser} />} />
      </Navigation>
    </Layout>
  )
}
