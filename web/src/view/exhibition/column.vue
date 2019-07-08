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
                <ul>
                    <li></li>
                    <li>{{a.title}}</li>
                    <li>{{a.creator.username}}{{a.create_time}}</li>
                    <li></li>
                </ul>
            </div>
        </div>
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
                articleList:[]
            }
        },
        created() {
            this.getArticle();
        },
        methods:{
            getArticle(){
                articleFunction.getAll({columnId:this.$route.params.id}).then(res=>{
                    console.log(res);
                    this.articleList = res.data;
                })
            },
            onSubmit(){
                articleFunction.addArticle(this.article).then(res=>{
                    if(res.code===200){
                        this.$message("发布成功");
                        this.dialogVisible=false;
                    }
                })
            }
        },

    }
</script>

<style scoped>

</style>
