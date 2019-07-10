<template>
    <div>


        <div class="article-box">
            <div class="btn-group">
                <el-button @click="reply">发布回复</el-button>
            </div>
            <div class="main-floor floor overflow_hide">
                <div class="personInfo fl">
                    <div><router-link :to="'/personal/'+detail.creator._id">{{detail.creator.username}}</router-link></div>
                    <div>注册时间:{{detail.creator.create_time}}</div>
                </div>
                <div class="content fr">
                    <p>{{detail.title}}</p><p class="fr">{{detail.create_time}}</p>
                    <div>{{detail.content}}</div>
                </div>
            </div>
            <div class="floor overflow_hide" v-for="d in detail.comments">
                <div class="personInfo fl">
                    <div><router-link :to="'/personal/'+d._id">{{d.creator}}</router-link></div>
                    <div>注册时间:{{detail.creator.create_time}}</div>
                </div>
                <div class="content fr">
                    <p class="fr">{{d.create_time}}</p>
                    <div>{{d.content}}</div>
                </div>
            </div>
        </div>

        <div class="comment-box">
            <el-input type="textarea" rows=6 v-model="comment.content"></el-input>
            <el-button @click="reply">提交回复</el-button>
        </div>
    </div>
</template>

<script>
    import articleFunction from '../../api/article'
    export default {
        name: "articleDetail",
        data(){
            return{
                detail:{
                    creator:{}
                },
                comment:{
                    id:this.$route.params.id,
                    content:""
                }
            }
        },
        created() {
            this.getDetail(1);
        },
        methods:{
            getDetail(currentPage){
                articleFunction.getOne({id:this.$route.params.id,currentPage:currentPage}).then(res=>{
                    this.detail = res.data.data;
                    console.log(res);
                })
            },
            reply(){
                articleFunction.addComment(this.comment).then(res=>{
                    if(res.code===200){
                        this.$message("回复成功");
                        this.getDetail();
                        this.comment.content="";
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/article";
</style>
