import { Dispatch, connectStore, Link } from '@elux/react-taro';
import { FC, useCallback } from 'react';
import { APPState, GetActions } from '@/Global';
import { View } from '@tarojs/components';
import { Button } from '@taroify/core';
import { ModuleState } from '../../model';


// const { word: wordActions } = GetActions('word');
function mapStateToProps(appState: APPState): ModuleState {
  const { content } = appState.other!
  return { content };
}
const Component: FC<ModuleState & { dispatch: Dispatch }> = ({ dispatch, content }) => {
  const handleClick = useCallback(() => {
    dispatch(GetActions('other').other.toOtherDetail())
  }, [])
  return (
    <View>
      这是other-index
      {content}
      <Button onClick={handleClick}>详情</Button>
    </View>

  );
};

export default connectStore(mapStateToProps)(Component);
