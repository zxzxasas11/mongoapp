<template>
	<div>
		<!--<div style="text-align: left">
			<el-input style="width:200px;text-align: left;" v-model="page.condition.name" @keyup.native.enter="keymap"></el-input>
		</div>-->
		<table>
			<tr>
				<th>编号</th>
				<th>头像</th>
				<th>名称</th>
				<th>稀有度</th>
				<th>技能</th>
				<th>效果描述</th>
			</tr>
			<tr v-for="i in info" :key="i._id">
				<td>{{i.code}}</td>
				<td>
					<img :src="i.portrait" :title="i.name" :alt="i.name" style="height:40px;">
				</td>
				<td>{{i.name}}</td>
				<td>{{i.star}}</td>
				<td>
					<img :src="i.skill" :title="i.name" :alt="i.name" style="height: 40px">
				</td>
				<td>
					<div v-for="n in i.effect" v-html="n"></div>
				</td>
			</tr>
		</table>
		<el-pagination
				style="clear:both;margin:20px 0;text-align:left"
				background
				@current-change="handleCurrentChange"
				layout="prev, pager, next"
				:total=count
				:current-page = currentPage
				class="pagination">
		</el-pagination>
	</div>

</template>

<script>
	import equipmentFunction from "../../../api/fgo/equipment";
    export default {
        name: "equipmentList",
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
            this.getEquipment();
            this.currentPage = parseInt(this.$route.params.currentPage);
        },
		methods:{
            /*keymap(){
                this.getEquipment();
                //this.$router.push("/FGO/equipment/1");
			},*/
            getEquipment(){
                equipmentFunction.getAll(this.page).then(res=>{
                    console.log(res);
			        this.info = res.data.data;
			        this.count = res.data.count;
				});
			},
            handleCurrentChange(data){
				this.$router.push("/FGO/equipmentList/"+data);
			}
		},
		watch:{
            '$route.params.currentPage'(data){
                this.page.pageInfo.currentPage = data;
                this.currentPage=parseInt(data);
                this.getEquipment();
			},
			/*'page.condition.name'(){
                alert(1);
			}*/
		}
    }
</script>

<style scoped>

</style>
