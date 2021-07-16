import axios from "axios";
import Cookies from "js-cookie";


export default {    
    setUserLogged(userLogged) {
        Cookies.set("userLogged", userLogged);
    },
    getUserLogged() {
        return Cookies.get("userLogged");
    },   
    deleteUserLogged() {
        Cookies.remove("userLogged");
    }      
};