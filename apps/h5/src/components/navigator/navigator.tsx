import styled from 'styled-components';
import { getStatusBarHeight } from '@samurai/bridge'
import React, { RefObject, useImperativeHandle, useRef } from 'react';

/* eslint-disable-next-line */
export interface NavigatorProps {
  children: JSX.Element | JSX.Element[]
}

export interface NavigatorRef {
  height: number
}

const StyledNavigator = styled.div<{ top: number }>`
  color: pink;
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
  background-color: rgba(255,255,255,0.72);
  backdrop-filter: blur(20px);
`;

export const Navigator = React.forwardRef(function Navigator(props: NavigatorProps, ref) {
  const dom = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => {
    return {
      height: dom.current?.clientHeight
    }
  }, [dom.current])

  return (
    <StyledNavigator ref={dom as RefObject<HTMLDivElement>} top={getStatusBarHeight()}>
      {props.children}
    </StyledNavigator>
  );
})

export default Navigator;
