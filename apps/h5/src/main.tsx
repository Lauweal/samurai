import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as Sentry from "@sentry/react";
import { HttpClient, HttpClientPlugin } from '@samurai/http-client'
import { BrowserTracing } from "@sentry/tracing";
import Debug from 'vconsole'
import App from './app/app';
const debug = new Debug()

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
Sentry.init({
  dsn: "https://779feffb65f8427496858ecbcd5676db@o937351.ingest.sentry.io/6378023",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  debug: true,
  sendClientReports: true,
  attachStacktrace: true,
});
const client = new HttpClient({ protocol: 'http', host: 'localhost', port: 3333 })
client.get('/api/auth/reloadToken')
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
