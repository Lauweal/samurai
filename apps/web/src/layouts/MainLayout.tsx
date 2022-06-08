import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Appbar, ThemedStyledWidthProps } from "@samurai/components";
import styled from "styled-components";
import { sizes } from '@samurai/design';


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

export function MainLayout() {
  return (
    <Layout>
      <Appbar top={0}><div>1</div></Appbar>
      <Content><Outlet /></Content>
    </Layout>
  );
}
