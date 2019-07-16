<template>
    <div>
        <div class="btn">
            <el-button @click="dialogVisible=true">发布新帖</el-button>
        </div>

        <el-dialog class="elDialog abow_dialog" :close-on-click-modal="false" title="新增" :visible.sync="dialogVisible">
            <el-form ref="addColumn" :model="article" label-width="80px" style="text-align: left">
                <el-form-item label="标题名称">
                        <el-input  v-model="article.title"></el-input>
                </el-form-item>
                <el-form-item label="正文">
                    <el-input type="textarea" rows="6" v-model="article.content"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
        </el-dialog>

        <div class="article-box">
            <div class="single" v-for="a in articleList">
                <ul class="overflow_hide">
                    <li><!--{{a.count}}--></li>
                    <li>
                        <router-link :to="'/article/'+a._id">{{a.title}}</router-link>
                    </li>
                    <li>
                        <span><router-link :to="'/personal/'+a.creator">{{a.creator.username}}</router-link></span>
                        <span>{{a.create_time}}</span>
                    </li>
                    <li></li>
                </ul>
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
    </div>
</template>

<script>
    import articleFunction from '../../api/article'
    export default {
        name: "column",
        data(){
            return{
                dialogVisible:false,
                article:{
                    title:"",
                    content:"",
                    column_id:this.$route.params.id
                },
                articleList:[],
                size:359
            }
        },
        created() {
            this.getArticle(1);
        },
        methods:{
            handleCurrentChange(data){
                this.getArticle(data);
            },
            getArticle(currentPage){
                articleFunction.getAll({columnId:this.$route.params.id,currentPage:currentPage}).then(res=>{
                    this.articleList = res.data.data;
                    this.size = res.data.count;
                    console.log(res.data);
                })
            },
            onSubmit(){
                articleFunction.addArticle(this.article).then(res=>{
                    if(res.code===200){
                        this.$message("发布成功");
                        this.dialogVisible=false;
                        this.getArticle(1);
                    }
                })
            }
        },

    }
</script>

<style scoped lang="less">
    .article-box{
        padding:5px;
        width:98%;
        margin:0 auto;
        box-shadow: 0 0 2px #ddd;
        .single{
            &:nth-child(odd){
                background-color: #fff8e7;
            }
            &:nth-child(even){
                background-color: #fff0cd;
            }
            ul{
                li{
                    font-size:14px;
                    float: left;
                    height:40px;
                    text-align: left;
                    span{
                        display: block;
                    }
                    &:nth-child(1){
                        width:5%;
                    }
                    &:nth-child(2){
                        width:50%;
                    }
                    &:nth-child(3){
                        width:25%;
                    }
                    &:nth-child(4){
                        width:20%;
                    }
                }
            }
        }
    }
</style>
