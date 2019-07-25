<template>
    <div>
        <Navheader></Navheader>
        <router-view></router-view>
    </div>
</template>

<script>
    import Navheader from '../../components/exhibition/header'
    export default {
        name: "home",
        data(){
            return{

            }
        },
        components:{Navheader}
    }
</script>

<style scoped>

</style>
