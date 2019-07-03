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
                :tableKey="tableKey"
                :btn_group="btn">
        </Table>

    </div>
</template>

<script>
    import Table from '../../../components/manage/Table';
    import Dialog from '../../../components/manage/Dialog';
    import userFunction from '../../../api/user';
    export default {
        name: "userManage",
        data() {
            return {
                page:{                        //分页信息
                    currentPage:1,
                    pageSize:10,
                },
                dialogForm:"",
                operateType:"",               //区分新增和修改
                tableTotalData:null,
                title:this.$route.name,
                btn: [
                    {name: "删除", method:"del"},
                    {name: "修改", method: "edit"},
                ],
                info: [],
                tableKey: [
                    {name: '账号', value: 'code'},
                    {name: '用户名', value: 'username'},
                    {name: '性别', value: 'sex'},
                    {name: '邮箱', value: 'email'},
                    {name: '电话', value: 'phone'},
                    {name: '角色', value: 'power'},
                    {name: '硬币数', value: 'coin'},
                    {name: '注册时间', value: 'create_time'},
                ],
                userId:""
            }
        },
        components: {Table,Dialog},
        created() {
            this.search();
        },
        methods: {
            search() {
                userFunction.getAll().then(res=>{
                    this.info = res.data;
                })
            },
            //删除用户
            changePageSize(){
                this.page.pageSize=this.$refs.table.pageSize;
                this.search(this.page);
            },
            changeCurrentPage(){
                this.page.currentPage=this.$refs.table.currentPage;
                this.search(this.page);
            },
        },
        mounted() {
        },
    }
</script>

<style scoped lang="less">
    /*@import '../../../assets/css/tableManage.less';*/
</style>
