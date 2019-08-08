<template>
	<div>
		<div>fgo应用板块</div>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="英灵列表" name="/FGO/list"></el-tab-pane>
			<el-tab-pane label="材料" name="/FGO/material"></el-tab-pane>
			<el-tab-pane label="计算" name="/FGO/calculate"></el-tab-pane>
		</el-tabs>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
    export default {
        name: "index",
		data(){
            return{
                activeName:"/FGO/list"
			}
		},
		created() {
        },
		methods:{
            handleClick(){
                console.log(this.activeName);
                this.$router.push(this.activeName);
			}
		}
    }
</script>

<style scoped lang="less">

</style>
