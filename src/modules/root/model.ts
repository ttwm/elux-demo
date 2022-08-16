import { APPState } from "@/Global";
import { BaseModel, effect, reducer } from "@elux/react-taro";
import pathToRegexp from "path-to-regexp";
import api from "./api";
import { CurView, SubModule } from "./entity";

// 根模块包含的状态
export interface ModuleState {
    subModule?: SubModule; // 当前子模块
    curView?: CurView; // 当前视图（页面）
    globalLoading?: boolean; // 全局loading状态
    content?: string; //展示数据
}
// 根模块路由信息
export interface RouteParams {
    pathname?: string;
    subModule?: SubModule; // 当前子模块
    curView?: CurView; // 当前视图（页面）
}

/**
 * 基座model
 * 其他模块都是基座的子模块
 * 其他页面是基座的子路由
 */
export class Model extends BaseModel<ModuleState, APPState>{
    // 获取私有actions 同时返回操作state的方法用来
    protected pActions = this.getPrivateActions({ setContent: this.setContent });

    protected routeParams!: RouteParams; //保存从当前路由中提取的信息结果

    // 提取路由中信息
    protected getRouteParams(): RouteParams {
        const { pathname } = this.getRouter().location;
        // 在基座中可以渲染子模块也可以渲染本模块的view，所以要关心subModule、curView
        const [, subModuleStr = '', curViewStr = ''] = pathToRegexp('/:subModule/:curView', undefined, { end: false }).exec(pathname) || [];
        const subModule: SubModule | undefined = SubModule[subModuleStr] || undefined;
        const curView: CurView | undefined = CurView[curViewStr] || undefined;
        return { pathname, subModule, curView };
    }
    // 钩子：在此必须初始化moduleState
    public async onMount(env: "init" | "route" | "update"): Promise<void> {
        this.routeParams = this.getRouteParams();
        const { subModule, curView } = this.routeParams;
        const { content: _content } = this.getPrevState() || {};
        //首页需要展示other模块的数据，所以要等待other挂载
        try {
            const content = _content || await api.getRootContent()
            const initState: ModuleState = { subModule, curView, content };
            this.dispatch(this.pActions._initState(initState))
            await this.store.mount('other', 'init')
        } catch (error) {
            console.log('error', error)
        }

    }

    @reducer
    protected setContent(content: string): ModuleState {
        return { ...this.state, content }
    }

    @effect()
    public async fentchWord(): Promise<void> {
        api.getRootContent().then(content => {
            this.dispatch(this.pActions.setContent(content))
        })
    }
}