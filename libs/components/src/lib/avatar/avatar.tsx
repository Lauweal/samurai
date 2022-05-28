import styled from 'styled-components';

interface StyledProps {
  size: number;
}

/* eslint-disable-next-line */
export interface AvatarProps {
  src: string
}

const StyledAvatar = styled.div<StyledProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`

export function Avatar(props: AvatarProps & Partial<StyledProps>) {
  const { size = 40, src } = props
  return (
    <StyledAvatar size={size}>
      <StyledImg src={src} />
    </StyledAvatar>
  );
}

export default Avatar;
