import { AuthCard } from '../components'
import { ThemedStyledWidthProps } from '@samurai/components'
import { HttpClient, Protocol } from '@samurai/http-client'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const { hostname, port, protocol } = window.location
const client = new HttpClient({ protocol: protocol.split(":").join("") as Protocol, host: hostname, port: Number(port) })

const Container = styled.div<ThemedStyledWidthProps>`
  min-height: 100%;
  box-sizing: border-box;
  position: relative;
`
const ContentStyle = styled.div<ThemedStyledWidthProps>`
  position: absolute;
  bottom: 0;
  z-index: 100;
  height: calc(100vh - 290px);
  width: 100%;
  background-color: #fff;
  border-radius: ${((props: ThemedStyledWidthProps) => `${props.theme.borderRadius.large}px`)};
  box-shadow: ${((props: ThemedStyledWidthProps) => `${props.theme.boxShadow}`)};
`

export const User = (props: any) => {
  const navigate = useNavigate()
  return (
    <Container>
      <AuthCard />
      <ContentStyle />
    </Container>
  )
}
