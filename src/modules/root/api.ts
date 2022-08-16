class Api {
    getRootContent(): Promise<string> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('root模块的content')
            }, 500)
        })
    }
}
export default new Api()