import styled from "styled-components";

interface ItemProps {
  tab: string;
  name: string;
  children?: JSX.Element;
}

const StyledItem = styled.div`

`

export function Item(props: ItemProps) {
  return (
    <StyledItem>
      {props.children}
    </StyledItem>
  );
}
