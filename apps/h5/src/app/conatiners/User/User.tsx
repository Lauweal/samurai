import { HttpClient } from '@samurai/http-client'
import { useNavigate } from 'react-router-dom'
const client = new HttpClient({ protocol: 'http', host: 'localhost', port: 4200 })

export const User = (props: any) => {
  const navigate = useNavigate()
  return (<div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => {
    client.get('/api/auth/reloadToken')
  }}>user</div>)
}
