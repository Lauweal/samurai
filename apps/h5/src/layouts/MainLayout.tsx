import { Outlet, useNavigate } from 'react-router-dom'
import { palette, sizes } from '@samurai/design'
import { CaretLeftIcon, MagnifyingGlassIcon, PersonIcon, BellIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { Appbar, AppbarRef, Icon, Navigation, ThemedStyledWidthProps } from '@samurai/components'
import { useRef } from 'react'
import { getStatusBarHeight } from '@samurai/bridge'
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${(props: ThemedStyledWidthProps) => {
    return props.theme.backgroundColor;
  }};
`

const Content = styled.div<{ top?: number }>`
  flex: 1;
  padding: ${(props) => props.top}px ${sizes.spacing_16}px;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {display:none}
`
const StylePlus = styled.div`
  width: 30px;
  height: 30px;
  padding: 3px;
  box-sizing: border-box;
  background-color: ${palette.bg};
  border-radius: 999px;
`

export function MainLayout() {
  const navigate = useNavigate()
  const navigator = useRef<AppbarRef>({ height: 50 });

  function goHome() { navigate('/') }
  function goUser() { navigate('/user') }
  function goChat() { navigate('/chat') }

  return (
    <Layout>
      <Appbar ref={navigator as any} top={getStatusBarHeight()}>
        <CaretLeftIcon stroke={palette.primary} width={30} height={30} onClick={() => navigate(-1)} />
        <MagnifyingGlassIcon stroke={palette.primary} width={26} height={26} onClick={() => navigate(-1)} />
      </Appbar>
      <Content top={navigator.current?.height + 10}>
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
