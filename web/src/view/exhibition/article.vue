<template>
    <div>
        <div></div>
    </div>
</template>

<script>
    import articleFunction from '../../api/article'
    export default {
        name: "article",
        data(){
            return{

            }
        },
        created() {
            this.getDetail();
        },
        methods:{
            getDetail(){
                articleFunction.getOne({id:this.$route.params.id}).then(res=>{
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped lang="less">

</style>
