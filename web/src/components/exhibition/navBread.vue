<template>
    <div class="box">
        <div class="bread"><router-link to="/">总论坛</router-link></div>
        <div class="bread"><router-link :to="'/column/'+navInfo.column_id">{{navInfo.columnName}}</router-link></div>
        <div class="bread">{{navInfo.title}}</div>
    </div>
</template>

<script>
    import articleFunction from '../../api/article'
    export default {
        name: "navBread",
        data(){
            return{
                navInfo:{}
            }
        },
        created(){
            this.getBread(this.infoId);
        },
        props:['infoId'],
        methods:{
            getBread(id){
                articleFunction.getBread({articleId:id}).then(res=>{
                    console.log(res);
                    this.navInfo = res.data;
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .box{
        width:100%;height:40px;
        .bread{
            float: left;
            margin-left:20px;
            background-color: #fff8e7;
            height: 100%;
            line-height: 40px;
            color: #591852;
            font-weight: bold;
        }
        .bread:first-child{
            background-color: #591804;
            color:#fff;
        }
    }
</style>
