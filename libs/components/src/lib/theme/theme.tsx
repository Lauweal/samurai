import { createBridge, getTheme } from '@samurai/bridge';
import { palette, sizes } from '@samurai/design';
import { useState } from 'react';
import styled, { ThemedStyledProps, ThemeProvider } from 'styled-components';

export type Size = 'none' | 'small' | 'middle' | 'large' | 'super';
export interface ITheme {
  backgroundColor: string
  spacing: Record<Size, number>
  borderRadius: Record<Size, number>
  boxShadow: string
}

/* eslint-disable-next-line */
export interface ThemeProps {
  children?: any
}

export type ThemedStyledWidthProps<P = {}> = ThemedStyledProps<P, ITheme>

const StyledTheme = styled.div`
  color: pink;
`;
const bridge = createBridge(window)


export function Theme(props: ThemeProps) {
  const [theme, setTheme] = useState(getTheme());
  bridge.subscription('THEME', (data) => {
    setTheme(data.payload)
  })

  return (
    <ThemeProvider theme={{
      backgroundColor: theme === 'dark' ? palette.text_0 : palette.bg_1,
      spacing: {
        small: sizes.spacing_8,
        middle: sizes.spacing_16,
        large: sizes.spacing_24,
        super: sizes.spacing_32,
        none: sizes.spacing_0,
      },
      borderRadius: {
        small: sizes.spacing_8,
        middle: sizes.spacing_12,
        large: sizes.spacing_16,
        super: sizes.spacing_24,
        none: sizes.spacing_0,
      },
      boxShadow: `0px 0px 10px 1px ${palette.boxShadow}`
    }}>
      {props.children}
    </ThemeProvider>
  );
}

export default Theme;
