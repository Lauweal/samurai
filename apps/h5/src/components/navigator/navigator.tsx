import styled from 'styled-components';
import { getStatusBarHeight } from '@samurai/bridge'

/* eslint-disable-next-line */
export interface NavigatorProps {
  children: JSX.Element | JSX.Element[]
}

const StyledNavigator = styled.div<{ top: number }>`
  color: pink;
  position: sticky;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px;
  padding-top: ${(props) => `${props.top}px`}
`;

export function Navigator(props: NavigatorProps) {
  return (
    <StyledNavigator top={getStatusBarHeight()}>
      {props.children}
    </StyledNavigator>
  );
}

export default Navigator;
