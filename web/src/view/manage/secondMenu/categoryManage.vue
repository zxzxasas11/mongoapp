<template>
    <div class="box">
        <div>
            <div>
                <el-button size="mini "  type="primary" @click="addCategory">增加大类</el-button>
                <el-button size="mini "  type="primary" @click="del">删除</el-button>
            </div>
            <el-tree
                    :props="defaultProps"
                    :data="data"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                          v-if="data.column"
                          type="text"
                          size="mini"
                          @click="() => append(data)">
                    Append
                  </el-button>
                  <!--<el-button
                          type="text"
                          size="mini"
                          @click="() => remove(node, data)">
                    Delete
                  </el-button>-->
                </span>
              </span>
            </el-tree>
        </div>


        <el-dialog class="elDialog abow_dialog" :close-on-click-modal="false" title="新增" :visible.sync="dialogVisible">
            <el-form ref="addColumn" :model="addColumn" label-width="80px" style="text-align: left">
                <el-form-item label="分类名称" v-if="operate==='column'">
                    <el-select v-model="addColumn.category_id" placeholder="章节名称" >
                        <el-option :label="d.name" :value="d._id" :key="d._id" v-for="d in data"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="栏目名称">
                    <el-input v-model="addColumn.name"></el-input>
                </el-form-item>
                <el-form-item label="链接">
                    <el-input v-model="addColumn.url"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
        </el-dialog>
    </div>
</template>

<script>
    import categoryFunction from '../../../api/category';
    export default {
        name: "categoryManage",
        data() {
            return {
                data:[],
                defaultProps: {
                    children: 'column',
                    label: 'name'
                },
                addColumn:{
                    category_id:"",
                    name:"",
                    url:""
                },
                dialogVisible:false,
                operate:""
            }
        },
        created() {
            this.getCategory();
        },
        methods:{
            getCategory(){
                categoryFunction.getAll().then(res=>{
                    console.log(res);
                    this.data = res.data.data;
                })
            },
            append(data) {
                console.log(data);
                this.dialogVisible = true;
                this.operate="column"
            },
            addCategory(){
                this.dialogVisible=true;
                this.operate = "category";

            },
            remove(node, data) {
            },
            onSubmit(){
                if(this.operate==='column'){
                    console.log(this.addColumn);
                    categoryFunction.addColumn(this.addColumn).then(res=>{
                        console.log(res);
                        if(res.code===200){
                            this.$message("添加成功");
                            this.dialogVisible =false;
                            this.getCategory();
                        }
                    })
                }
                else {
                    categoryFunction.addCategory(this.addColumn).then(res=>{
                        console.log(res);
                        if(res.code===200){
                            this.$message("添加成功");
                            this.dialogVisible =false;
                            this.getCategory();
                        }
                    })
                }

            },
            del(){

            }
        },
        watch:{
            'dialogVisible'(data){
                if(data){
                    Object.assign(this.$data.addColumn, this.$options.data().addColumn);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        height:calc(100% - 40px);
        display: flex;
        .transfer-box{
            width:25% !important;
            float: left;
            margin-left:6%;
            height:calc(100% - 2px);
            border:1px solid #ddd;
        }
    }

</style>
