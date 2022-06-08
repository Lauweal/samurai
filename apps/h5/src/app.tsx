import styled from 'styled-components';
import { GlobalStyle, Theme } from '@samurai/components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AllRoute } from './router'

const StyledApp = styled.div`
  min-height: 100vh;
`;

export function App() {
  return (
    <StyledApp>
      <GlobalStyle />
      <Theme>
        <Router>
          <AllRoute />
        </Router>
      </Theme>
    </StyledApp>
  );
}

export default App;
