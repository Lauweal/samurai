import { useNavigate } from 'react-router-dom'

export const Home = (props: any) => {
  const navigate = useNavigate()
  const back = () => {
    window.history.back()
  }
  return (
    <div>
      <div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => navigate('/we')}>1</div>
      <div style={{ width: '100px', height: '100px', background: '#ddd' }} onClick={() => back()}>2</div>
    </div>
  )
}
