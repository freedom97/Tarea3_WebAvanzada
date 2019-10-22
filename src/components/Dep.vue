<template>
  <div class="depContent">
 <v-card
    max-width="400"
    style="margin:20px;"
    v-for="dep in deps"
    :key="dep.nombre"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="dep.img"
    >
      <v-card-title>{{dep.nombre}}</v-card-title>
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
        @click="deleteDep(dep)"
      >
        <v-icon>
        mdi-delete
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
     <v-dialog
      v-model="dialogEdit"
      width="100vw"
      class="text-center"
    >
   <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
         Información
        </v-card-title>
        <v-card-text style="font-size:18px;">
          <div style="width:100%;border:1px solid black;margin:15px;padding:10px;">
          <v-btn icon style="margin-left:97%">
            <v-icon>
              mdi-pencil
            </v-icon>
           </v-btn>
        <p><strong>Nombre: </strong>{{currentDep.nombre}}</p>
        <p><strong>Coordinador: </strong>{{currentDep.coordinador}}</p>
        <p><strong>Descripción: </strong>{{currentDep.descripcion}}</p>
        <p><strong>Lugar: </strong>{{currentDep.lugar}}</p>
          </div>
        <div class="usuarios">
          <DepExtend style="border:1px solid black;" :dep="currentDep.nombre" />
        </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="closeWin()"
          >
            Salir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn @click="dialogAdd=true" color="primary" dark medium absolute right bottom>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
           <v-dialog
      v-model="dialogAdd"
      width="500"
      persistent
  
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Dependencia
        </v-card-title>
        <v-form  ref="form" v-model="valid" style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field :rules="rules" v-model="newDep.nombre" label='Nombre(s)'></v-text-field>
        <v-text-field :rules="desRules" v-model="newDep.descripcion" label='Descripción'></v-text-field>
        <v-text-field :rules="rules" v-model="newDep.lugar" label='Lugar'></v-text-field>
        <v-text-field :rules="rules" v-model="newDep.coordinador" label='Coordinador'></v-text-field>
 


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="addDep()"
          >
            Agregar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogAdd=false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-dialog width="50vw" v-model="dialogSuccess">
      <v-card>
        <v-card-title>
          Éxito
        </v-card-title>
        <v-card-text>
          Se ha realizado la operación con éxito
        </v-card-text>
        <v-divider>

        </v-divider>
        <v-card-actions>
          <v-btn @click="updatePage()" class="primary" text>
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import DepExtend from './DepExtend'
const fb = require("../firebaseConfig.js");

export default {
    name:'dep',
    components:{
      DepExtend
    },
    data:()=>({
      rules: [
          v => !!v || 'Obligatorio',
         v => (v && v.length <= 20) || 'Max 20 carácteres',
       ],
      desRules: [
          v => !!v || 'Obligatorio',
         v => (v && v.length <= 100) || 'Max 100 carácteres',
       ],
       valid:false,
      newDep:{
          nombre:'',
          descripcion:'',
          lugar:'',
          coordinador:'',
        },
        currentDep:{},
        dialogEdit:false,
        dialogAdd:false,
        dialogSuccess:false,
        deps:[ ]
    }),
    created(){
        fb.depsCollection.get().then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            let data=doc.data()
            this.deps.push(
              {
                id:data.id,  
                nombre:data.nombre,
                descripcion:data.descripcion,
                lugar:data.lugar,
                coordinador:data.coordinador,
                img:'https://picsum.photos/1920/1080?random'
              }
            )
          })
        })
    },
    methods:{
      updatePage(){
        this.$router.go(this.$router.currentRoute)
      },
      async addDep(){
        let dependencie={
          id:Math.floor(Math.random()*10000).toString(),
          nombre:this.newDep.nombre,
          descripcion:this.newDep.descripcion,
          lugar:this.newDep.lugar,
          coordinador:this.newDep.coordinador,
        }
        await fb.depsCollection.doc(dependencie.id).set(dependencie)
        this.dialogSuccess=true
      },
        async deleteDep(dep){
         await fb.depsCollection.doc(dep.id).delete()
          this.dialogSuccess=true
        },
        editDep(dep){
          this.currentDep=dep
          this.dialogEdit=true
        },
        closeWin(){
          this.dialogEdit=false
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