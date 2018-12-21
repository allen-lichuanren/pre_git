import Vue from 'vue';
import Router from 'vue-router';
import store from '@/vuex/store';

Vue.use(Router);

const router = new Router({
  routes: [{
      path: '/',
      component: resolve => require(['@/view/deepNews/index.vue'], resolve),
    },
    {
      path: '/conjuncture',
      component: resolve => require(['@/view/index/index.vue'], resolve),
      meta: {
        title: '行情(Alpha)',
      }
    },
    {
      path: '/conjuncture_en',
      component: resolve => require(['@/view/index/index_en.vue'], resolve),
    },
    {
      path: '/conjuncture_td',
      component: resolve => require(['@/view/index/index_td.vue'], resolve),
      meta: {
        title: '行情(Alpha)',
      }
    },
    //币种深度新闻
    {
      path: '/coinDeepNews',
      component: resolve => require(['@/view/deepNews/singleNews.vue'], resolve),
      meta: {
        title: '币种深度新闻(Alpha)',
      }
    },
    {
      path: '/coinDeepNews_td',
      component: resolve => require(['@/view/deepNews/singleNews_td.vue'], resolve),
      meta: {
        title: '幣種深度新聞(Alpha)',
      }
    },
    //深度新闻

    {
      path:'/deepNews',
      component:resolve=>require(['@/view/deepNews/index.vue'],resolve),
      meta: {
        title: '深度新闻(Alpha)'
      }
    },
    {
      path:'/deepNews_td',
      component:resolve=>require(['@/view/deepNews/index_td.vue'],resolve),
      meta: {
        title: '深度新聞(Alpha)'
      }
    },

    //快讯
    {
      path:'/quickNews',
      component:resolve=>require(['@/view/quickNews/index.vue'],resolve),
      meta: {
        title: '快讯(Alpha)'
      }
    },

    {
      path:'/quickNews_td',
      component:resolve=>require(['@/view/quickNews/index_td.vue'],resolve),
      meta: {
        title: '快訊(Alpha)'
      }
    },

    //新闻详情

    {
      path:'/newsDetail',
      component:resolve=>require(['@/view/deepNews/detail.vue'],resolve),
      meta: {
        title: '新闻详情(Alpha)'
      }
    },

    {
      path:'/newsDetail_td',
      component:resolve=>require(['@/view/deepNews/detail_td.vue'],resolve),
      meta: {
        title: '新聞詳情(Alpha)'
      }
    },

    //登录

    {
      path:'/login',
      component:resolve=>require(['@/view/login/index.vue'],resolve),
      meta: {
        title: '登录(Alpha)'
      }
    },

    {
      path:'/login_td',
      component:resolve=>require(['@/view/login/index_td.vue'],resolve),
      meta: {
        title: '登錄(Alpha)'
      }
    },

    //注册
    {
      path:'/regist',
      component:resolve=>require(['@/view/login/regist.vue'],resolve),
      meta: {
        title: '注册(Alpha)'
      }
    },

    {
      path:'/regist_td',
      component:resolve=>require(['@/view/login/regist_td.vue'],resolve),
      meta: {
        title: '註冊(Alpha)'
      }
    },
    //忘记密码
    {
      path:'/forget',
      component:resolve=>require(['@/view/login/forget.vue'],resolve),
      meta: {
        title: '忘记密码(Alpha)'
      }
    },

    {
      path:'/forget_td',
      component:resolve=>require(['@/view/login/forget_td.vue'],resolve),
      meta: {
        title: '忘記密碼(Alpha)'
      }
    },

    //个人中心
    {
      path:'/personalCenter',
      component:resolve=>require(['@/view/user/index.vue'],resolve),
      meta: {
        title: '个人中心(Alpha)'
      }
    },

    {
      path:'/personalCenter_td',
      component:resolve=>require(['@/view/user/index_td.vue'],resolve),
      meta: {
        title: '個人中心(Alpha)'
      }
    },

    //免责声明
    {
      path:'/disclaimer',
      component:resolve=>require(['@/view/doc/disclaimer.vue'],resolve),
      meta: {
        title: '免责声明(Alpha)'
      }
    },
    {
      path:'/disclaimer_td',
      component:resolve=>require(['@/view/doc/disclaimer_td.vue'],resolve),
      meta: {
        title: '免責聲明(Alpha)'
      }
    },

    //常见问题
    {
      path:'/faq',
      component:resolve=>require(['@/view/doc/faq.vue'],resolve),
      meta: {
        title: '常见问题(Alpha)'
      }
    },
    {
      path:'/faq_td',
      component:resolve=>require(['@/view/doc/faq_td.vue'],resolve),
      meta: {
        title: '常見問題(Alpha)'
      }
    },

    //app kline webview
    {
      path:'/webview_kline',
      component:resolve=>require(['@/view/webview/kline.vue'],resolve)
    },

    

    /*{
      path: '/topic',
      component: resolve => require(['@/view/articleDetails/index.vue'], resolve),
    },
    {
      path: '/login',
      component: resolve => require(['@/view/login/index.vue'], resolve),
    },
    {
      name:'user',
      path: '/user/:name',
      component: resolve => require(['@/view/user/index.vue'], resolve),
    },
    {
      name:'msg',
      path: '/msg',
      component: resolve => require(['@/view/msg/index.vue'], resolve),
      meta: {
        requireAuth: true, 
      },
    },
    {
      name:'create',
      path: '/create',
      component: resolve => require(['@/view/newTopic/index.vue'], resolve),
      meta: {
        requireAuth: true,
      },
    }*/
  ],
  //定义页面切换 浏览器滚动行为 只兼容支持history.pushState的浏览器 
  scrollBehavior (to, from, savedPosition) {
    if(to.path!=='/deepNews'&&to.path!=='/deepNews_td'){
        return { x: 0, y: 0 }
    }else{
      return {}
    }
  }
});


//导航守卫 to 即将要进入的目标 路由对象 确保要调用 next 方法，否则钩子就不会被 resolved
router.beforeEach((to, from, next) => {

    if(to.path.substr(to.path.length-2)=='td'){
        //store.getters.getLan='td';
        store.commit('COM_SET_LAN','td')
    }else{
        store.commit('COM_SET_LAN','')

    }
    if(to.path=='/'){
      next({path:'/deepNews'});
    }else{
      next();
    }
     /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()

    /*if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
       const token = store.getters.getToken;
      token.length ? next({path:to.path+str,query: { redirect: to.fullPath }}):next({path: '/login'+str,query: { redirect: to.fullPath }});
    } else {
        next({path:to.path+str,query: { redirect: to.fullPath }});
    }*/
})

export default router;