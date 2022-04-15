import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './conatiners/home'
import { We } from './conatiners/we'
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/we' element={<We />} />
        </Routes>
      </BrowserRouter>
      {/* <NxWelcome title="h5" /> */}
    </StyledApp>
  );
}

export default App;
