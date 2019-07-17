<template>
    <div class="per">
        <div>个人中心</div>
        <div class="info-box">
            <title>个人信息</title>
            <label>用户名:<span>{{userInfo.username}}</span></label>
            <label>性别:<span>{{userInfo.sex|sex}}</span></label>
            <label>硬币数:<span>{{userInfo.coin}}</span></label>
            <label>注册时间:<span>{{userInfo.create_time}}</span></label>
        </div>

        <div class="info-box">
            <title>我的发帖</title>
            <div v-for="a in articleList" class="list">
                <router-link :to="'/article/'+a._id">{{a.title}}</router-link>
            </div>
        </div>

        <div class="info-box">
            <title>我的历史记录</title>
        </div>

        <div class="info-box">
            <title>我的收藏</title>
            <div v-for="c in collectList" class="list">
                <!--<router-link :to="'/article/'+c.articleId._id">{{c.articleId.title}}</router-link>-->
                <router-link :to="'/personal/'+c.creator._id">{{c.creator.username}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import collectFunction from '../../api/collect';
    import articleFunction from '../../api/article';
    import userFunction from '../../api/user';
    export default {
        name: "personal",
        data(){
            return{
                collectList:[],
                articleList:[],
                userInfo:{}
            }
        },
        created() {
            this.getCollectList();
            this.getArticle(1);
            this.getUserInfo();
        },
        filters:{
            sex(data){
                return data===1?"男":"女";
            }
        },
        methods:{
            //获取收藏列表
            getCollectList(){
                collectFunction.getAll({userId:this.$route.params.id}).then(res=>{
                    console.log(res);
                    this.collectList = res.data;
                })
            },
            //获取发帖纪录
            getArticle(currentPage){
                articleFunction.getByUser({userId:this.$route.params.id,currentPage:currentPage}).then(res=>{
                    console.log(res);
                    this.articleList = res.data;
                })
            },
            //获取个人信息
            getUserInfo(){
                userFunction.getByUser({userId:this.$route.params.id}).then(res=>{
                    console.log(res);
                    this.userInfo = res.data;
                })
            }

        }
    }
</script>

<style scoped lang="less">
    .per{
        padding: 10px;
    }
    .info-box{
        width: 100%;
        height: auto;
        border: 1px solid #ddd;
        text-align: left;
        font-size:14px;
        label{
            margin-left:10px;
        }
        .list{
            text-align: left;
            padding: 2px 5px;
            a:last-child{margin-left:20px;}
        }
    }
</style>
