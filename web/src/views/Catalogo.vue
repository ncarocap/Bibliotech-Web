<template>

<b-container fluid="1">
    <div id="main" class="row flex-xl-nowrap2 mt-5 mb-2 pl-2 pr-2">
        <div class="bd-sidebar border-bottom-0 col-md-3 col-xl-2 col-12">
            <form class="bd-search d-flex align-items-center">
                <span class="algolia-autocomplete">
                    <h5 class="mt-3" text-variant="light">Búsqueda</h5>
                    <!-- select filtro busqueda producto -->
                    <b-form-input placeholder="Búsqueda Título" class="mt-3" type="search" v-model="texto1" :state="null"></b-form-input>
                    <b-form-input placeholder="Búsqueda Autor" class="mt-3" type="search" v-model="texto2" :state="null"></b-form-input>
                    <b-button class="mt-3 float-right" variant='success' size="sm" @click="filtroBuscarProducto()">Buscar</b-button>
                </span>
            </form>
            <nav class="bd-links d-none d-md-block">
                <ul class="nav bd-sidenav">
                    <li class="nav-item mt-5"> Filtros de búsqueda
                        <!-- select filtro tipo producto -->
                        <b-form-select class="mt-3" v-model="tipoproducto" :options="tipoproductos" value-field="id_tipo_prod" text-field="desc_t_prod" size="sm" @change="cargarFiltroTipoProducto()">
                            <template #first>
                                <b-form-select-option :value="null" disabled>Tipo Producto</b-form-select-option>
                            </template>
                        </b-form-select>
                            
                        <!-- select filtro categoria producto -->
                        <b-form-select class="mt-3" v-model="categoria" :options="categorias" value-field="id_categoria" text-field="desc_cat" size="sm" @change="cargarFiltroCategoria()">
                            <template #first>
                                <b-form-select-option :value="null" disabled>Categor&iacute;a Producto</b-form-select-option>
                            </template>
                        </b-form-select>
                        <!-- select filtro lugar prestamo -->
                        <b-form-select class="mt-3" v-model="item2" :options="lugarPrestamo" value-field="text" text-field="text" size="sm" @change="cargarFiltroLugar()">
                            <template #first>
                                <b-form-select-option :value="null" disabled>Lugar Pr&eacute;stamo</b-form-select-option>
                            </template>
                        </b-form-select>
                        <!-- Borrar filtros -->
                        <b-button id="borrarfiltro" class="mt-5" block variant="dark" @click="borrarFiltros()">Borrar Filtros</b-button>
                    </li>                    
                </ul>
            </nav>
        </div>
        <div class="bd-content col-md-10 col-xl-10 col-12 pb-md-3 pl-md-5">
            
            <b-row class=" mr-5">
                <b-col>
                    <b-button class="float-right" variant='info' small v-show="showBtnIniciar" @click='iniciar()'>Iniciar Sesión</b-button>
                    <b-button class="float-right mr-3" variant='outline-info' small v-show="showBtnRegistrar" v-b-modal.modalRegistrarLector>Registrarse</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-4">
                <b-col>
                    <b-dropdown size="lg" text="Dropdown Button" variant="info" v-show="btnSesion"
                    toggle-class="text-decoration-none">
                        <template #button-content>
                            <b-avatar variant="light" :src="foto" size="3rem"></b-avatar><span class="ml-2">{{rut}}</span>
                        </template>
                        <b-dropdown-item variant="primary" @click="cerrarSesion">Cerrar Sesión</b-dropdown-item>
                    </b-dropdown>
                </b-col>
                <b-col align="right">
                    <b-dropdown name="dropdown1" id="dropdown1" v-show="showDropdown"
                    :text="'Lista de deseos ('+tmp.length+')'" class="m-md-2" variant="warning">                        
                        <b-dropdown-item v-b-modal.modalDetalleReserva>Ir a reservar</b-dropdown-item>                        
                    </b-dropdown>
                </b-col>
            </b-row>
            <!-- BCARD PRODUCTO -->
            <b-row class="mt-3">
                <b-card-group columns>            
                    <b-card
                        :sub-title="item.desc_prod"
                        :img-src="item.foto_producto"
                        :img-alt="item.titulo"
                        img-top
                        img-height="350"
                        style="max-width: 25rem;"            
                        class="mb-4"
                        v-for="item in productos" :key="item.id_producto" >
                        <template #header>
							<b-row>
								<b-col><h5>{{item.titulo}}</h5></b-col>
							</b-row>
							<template v-if="item.cantidad==0">
								<b-row>
									<b-col><small class="text-danger"><span >Sin Stock</span></small></b-col>
								</b-row>
							</template>
							<template v-else>
								<b-row>
									<b-col><small class="text-muted">Disponible:</small><small class="text-muted ml-1">{{item.cantidad}}</small></b-col>
								</b-row>
							</template>
							
                        </template>

                        <b-row class="mt-2">
                            <b-col><b-link v-b-modal.modalDetalleProducto @click="buscarProducto(item.id_producto)" href="">Ver detalle >></b-link></b-col>                                
                        </b-row>                        

                        <template #footer>
                            <template v-if="item.cantidad==0">

                                <b-row>
                                    <b-col align="right">
                                        <b-row>
											<b-col cols="6.5" class="pl-3">
                                                <b-form-datepicker disabled placeholder="Fecha reserva" size="sm" v-model="value[item.id_producto]"
											    :min="min" :max="max" locale="" :state="null"
											    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
                                            </b-col>
											<b-col>
                                                <b-button disabled class="float-right" variant='primary' size="sm"
                                                @click="anadirProducto(item.id_producto,value[item.id_producto])">
                                                A&ntilde;adir a la lista</b-button>
                                            </b-col>
										</b-row>
                                    </b-col>
                                </b-row>

                            </template>
                            <template v-else>

                                <b-row>
                                    <b-col align="right">
										<b-row>
											<b-col cols="6.5" class="pl-3">
                                                <b-form-datepicker placeholder="Fecha reserva" size="sm" v-model="value[item.id_producto]" 
											    :min="min" :max="max" locale="" :state="null" :disabled="btnAnadirLista.estadoFecha[item.id_producto] ? true:false"
											    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric',  }"></b-form-datepicker>
                                            </b-col>
											<b-col>
                                                <b-button class="float-right" variant='primary' size="sm" :disabled="btnAnadirLista.estado[item.id_producto] ? true:false"
                                                @click="anadirProducto(item.id_producto,value[item.id_producto])">
                                                {{btnAnadirLista.texto[item.id_producto] ? ' Añadido':'Añadir a la lista' }}</b-button>
                                            </b-col>
										</b-row>
                                    </b-col>
                                </b-row>

                            </template>

                        </template>
                    </b-card>            
                </b-card-group>
            </b-row>

            <!-- Modal Detalle Producto -->
            <div id="divDetalle" name="divDetalle">
                <template>
                    <b-modal id="modalDetalleProducto" name="modalDetalleProducto" size="lg" no-close-on-esc scrollable centered :title='item.titulo' 
                        v-model='modalShow1' header-bg-variant='primary' header-text-variant='light' no-close-on-backdrop hide-header-close
                        footer-bg-variant="light">
                        <b-container fluid>
                                <b-row>
                                    <b-col cols="6">
                                        <b-img fluid style="height:400px" :src="producto.foto_producto"></b-img>
                                    </b-col>
                                    
                                    <b-col cols="4">
                                        <b-row>
                                            <b-col>
                                                <h1>{{producto.titulo}}</h1>
                                                <h4>{{producto.desc_prod}}</h4>
                                                <p>por: {{producto.autor}}</p>
                                            </b-col>                                        
                                        </b-row>
                                        <b-row class="mt-3">
                                            <b-col align="center">
                                                <b-card>
                                                    <b-row><small>Id: {{producto.id_producto}}</small></b-row>                                                
                                                    <b-row><small>Editorial: {{producto.editorial}}</small></b-row>
                                                    <b-row><small>Edición: {{producto.edicion}}</small></b-row>
                                                    <b-row><small>Año edición: {{producto.anno_edic}}</small></b-row>
                                                    <b-row><small>Duración: {{producto.duracion}}</small></b-row>
                                                    <b-row><small>Tiempo de préstamo (HRS): {{producto.tiempo_prest}}</small></b-row>
                                                    <b-row><small>Préstamo a: {{producto.lugar_prest}}</small></b-row>                                                
                                                    <b-row><small>Id Categoría: {{producto.id_categoria}}</small></b-row>
                                                    <b-row><small>Ubicación: {{producto.id_ubicacion}}</small></b-row>
                                                </b-card>
                                            </b-col>                                        
                                        </b-row>                                                                        
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col></b-col>
                                </b-row>
                        </b-container>
                        <template #modal-footer>
                            <div class="w-100">
                                <span class="float-left text-muted">Cantidad Disponible: {{producto.cantidad}}</span>

                                <template v-if="producto.lugar_prest=='Sala' || producto.lugar_prest=='Sala y Domicilio'">
                                    <span class="text-info ml-5">Pr&eacute;stamos en sala:</span><span class="text-info ml-1">{{cantidadProductosSala}}</span>
                                </template>
                                
                                <b-button class="float-right" variant='primary' small @click='modalShow1 = !modalShow1'>Cerrar</b-button>
                            </div>                                                
                        </template>
                    </b-modal>
                </template>
            </div>

            <!-- Modal Detalle Reserva -->
            <div id="divDetalle" name="divDetalle">
                <template>
                    <b-modal id="modalDetalleReserva" name="modalDetalleReserva" size="lg" no-close-on-esc scrollable centered title='Lista de deseos' 
                        v-model='modalShow2' header-bg-variant='primary' header-text-variant='light' no-close-on-backdrop hide-header-close
                        footer-bg-variant="light">
                        <b-container fluid>
                            <div v-if="detalleReserva.length>0">
                                <b-row class="mt-5" v-for="item1 in detalleReserva" :key="item1.id_producto">
                                    <b-col align="right" cols="2">
                                        <b-button size="sm" variant="danger" @click="quitarListaDeseo(item1.id_producto)">X</b-button>
                                    </b-col>
                                    
                                    <b-card no-body class="overflow-hidden" style="width: 600px;" bg-variant="light">                                                                                              
                                        <b-row>
                                            <b-col cols="4">
                                                <b-card-img :src="item1.foto_producto" :alt="item1.titulo" height="200" ></b-card-img>
                                            </b-col>
                                            <b-col cols="8">
                                                <b-row>
                                                    <b-col>
                                                        <b-card-body :title="item1.titulo">
                                                            <b-card-text>{{item1.desc_prod}}</b-card-text>
                                                            <b-card-text> <b-link>Cantidad: 1</b-link></b-card-text>
                                                        </b-card-body>
                                                    </b-col>                                            
                                                </b-row>                                        
                                            </b-col>
                                        </b-row>                                                                                       
                                    </b-card>                            
                                </b-row>
                            </div>
                            <div v-else>
                                <b-row>
                                    <b-col align="center">
                                        <h4>Lista Vacía</h4>
                                        <p>Vuelva al Catálogo y seleccione según su interés.</p>
                                    </b-col>
                                </b-row>                            
                            </div>
                            
                        </b-container>
                        <template #modal-footer>
                            <div class="w-100">
                                <b-row>
                                    <b-col align="right">
                                        <b-button variant='secondary' style="width: 4rem;" size="sm" @click='modalShow2 = !modalShow2'>Cerrar</b-button>
                                        <b-button class="ml-3" style="width: 8rem;" variant='primary' size="sm" @click="guardarReserva()">Reservar</b-button>
                                    </b-col>                                        
                                </b-row>                                    
                            </div>                                                
                        </template>
                    </b-modal>
                </template>
            </div>

            <!-- Modal Registrar Lector -->
            <div id="divRegistrarLector" name="divRegistrarLector">
                <template>
                    <b-modal id="modalRegistrarLector" name="modalRegistrarLector" size="lg" no-close-on-esc scrollable centered title='Registrar nueva cuenta' 
                        v-model='modalShow3' header-bg-variant='primary' header-text-variant='light' no-close-on-backdrop hide-header-close
                        footer-bg-variant="light">
                        <b-container fluid="">
                            <b-row>
                                <b-col cols="1"></b-col>
                                <b-col><span>Rut:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: 12.345.678-9" type="text" v-model="lector.rut_lector" :state="formatearRutLector" size="sm" autofocus></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Nombre:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: Pedro" type="text" v-model="lector.nomb_lec" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Apellido:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: Arriagada" type="text" v-model="lector.ape_lec" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Direcci&oacute;n:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: Calle nueva 1390" type="text" v-model="lector.direccion" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Email:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: pedroarriagada@mail.com" type="email" v-model="lector.correo_lec" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Tel&eacute;fono:</span></b-col><b-col cols="7"><b-form-input class="ml-4" placeholder="ej: 987654321" type="text" v-model="lector.tel_lec" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Contrase&ntilde;a:</span></b-col><b-col cols="7"><b-form-input class="ml-4" type="password" v-model="lector.contrasena_lec" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                            <b-row class="mt-3">
                                <b-col cols="1"></b-col>
                                <b-col><span>Repita Contrase&ntilde;a:</span></b-col><b-col cols="7"><b-form-input class="ml-4" type="password" v-model="confirmarclave" :state="null" size="sm"></b-form-input></b-col>
                                <b-col></b-col>
                            </b-row>
                        </b-container>
                        <template #modal-footer>
                            <div class="w-100">
                                <b-row>
                                    <b-col align="right">
                                        <b-button variant='secondary' style="width: 4rem;" size="sm" @click="modalShow3 = !modalShow3, limpiarFormularioRegistro()">Cerrar</b-button>
                                        <b-button class="ml-3" style="width: 8rem;" variant='primary' size="sm" @click="registrarLector()">Registrar</b-button>
                                    </b-col>                                        
                                </b-row>                                    
                            </div>                                                
                        </template>
                    </b-modal>
                </template>
            </div>
            
        </div>
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
    </div>
