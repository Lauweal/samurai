import { HttpClient } from '@samurai/http-client'
import { useNavigate } from 'react-router-dom'
const client = new HttpClient({ protocol: 'http', host: '192.168.2.2', port: 3333 })

export const User = (props: any) => {
  client.get('/api/auth/reloadToken')
  const navigate = useNavigate()
  return (<div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => navigate(-1)}>user</div>)
}
