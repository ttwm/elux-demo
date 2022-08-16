import { exportModule } from "@elux/react-taro";
import { Model } from "./model";
import main from './views/Main'
/**
 * 根模块（基座）
 */
export default exportModule('root', Model, { main });