</b-container>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import auth from "@/logica/auth";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_mA5SdDw3wIaNsBSflyelz");
export default {
    name: 'Catalogo',
    data(){

        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // Fecha de Hoy
        const minDate = new Date(today)
        minDate.setDate(today.getDate())
        //minDate.setDate(15)

        // 15 dias despues
        const maxDate = new Date(today)
        maxDate.setDate(minDate.getDate() + 15)
        //maxDate.setDate(15)

        return{
            rut: '',
            foto: '',
            showBtnIniciar: true,
            showBtnRegistrar: true,
            btnSesion: false,

            value: {},
            min: minDate,
            max: maxDate,
            
            item: '',
            item1: '',
            item2: null,
            categoria: null,
            tipoproducto: null,
            selected: '',
            texto1: '',
            texto2: '',
            cantidadProductosSala: 0,

            btnAnadirLista:{
                estado: {},
                estadoFecha: {},
                texto: {}
            },

			mensaje: '',

            confirmarclave: '',
            modalShow1: false,
            modalShow2: false,
            modalShow3: false,
            showDropdown: false,
            select: null,
            categorias: [],
            xbusqueda: [],
            xcategorias: [],
            tipoproductos: [],
            xtipoproductos: [],
            lugar: [],
            productos:[],            
            tmp: [],
            detalleProducto:[],
            detalleReserva: [],
            reservas: [],
            prestamosSala: [],

            idReservas: [],
            maxIdReserva: [],
			idLectores: [],
            maxIdLector: [],


            lugarPrestamo:[                
                {value:1,text:'Sala'},
                {value:2,text:'Sala y Domicilio'}
            ],
            producto: {
                id_producto: null,
                desc_prod: '',
                titulo: '',
                autor: '',
                editorial: '',
                edicion: '',
                anno_edic: null,
                duracion: '',
                tiempo_prest: null,
                lugar_prest: null,
                cantidad: null,
                id_categoria: null,
                id_ubicacion: null,
                foto_producto: ''
            },
            lector: {
                rut_lector: '',
                nomb_lec: '',
                ape_lec: '',
                direccion: '',
                correo_lec: '',
                contrasena_lec:'',
                tel_lec: '',
				activo: 'I',
				foto: '',
				huella: '',
				id_lector: null
            }
        }
    },    
    created(){
        this.cargarProductos();

        axios.get('http://localhost:3000/categorias').then(response => this.categorias = response.data);
        axios.get('http://localhost:3000/tipoproductos').then(response => this.tipoproductos = response.data);

		if (auth.getUserLogged('user').rut_lector != '' || auth.getUserLogged('user').rut_lector != null) {
            this.mostrarBotonLista();
        } else {
			this.ocultarBotonLista();
		}

        //this.btnAnadirLista.texto = "Añadir a la lista"
    },
    methods:{
        mostrarBotonIniciar(){
			this.showBtnIniciar = true
            this.showBtnRegistrar = true
            this.btnSesion = false
        },
        ocultarBotonIniciar(){
            this.showBtnIniciar = false
            this.showBtnRegistrar = false
            this.btnSesion = true
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
        filtroBuscarProducto(){    
            let url;
            url = "http://localhost:3000/productos?lugar_prest="+this.item2
            url += "&titulo=" + this.texto1
            url += "&autor=" + this.texto2
            url += "&id_categoria=" + this.categoria
            axios.get(url).then(response => this.productos = response.data);
        },
        //Filtrar productos por Tipo  de Producto
        cargarFiltroTipoProducto(){   
                   
            axios.get('http://localhost:3000/categorias?id_tipo_prod='+ this.tipoproducto).then(response => {
                var datos= [];  
                this.xtipoproductos = response.data
                this.xtipoproductos.forEach(element => {
                    axios.get('http://localhost:3000/productos?id_categoria='+ element.id_categoria).then(response => {
                        this.xcategorias = response.data
                        this.xcategorias.forEach(subelement => {                                       
                            datos.push(subelement);
                        });
                    });
                });
                this.productos = datos;
            });
        },
        //Filtrar productos por Categoria
        cargarFiltroCategoria(){
            axios.get('http://localhost:3000/productos?id_categoria='+ this.categoria).then(response => this.productos = response.data);
        },
        //Filtrar productos por Lugar de Préstamo
        cargarFiltroLugar(){
            axios.get('http://localhost:3000/productos?lugar_prest='+ this.item2).then(response => this.productos = response.data);
        },
        //Cargar todos los Productos
        cargarProductos(){
            axios.get('http://localhost:3000/productos').then(response => this.productos = response.data);
        },
        // Añadir Producto a la lista de deseos
        anadirProducto(id,val){
            //moment.locale();
            var horaMinuto = moment().format('HH:mm');
            var unirFechaHora = Date.parse( val+" "+horaMinuto);
            var fechaCompleta = moment(unirFechaHora).format('YYYY-MM-DD HH:mm');
            this.maxIdReserva = this.maxIdReserva + 1;
			
			if (val) {
				try {                
					this.tmp.push({rut_lector:JSON.parse(auth.getUserLogged('user')).rut_lector, fecha_reserva:fechaCompleta, id_producto:id, id_reserva:this.maxIdReserva});
                    this.btnAnadirLista.estado[id] = true;
                    this.btnAnadirLista.estadoFecha[id] = true;
                    this.btnAnadirLista.texto[id] = true;

					axios.get('http://localhost:3000/productos/'+id)
					.then(response => {
						this.detalleReserva.push(response.data)                    
					});
				} catch (error) {
					console.log('ESTE ES EL ERROR:   ',error);
				}
			} else {
				this.mensaje = "Para añadir a la lista debe seleccionar fecha de reserva.";
				this.$bvToast.show('toast_Error');
			}
            /*
            console.log("QUE ESTOY GUARDANDO EN LA LISTA DE DESEOS: FECHA RESERVA >> ", fechaCompleta);
            console.log("FECHA Y HORA: ", fechaCompleta );
            console.log("FECHA Y HORA: ", Date(fechaCompleta) );
            */
        },
        // Buscar producto por el ID_PRODUCTO
        buscarProducto(id){
            this.cantidadProductosSala = 0;
            axios.get('http://localhost:3000/productos/'+id)
            .then(response => {
                this.detalleProducto = response.data
                
                this.producto.id_producto=this.detalleProducto.id_producto
                this.producto.desc_prod=this.detalleProducto.desc_prod
                this.producto.titulo=this.detalleProducto.titulo
                this.producto.autor=this.detalleProducto.autor
                this.producto.editorial=this.detalleProducto.editorial
                this.producto.edicion=this.detalleProducto.edicion
                this.producto.anno_edic=this.detalleProducto.anno_edic
                this.producto.duracion=this.detalleProducto.duracion
                this.producto.tiempo_prest=this.detalleProducto.tiempo_prest
                this.producto.lugar_prest=this.detalleProducto.lugar_prest
                this.producto.cantidad=this.detalleProducto.cantidad
                this.producto.id_categoria=this.detalleProducto.id_categoria
                this.producto.id_ubicacion=this.detalleProducto.id_ubicacion
                this.producto.foto_producto=this.detalleProducto.foto_producto
                console.log("REVISANDO ID_PRODUCTO: ",this.producto.id_producto);

                //http://localhost:3000/detalleprestamos?lugar=
                axios.get('http://localhost:3000/detalleprestamos?lugar=Sala&id_producto='+this.producto.id_producto).then(response => {
                    this.prestamosSala = response.data;
                    this.cantidadProductosSala = this.prestamosSala.length;
                });
            });
        },
        //Eliminar producto de lista de deseos
        quitarListaDeseo(id){            
            this.detalleReserva = this.detalleReserva.filter( (r) => { return r.id_producto != id });
            this.tmp = this.tmp.filter( (r) => { return r.id_producto != id });
        },
        //Guardar reserva
        guardarReserva(){
            if(this.tmp.length==0)
            {
                console.log('NO HAY PRODUCTOS PARA RESERVAR');
            }
            if(this.tmp.length>0)
            {
                this.tmp.forEach(element => {
                    console.log('ELEMENT',element);                    
                    axios.post('http://localhost:3000/reservas',{'reserva':element})
                    .then(response => {
                        if(response.status==201)
                        {
                            console.log('RESERVA GUARDADA EXITOSAMENTE');
                            this.tmp= [];
                            this.detalleReserva = [];
                            this.modalShow2 = false;
                            this.value= {};

                            this.mensaje = "Reserva ha sido registrada exitosamente en nuestro sistema.";
							this.$bvToast.show('toast_Ok');
                        }
                    })
                    .catch(error => {
						this.mensaje = "Error al intentar guardar reserva.";
						this.$bvToast.show('toast_Error');
            
                        console.error("Este es el error desde guardar reserva: ",error);
                    });
                });
            }
        },
        limpiarFormularioRegistro(){
            // Limpiar campos formulario
            this.lector.rut_lector = '';
            this.lector.nomb_lec = '';
            this.lector.ape_lec = '';
            this.lector.direccion = '';
            this.lector.correo_lec = '';
            this.lector.contrasena_lec = '';
            this.lector.tel_lec = '';
            this.confirmarclave = '';
        },
        registrarLector(){

			axios.get('http://localhost:3000/lectores').then(response => {
				let lec = []
				lec = response.data
				lec.forEach(element => {
					this.idLectores.push(element.id_lector)
				});
				
				if (this.idLectores.length == 0) {
					this.maxIdLector = 1;
				} else {
					this.maxIdLector = Math.max.apply(null, this.idLectores);
				}

				const { validate, clean, format, getCheckDigit } = require('rut.js');
	
				//VERIFICA QUE EL RUT SEA VALIDO
				if (validate(this.lector.rut_lector)) {
					// VERIFICA QUE LA CUENTA NO EXISTA ANTES DE REGISTRAR
					axios.get("http://localhost:3000/lectores?rut_lector=" + format(this.lector.rut_lector)).then(response => {
						let dd=[];
						dd= response.data;
						console.log(dd);
						//SI LA CUENTA EXISTE ENTONCES MUESTRA LA ALERTA EN PANTALLA
						if (dd[0].rut_lector) {
							this.mensaje = "El Rut ingresado ya se encuentra registrado en nuestro sistema.";
							this.$bvToast.show('toast_Error');
						}
					})
					.catch(error => {
						this.lector.id_lector = this.maxIdLector+1;

						//DENTRO DEL CATCH SIGNIFICA QUE NO ENCONTRÓ EL RUT EN LA BB.DD, POR LO TANTO SE PUEDE REGISTRAR.
						axios.post('http://localhost:3000/lectores',{'lector':this.lector})
						.then(response => {
							//ENVIA LA NOTIFICACION DE LA CREACION DE LA CUENTA POR EMAIL
							this.enviarEmailCuentaCreada();
							if(response.status==201)
							{
								console.log('LECTOR REGISTRADO EXITOSAMENTE');
								this.modalShow3 = false;
								// Limpiar campos formulario
								this.limpiarFormularioRegistro();

								this.mensaje = "Su cuenta se ha registrado exitosamente. Para activarla, revise su correo electrónico.";
								this.$bvToast.show('toast_Ok');
							}
						})
						.catch(error => {
							this.mensaje = "No se ha podido registrar su cuenta. Por favor revise los datos ingresados e intente nuevamente.";
							this.$bvToast.show('toast_Error');
						});
					});
				} else {
					this.mensaje = "El Rut ingresado no es valido.";
					this.$bvToast.show('toast_Error');
				}
				
			});
        },
        enviarEmailCuentaCreada(){

            let data = {
                from_name: "Sistema Bibliotech",
                to_email: this.lector.correo_lec,
                to_name: this.lector.nomb_lec,
                message: "Informamos que tu cuenta ha sido creada exitosamente. Para poder utilizar tu perfil en el sistema es necesario que te acerques al mesón del Bibliotecario para que registre tu huella y así actives tu cuenta. ",
                subject: "Registro nueva cuenta en ",
            };
            
            emailjs.send("service_33zw91m","template_jyxqvrn", data)
            .then(response => {
                if(response.text === 'OK'){
					this.mensaje = "El correo se ha enviado de forma exitosa.";
					this.$bvToast.show('toast_Ok');
                }
                console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
            })
            .catch(error => {
				this.mensaje = "Ocurrió un problema al enviar el correo.";
                this.$bvToast.show('toast_Error');
                console.log("FAILED. error=", err);
            });
        },
        borrarFiltros(){
            this.cargarProductos();
            this.categoria = null;
            this.tipoproducto = null;
            this.item2= null;
        },
        mostrarBotonLista(){
            this.showDropdown = true
        },
        ocultarBotonLista(){
            this.showDropdown = false
        }
    },
    computed:{
        userLogged(){
            return auth.getUserLogged('user');      
        },
		formatearRutLector(){
			const { validate, clean, format, getCheckDigit } = require('rut.js')
			this.lector.rut_lector= format(this.lector.rut_lector);
            if (format(this.lector.rut_lector).length > 10 && format(this.lector.rut_lector).length < 13) {
                return true;
            } else {
                return false;
            }
        }
    },
    mounted : function(){

        axios.get('http://localhost:3000/productos').then(response => {
            this.productos = response.data
        });

        axios.get('http://localhost:3000/reservas').then(response => {
            this.reservas = response.data
            this.reservas.forEach(element => {
                this.idReservas.push(element.id_reserva)
            });
            
            if (this.idReservas.length == 0) {
                this.maxIdReserva = 1;
            } else {
                this.maxIdReserva = Math.max.apply(null, this.idReservas);
            }
        });

        this.rut = JSON.parse(auth.getUserLogged('user')).rut_lector;
        this.foto = JSON.parse(auth.getUserLogged('user')).foto;

        if (this.rut != '' || this.rut != null) {
            this.ocultarBotonIniciar();
        } else {
			this.mostrarBotonIniciar();
		}
        
        axios.get('http://localhost:3000/categorias').then(response => this.categorias = response.data);
        axios.get('http://localhost:3000/tipoproductos').then(response => this.tipoproductos = response.data);
		
    }
}
</script>

<style scoped>
    b-img{
        width:60px;
        height:60px;
    }
    .bd-sidebar {
        max-height: 30rem;
        background-color: #17a2b8;
        color: #f7f7f7;
    }    
</style>