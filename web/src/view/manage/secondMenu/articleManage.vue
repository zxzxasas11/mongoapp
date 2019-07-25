<template>
    <div>
        <div class="nav">
            <div class="fl title">{{title}}</div>
            <div class="fl search" style="width:250px;">
                <!--<el-input placeholder="搜索"  @keyup.native.enter="infoSearch">
                    <el-button slot="append" icon="el-icon-search" @click="infoSearch"></el-button>
                </el-input>-->
            </div>
            <div class="fr btn">
                <!--<span @click="addUser"><i class="el-icon-circle-plus-outline"></i>添加用户</span>
                <span><i class="el-icon-delete"></i>批量删除</span>-->
            </div>
        </div>
        <Table
                :totalSize="tableTotalData"
                navHeight=40
                ref="table"
                :tableData="info"
                @del="del"
                @essence="essence"
                @top="top"
                :tableKey="tableKey"
                :btn_group="btn">
        </Table>

    </div>
</template>

<script>
    import Table from '../../../components/manage/Table';
    import Dialog from '../../../components/manage/Dialog';
    import articleFunction from '../../../api/article';
    export default {
        name: "articleManage",
        data() {
            return {
                page:{                        //分页信息
                    currentPage:1,
                    //pageSize:10,
                },
                dialogForm:"",
                operateType:"",               //区分新增和修改
                tableTotalData:null,
                title:this.$route.name,
                btn: [
                    {name: "查看", method: "edit"},
                    {name: "删除", method:"del"},
                    {name: "加精", method:"essence",elseName:"取消加精",condition:1},
                    {name: "置顶", method:"top",elseName:"取消置顶",condition:1}

                ],
                info: [],
                tableKey: [
                    {name: '标题', value: 'title'},
                    {name: '创建人', value: 'username'},
                    {name: '栏目名称', value: 'columnName'},
                    {name: '回复数', value: 'comments'},
                    {name: '浏览量', value: 'view'},
                    {name: '发布时间', value: 'create_time'},
                ],
                userId:""
            }
        },
        components: {Table,Dialog},
        created() {
            this.search(this.page);
        },
        methods: {
            search(info) {
                articleFunction.getAll(info).then(res=>{
                    this.info = res.data.data;
                    this.tableTotalData = res.data.count;
                })
            },
            changePageSize(){
                this.page.pageSize=this.$refs.table.pageSize;
                this.search(this.page);
            },
            changeCurrentPage(){
                this.page.currentPage=this.$refs.table.currentPage;
                this.search(this.page);
            },
            //单条删除
            del(r){
                articleFunction.delete({_id:r.obj._id}).then(res=>{
                    if(res.code===200){
                        this.$message("删除成功");
                        this.search(this.info);
                    }
                })
            },
            //加精
            essence(r){
                if(r.obj.essence===1){
                    this.editState({articleId:r.obj.articleId,essence:0})
                }
                else this.editState({articleId:r.obj.articleId,essence:1})
            },
            //置顶
            top(r){
                if(r.obj.top===1){
                    this.editState({articleId:r.obj.articleId,top:0})
                }
                else this.editState({articleId:r.obj.articleId,top:1})
            },
            editState(info){
                articleFunction.editStatus(info).then(res=>{
                    console.log(res);
                    this.search(this.page);
                })
            }
        },
        mounted() {
        },
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/tableManage.less';
</style>
