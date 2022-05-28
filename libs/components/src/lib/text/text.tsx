import { fonts, palette } from '@samurai/design';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TextProps {
  type?: keyof typeof fonts,
  children: string | number
}


interface StyleProps {
  fontFamily: string,
  fontSize: number,
  color?: string,
  bold?: boolean,
}

const StyledText = styled.span<StyleProps>`
  font-family: ${(props) => props.fontFamily};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color};
  letter-spacing: 2px;
  font-weight: ${(props) => props.bold ? 'bold' : 'normal'};
`;

export function Text(props: TextProps & Pick<StyleProps, 'color' | 'bold'>) {
  const { type = 'body5', color = palette.text_2 } = props

  return (
    <StyledText color={color} fontFamily={fonts[type].fontFamily} fontSize={fonts[type].fontSize}>
      {props.children}
    </StyledText>
  );
}

export default Text;
