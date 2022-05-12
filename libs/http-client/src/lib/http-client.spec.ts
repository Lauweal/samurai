import { HttpClient } from './http-client';

describe('httpClient', () => {
  it('should work', () => {
    const client = new HttpClient({ host: '0.0.0.0', port: 3333, protocol: 'http' })
    // return client.get('/api/auth/hasAccount').then((res) => expect(res).toEqual('1'))
    // // console.log(res)
    // // // expect(httpClient()).toEqual('http-client');
    // // done();
  });
});
