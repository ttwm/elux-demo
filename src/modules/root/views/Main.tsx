import { APPState, LoadComponent } from "@/Global";
import { connectStore, Switch } from "@elux/react-taro"
import { View } from "@tarojs/components";
import { FC } from "react";
import { SubModule } from "../entity"
import { ModuleState } from "../model";
import Home from './Home'

// 这里是本模块所有view渲染的地方，根据view信息渲染相关的页面
interface MainProps extends ModuleState {

}
function moduleStateToProps(appState: APPState): MainProps {
    const { curView, subModule } = appState.root!
    return { curView, subModule }
}
/**
 * 加载子模块的组件
 */
const SubModuleViews: { [moduleName: string]: () => JSX.Element } = Object.keys(SubModule).reduce((cache, moduleName) => {
    cache[moduleName] = LoadComponent(moduleName as any, 'main');
    return cache;
}, {});
const Component: FC<MainProps> = ({ curView, subModule }) => {
    return (
        <View>
            <Switch elseView={<>404 root</>}>
                {subModule && Object.keys(SubModule).map(moduleName => {
                    if (moduleName === subModule) {
                        const SubView = SubModuleViews[subModule];
                        return <SubView />
                    } else {
                        return null
                    }
                })}
                {curView === 'home' && <Home />}
            </Switch>
        </View>
    );
};

export default connectStore(moduleStateToProps)(Component) 