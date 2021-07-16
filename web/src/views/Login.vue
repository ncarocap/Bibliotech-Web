<template>
  <div>
      <b-container fluid="1" >
            <b-row class="mt-2">
                <b-col cols="2"></b-col>
                <b-col cols="8" align="center">
                    <b-card img-top bg-variant="light">                        

                        <form action class="form" @submit.prevent="iniciarSesion">  
                            <b-row class="mt-0">
                                <b-col></b-col>
                                <b-col cols="2">
                                    <div><b-img src="http://poseidon.conpax.cl/~nicolas/bibliotechLOGO.png" class="d-inline-block align-top" fluid alt="responsive image"></b-img></div>
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
                            
                            <b-row class="mt-3">
                                <b-col>
                                    <h5 class="mt-0" align="center" ><strong>Inicio de Sesión</strong></h5>
                                </b-col>
                            </b-row>
                            
                            <b-row class="mt-2">    
                                <b-col></b-col>          
                                <b-col cols="8">                  
                                    <b-form-input type="text" id="username" name="username" label="username"
                                    v-model="rut_lector" placeholder="ej: 12.345.678-9" class="form-control"
                                    :state="comprobarUsername" :bordered=true autofocus autocomplete="off"></b-form-input>
                                        <b-form-invalid-feedback id="input-live-feedback">Este campo es requerido</b-form-invalid-feedback>
                                </b-col>  
                                <b-col></b-col>                            
                            </b-row>

                            <b-row class="mt-2">
                                <b-col></b-col> 
                                <b-col cols="8">                  
                                    <b-form-input type="password" id="contrasena" name="contrasena" label="contrasena" align="center"
                                    v-model="contrasena_lec" placeholder="Contraseña" class="form-control"
                                    :state="comprobarPassword" :bordered=true></b-form-input>
                                        <b-form-invalid-feedback id="input-live-feedback">Este campo es requerido</b-form-invalid-feedback>
                                </b-col>                                    
                                <b-col></b-col> 
                            </b-row>

                            <b-row class="mt-3">  
                                <b-col></b-col>
                                <b-col cols="6" align="center"><b-button block variant="info"  @click="iniciarSesion()" >Iniciar Sesión</b-button></b-col>                  
                                <b-col></b-col>                          
                            </b-row>

                            <b-row class="mt-2">  
                                <b-col></b-col>
                                <b-col cols="4" align="center"><b-link v-b-modal.modalRecuperarContrasena>¿Olvidaste la contrase&ntilde;a?</b-link></b-col>                  
                                <b-col></b-col>                          
                            </b-row>

                            <b-row class="mt-3">  
                                <b-col></b-col>
                                <b-col cols="4" align="center"><b-button outlined variant="outline-info"  @click="volverCatalogo()" >Volver al Catálogo</b-button></b-col>                  
                                <b-col></b-col>                          
                            </b-row>

                            <b-row class="mt-3">
                                <b-col align="center">
                                    <b-toast id="toast_error" variant="danger" solid title="¡Atención.!" static >
                                        {{mensaje}}
                                    </b-toast>
                                </b-col>
                            </b-row>                                                   
                        </form>
                    </b-card>
                </b-col>
                <b-col cols="2"></b-col>
            </b-row>
            <b-row class="mt-2" ></b-row>

            <!-- Modal Recuperar Contraseña -->
            <div id="divRecuperarContrasena" name="divRecuperarContrasena">
                <template>
                    <b-modal id="modalRecuperarContrasena" name="modalRecuperarContrasena" size="md" no-close-on-esc scrollable centered  
                        v-model='modalShow' header-bg-variant='info' header-text-variant='light' no-close-on-backdrop hide-header-close
                        footer-bg-variant="light">
                        <template #modal-title>
                            <span>Recuperar Contrase&ntilde;a</span>                                             
                        </template>
                        <b-container fluid="">
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col cols="10"><p>Ingresa tu Email. Te enviaremos un link para recuperar la contrase&ntilde;a.</p></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col>
                                    <span>Email:</span>
                                </b-col>
                                <b-col cols="7">
                                    <b-form-input class="ml-4" placeholder="ej: pedroarriagada@mail.com" type="email" v-model="email" :state="null" autofocus autocomplete="off"></b-form-input>
                                </b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col cols="5"></b-col>
                                <b-col cols="6" align="center"><b-button class="mb-5" variant='info' size="sm" @click="recuperarContrasena()">Recuperar Contrase&ntilde;a</b-button></b-col>
                                <b-col></b-col>
                            </b-row>
                        </b-container>
                        <template #modal-footer>
                            <div class="w-100">
                                <b-row>
                                    <b-col align="right">
                                        <b-button variant='secondary' style="width: 4rem;" size="sm" @click='modalShow = !modalShow'>Cerrar</b-button>
                                    </b-col>                                        
                                </b-row>                                    
                            </div>                                                
                        </template>
                    </b-modal>
                </template>
            </div>
        </b-container>
    </div>
