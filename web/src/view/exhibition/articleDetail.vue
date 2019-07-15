<template>
    <div>

        <el-button v-if="ifCollect===0" @click="collect">收藏</el-button>
        <el-button v-else @click="removeCollect">取消收藏</el-button>
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
                    <div><router-link :to="'/personal/'+d.creator._id">{{d.creator.username}}</router-link></div>
                    <div>注册时间:{{detail.creator.create_time}}</div>
                </div>
                <div class="content fr">
                    <p class="fr">{{d.create_time}}</p>
                    <div>{{d.content}}</div>
                </div>
            </div>
        </div>

        <el-pagination
                style="clear:both;margin:20px 0"
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size=10
                :total=size
                class="pagination">
        </el-pagination>

        <div class="comment-box">
            <el-input type="textarea" rows=6 v-model="comment.content"></el-input>
            <el-button @click="reply">提交回复</el-button>
        </div>
        <div id="editor">
            <mavon-editor style="height: 400px;width: 100%;" v-model="value"></mavon-editor>
        </div>

        <button @click="aa">11111</button>
    </div>
</template>

<script>
    import articleFunction from '../../api/article';
    import collectFunction from '../../api/collect';
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: "articleDetail",
        data(){
            return{
                detail:{
                    creator:{}
                },
                ifCollect:0,
                size:0,
                comment:{
                    id:this.$route.params.id,
                    content:""
                },
                value:""
            }
        },
        components:{mavonEditor},
        created() {
            this.getDetail(1);
        },
        methods:{
            getDetail(currentPage){
                articleFunction.getOne({id:this.$route.params.id,currentPage:currentPage}).then(res=>{
                    this.detail = res.data.data;
                    this.ifCollect = res.data.collect;
                    this.size = res.data.count;
                    console.log(res);
                })
            },
            reply(){
                articleFunction.addComment(this.comment).then(res=>{
                    if(res.code===200){
                        this.$message("回复成功");
                        this.getDetail(1);
                        this.comment.content="";
                    }
                })
            },
            collect(){
                collectFunction.addCollect({articleId:this.$route.params.id}).then(res=>{
                    if(res.code===200){
                        this.getDetail(1);
                    }
                })
            },
            removeCollect(){
                collectFunction.removeCollect({articleId:this.$route.params.id}).then(res=>{
                    if(res.code===200){
                        this.getDetail(1);
                    }
                })
            },
            handleCurrentChange(data){
                console.log(data);
            },
            aa(){
                console.log(this.value);
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/article";
</style>
