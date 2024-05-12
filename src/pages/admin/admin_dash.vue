<template>
  <div class="text-bg-dark" style="height: 100vh;">

    <div class="container-fluid" style="position: relative;">
      <div class="row">
        <div class="col-lg-2">
          <!--side nav-->
          <aside>
            <p>{ Admin Account }</p> 
            <button id="current" type="button" disabled>
              <i class="bi bi-speedometer"></i>
              Dashboard
            </button>
            <router-link to="/admin/registrations" class="activeBtn">
              <i class="bi bi-clipboard-check-fill"></i>
              Registrations
            </router-link>
            <router-link to="/admin/manage-users" class="activeBtn">
              <i class="bi bi-people-fill"></i>
              Manage Accounts
            </router-link>
            <router-link to="/login" class="activeBtn">
              <i class="bi bi-telephone-plus-fill"></i>
              Active Posts
            </router-link>
            <router-link to="/login" class="activeBtn">
              <i class="bi bi-telephone-plus-fill"></i>
                Reports
            </router-link>
            <router-link to="/login" class="activeBtn logoutBtn"
            @click="logoutClicked()">
              <i class="bi bi-box-arrow-left"></i>
              Logout
            </router-link>
          </aside>
          <!--end of side nav-->  
        </div>
      
        <div class="col-lg-10 pt-5">
          <h4>Admin Dashboard</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore"; 
  export default{
    data(){
      return {
        currentUser: '',
      }
    },
    setup(){

    },
    methods:{
      logoutClicked(){
        console.log("logout clicked");
        auth.signOut();
        console.log(this.currentUser);
      }
    },
    async created(){
      const user = ref(null);
      user.value = auth.currentUser;
      console.log(auth.currentUser);
      this.currentUser = user.value;  

    }
  };
</script>

<style scoped>
  @import "bootstrap/dist/css/bootstrap.css";

  .buttonIcon {
    cursor: pointer;
  }
  
  aside {
    color: #fff;
    width: 200px;
    padding-left: 20px;
    height: 100vh;
    background:  #006df3;
    border-top-right-radius: 40px;
  }

  aside a {
    font-size: 12px;
    color: #fff;
    display: block;
    padding: 12px;
    padding-left: 30px;
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
  }

  aside .activeBtn{
    font-size: 12px;
    color: #fff;
    display: block;
    padding: 12px;
    padding-left: 30px;
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
    border: 0;
    text-decoration: none;
    background:  #006df3;
    width: 100%;
    text-align: left;
    transition: 0.2s ease;
  }

  aside .activeBtn:hover {
    color: #3f5efb;
    background: #fff;
    outline: none;
    position: relative;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  aside .activeBtn i, aside button i {
    margin-right: 5px;

  }

  aside .activeBtn:hover::after {
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: 100%;
    right: 0;
    height: 35px;
    width: 35px;
    border-bottom-right-radius: 18px;
    box-shadow: 0 20px 0 0 #fff;
  }

  aside .activeBtn:hover::before {
    content: "";
    position: absolute;
    background-color: transparent;
    top: 38px;
    right: 0;
    height: 35px;
    width: 35px;
    border-top-right-radius: 18px;
    box-shadow: 0 -20px 0 0 #fff;
  }

  aside button[disabled] {
    font-size: 12px;
    color: #fff;
    display: block;
    padding: 12px;
    padding-left: 30px;
    text-decoration: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    -webkit-tap-highlight-color:transparent;
    border: 0;
    text-decoration: none;
    background:   #334dbe;
    width: 100%;
    text-align: left;
    transition: 0.2s ease;
  }

  aside .logoutBtn:hover {
    color: #ffffff !important;
    background:  #ff3045  !important;
  }
  aside .logoutBtn:hover::after {
    box-shadow: 0 20px 0 0 #ff3045 !important;
  }
  aside .logoutBtn:hover:before {
    box-shadow: 0 -20px 0 0 #ff3045   !important;
  }

  aside p {
    margin: 0;
    padding: 40px 0;
  }
  .logout {
    font-size: xx-small;
  }
</style>