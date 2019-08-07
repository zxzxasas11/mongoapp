<template>
    <div>
        <navBread :infoId="$route.params.id"></navBread>
        <el-button v-if="ifCollect===0" @click="collect">收藏</el-button>
        <el-button v-else @click="removeCollect">取消收藏</el-button>
        <div class="article-box">
            <div class="main-floor floor overflow_hide">
                <div class="personInfo fl">
                    <div>
                        <router-link :to="'/personal/'+detail.creator._id">{{detail.creator.username}}</router-link>
                    </div>
                    <div>注册时间:{{moment(detail.creator.create_time).format('YYYY-MM-DD')}}</div>
                </div>
                <div class="content fr">
                    <p>{{detail.title}}</p>
                    <p class="fr">{{detail.create_time}}</p>
                    <p @click="editArticle(detail)" class="fr" v-if="detail.creator._id===$store.getters.getToken.userId">编辑</p>
                    <div v-html="detail.content"></div>
                </div>
            </div>
            <div class="floor overflow_hide" v-for="d in detail.comments">
                <div class="personInfo fl">
                    <div>
                        <router-link :to="'/personal/'+d.creator._id">{{d.creator.username}}</router-link>
                    </div>
                    <div>注册时间:{{moment(detail.creator.create_time).format('YYYY-MM-DD')}}</div>
                </div>
                <div class="content fr">
                    <p class="fr">{{moment(d.create_time).format('YYYY-MM-DD HH:mm')}}</p>
                    <p @click="editArticle(d)" class="fr" v-if="d.creator._id===$store.getters.getToken.userId">编辑</p>
                    <div v-html="d.content">{{d.content}}</div>
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


        <div id="editor">
            <mavon-editor
                    style="height: 400px;width: 100%;"
                    ref="md"
                    @imgAdd="imgAdd"
                    :ishljs="true"
                    v-model="comment.content">
            </mavon-editor>
            <el-button @click="reply">提交回复</el-button>
        </div>

        <el-dialog
                :close-on-click-modal="false"
                title="修改内容"
                :visible.sync="editVisible">
            <mavon-editor
                    style="height: 400px;width: 100%;"
                    ref="md1"
                    @imgAdd="imgAdd2"
                    :ishljs="true"
                    v-model="editContent">
            </mavon-editor>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="editSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import articleFunction from '../../api/article';
    import collectFunction from '../../api/collect';
    import uploadFunction from '../../api/upload';
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import navBread from '../../components/exhibition/navBread'

    export default {
        name: "articleDetail",
        data() {
            return {
                detail: {
                    creator: {}
                },
                ifCollect: 0,
                size: 0,
                comment: {
                    id: this.$route.params.id,
                    content: ""
                },
                editId:"",           //修改id
                editVisible:false,
                editContent:""
            }
        },
        components: {mavonEditor, navBread},
        created() {
            this.getDetail(1);
        },
        methods: {
            //获取帖子详细信息
            getDetail(currentPage) {
                articleFunction.getOne({id: this.$route.params.id, currentPage: currentPage}).then(res => {
                    this.detail = res.data.data;
                    this.ifCollect = res.data.collect;
                    this.size = res.data.count;
                    console.log(res);
                })
            },
            reply() {
                articleFunction.addComment(this.comment).then(res => {
                    if (res.code === 200) {
                        this.$message("回复成功");
                        this.getDetail(1);
                        this.comment.content = "";
                    }
                })
            },
            collect() {
                collectFunction.addCollect({articleId: this.$route.params.id}).then(res => {
                    if (res.code === 200) {
                        this.getDetail(1);
                    }
                })
            },
            removeCollect() {
                collectFunction.removeCollect({articleId: this.$route.params.id}).then(res => {
                    if (res.code === 200) {
                        this.getDetail(1);
                    }
                })
            },
            handleCurrentChange(data) {
                console.log(data);
            },
            imgAdd(pos, $file) {
                let upload = new FormData();
                upload.append("file", $file);
                uploadFunction.upload(upload).then(res => {
                    this.$refs.md.$img2Url(pos, this.fileServer + res.data);
                })
            },
            imgAdd2(pos,$file){
                let upload = new FormData();
                upload.append("file", $file);
                uploadFunction.upload(upload).then(res => {
                    this.$refs.md1.$img2Url(pos, this.fileServer + res.data);
                })
            },
            //修改
            editArticle(data){
                console.log(data);
                this.editId = data._id;
                this.editContent = data.content;
                this.editVisible = true;
            },
            //确认修改
            editSubmit(){
                articleFunction.edit({id:this.editId,content:this.editContent}).then(res=>{
                    console.log(res);
                    this.editVisible=false;
                    this.getDetail(1);
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/css/article";
</style>
