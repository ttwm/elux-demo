import { Dispatch, connectStore } from '@elux/react-taro';
import { FC, useEffect } from 'react';
import { APPState, GetActions } from '@/Global';
import { View } from '@tarojs/components';
import { ModuleState } from '@/modules/other/model';

function mapStateToProps(appState: APPState): ModuleState {
    // 这里state全都来自other模块
    const { content } = appState.other!
    return { content };
}
const { other: otherAction } = GetActions('other')
const Component: FC<ModuleState & { dispatch: Dispatch }> = ({ dispatch, content }) => {
    useEffect(() => {
        dispatch(otherAction.getContent());
    }, [])
    return (
        <View>
            这是other-detail
            <View>{content}</View>
        </View>
    );
};

export default connectStore(mapStateToProps)(Component);
