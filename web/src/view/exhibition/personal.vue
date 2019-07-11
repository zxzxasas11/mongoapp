<template>
    <div class="per">
        <div>个人中心</div>
        <div class="info-box">
            <title>个人信息</title>
        </div>

        <div class="info-box">
            <title>我的发帖</title>
            <div v-for="a in articleList" class="list">
                <router-link :to="'/article/'+a._id">{{a._id}}</router-link>
            </div>
        </div>

        <div class="info-box">
            <title>我的历史记录</title>
        </div>

        <div class="info-box">
            <title>我的收藏</title>
            <div v-for="c in collectList" class="list">
                <router-link :to="'/article/'+c.articleId">{{c.articleId}}</router-link>
                <router-link :to="'/personal/'+c.creator">{{c.creator}}</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import collectFunction from '../../api/collect';
    import articleFunction from '../../api/article';
    export default {
        name: "personal",
        data(){
            return{
                collectList:[],
                articleList:[]
            }
        },
        created() {
            this.getCollectList();
            this.getArticle(1);
        },
        methods:{
            //获取收藏列表
            getCollectList(){
                collectFunction.getAll(this.$route.params.id).then(res=>{
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
        .list{
            text-align: left;
            padding: 2px 5px;
            font-size:14px;
            a:last-child{margin-left:20px;}
        }
    }
</style>
