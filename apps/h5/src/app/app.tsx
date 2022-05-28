import styled from 'styled-components';
import home from './conatiners/Home/router';
import user from './conatiners/User/router';
import { Navigator } from '../navigators';
import { GlobalStyle } from '@samurai/components';

const StyledApp = styled.div`
  min-height: 100vh;
`;

export function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Navigator config={[...home, ...user]} />
    </StyledApp>
  );
}

export default App;
