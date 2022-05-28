import { palette, sizes } from '@samurai/design';
import styled from 'styled-components';

interface StyleProps {
  width?: number;
  height?: number;
  image?: string;
}

/* eslint-disable-next-line */
export interface CardProps {
  children?: JSX.Element | JSX.Element[];
}

const StyledCard = styled.div<StyleProps>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100px'};
  border-radius: ${sizes.spacing_12}px;
  overflow: hidden;
  background-image: ${props => props.image ? `url(${props.image})` : null};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 1px ${palette.boxShadow};
`;
const StyledBox = styled.div<Pick<StyleProps, 'width' | 'height'>>`
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100px'};
  padding: ${sizes.spacing_12}px ${sizes.spacing_16}px;
  background-color: #FFFFFF08;
  backdrop-filter: blur(10px);
  border-radius: ${sizes.spacing_12}px;
  box-sizing: border-box;
`

export function Card(props: CardProps & StyleProps) {
  const { children, ...style } = props
  return (
    <StyledCard {...style}>
      <StyledBox {...style}>{children}</StyledBox>
    </StyledCard>
  );
}

export default Card;
