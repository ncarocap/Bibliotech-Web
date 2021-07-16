<template>
<b-container>
  <b-row>
    <b-col>
      <b-row class="mt-2">
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

      <b-row class="mt-5">
        <b-col></b-col>   
        <b-col align="center" cols="8">
          <b-button variant='outline-info' small @click="iniciarSesion()">
            <h4 class="mt-2" align="center">¡Tu cuenta ha sido exit&oacute;samente activada!. Ya puedes iniciar sesi&oacute;n.</h4>
          </b-button>
        </b-col>
        <b-col></b-col>   
      </b-row>

    </b-col>
  </b-row>
</b-container>
  
</template>


<script>
export default {
  name: 'cuentaactivada',

  methods: {
    iniciarSesion(){
      this.$router.push("/login");
    }
  }

}
</script>
