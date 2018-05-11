let env = 'production';
const { location: { hostname } } = window;
if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.indexOf('dev') >= 0) env = 'development';
if (hostname.indexOf('staging') >= 0) env = 'staging';
if (hostname.indexOf('test') >= 0) env = 'test';
if (hostname.indexOf('demo') >= 0) env = 'demo';

switch (env) {
  case 'test':
    break;
  case 'production':
    break;
  case 'development':
  default:
    break;
}

export const ENV = env;
export const API = `${hostname}:5005`;
