<template>
  <div class="principal">
    <div class="form">
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col cols="1" md="4" sm="3">
              <h1>{{title}}</h1>
            </v-col>
          </v-row>

          <div class="registerContent">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center">
                <v-col cols="1" md="5" sm="2">
                  <v-text-field v-model="names" :rules="nameRules" label="Nombres" required></v-text-field>
                </v-col>

                <v-col cols="1" md="5" sm="2">
                  <v-text-field
                    v-model="lastnames"
                    :rules="lastnamesRules"
                    label="Apellidos"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="1" md="6" sm="2">
                  <v-text-field v-model="email" :rules="emailRules" label="Correo" required></v-text-field>

                  <v-text-field
                    v-model="password"
                    :append-icon="show3 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.emailMatch]"
                    :type="show3 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Contraseña"
                    hint="Mínimo 8 caracteres"
                    value
                    class="input-group--focused"
                    required
                    @click:append="show3 = !show3"
                  ></v-text-field>
                  <v-text-field
                    v-model="conPassword"
                    :append-icon="show4 ? 'visibility' : 'visibility_off'"
                    :rules="[rules.required, rules.emailMatch,rules.samePassword]"
                    :type="show4 ? 'text' : 'password'"
                    name="input-10-2"
                    label="Confirmar contraseña"
                    hint="Mínimo 8 caracteres"
                    value
                    class="input-group--focused"
                    required
                    @click:append="show4 = !show4"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <br />
            <v-row justify="center">
              <v-col cols="8">
                <v-subheader>Datos para la dependencia</v-subheader>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="1" md="6" sm="2">
                <v-select
                  v-model="modelDeps"
                  :items="deps"
                  item-text="dependencias"
                  :menu-props="{ maxHeight: '400' }"
                  label="Seleccionar "
                  multiple
                  hint="Selecciona tu(s) dependencia(s)"
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>

            <v-row justify="center">
              <v-col cols="1" md="3" sm="1">
                <v-btn
                  :disabled="disabledButtonRegister"
                  color="primary"
                  @click="signup()"
                  style="margin:5px;background:#08799C"
                >Registrarse</v-btn>
              </v-col>
            </v-row>
          </div>

          <input type="button" v-on="signup" />
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import ProfileUser from "./ProfileUser";
import { db } from "../firebaseConfig";
const fb = require("../firebaseConfig.js");
export default {
  name: "Register",

  data: function() {
    return {
      title: "Register",
      names: "",
      lastnames: "",
      email: "",
      password: "",
      conPassword: "",
      deps:['dependencia10'],
      isActiveDependence: true,
      valid: "",
      date: new Date().toISOString().substr(0, 10),
      id: Math.random(),

      show1: false,
      show2: true,
      show3: false,
      show4: false,

      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        samePassword: value =>
          value === this.password || "Las contraseñas no coinciden"
      },
      nameRules: [
        name => !!name || "El nombre es requerido",
        name => name.length > 3 || "El nombre debe ser más largo a 3 caracteres"
      ],
      lastnameRules: [
        lastname => !!lastname || "El apellido es requerido",
        lastname =>
          lastname.length > 3 || "El apellido debe ser más largo a 3 caracteres"
      ],
      emailRules: [
        email => !!email || "El correo es requerido",
        email =>
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) ||
          "El correo no es valido"
      ],
    };
  },

  methods: {
    signup() {
      const userInfoRegister = {
        nombre: this.names,
        apellido: this.lastnames,
        email: this.email,
        pass: this.password,
        id: this.id,
        deps: this.deps,
        valido: this.date,
        activo: this.isActiveDependence
      };
      console.log(this.names);
      fb.auth
        .createUserWithEmailAndPassword(
          this.email,

          this.password
        )
        .then(infoRegister => {
          // this.$store.commit("setCurrentUser", user);
          fb.usersCollection.add({
            userInfoRegister
          });

          /*   // create user obj
          
            .then(infoRegister => {
              //this.$store.dispatch("fetchUserProfile");
 */
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  computed: {
    disabledButtonRegister() {
      return (
        !this.names &&
        !this.lastname &&
        !this.email &&
        !this.password &&
        !this.deps &&
        this.conPassword === this.password
      );
    }
  }
};
</script>

<style scoped>
.principal {
  background-image: url("./img/register.jpg");
  background-color: rgba(243, 243, 243, 0.5);
  background-blend-mode: color;
  background-size: cover;
  width: 100vw;
  height: 100%;
  display: flex;
  padding-top: 100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.registerContent {
  height: 100%;
  width: 100%;
}
.form {
  margin: 10px;
  height: 100%;
  width: 40%;
}
.linkStyle {
  color: #313131 !important;
}
</style>