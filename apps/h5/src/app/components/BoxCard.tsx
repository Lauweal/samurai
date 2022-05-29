import { Text } from "@samurai/components";
import styled from "styled-components";

const StyledBoxCard = styled.div`
  width: 100%;
`


export function BoxCard() {
  return (
    <StyledBoxCard>
      <Text type="body3">1</Text>
    </StyledBoxCard>
  );
}
