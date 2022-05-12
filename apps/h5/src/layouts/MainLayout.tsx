import { Outlet, useNavigate } from 'react-router-dom'
import { palette, sizes } from '@samurai/design'
import { CaretLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'
import Navigator from '../components/navigator/navigator'

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex: 1;
  padding: ${sizes.spacing_8}px;
  background-color: ${palette.bg};
`

export function MainLayout() {
  const navigate = useNavigate()
  return (
    <Layout>
      <Navigator>
        <CaretLeftIcon stroke={palette.primary} width={30} height={30} onClick={() => navigate(-1)} />
        <MagnifyingGlassIcon stroke={palette.primary} width={26} height={26} onClick={() => navigate(-1)} />
      </Navigator>
      <Content >
        <Outlet />
      </Content>
    </Layout>
  )
}
