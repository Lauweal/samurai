import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import Debug from 'vconsole'
import App from './app/app';

const debug = new Debug()
const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
