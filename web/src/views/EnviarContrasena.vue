<template>
<b-container>
  <b-row>
    <b-col>
      <b-row class="mt-2">
        <b-col></b-col>
        <b-col cols="1">
            <div><b-img src="http://poseidon.conpax.cl/~nicolas/Logo_Bibliotech.png" class="d-inline-block align-top" fluid alt="responsive image"></b-img></div>
        </b-col>
        <b-col></b-col>
      </b-row>

      <b-row>
        <b-col></b-col>   
        <b-col align="center" cols="8">
            <h5 class="mt-2" align="center">Sistema de Préstamos y Devoluciones Bibliotech</h5>
        </b-col>
        <b-col></b-col>   
      </b-row>

      <b-row class="mt-0">
        <b-col>
            <h6 class="mt-0" align="center" >Biblioteca Estaci&oacute;n Central</h6>
        </b-col>
      </b-row>

      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card bg-variant="light" class="mt-2">
            <b-row>
              <b-col>

                <b-row class="mt-1">
                  <b-col cols="1"></b-col>
                  <b-col align="left"><p>Para recuperar tu contrase&ntilde;a ingresa tu rut.</p></b-col>
                </b-row>

                <b-row class="mt-3">
                  <b-col cols="4" align="right"><span>Ingrese su rut:</span></b-col>
                  <b-col align="left" cols="6">
                    <b-form-input type="text" v-model="rut" :state="formatearRutLector" :bordered=true autofocus></b-form-input>
                      <b-form-invalid-feedback id="input-live-feedback">Este campo es requerido</b-form-invalid-feedback>
                  </b-col>
                  <b-col cols="1"></b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col align="center"><b-button variant='info' v-show="btnEnviar" size="sm" @click="enviarEmailContrasena()">Recuperar Contrase&ntilde;a</b-button></b-col>
                </b-row>

                <b-row class="mt-3">
                  <b-col align="center"><b-button class="mb-5" variant='outline-info' v-show="btnIniciarSesion" size="sm" @click="iniciarSesion()">Iniciar Sesi&oacute;n</b-button></b-col>
                </b-row>

              </b-col>
            </b-row>
            
          </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
      

    </b-col>
  </b-row>

  <b-toast id="toast_Ok" variant="success" solid toaster="b-toaster-top-center">
            <template #toast-title>
                <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#5cb85c" class="mr-2" width="12" height="12"></b-img>
                <strong class="mr-auto">Información!</strong>                    
                </div>
            </template>
            {{mensaje}}
        </b-toast>
		<b-toast id="toast_Error" variant="danger" solid toaster="b-toaster-top-center">
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
        <b-img blank blank-color="#d9534f" class="mr-2" width="12" height="12"></b-img>
        <strong class="mr-auto">Información!</strong>                    
        </div>
      </template>
      {{mensaje}}
    </b-toast>
</b-container>
  
</template>


<script>
import axios from 'axios';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_mA5SdDw3wIaNsBSflyelz");
export default {
  name: 'enviarcontrasena',

  data(){
    return{
      itemId: null,
      rut: '',
      mensaje: '',
      btnEnviar: true,
      btnIniciarSesion: false,
      datos: []
    }
  },
  methods: {
    enviarEmailContrasena(){
      const { validate, clean, format, getCheckDigit } = require('rut.js')

      //VERIFICA QUE EL RUT SEA VALIDO
      if (validate(this.rut)) {

        //VALIDA QUE EL RUT EXISTA PARA ENVIAR LA CONTRASENA
        axios.get("http://localhost:3000/lectores?rut_lector=" + this.rut).then(response => {
          this.datos = response.data;
          console.log(this.datos[0]);
          
          //SI LA CUENTA EXISTE ENTONCES ENVIA LA CONTRASENA
            let data = {
              from_name: "Sistema Bibliotech",
              to_email: this.datos[0].correo_lec,
              to_name: this.datos[0].nomb_lec,
              message: "Tu contraseña es: "+ this.datos[0].contrasena_lec,
              subject: "Solicitud recuperación de contraseña en ",
            };

            emailjs.send("service_33zw91m","template_jyxqvrn", data)
            .then(response => {
              if(response.status == 200){
                this.mensaje = "Hemos enviado un correo electrónico respondiendo a tu solicitud. Por favor, revisa tu bandeja de entrada.";
                this.$bvToast.show('toast_Ok');
                this.btnIniciarSesion= true;
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
              }
            })
            .catch(error => {
              this.mensaje = "Ocurrió un problema al enviar el correo.";
              this.$bvToast.show('toast_Error');
              console.log("FAILED. error=", error);
            });
        })
        .catch(error => {
          this.mensaje = "El Rut ingresado no se encuentra registrado en nuestro sistema.";
          this.$bvToast.show('toast_Error');
        });
      } else {
        this.mensaje = "El Rut ingresado no es válido.";
        this.$bvToast.show('toast_Error');
      }
    },
    /*
    actualizarContrasena(){
      const { validate, clean, format, getCheckDigit } = require('rut.js')

      //VALIDA QUE EL RUT EXISTA PARA ACTUALIZAR LA CONTRASENA
      axios.get("http://localhost:3000/lectores?rut_lector=" + format(this.rut)).then(response => {
        let dd=[];
        dd= response.data;
        console.log(dd);
        //SI LA CUENTA EXISTE ENTONCES ACTUALIZA LA CONTRASENA
        if (dd[0].rut_lector) {

          if(this.lector.contrasena_lec == this.contrasena2){


            
            //REVISAR SI SE ESTÁ HACIENDO CORRECTAMENTE EL PUT
            axios.put("http://localhost:3000/lectores/"+ this.rut,{'lector':this.lector})
            .then(response => {                                       
              if(response.status==200)
              {                        
                this.mensaje = "¡Tu contraseña ha sido exitósamente actualizada!. Ya puedes iniciar sesión.";
                this.$bvToast.show('toast_Ok');
                console.log(response.data);
                this.btnActualizar= false;
                this.btnIniciarSesion= true;
              }
            })
            .catch(error => {    
              this.mensaje = "¡No ha sido posible actualizar la contraseña!. Por favor intenta nuevamente.";
              this.$bvToast.show('toast_Error');             
              console.error("Este es el error",error);                    
            });
          } else {
            this.mensaje = "Las contraseñas no coinciden.";
            this.$bvToast.show('toast_Error');
          }
        } else {
          this.mensaje = "El Rut ingresado no se encuentra registrado en nuestro sistema.";
          this.$bvToast.show('toast_Error');
        }
      })
      .catch(error => {
        this.mensaje = "El Rut ingresado no se encuentra registrado en nuestro sistema.";
        this.$bvToast.show('toast_Error');
      });
    },
    */
    iniciarSesion(){
      this.$router.push("/login");
    }
  },
  computed:{
    formatearRutLector(){
			const { validate, clean, format, getCheckDigit } = require('rut.js')
			this.rut= format(this.rut);
      return format(this.rut).length > 10 ? true : false;
    }
  }

}
</script>