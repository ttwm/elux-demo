import { EmptyModel, exportModule } from '@elux/react-taro';
import main from './views/Main';
/**
 * other 的分包
 */
const subOther = exportModule('subOther', EmptyModel, { main });
export default subOther;
export type SubOther = typeof subOther;