//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import { connectStore, Switch } from '@elux/react-taro';
import { FC } from 'react';
import { APPState } from '@/Global';
import { CurView } from '@/modules/other/entity';
import Detail from './Detail';

export interface StoreProps {
  curView?: CurView;
}

function mapStateToProps(appState: APPState): StoreProps {
  const { curView } = appState.other!
  return { curView };
}

const Component: FC<StoreProps> = ({ curView }) => {

  return (
    <Switch elseView={<>404</>}>
      {curView === CurView.detail && <Detail />}
    </Switch>
  );
};

export default connectStore(mapStateToProps)(Component);
