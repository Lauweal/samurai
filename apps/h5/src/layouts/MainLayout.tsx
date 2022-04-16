import { Outlet, useNavigate } from 'react-router-dom'
import { palette } from '@samurai/design'
import { CaretLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { getStatusBarHeight } from '@samurai/bridge'
import Navigator from 'apps/h5/src/components/navigator/navigator'
import styled from 'styled-components'

const BackIcon = () => {

}

const Layout = styled.div<{ top: number }>`
  display: flex;
  flex-direction: column;
  padding-top: ${(props) => `${props.top}px`};
`

const Content = styled.div`
  flex: 1;
  background-color: #fff;
`

export function MainLayout() {
  const navigate = useNavigate()
  return (
    <Layout top={getStatusBarHeight()}>
      <Navigator>
        <CaretLeftIcon color={palette.fill_2} width={30} height={30} onClick={() => navigate(-1)} />
        <MagnifyingGlassIcon color={palette.fill_2} width={26} height={26} onClick={() => navigate(-1)} />
      </Navigator>
      <Content >
        <Outlet />
      </Content>
    </Layout>
  )
}
