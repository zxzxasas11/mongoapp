<template>
	<div>
		<table>
			<tr>
				<th></th>
				<th>材料名称</th>
				<th>获取途径</th>
			</tr>
			<tr v-for="i in info">
				<td><img :src="i.pic"></td>
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
                currentPage:this.$route.params.currentPage
			}
		},
		created() {
            this.getMaterial(this.$route.params.currentPage);
        },
		methods:{
			getMaterial(page){
			    materialFunction.getAll({currentPage:page}).then(res=>{
			        this.info = res.data.data;
			        this.count = res.data.count;
				})
			},
            handleCurrentChange(data){
			    console.log(data);
			    this.$router.push("/FGO/material/"+data);
			    //this.getMaterial(data);
			}
		},
		watch:{
            '$route.params.currentPage'(data){
                console.log("---------");
                this.getMaterial(data);
			}
		}
    }
</script>

<style scoped>

</style>
