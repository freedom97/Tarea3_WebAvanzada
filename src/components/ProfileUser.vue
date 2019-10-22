<template>
  <div class="main">
 <div class="text-center">
    <v-dialog
      v-model="dialogEdit"
      width="500"
      persistent
  
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
        
        </v-card-title>
        <div style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field v-model="currentUser.nombre" label='Nombre(s)'></v-text-field>
        <v-text-field v-model="currentUser.apellido" label='Apellido(s)' :value="currentUser.apellido"></v-text-field>
        <v-text-field v-model="currentUser.email" label='Email' :value="currentUser.email"></v-text-field>
        <v-select v-model="currentUser.deps" placeholder="Dependencias" multiple solo attach :items="['Logística','Desarrollo']" ></v-select>
        <v-menu
        ref="menu2"
        v-model="menu2"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="currentUser.valido"
            label="Valido hasta"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="currentUser.valido" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu2.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>

        </div>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="updateUser()"
          >
            Actualizar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="updatePage()"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     
  </div>
    <div class="table">
     
      <v-data-table
        :search="search"
        :loading="users.length===0"
        style="width:100%;"
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="elevation-1"
      >
      <template v-slot:item.deps="{item}">
        <p v-for="dep in item.deps" v-text="dep" :key="dep"></p>
      </template>
        <template v-slot:item.acciones="{ item }">
          <v-btn class="mr-1" small color="primary" rounded @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
            </v-btn>
         
        </template>
      </v-data-table>
      
    </div>
  </div>
</template>
<script>
const fb = require("../firebaseConfig.js");

export default {
  data() {
    return {
      dateRules:[
        value=> !!value||'Es requerido'
      ],
      emailRules: [
        value => !!value || 'Es requerido el correo.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Email inválido'
        },
      ],
      rules: [
         v => !!v || 'Es requerido',
        v => (v && v.length <= 20) || 'Max 20 carácteres',
      ],
      selectRules:[
          value => (value).length>0 || 'Al menos 1',
          value=>{const pattern =/$/
          return pattern.test(value)}
      ],

      name:"",
      lastname:"",
      email:"",
      deps:[],
      valid:"",
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2:false,

     /*  search: "", */
      currentUser:"",

      dialogEdit:false,
      dialogAdd:false,

      nameLbl:false,

      headers: [
        { text: "Id", value: "id", align:'center'},
        {
          text: "Nombre",
          align: "center",
          sortable: true,
          value: "nombre"
        },
        { text: "Apellido", value: "apellido", align:'center' },
        { text: "Email", value: "email", align:'center' },
        { text: "Estado", value: "estado", sortable: false , align:'center'},
        { text: "Dependencias", value: "deps", sortable: false , align:'center'},
        { text: "Acciones", value: "acciones", sortable: false , align:'center'},
        { text: "Valido hasta", value: "valido", sortable: false , align:'center'}

      ],
      users: [ ],
    };
  },
  
  created(){
    let user ={
          id: "",
          nombre: "",
          apellido: "",
          estado:"",
          email: "",
          valido:'',
           deps:[
          ]
        }
    let date =new Date().toISOString().substring(0,10)
    
   fb.usersCollection.get().then(querySnapshot=>{querySnapshot.forEach(doc=>{
      let data=(doc.data())
     
     
        user={
          id:data.id,
          nombre:data.nombre,
          apellido:data.apellido,
          valido:data.valido,
          estado:date>data.valido?'Inactivo':'Activo',
          email: data.email,
          deps:data.deps
        }
        fb.usersCollection.doc(user.email).get().then(doc=>{console.log(this.$store.email)})
       })
   })
   
     
      
 
  },
  props:[
    'dep'
  ],
  methods:{
    updatePage(){
      this.$router.go(this.$router.currentRoute)
    },

  
    editUser(item){
      this.dialogEdit=true
      this.currentUser=item
    },
    updateUser(){
        let user={
        id:this.currentUser.id,
        nombre: this.currentUser.nombre,
        apellido:this.currentUser.apellido,
        email:this.currentUser.email,
        valido:this.currentUser.valido,
        deps:this.currentUser.deps
      }
      fb.usersCollection.doc(user.id).set(user)
      this.$router.go(this.$router.currentRoute)
    }
  }
};
</script>

<style>
.main {

  background-image: url("./img/register.jpg");
   background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.main .table {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>  