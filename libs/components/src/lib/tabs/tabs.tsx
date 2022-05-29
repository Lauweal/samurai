import { Children, cloneElement, isValidElement } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import Text from '../text/text';
import { ThemedStyledWidthProps } from '../theme/theme';
import { Item } from './item';

interface StyleProps {
  isActive?: boolean
  width?: number
}

/* eslint-disable-next-line */
export interface TabsProps {
  children?: JSX.Element | JSX.Element[]
}

const StyledTabs = styled.div`
  color: pink;
`;

const StyledTabItem = styled.div<ThemedStyledWidthProps<StyleProps>>`
  position: relative;
  z-index: 1;
  text-align: center;
  min-width: 20px;
  border-radius: ${(props: ThemedStyledWidthProps<StyleProps>) => `${props.theme.spacing.small}px`};
  padding: ${(props: ThemedStyledWidthProps<StyleProps>) => `${props.theme.spacing.none}px ${props.theme.spacing.middle}px`};
  & span {
    color: #000;
  }
`

const StyledTab = styled.div<ThemedStyledWidthProps<StyleProps>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`
const StyledActive = styled.span<ThemedStyledWidthProps<StyleProps>>`
  display: flex;
  transition: all 0.4s ease 0s;
  position: absolute;
  z-index: 0;
  height: 100%;
  transform: translateX(0px);
  width: ${(props: ThemedStyledWidthProps<StyleProps>) => `${props.width ? props.width : props.theme.spacing.middle * 2 + 20}px`};
  background-color: ${(props: ThemedStyledWidthProps<StyleProps>) => props.isActive ? 'red' : ''};
`
const StyledActiveBox = styled.b<ThemedStyledWidthProps<StyleProps>>`
  display: inline-block;
  flex: 1;
  height: 100%;
  background-color: ${(props: ThemedStyledWidthProps<StyleProps>) => props.isActive ? 'red' : ''};
  border-radius: ${(props: ThemedStyledWidthProps<StyleProps>) => `${props.theme.spacing.small}px ${props.theme.spacing.small}px ${props.theme.spacing.none}px ${props.theme.spacing.none}px`};
`

export function Tabs(props: TabsProps) {
  const renderTabs = (children: JSX.Element | JSX.Element[]) => {
    const childs = Array.isArray(children) ? children : [children];
    return (
      <StyledTab>
        <StyledActive><StyledActiveBox isActive /></StyledActive>
        {Children.map(childs, (child) => {
          const { type, props } = child
          if (!isValidElement(child) || type !== Item) return null
          const { name, tab } = props
          return <StyledTabItem isActive={tab == '1'} key={tab}><Text type='body3'>{name}</Text></StyledTabItem>
        })
        }
      </StyledTab>
    )
  }
  return (
    <StyledTabs>
      {renderTabs(props.children || [])}
      {props.children}
    </StyledTabs>
  );
}

Tabs.Item = Item;

export default Tabs;
