import { APPState, Modules } from "@/Global";
import { connectStore, Dispatch } from "@elux/react-taro"
import { View } from "@tarojs/components";
import { FC, useEffect } from "react";
import { Navbar } from "@taroify/core"
import { Divider } from "@taroify/core"
import { ModuleState } from "../../model";
import styles from './index.module.less'

interface MainProps extends ModuleState {
    otherContent?: string; // other模块的content
    content?: string;
}
function moduleStateToProps(appState: APPState): MainProps {
    const { content: otherContent } = appState.other!
    const { content: rootContent } = appState.root!
    return { otherContent, content: rootContent }
}
/**
 * 小程序首页 取得一些其他模块的数据展示
 * @param param0 
 * @returns 
 */
const Component: FC<MainProps & { dispatch: Dispatch }> = ({ dispatch, otherContent, content }) => {
    useEffect(() => {
        // 获取other模块的数据
        dispatch(Modules.other.actions.getContent())
    }, [])
    return (
        <View className={styles.wrapper}>
            <Navbar title='首页' />
            <Divider>展示root模块数据</Divider>
            <View className={styles.content}>{content}</View>
            <Divider>展示other模块数据</Divider>
            <View className={styles.content}>{otherContent}</View>
        </View>
    );
};
export default connectStore(moduleStateToProps)(Component) 