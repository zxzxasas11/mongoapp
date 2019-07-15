<template>
    <div>
        <title>今日访问情况</title>
        <div>
            <div v-for="l in log" :key="l.status">
                <span>{{l.status}}:</span><span>{{l.total}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import LogFunction from '../../../api/log';
    import moment from 'moment';
    export default {
        name: "dataControl",
        data(){
            return{
                info:{
                    startTime:moment(new Date()).format('YYYY-MM-DD'),
                    endTime:"2019-07-16",
                    target:"status"
                },
                log:[]
            }
        },
        created() {
            this.getLog();
        },
        methods:{
            getLog(){
                LogFunction.getAll(this.info).then(res=>{
                    console.log(res);
                    this.log = res.data;
                })
            }

        }
    }
</script>

<style scoped lang="less">

</style>
