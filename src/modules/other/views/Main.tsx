//通常模块可以定义一个根视图，根视图中显示什么由模块自行决定，父级不干涉，相当于子路由
import { exportView } from '@elux/react-taro';
import { FC } from 'react';
import Index from './Index';
import { ModuleState } from '../model';

const Component: FC<ModuleState> = ({ curView }) => {
  return <Index />;
};

export default exportView(Component);
