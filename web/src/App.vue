<template>
  <div id="app">
    

    <b-container fluid>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
// import 'vue-toast-notification/dist/theme-sugar.css';
import auth from "@/logica/auth";
export default {
  name: 'App',
  data(){
    return{
      visible:true,
      showBtnIniciar: true,
      btnSesion: false,
      rut: '',
      contrasena: '',
      foto: ''
    }      
  },
  methods:{
    /*
    inicio(){
      console.log("que tiene rut lector: ",JSON.parse(auth.getUserLogged('user')).rut_lector);
      console.log("que tiene contrasena: ",JSON.parse(auth.getUserLogged('user')).contrasena_lec);
      console.log("que tiene Foto: ",JSON.parse(auth.getUserLogged('user')).foto);
    },
    iniciar(){
      this.ocultarBotonIniciar();
      this.$router.push("/login");
    },
    cerrarSesion(){
      auth.deleteUserLogged('user');
      this.rut = '';
      this.contrasena = '';
      this.foto = '';
      this.$router.push("/login");
    },
    mostrarBotonIniciar(){
			this.showBtnIniciar = true
      this.btnSesion = false
    },
    ocultarBotonIniciar(){
			this.showBtnIniciar = false
      this.btnSesion = true
    },

    // guardadoExitoso(){
    //     this.$bvToast.show('registroGuardado');
    // },
    // borradoExitoso(){
    //     this.$bvToast.show('registroBorrado');
    // },
    // errorGuardar(){
    //     this.$bvToast.show('errorGuardado');
    // },
    // errorBorrar(){
    //     this.$bvToast.show('errorBorrado');
    // }
    */
  },
  created(){
  
  },
  computed:{
    userLogged(){
      return auth.getUserLogged('user');      
    }
  },
  mounted:function(){   
    /*
    this.rut = JSON.parse(auth.getUserLogged('user')).rut_lector;
    
    this.contrasena = JSON.parse(auth.getUserLogged('user')).contrasena_lec;
    this.foto = JSON.parse(auth.getUserLogged('user')).foto;

    if (this.rut != '' || this.rut != null) {
      this.ocultarBotonIniciar();
    } else {
			this.mostrarBotonIniciar();
		}
    */
  }
}
</script>

<style>
  #brand-image{
    height:27px;    
  }  
</style>
