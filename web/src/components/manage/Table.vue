<template>
    <div>
        <!--表格开始-->
        <div class="table">
            <template>
                <el-table
                        @row-click="rowClick"
                        :data="tableData"
                        border
                        :height="tableHeight">
                    <!--固定两列 多选 序号-->
                    <el-table-column type="selection">
                    </el-table-column>
                    <el-table-column label="序号" width="50px" >
                        <template slot-scope="scope">{{scope.$index+1+(currentPage-1)*pageSize}}</template>
                    </el-table-column>
                    <!--固定两列结束-->
                    <!--循环出其他列-->
                    <el-table-column
                            style="background-color:#73b3fc;color:#fff;"
                            v-for="(item,key) in tableKey"
                            sortable
                            :key="key"
                            :prop="item.value"
                            :label="item.name"></el-table-column>
                    <!--操作按钮-->
                    <el-table-column
                            v-if="btn_group!=null"
                            min-width="200"
                            label="操作"
                            show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                    :type="btn.type"
                                    :key="btn.name"
                                    v-for="btn in btn_group"
                                    @click="select(btn.method,tableData[scope.$index],scope.$index)">
                                {{tableData[scope.$index][btn.method]&&btn.condition===btn.condition?btn.elseName:btn.name}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
        <!--表格结束-->
        <!--分页开始-->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,25,50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
        </div>
        <!--分页结束-->
    </div>
</template>

<script>
    export default {
        name: "Table",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
            }
        },
        props: ['tableData', 'tableKey', 'totalSize', 'btn_group', 'navHeight'],
        created() {
        },
        methods: {
            handleSizeChange(val) {
                this.pageSize = val;
                this.$parent.changePageSize();
            },
            // 翻页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$parent.changeCurrentPage();
            },
            /*click(callback, n) {
                callback(n);
            },*/
            del(index) {
                this.tableData.splice(index, 1);
            },
            select(method, val, index) {
                let info = {
                    obj: val,
                    index: index
                };
                this.$emit(method, info);//
            },
            rowClick(row, column) {
                if (column.label === "操作") {           //如果点击的是操作那一列，则不做任何处理;
                    return false;
                }
                this.$emit("rowClick", row);
            }
        },
        computed: {
            tableHeight() {
                return document.body.clientHeight - 140 - this.navHeight;
            },
        }
    }
</script>

<style scoped>
    .block {
        border: 1px solid #ebeef5;
        height: 38px;
    }

    .el-table--border th {
        background-color: #73b3fc !important;
        color: #ffffff !important;
    }
</style>
