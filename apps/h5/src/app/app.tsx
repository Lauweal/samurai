import styled from 'styled-components';
import home from 'apps/h5/src/app/conatiners/Home/router'
import user from 'apps/h5/src/app/conatiners/User/router'
import { Navigator } from '../navigators';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Navigator config={[...home, ...user]} />
    </StyledApp>
  );
}

export default App;
