import users from '../../api/user'
import jwt_decode from 'jwt-decode'
const user ={
  state:{
      token:""
  },
  mutations:{
    SET_USERINFO(state,data){
      state.token = data;
      localStorage.setItem("token",data);
    },
    set_token(state,token){
      state.token = token;
      localStorage.setItem("token",token);
    },
    del_token(state){
      state.token = '';
      localStorage.removeItem("token");
    }
  },
  actions:{

    /**
     * 用户注册
     * @param state
     * @param commit
     * @param params
     * @return {Promise<void>}
     */
    async userRegister({state, commit}, params) {
      return await users.register(params);
    },

    /**
     * 用户登录
     * @param state
     * @param commit
     * @param params
     * @return {Promise<void>}
     */
    async userLogin({state, commit}, params) {
      let data = await users.login(params).then(res=>{
        console.log(res);
        commit("SET_USERINFO",res.data.token);
      });

      //let ret = await users.login(params);
      return data;
    },
    async setToken({commit},token){
      commit("set_token",token);
    },
    async delToken({commit}){
      commit("del_token");
    }

  }
}
export default user
