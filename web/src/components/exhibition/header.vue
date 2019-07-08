<template>
    <div class="nav-line">
        <div class="login-box fr">
            <ul v-if="$store.getters.getT!==null">
                <li style="width:100px;">{{username}}</li>
                <li>注销</li>
            </ul>
            <ul v-else>
                <li>开始</li>
                <li><router-link to="/Login">登录</router-link></li>
                <li>注册</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "header",
        data(){
            return{

            }
        },
        created() {

        },
        methods:{
        },
        computed:{
            username(){
                return this.$store.getters.getToken.username;
            }
        }
    }
</script>

<style scoped lang="less">
    .nav-line{
        width:100%;
        height:60px;
        line-height:60px;
        background-color: #fff0cd;
        color:#591804;
        .login-box{
            ul{
                height:100%;
                li{
                    float: left;
                    display: inline-block;
                    width:60px;
                    height:100%;
                    cursor:pointer;

                }
            }
        }
    }
</style>
