import styled from 'styled-components';
import * as configs from '@radix-ui/react-icons';
import config from './config'

type type = keyof typeof configs

export interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
  type?: type
}

/* eslint-disable-next-line */
export interface IconProps { }

const StyledIcon = styled.div`
  color: pink;
`;

export function Icon(props: IconProps) {
  const { type = 'HomeIcon', ..._props } = props;
  const Component = configs[type];
  return (<Component {..._props} />);
}

export default Icon;