</template>


<script>    
// import 'vue-toast-notification/dist/theme-sugar.css';
import auth from "@/logica/auth";
import axios from "axios";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_mA5SdDw3wIaNsBSflyelz");
export default {
    name: 'Login',
    created(){            
                        
    },
    data(){
        return{
            itemId: null,
            mensaje: '',
            texto: '',
            rut_lector: '',
            contrasena_lec: '',
            email: '',
            foto: '',
            activo: '',
            modalShow: false,
            datos: []
        }
    },
    methods:{
        iniciarSesion(){
            const { validate, clean, format, getCheckDigit } = require('rut.js')
            try {

                axios.get("http://localhost:3000/lectores?rut_lector=" + format(this.rut_lector)).then(response => {
                    this.datos = response.data
                    
                    const user = {
                        rut_lector: format(this.rut_lector),
                        contrasena_lec: this.contrasena_lec,
                        foto:this.datos[0].foto,
                        activo:this.datos[0].activo
                    };

                    if (validate(this.rut_lector)) {
                        if ((format(this.rut_lector) == this.datos[0].rut_lector) && (this.contrasena_lec == this.datos[0].contrasena_lec)) {
                            if ((this.datos[0].activo == 'A')) {
                                auth.setUserLogged(user);
                                this.$router.push("/");
                            } else {
                                this.mensaje = "Acceso Denegado. Tu perfil se encuentra inhabilitado.";
                                this.$bvToast.show('toast_error');
                            }
                        } else {
                            this.mensaje = "Has introducido mal el Rut o la Contraseña.";
                            this.$bvToast.show('toast_error');
                        }

                    } else {
                        this.mensaje = "Has introducido mal el Rut o la Contraseña.";
                        this.$bvToast.show('toast_error');
                    }

                })
                .catch(error => {
                    this.mensaje = "Has introducido mal el Rut o la Contraseña.";
                    this.$bvToast.show('toast_error');
                });
            } catch (error) {
                console.log(error);
                this.mensaje = "Falló el ingreso. Por favor revise los datos ingresados e intente nuevamente.";
                this.$bvToast.show('toast_error')
            }
        },
        recuperarContrasena(){
            const { validate, clean, format, getCheckDigit } = require('rut.js')

            let data = {
                from_name: "Sistema Bibliotech",
                to_email: this.email,
                message: "Para crear una nueva contraseña debes hacer click en el siguiente enlace:",
                subject: "Crear nueva contraseña en ",
            };
            
            emailjs.send("service_33zw91m","template_jyxqvrn", data)
            .then(function(response) {
                if(response.text === 'OK'){
                    alert('El correo se ha enviado de forma exitosa. Por favor revisa tu bandeja de entrada');
                    //poner un toast
                }
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
                // Limpiar campos modal
                //this.email=null;

            }, function(err) {
                alert('Ocurrió un problema al enviar el correo');
                //poner un toast
                console.log("FAILED. error=", err);
            });
        },
        volverCatalogo(){
            this.$router.push("/");
        }
    },
    computed:{
        comprobarUsername(){
            const { validate, clean, format, getCheckDigit } = require('rut.js')
			this.rut_lector= format(this.rut_lector);
            if (format(this.rut_lector).length > 10 && format(this.rut_lector).length < 13) {
                return true;
            } else {
                return false;
            }
        },
        comprobarPassword(){
            return this.contrasena_lec.length > 5 ? true : false;
        }
    },
    mounted:function(){

    }                 
}
</script>