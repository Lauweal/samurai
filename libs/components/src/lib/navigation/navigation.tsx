import { palette, sizes } from '@samurai/design';
import styled from 'styled-components';
import { Item } from './item';

interface StyleProps {
  fixed?: boolean;
  backgroundColor?: string
}

/* eslint-disable-next-line */
export interface NavigationProps {
  children?: JSX.Element | JSX.Element[] | string
}

const StyledNavigation = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.backgroundColor};
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 1000;
  box-sizing: border-box;
  padding: ${sizes.spacing_16}px  ${sizes.spacing_20}px;
  margin: ${props => props.fixed ? `0px ${sizes.spacing_8}px` : null};
  width: ${props => props.fixed ? `calc(100% - ${sizes.spacing_8 * 2}px)` : '100%'};
  bottom: ${props => props.fixed ? `${sizes.spacing_24}px` : null};
  border-radius: ${props => props.fixed ? `${sizes.spacing_20}px` : null};
  box-shadow: ${props => props.fixed ? `0px 0px 10px 1px #0e0e0e17` : null};
`;

export function Navigation(props: NavigationProps & StyleProps) {
  const { backgroundColor = '#332C2C88', fixed } = props;

  return (
    <StyledNavigation fixed={fixed} backgroundColor={backgroundColor}>
      {props.children}
    </StyledNavigation>
  );
}

Navigation.Item = Item

export default Navigation;
