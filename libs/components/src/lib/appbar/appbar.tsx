import { ForwardedRef, forwardRef, RefObject, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';

export interface AppbarRef {
  height: number
}

/* eslint-disable-next-line */
export interface AppbarProps {
  children: JSX.Element | JSX.Element[]
}

interface StyleProps {
  top: number;
  backgroundColor: string
}

const StyledAppbar = styled.div<StyleProps>`
  position: absolute;
  width: 100%;
  z-index: 1000;
  box-sizing: border-box;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => `${props.top + 10}px`} 10px 10px 10px;
  padding-top: ${(props) => `${props.top + 10}px`};
  opacity: 1;
  background-color: ${props => props.backgroundColor};
  backdrop-filter: blur(20px);
`;

export const Appbar = forwardRef(function Appbar(props: AppbarProps & Partial<StyleProps>, ref: ForwardedRef<AppbarRef>) {
  const { top = 0, backgroundColor = '#00000000' } = props;
  const dom = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => {

    return {
      height: dom.current?.clientHeight as number
    }
  }, [dom.current])
  return (
    <StyledAppbar ref={dom as RefObject<HTMLDivElement>} top={top} backgroundColor={backgroundColor}>
      {props.children}
    </StyledAppbar>
  );
})

export default Appbar;
