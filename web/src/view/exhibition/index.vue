<template>
    <div>
        <div class="box">
            <div class="column-box" v-for="l in list">
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
    </div>
</template>

<script>
    import categoryFunction from "../../api/category"
    export default {
        name: "index",
        data(){
            return{
                list:[]
            }
        },
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
    .box{
        column-count: 2;
        -moz-column-count: 2;
        column-width: 400px;
        column-gap:20px;
        margin:0 auto;
        .column-box{
            break-inside: avoid;
            width:100%;
            overflow: auto;
            //padding:1%;
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
    }
</style>
