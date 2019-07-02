<template>
    <div>
        <div class="nav">
            <div class="fl title">{{title}}</div>
            <div class="fl search" style="width:250px;">
                <el-input placeholder="搜索"  @keyup.native.enter="infoSearch">
                    <el-button slot="append" icon="el-icon-search" @click="infoSearch"></el-button>
                </el-input>
            </div>
            <div class="fr btn">
                <span @click="addUser"><i class="el-icon-circle-plus-outline"></i>添加用户</span>
                <span><i class="el-icon-delete"></i>批量删除</span>
            </div>
        </div>
        <Table
                :totalSize="tableTotalData"
                @del="del"
                @edit="edit"
                navHeight=40
                ref="table"
                :tableData="info"
                :tableKey="tableKey"
                :btn_group="btn">
        </Table>

        <Dialog
                ref="dialog"
                @formSubmit="formSubmit"
                :formData="dialog"
                @selectCollege="selectCollege"
                @selectSpecialty="selectSpecialty"
                :rules="rules"
                >
        </Dialog>
    </div>
</template>

<script>
    import Table from '@/components/platform-manage/Table'
    import Dialog from '@/components/platform-manage/Dialog'
    export default {
        name: "UserManage",
        data() {
            let validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确认密码'));
                } else if (value !== this.$refs.dialog.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                page:{                        //分页信息
                    currentPage:1,
                    pageSize:10,
                },
                dialogForm:"",
                operateType:"",               //区分新增和修改
                dialog:[
                    {name:"学号",key:"studentId",type:"input"},
                    {name:"姓名",key:"userName",type:"input"},
                    {name:"密码",key:"password",type:"input",password:true},
                    {name:"重复输入密码",key:"password2",type:"input",password:true},
                    {name:"学校",key:"deptId",type:"select",method:"selectCollege",
                        option:""
                    },
                    {name:"专业",key:"specialtyId",type:"select",method:"selectSpecialty",
                        option:""
                    },
                    {name:"班级",key:"gradeId",type:"select",
                        option:""
                    },
                    {name:"角色",key:"roleId",type:"select",
                        option:""
                    },
                    {name:"性别",key:"sex",type:"select",
                        option:[
                            {name:"男",key:"1"},
                            {name:"女",key:"2"},
                        ]
                    },
                    {name:"电话",key:"phone",type:"input"},
                    {name:"邮箱",key:"email",type:"input"},
                ],
                rules: {
                    studentId: [
                        { required: true, message: '请输入学号', trigger: 'blur' },
                    ],
                    userName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    password2: [
                        { validator:validatePassword2, required: true, trigger: 'blur' },
                    ],
                    deptId: [
                        { required: true, message: '请选择学校', trigger: 'blur' },
                    ],
                    specialtyId: [
                        { required: true, message: '请选择专业', trigger: 'blur' }
                    ],
                    gradeId: [
                        { required: true, message: '请选择班级', trigger: 'blur' }
                    ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ],
                    /*phone: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '请选择专业', trigger: 'change' }
                    ],*/
                },
                tableTotalData:null,
                title:this.$route.name,
                btn: [
                    {name: "删除", method:"del"},
                    {name: "修改", method: "edit"},
                ],
                info: [],
                tableKey: [
                    {name: '学号', value: 'studentId'},
                    {name: '姓名', value: 'userName'},
                    {name: '角色', value: 'roleName'},
                    {name: '专业', value: 'specialtyName'},
                    {name: '部门', value: 'deptName'},
                    {name: '性别', value: 'sex'},
                    {name: '邮箱', value: 'email'},
                    {name: '电话', value: 'phone'},
                ],
                userId:""
            }
        },
        components: {Table,Dialog},
        created() {
            this.search(this.page);
        },
        methods: {
            getCollegeSelect(){
                let option = [];
                const that =this;
                this.$post("/Dept/loadDept").then(function (response) {
                    for(let i in response.data){
                        let arr={name:response.data[i].deptName,key:response.data[i].deptId};
                        option.push(arr);
                    }
                });
                this.dialog[4].option = option;
            },
            getSpecialtyByDept(deptId){
                let option = [];
                const that =this;
                let data ={deptId:deptId};
                this.$post("/Specialty/loadSpecialty",data).then(function (response) {
                    for(let i in response.data){
                        let arr={name:response.data[i].name,key:response.data[i].specialtyId};
                        option.push(arr);
                    }
                });
                this.dialog[5].option = option;

            },
            getGradeBySpecialty(specialtyId){
                let option = [];
                const that =this;
                let data ={SpecialtyId:specialtyId};
                this.$post("/Grade/getAll",data).then(function (response) {
                    for(let i in response.data){
                        let arr={name:response.data[i].gradeName,key:response.data[i].gradeId};
                        option.push(arr);
                    }
                });
                this.dialog[6].option = option;
            },
            getRoleSelect(){
                let option = [];
                const that =this;
                this.$post("/Role/getAll").then(function (response) {
                    that.selectNode=response.data;
                    for(let i in response.data){
                        let arr={name:response.data[i].roleName,key:response.data[i].roleId};
                        option.push(arr);
                    }
                });
                this.dialog[7].option = option;
            },
            search(obj) {
                const  that =this;
                this.$post("/User/getAll",obj).then(function (response) {
                    that.info = response.data;
                    that.tableTotalData=response.total;
                });
            },
            //删除用户
            del(val){
              let data ={id:val.obj.userId};
              const that = this;
                this.$confirm('是否确认删除该条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                        that.$post("/User/delete",data).then(function (response) {
                            that.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.search(that.page);
                        });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            //修改用户
            edit(val){
                this.getCollegeSelect();
                this.getSpecialtyByDept(val.obj.deptId);
                this.getGradeBySpecialty(val.obj.specialtyId);
                this.getRoleSelect();
                this.operateType ="edit";
                this.$refs.dialog.formTitle="修改用户";
                this.$refs.dialog.dialogFormVisible=true;
                this.userId=val.obj.userId;
                this.$refs.dialog.form=JSON.parse(JSON.stringify(val.obj));
            },
            infoSearch(){

            },
            //新增用户
            addUser(){
                this.operateType ="add";
                this.$refs.dialog.formTitle='新增用户';
                this.$refs.dialog.dialogFormVisible=true;
                this.$refs.dialog.form={};
                this.getCollegeSelect();
                this.getRoleSelect();
            },
            formSubmit(data){               //表单提交
                const that = this;
                delete data.password2;
                switch (this.operateType) {
                    case "edit":
                        data.userId = this.userId;
                        this.$post("/User/update",data).then(function (response) {
                            if(response.code===200){
                                that.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                that.$refs.dialog.dialogFormVisible=false;
                            }
                        });
                        break;
                    case "add":
                        delete data.userId;
                        this.$post("/User/add",data).then(function (response) {
                            if(response.code===200){
                                that.$message({
                                    type: 'success',
                                    message: '新增成功!'
                                });
                                that.$refs.dialog.dialogFormVisible=false;
                                that.search(that.page);
                            }
                        });
                        break;
                }
            },
            changePageSize(){
                this.page.pageSize=this.$refs.table.pageSize;
                this.search(this.page);
            },
            changeCurrentPage(){
                this.page.currentPage=this.$refs.table.currentPage;
                this.search(this.page);
            },
            selectCollege(val){
                this.getSpecialtyByDept(val);
            },
            selectSpecialty(val){
                this.getGradeBySpecialty(val)
            }
        },
        mounted() {
        },
    }
</script>

<style scoped lang="less">
    @import '../../../assets/css/tableManage.less';
</style>
