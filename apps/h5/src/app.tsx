import styled from 'styled-components';
import { GlobalStyle, Theme } from '@samurai/components';
import { home, user, chat } from './app/conatiners'
import { Navigator } from './navigators';

const StyledApp = styled.div`
  min-height: 100vh;
`;

export function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Theme>
        <Navigator config={[...home, ...user, ...chat]} />
      </Theme>
    </StyledApp>
  );
}

export default App;
