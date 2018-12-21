import axios from 'axios';

//vue axios 处理 请求
import router from '@/router';

const URL = 'http://47.75.81.9:7000/';

//axios 全局配置 发送请求时携带cookie信息 跨域配置 需服务器端配合

//axios.defaults.withCredentials = true

//const URL = 'http://192.168.31.51:7000/'
//const URL='/'
axios.interceptors.response.use( //拦截器
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:  
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
const axiosType = (type, path, data) => {
    if(type === 'get'){
      return axios({
          method: type,
          url: path,
          params: data
        })
    }else if(type ==='post'){
      return axios({
          method: type,
          url:path,
          data: data
        })
    }
}
const http = (type, path, data) => {
  return axiosType(type, path, data)
        .then(res => {
          if (res.status == 200) {
            return res.data;
          }
        })
        .catch(res => {
          return {
            success: false
          }
        });
}
/**
 * 得到 快讯
 *
 * @param {any} data
 */
export const getQuickNews=(data)=>http('get',URL+'news', data);
/**
 * 得到 文章
 *
 * @param {any} data
 */

 export const getArticles=(data)=>http('get',URL+'articles', data);

/**
 * 登录
 *
 * @param {any} data
 */

export const login= (data) => http('post', URL+'signin', data);
/**
 * 发送邮件验证码
 *
 * @param {any} data
 */
export const sendEmailCode= (data) => http('post', URL+'sendEmailCode', data);
/**
 * 重置密码发送邮件验证码
 *
 * @param {any} data
 */
export const repasswordSendEmailCode= (data) => http('post', URL+'resetPasswordCode', data);
/**
 * 注册
 *
 * @param {any} data
 */

export const regist= (data) => http('post',URL+ 'register', data);
/**
 * 忘记密码
 *
 * @param {any} data
 */

export const forget= (data) => http('post',URL+ 'resetPassword', data);

/**
 * 退出登录
 *
 * @param {any} data
 */
export const signout= (data) => http('post',URL+ 'signout', data);

/**
 * 通过token登录，并获取登录信息 三方登录
 *
 * @param {any} data
 */
export const loginToken = (data) => http('post',URL+ 'accesstoken', data);

/**
 * 得到用户信息
 * 
 * @param {any} data 
 */
export const getRightUserInfo = (data) => http('get', URL+'userInfo',data);
/**
 * 评论
 * 
 * @param {any} data 评论数据等
 */ 
export const postReplies = (topic_id,data) => http('post',URL+'topic',data);
/**
 * 获取行情数据 （暂biance）前端
 * 
 * @param {any} data 行情数据
 */ 
export const getKlineData = (data) =>http('get','https://api.bibox.com/v1/mdata?cmd=kline&pair=BIX_BTC&period=1min&size=150',data)

/**
 * 获取 交易对 现价 涨幅
 * 
 * @param {any} data 行情数据
 */

export const getPrice = (data) =>http('get',URL+'ticker',data)

/**
 * 获取 币种信息
 * 
 * @param {any} data 币种信息
 */

export const getCoinInfo = (data) =>http('get',URL+'coinDetails',data)



 /**
 * 更改用户信息
 * 
 * @param {any} data 
 */
export const upDateUserInfo = (data) =>http('post',URL+'changeInfo',data)



/**
 * 获取用户信息
 * 
 * @param {any} data 
 */
export const getUserInfo = (data) =>http('get',URL+'userInfo',data)


 /**
 * 获取交易对
 * 
 * @param {any} data 
 */
export const getSymbols = (data) =>http('get','http://localhost:3000/allsymbols',data)

/**
* 新闻收藏
* 
* @param {any} data 
*/

export const collect=(data)=>http('get',URL+'collection',data)

/**
* 新闻评价
* 
* @param {any} data 
*/

export const judge=(data)=>http('post',URL+'discuss',data)


/**
 *新闻评论 点赞
 * 
 * @param {any} data 
 */

export const zan=(data)=>http('get',URL+'favoriteComments',data)



/**
 *搜索
 * 
 * @param {any} data 
 */


 export const search=(data)=>http('post',URL+'search',data)



 /**
 *获取评论
 * 
 * @param {any} data 
 */

export const getJudge=(data)=>http('get',URL+'getComments',data)


/**
 *获取浏览记录
 * 
 * @param {any} data 
 */

 export const record=(data)=>http('get',URL+'getArticlesHistory',data)

 /**
 *获取收藏
 * 
 * @param {any} data 
 */

 export const getcollection=(data)=>http('get',URL+'getCollection',data)


 /**
 *获取邀请记录
 * 
 * @param {any} data 
 */

 export const getInviteRecord=(data)=>http('get',URL+'inviteRecord',data)


 /**
 *获取币种价格历史走向数据
 * 
 * @param {any} data 
 */

 export const getCoinHistory=(data)=>http('post',URL+'coinHistory',data)