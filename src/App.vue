<template>
  <v-app>

    <Login v-if="!this.$store.state.Login.isLoggedIn"></Login>
    <SideNav v-if="this.$store.state.Login.isLoggedIn"></SideNav>
    <!-- <SideNav ></SideNav> -->

  </v-app>
</template>

<script>
import SideNav from './components/SideNav.vue'
import Login from './components/forms/Login.vue'
import { /* mapActions, */ mapGetters } from "vuex";

export default {
  components:{
    SideNav,
    Login
  },
  data(){
    return{
     // show:true
    }
  },
  computed: {
    ...mapGetters(["getLoginStatus" ]),
  },
  
}
</script>

<style>
.mybtn:focus::before{
  opacity: 0 !important;
}
.btn{
  text-transform: capitalize;
}
</style>