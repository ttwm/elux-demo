//定义本模块的业务模型
import { APPState } from '@/Global';
import { BaseModel, effect, reducer } from '@elux/react-taro';
import Taro from '@tarojs/taro';
import pathToRegexp from 'path-to-regexp';
import api from './api';
import { CurView } from './entity';
//定义本模块的状态结构
//通常都是`列表/详情/编辑`结构
export interface ModuleState {
    curView?: CurView; //该字段用来表示当前路由下展示本模块的哪个View
    content?: string;
}

//每个不同的模块都可以在路由中提取自己想要的信息
interface RouteParams {
    curView?: CurView;
}

//定义本模块的业务模型，必需继承BaseModel
//模型中的属性和方法尽量使用非public
export class Model extends BaseModel<ModuleState, APPState> {
    protected routeParams!: RouteParams; //保存从当前路由中提取的信息结果

    //因为要尽量避免使用public方法，所以构建this.privateActions来引用私有actions
    protected privateActions = this.getPrivateActions({ updateContent: this.updateContent });

    //提取当前路由中的本模块感兴趣的信息
    protected getRouteParams(): RouteParams {
        const { pathname } = this.getRouter().location;
        const [, , curViewStr = ''] = pathToRegexp('/:other/:curView').exec(pathname) || [];
        const curView: CurView | undefined = CurView[curViewStr] || undefined;
        return { curView };
    }

    //每次路由发生变化，都会引起Model重新挂载到Store
    //在此钩子中必需完成ModuleState的初始赋值，可以异步
    //在此钩子执行完成之前，本模块的View将不会Render
    //在此钩子中可以await数据请求，等所有数据拉取回来后，一次性Render
    //在此钩子中也可以await子模块的mount，等所有子模块都挂载好了，一次性Render
    //也可以不做任何await，直接Render，此时需要设计Loading界面
    public async onMount(env: 'init' | 'route' | 'update'): Promise<void> {
        this.routeParams = this.getRouteParams();
        const { curView } = this.routeParams;
        const { content: _content } = this.getPrevState() || {};
        const content = _content || await api.getOtherContent()
        const initState: ModuleState = {
            curView,
            content
        };
        this.dispatch(this.privateActions._initState(initState));
    }
    @reducer
    protected updateContent(content: string): ModuleState {
        return { ...this.state, content }
    }

    @effect()
    public async toOtherDetail(): Promise<void> {
        Taro.navigateTo({ url: '/modules/other/package/pages/detail' })
    }
    @effect()
    public async toOtherList(): Promise<void> {
        const router = this.getRouter();
        router.back(1, 'window');
    }
    @effect()
    public async getContent(): Promise<void> {
        api.getOtherContent().then(content => {
            this.dispatch(this.privateActions.updateContent(content))
        })
    }
}
