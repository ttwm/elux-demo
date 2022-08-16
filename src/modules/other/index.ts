//封装并导出本模块
import { exportModule } from '@elux/react-taro';
import main from './views/Main';
import { Model } from './model';

const other = exportModule('other', Model, { main });
export default other;