import styled from 'styled-components';
import { CaretLeftIcon } from '@radix-ui/react-icons'

/* eslint-disable-next-line */
export interface NavigatorProps {
  children: JSX.Element | JSX.Element[]
}

const StyledNavigator = styled.div`
  color: pink;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 5px
`;

export function Navigator(props: NavigatorProps) {
  return (
    <StyledNavigator>
      {props.children}
    </StyledNavigator>
  );
}

export default Navigator;
