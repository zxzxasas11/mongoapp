<template>
    <div>


        <div class="article-box">
            <div class="btn-group">
                <el-button @click="reply">发布回复</el-button>
            </div>
            <div class="main-floor floor overflow_hide">
                <div class="personInfo fl">
                    <div><router-link :to="'/personal/'+detail.creator._id">{{detail.creator.username}}</router-link></div>
                    <div>{{detail.creator.create_time}}</div>
                </div>
                <div class="content fr">
                    <p>{{detail.title}}</p>
                    <div>{{detail.content}}</div>
                </div>
            </div>
            <div class="floor overflow_hide" v-for="d in detail.comments">
                <div class="personInfo fl">
                    <div><router-link :to="'/personal/'+d._id">{{d.creator}}</router-link></div>
                    <div>{{detail.creator.create_time}}</div>
                </div>
                <div class="content fr">
                    <div>{{d.content}}</div>
                </div>
            </div>
        </div>

        <div class="comment-box">

        </div>
    </div>
</template>

<script>
    import articleFunction from '../../api/article'
    export default {
        name: "articleDetail",
        data(){
            return{
                detail:[]
            }
        },
        created() {
            this.getDetail(1);
        },
        methods:{
            getDetail(currentPage){
                articleFunction.getOne({id:this.$route.params.id,currentPage:currentPage}).then(res=>{
                    this.detail = res.data;
                    console.log(res);
                })
            },
            reply(){

            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/article";
</style>
