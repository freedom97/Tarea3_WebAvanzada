<template>
  <div class="depExtendContent">
      <div v-for="user in dep.usuarios" :key="user.id" class="usuarios">
          
      </div>
  </div>
</template>

<script>
export default {
    name:'DepExtend',
    props:[
        'dep'
    ]
}
</script>

<style>

</style>