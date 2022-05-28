import { sizes } from "@samurai/design";
import styled from "styled-components";

export interface StyleProps {
  width?: number;
  height?: number;
  image?: string;
}

export interface ICardProps {
  children?: JSX.Element;
}

const Container = styled.div<StyleProps>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100px'};
  border-radius: ${sizes.spacing_12}px;
  overflow: hidden;
  background-image: ${props => props.image ? `url(${props.image})` : null};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 0px 10px 1px #D3C8C8;
`

const Box = styled.div<Pick<StyleProps, 'width' | 'height'>>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100px'};
  background-color: #FFFFFF08;
  backdrop-filter: blur(4px);
  border-radius: ${sizes.spacing_12}px;
`


export function Card(props: ICardProps & StyleProps) {
  const { children, ...style } = props

  return (
    <Container {...style}>
      <Box {...style}>
        {children}
      </Box>
    </Container>
  );
}
