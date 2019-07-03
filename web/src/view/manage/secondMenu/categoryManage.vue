<template>
    <div class="box">
        <div class="transfer-box"></div>
        <div class="transfer-box"></div>
        <div class="transfer-box"></div>

    </div>
</template>

<script>
    export default {
        name: "categoryManage"
    }
</script>

<style scoped lang="less">
    .box{
        height:calc(100% - 40px);
        display: flex;
        .transfer-box{
            width:25% !important;
            float: left;
            margin-left:6%;
            height:calc(100% - 2px);
            border:1px solid #ddd;
        }
    }

</style>
