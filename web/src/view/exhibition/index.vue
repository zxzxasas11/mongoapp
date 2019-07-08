<template>
    <div>
        <navheader></navheader>

        <div class="column-box fl overflow_hide" v-for="l in list">
            <div class="title">{{l.name}}</div>
            <div class="hot"></div>
            <div class="column-list" >
                <ul>
                    <li v-for="c in l.column">
                        <router-link :to="'/column/'+c._id">{{c.name}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import navheader from '../../components/exhibition/header'
    import categoryFunction from "../../api/category"
    export default {
        name: "index",
        data(){
            return{
                list:[]
            }
        },
        components:{navheader},
        created(){
            this.getCategory();
        },
        methods:{
            getCategory(){
                categoryFunction.getAll().then(res=>{
                    console.log(res);
                    this.list=res.data.data;
                })
            }
        }
    }
</script>

<style scoped lang="less">
.column-box{
    width:48%;
    padding:1%;
    .title{
        text-align: left;
        font-weight:bold;
        padding:10px;
        clear: both;
        height:40px;
        border:1px solid #ddd;
        font-size:20px;
        line-height: 40px;
        box-shadow: 0 0 2px  #787878;
    }
    .column-list{
        ul{
            li{
                float: left;
                width:33%;
                text-align: left;
            }
        }
    }
}
</style>
