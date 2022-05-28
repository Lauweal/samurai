import { HttpClient, Protocol } from '@samurai/http-client'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthCard } from './components/AuthCard'

const { hostname, port, protocol } = window.location
const client = new HttpClient({ protocol: protocol.split(":").join("") as Protocol, host: hostname, port: Number(port) })

const Container = styled.div`
  height: 1000px;
`
export const User = (props: any) => {
  const navigate = useNavigate()
  return (
    <Container>
      <AuthCard />
    </Container>
  )
}
