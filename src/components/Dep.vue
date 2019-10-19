<template>
  <div class="depContent">
 <v-card
    max-width="400"
    v-for="dep in deps"
    :key="dep.nombre"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="dep.img"
    >
      <v-card-title>{{dep.name}}</v-card-title>
    </v-img>

    <v-card-text>
      <div class="orange--text"><strong>{{dep.lugar}}</strong></div>

      <div>{{dep.descripcion}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        @click="editDep(dep)"
        icon
      >
        <v-icon>
            mdi-information
        </v-icon>
      </v-btn>
      <v-btn
        color="orange"
        icon
      >
        <v-icon>
        mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default {
    name:'dep',
    data:()=>({
        currentDep:{},

        dialogEdit:false,
        dialogAdd:false,
        deps:[
            {nombre:'Logística',descripcion:'Personas encargadas de gestionar los eventos de Lunes a Viernes',usuarios:[],lugar:'Cali,CO', img:'https://picsum.photos/1920/1080?random'}
        ]
    }),
    created(){
        
    },
    methods:{
        editDep(dep){
            this.dialogEdit=true
            this.currentDep=dep
        }
    }
}

</script>

<style>
.depContent{
    width:100%;
    display: flex;
    flex-direction: row;
    margin: 20px;
}
</style>