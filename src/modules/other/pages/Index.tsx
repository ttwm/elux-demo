import { EluxPage, injectModule } from '@elux/react-taro';
import other from '../index'
injectModule(other)

definePageConfig({
  navigationBarTitleText: 'other分包index页面',
});

export default EluxPage;
