<template>
	<div>
		<el-input style="width:200px;text-align: left;" v-model="page.condition.name" @keyup.native.enter="keymap"></el-input>
		<table>
			<tr>
				<th></th>
				<th>材料名称</th>
				<th>获取途径</th>
			</tr>
			<tr v-for="i in info" :key="i._id">
				<td><img :src="i.pic" :title="i.name"></td>
				<td>{{i.name}}</td>
				<td>
					<div v-for="n in i.achieving">{{n}}</div>
				</td>
			</tr>
		</table>
		<el-pagination
				style="clear:both;margin:20px 0;text-align:left"
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total=count
				:current-page = 'currentPage'
				class="pagination">
		</el-pagination>
	</div>

</template>

<script>
	import materialFunction from "../../../api/fgo/material";
    export default {
        name: "material",
		data(){
            return{
				info:[],
				count:0,
				page:{
				    "pageInfo":{
                        "currentPage":this.$route.params.currentPage,
                        "pageSize":10
                    },
                    "condition":{
				        "name":""
                    }
				},
			}
		},
		created() {
            this.getMaterial();
            this.currentPage = parseInt(this.$route.params.currentPage);
        },
		methods:{
            keymap(){
                this.$router.push("/FGO/material/1");
			},
			getMaterial(){
			    materialFunction.getAll(this.page).then(res=>{
			        this.info = res.data.data;
			        this.count = res.data.count;
				})
			},
            handleCurrentChange(data){
				this.$router.push("/FGO/material/"+data);
			}
		},
		watch:{
            '$route.params.currentPage'(data){
                this.page.pageInfo.currentPage = data;
                this.currentPage=data;
                this.getMaterial();
			}
		}
    }
</script>

<style scoped>

</style>
