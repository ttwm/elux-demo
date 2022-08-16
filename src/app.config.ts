export default defineAppConfig({
  pages: [
    'modules/root/pages/home',
    'modules/other/pages/index',
  ],
  subPackages: [
    {
      root: 'modules/other/package',
      name: 'subOther',
      pages: [
        'pages/detail'
      ],
    }
  ],
  tabBar: {
    list: [{
      pagePath: 'modules/root/pages/home', text: 'home'
    }, {
      pagePath: 'modules/other/pages/index', text: 'other'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
