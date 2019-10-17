<template>
  <div class="main">
    <v-container>
      <h1>Información personal</h1>
      <br />
      <v-card elevation="7" class="containerClass" >
        <v-simple-table>
          <template v-slot:default>
            <thead id="table-user">
              <tr>
                <th class="text-left">Nombres</th>
                <th class="text-left">Apellidos</th>
              </tr>
            </thead>
            <tbody id="table-user">
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <v-btn color="primary" style="margin:10px;background:#08799C" @click="getInfoUser()">Editar perfil</v-btn>
      <br />
       <h1>Información de Dependencia</h1>
      <br />

      <v-card elevation="5" class="containerClass" >
        <v-simple-table>
          <template v-slot:default>
            <thead id="table-dependence">
              <tr>
                <th class="text-left">Nombre dependencia</th>
                <th class="text-left">Coordinador</th>
                <th class="text-left">Número máximo de usuarios</th>
                <th class="text-left">Ubicación</th>
              </tr>
            </thead>
            <tbody id="table-user">
              <tr :key="i" v-for="(currentUser,i) in listUsers">
                <td>{{currentUser.names}}</td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <!--  <router-link class="linkStyle" to="/recover">Olvidé mi contraseña</router-link>
      <br />-->
      <br />
      <v-btn color="primary" style="margin:10px;background:#08799C" @click="login()">Editar dependencia</v-btn>
    </v-container>
  </div>
</template>

<script>
import { db, currentUser } from "../firebaseConfig";
import Register from "./Register";
import {mapState,mapMutations} from "vuex"
const fb = require("../firebaseConfig.js");
export default {
  name: "ProfileUser",

  data: function() {
    return {
      title: "ProfileUser",
      listUsers: [],
      item:{
        name:'',
      }
    };
  },
  computed:{
    ...mapState(['currentUser'])

  },
  methods: {
  
    getInfoUser() {
     
      var tableUser = document.getElementById("table-user");
   
      fb.usersCollection
        .onSnapshot(querySnapshot => {
          tableUser.innerHTML = "";
          querySnapshot.forEach(doc => {
            console.log(`${doc.id}=> ${doc.data()}`);
            tableUser.innerHTML = ` <tr >
                <td> ${doc.data()}</td>
                <td></td>
              </tr> `;
          });
        });
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