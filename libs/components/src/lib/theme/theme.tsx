import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ThemeProps { }

const StyledTheme = styled.div`
  color: pink;
`;

export function ThemeProvider(props: ThemeProps) {
  return (
    <StyledTheme>
      <h1>Welcome to Theme!</h1>
    </StyledTheme>
  );
}

export default ThemeProvider;
