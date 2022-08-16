class Api {
    getOtherContent(): Promise<string> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Other模块的content')
            }, 500)
        })
    }
}
export default new Api()