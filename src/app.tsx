import { createApp } from '@elux/react-taro';
import { appConfig } from './Project';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App(props: any) {
  const Provider = createApp(appConfig);
  return <Provider>{props.children} </Provider>;
}

export default App
