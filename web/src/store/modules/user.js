import users from '../../api/user'
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
     * @param params
     * @return {Promise<void>}
     */
    async userRegister(params) {
      return await users.register(params);
    },

    /**
     * 用户登录
     * @param state
     * @param commit
     * @param params
     * @return {Promise<void>}
     */
    async userLogin({commit}, params) {
      let data = await users.login(params).then(res=>{
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
