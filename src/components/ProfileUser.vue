<template>
  <div class="usersContent">
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
          Editar usuario
        </v-card-title>
        <div style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field :v-model="userToEdit.name" label='Nombre(s)' :value="currentUser.nombre"></v-text-field>
        <v-text-field :v-model="userToEdit.lastname" label='Apellido(s)' :value="currentUser.apellido"></v-text-field>
        <v-text-field :v-model="userToEdit.email" label='Email' :value="currentUser.email"></v-text-field>
        <v-select v-model="userToEdit.deps" placeholder="Dependencias" :multiple="true"  :items="['Logística','Desarrollo']" ></v-select>
        <v-menu
        ref="menu2"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :v-model="userToEdit.date"
            label="Valido hasta"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="userToEdit.date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>

        </div>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Actualizar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogEdit = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          Agregar usuario
        </v-card-title>
        <v-form  ref="form" v-model="valid" style="margin:auto;width:70%; display:flex;flex-direction:column;align-items:center">
        <v-text-field :rules="rules" v-model="name" label='Nombre(s)'></v-text-field>
        <v-text-field :rules="rules" v-model="lastname" label='Apellido(s)'></v-text-field>
        <v-text-field :rules="emailRules" v-model="email" label='Email'></v-text-field>
        <v-select :rules="selectRules" v-model="deps" placeholder="Dependencias" :multiple="true" :items="['Logística','Desarrollo']"></v-select>

         <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Valido hasta"
            prepend-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>


        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="primary"
            text
            @click="addUser()"
          >
            Agregar
          </v-btn>
          <v-btn
            color="error"
            text
            @click="dialogAdd = false"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
    <div class="table">
      <div style="width:50%">
        <v-text-field
          placeholder="Buscar usuarios nombre, apellido o correo"
          v-model="search"
          append-icon="search"
        ></v-text-field>
      </div>
      <v-data-table
        :search="search"
        :loading="users.length===0"
        style="width:100%;"
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="elevation-1"
      >
        
      </v-data-table>
      <v-btn @click="dialogAdd=true" style="margin-top:-45px" color="primary" dark small fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { db, currentUser } from "../firebaseConfig";
import Register from "./Register";
import { mapState, mapMutations } from "vuex";
const fb = require("../firebaseConfig.js");
export default {
  name: "ProfileUser",

  data: function() {
    return {
      title: "ProfileUser",
      userToEdit:
        {
          name:"",
          lastname:"",
          email:"",
          deps:[],
          valid:"",
          date:new Date().toISOString().substr(0, 10),
          menu2:false
        },
        currentUser:"",

      dialogEdit:false,
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
        { text: "Acciones", value: "acciones", sortable: false , align:'center'}
      ],
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    removeUser(item) {
      fb.usersCollection.doc(item.id).delete();
    },
    getInfoUser(item) {
      this.dialogEdit = true;
      this.currentUser = item;
    }
  }
};
</script>

<style>
.main {
  background-image: url("./img/register.jpg");
  background-color: rgba(243, 243, 243, 0.5);
  background-blend-mode: color;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.containerClass {
  background-color: #f8f8f8;
  padding: 2% 2%;
  width: 27%;
  border-radius: 10px;
}

.linkStyle {
  color: #313131 !important;
}
</style>