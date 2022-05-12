import styled, { createGlobalStyle } from 'styled-components';
import home from './conatiners/Home/router';
import user from './conatiners/User/router';
import { Navigator } from '../navigators';

const StyledApp = styled.div`
  // Your style here
`;

const GlobalStyle = createGlobalStyle`
  html,body{
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`

export function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Navigator config={[...home, ...user]} />
    </StyledApp>
  );
}

export default App;
