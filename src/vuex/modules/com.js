import * as types from '../types';
import router from '@/router';

let Cookies = require('js-cookie');

const name = Cookies.get('name');
//const name='249193262@qq.com'
const token = Cookies.get('token');
//const lan =Cookies.get('lan');
const lan = '';
//const name='';
//const token='';

const state = {
    loginUser:name ? name : '',
    rightPanelName:name ? name : '',
    accessToken:token ? token: '',
    lan:lan?lan:''
}

const mutations = {
    [types.COM_USER_LOGIN](state,data){
        //state.accessToken = data.token;
        state.loginUser = data.name;
        Cookies.set('name', data.name);
        //Cookies.set('token', data.token);
    },
    [types.COM_USER_LOGOUT](state){
        //Cookies.remove('token');
        Cookies.remove('name');
        const flag = (state.rightPanelName == state.loginUser);
        state.accessToken = '';
        state.loginUser = '';
        state.rightPanelName='';
        //if(flag) router.go(0); //判断是否刷新当前页面
    },
    [types.COM_SET_RIGHTUSERNAME](state,str){
        state.rightPanelName = str;
    },
    [types.COM_SET_LAN](state,str){
        state.lan=str
    }
}

const getters = {
    getLoginUser : state => state.loginUser,
    getRightName: state => state.rightPanelName,
    getToken : state => state.accessToken,
    getLan:state=>state.lan,
}

const actions = {

}

export default {
    state,
    actions,
    getters,
    mutations
}