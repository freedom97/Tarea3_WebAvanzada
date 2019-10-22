<template>
  <div class="depExtendContent">
          <Users :dep="dep"/>
  </div>
</template>

<script>
import Users from './Users'
export default {
    name:'DepExtend',
    components:{
        Users
    },
    props:[
        'dep'
    ]
}
</script>

<style>

</style>