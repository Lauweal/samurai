import { useNavigate } from 'react-router-dom'
import { getStatusBarHeight } from '@samurai/bridge'

export const Home = (props: any) => {
  const navigate = useNavigate()
  const back = () => {
    window.history.back()
  }
  return (
    <div style={{ paddingTop: `${getStatusBarHeight()}px` }}>
      <button style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => navigate('/user/we')}>1</button>
      <div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => navigate(-1)}>2</div>
    </div>
  )
}
