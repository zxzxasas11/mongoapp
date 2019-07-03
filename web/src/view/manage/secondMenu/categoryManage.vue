<template>
    <div class="box">
        <!--<div class="transfer-box"></div>
        <div class="transfer-box"></div>
        <div class="transfer-box"></div>-->
        <div class="custom-tree-container">
            <div class="block">
                <p>使用 scoped slot</p>
                <el-tree
                        :data="data"
                        show-checkbox
                        node-key="_id"
                        default-expand-all
                        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.name }}</span>
        <span>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => append(data)">
            Append
          </el-button>
          <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    import categoryFunction from '../../../api/category';
    export default {
        name: "categoryManage",
        data() {
            /*const data = [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }];*/
            return {
                data:[]
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
            }
        },
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
