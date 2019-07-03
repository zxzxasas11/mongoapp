import jwt_decode from 'jwt-decode'
const getters ={
    visitedViews:state => state.tags.visitedViews,
    activeIndex:state => state.tags.activeIndex,
    getToken(state){
        if(state.user.token===""){
            state.user.token = localStorage.getItem("token");
        }
        return jwt_decode(state.user.token);
    },
    getT(state){
        return  state.user.token;
    },
    getKeepAlive:state => state.tags.keepAlive,
}
export default getters
