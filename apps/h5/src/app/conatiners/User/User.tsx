import { useNavigate } from 'react-router-dom'

export const User = (props: any) => {
  const navigate = useNavigate()
  return (<div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => navigate(-1)}>user</div>)
}
