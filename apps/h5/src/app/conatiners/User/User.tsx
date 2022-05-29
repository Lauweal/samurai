import { Tabs, ThemedStyledWidthProps } from '@samurai/components'
import { HttpClient, Protocol } from '@samurai/http-client'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthCard, BoxCard } from '../../components'

const { hostname, port, protocol } = window.location
const client = new HttpClient({ protocol: protocol.split(":").join("") as Protocol, host: hostname, port: Number(port) })

const Container = styled.div<ThemedStyledWidthProps>`
  height: 1000px;
  & > div {
    margin-bottom: ${(props: ThemedStyledWidthProps) => `${props.theme.spacing.middle}px`};
  }
`
export const User = (props: any) => {
  const navigate = useNavigate()
  return (
    <Container>
      <AuthCard />
      <BoxCard />
    </Container>
  )
}
