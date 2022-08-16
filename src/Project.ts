//该文件可以看作应用的配置文件
import { AppConfig, setConfig } from '@elux/react-taro';
import { parse, stringify } from 'query-string';
import root from '@/modules/root';
import other from '@/modules/other';
// 以下分包加载
import type { SubOther } from '@/modules/other/package'


//定义模块的获取方式，小程序中不支持import(...)方式异步按需加载
//如果要使用分包加载，请返回一个空的对象，并断言其类型，如以下的`shop`模块
//注意key名必需和模块名保持一致
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const ModuleGetter = {
    root: () => root, //基座
    // 因为在tabbar中需要展示该模块的数据，所以other model只能放入主包中
    other: () => other,
    // 除了tabbar之外，other业务模块分包加载
    subOther: () => ({} as SubOther)
};

//Elux全局设置，参见 https://eluxjs.com/api/react-web.setconfig.html
export const appConfig: AppConfig = setConfig({
    StageModuleName: 'root',
    ModuleGetter,
    //Elux并没定死怎么解析路由参数，你可以使用常用的'query-string'或者'json'
    //只需要将parse(解析)和stringify(序列化)方法设置给Elux
    QueryString: { parse, stringify },
    //因为小程序的路由与目录结构是强关联的，此处可以与Elux中的虚拟路由做映射
    NativePathnameMapping: {
        // 原生路由转为elux路由
        in(nativePathname) {
            if (nativePathname === '/') {
                nativePathname = '/modules/root/pages/home';
            }
            const subPackage = {
                'other': 'subOther'
            };
            // 根据demo中分包的目录结构调整路由
            if (nativePathname.indexOf('package') > -1) {
                // '/modules/other/package/pages/detail'
                nativePathname = nativePathname.replace(/^\/modules\/(\w+)\/package\/pages\//, (match: string, moduleName: string) => `${subPackage[moduleName]}/`);
            }
            return nativePathname.replace(/^\/modules\/(\w+)\/pages\//, (match: string, moduleName: string) => `/${moduleName}/`);
        },
        // elux路由转为原生路由
        out(internalPathname) {
            //小程序page中并没有admin
            const url = internalPathname.replace(/^\/(\w+)\//, '/modules/$1/pages/')
            return url;
        },
    },
});

export type IModuleGetter = typeof ModuleGetter;
