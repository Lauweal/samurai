import { Outlet, useNavigate } from 'react-router-dom'
import { palette, sizes } from '@samurai/design'
import { MagnifyingGlassIcon, PersonIcon, BellIcon, HomeIcon, PlusIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import { Icon, Navigation } from '@samurai/components'
import { getStatusBarHeight, getTheme } from '@samurai/bridge'
import { bridge } from '../utils'
import { useState } from 'react'
const Layout = styled.div<{ theme: string }>`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${props => props.theme};
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
  const [theme, setTheme] = useState(getTheme() === 'dark' ? palette.text_0 : palette.bg);
  function goHome() { navigate('/') }
  function goUser(e: any) {
    navigate('/user/we')
  }
  bridge.subscription('THEME', (data) => {
    console.log('------>', data.payload)
    setTheme(data.payload === 'dark' ? palette.text_0 : palette.bg)
  })
  return (
    <Layout theme={theme}>
      <Content top={getStatusBarHeight(20)}>
        <Outlet />
      </Content>
      <Navigation fixed>
        <Navigation.Item name='动态' icon={<Icon type='HomeIcon' color={palette.bg} stroke={palette.bg} width={20} height={20} />} onClick={goHome} />
        <Navigation.Item name='发现' icon={<MagnifyingGlassIcon stroke={palette.bg} width={20} height={20} />} />
        <Navigation.Item icon={<Icon type='PlusIcon' stroke={palette.bg} width={24} height={24} />} />
        <Navigation.Item name='通知' icon={<BellIcon stroke={palette.bg} width={20} height={20} />} />
        <Navigation.Item name='我的' icon={<PersonIcon stroke={palette.bg} width={20} height={20} onClick={goUser} />} />
      </Navigation>
    </Layout>
  )
}
