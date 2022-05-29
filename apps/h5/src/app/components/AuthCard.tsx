import { Avatar, Card, Text } from "@samurai/components";
import { imagesAssets } from "@samurai/design";
import styled from "styled-components";


const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`


export function AuthCard() {
  const cardNo = (id: string) => {
    const pass = new Array(id.length - 9).fill("*").join("");
    console.log([id.slice(0, 5), pass, id.slice(id.length - 4, id.length)]);
    return [id.slice(0, 5), pass, id.slice(id.length - 4, id.length)].join("");
  }

  return (
    <Card height={220} image={imagesAssets.vip}>
      <StyledBox>
        <StyledTitle>
          <StyledContent>
            <Text type='h2' color='#fff' bold>Soratani</Text>
            <Text type='body5' color='#fff' bold>2022-04-19</Text>
          </StyledContent>
          <Avatar src={imagesAssets.avatar} />
        </StyledTitle>
        <StyledContent>
          <Text type='h4' color='#fff' bold>识别码</Text>
          <Text type='h5' color='#fff' bold>{cardNo('167523129023984798162873512')}</Text>
        </StyledContent>
      </StyledBox>
    </Card>
  )
}
