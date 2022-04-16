import { BrowserRouter, Route, Routes } from 'react-router-dom'

export interface RouterConfig {
  path: string,
  component: (props: any) => JSX.Element,
  children?: RouterConfig[]
}

export interface INavigatorProps {
  config: RouterConfig[]
}

export function Navigator(props: INavigatorProps) {
  const renderRouter = (config: RouterConfig[]) => {
    return config.map(({ path, component: Componen, children }) => children && Array.isArray(children) ? (<Route path={path} element={<Componen />}>{renderRouter(children)}</Route>) : (<Route path={path} element={<Componen />} />))
  }

  return (
    <BrowserRouter>
      <Routes>
        {renderRouter(props.config)}
      </Routes>
    </BrowserRouter>
  )
}
