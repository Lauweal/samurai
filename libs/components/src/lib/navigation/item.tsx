import styled from "styled-components";
import { palette, sizes } from "@samurai/design";
import Text from "../text/text";
import React from "react";
import { createBridge } from "@samurai/bridge";

const StyledItem = styled.div`
  width: fit-content;
  padding: 0px ${sizes.spacing_4}px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::last-child {
    display: inline-block;
    margin-top: ${sizes.spacing_16}px;
  }
`
const bridge = createBridge(window);
export interface ItemProps {
  name?: string
  icon: JSX.Element
  onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export function Item(props: ItemProps) {
  function click(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    bridge.send('SHAKE')
    typeof props.onClick === 'function' && props.onClick(e);
  }

  return (
    <StyledItem role="button" onClick={click}>
      {React.cloneElement(props.icon, { role: 'button' })}
      {props.name ? <Text type="body5" color={palette.bg} >{props.name}</Text> : null}
    </StyledItem >
  );
}
