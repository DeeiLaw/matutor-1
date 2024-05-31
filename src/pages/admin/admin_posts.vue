<template>
  <div class="text-bg-dark" style="height: 100vh;">

    <div class="container-fluid" style="position: relative;">
      <div class="row">
        <div class="col-lg-2">
          <!--side nav-->
          <aside>
            <p> Admin </p> 
            <router-link to="/admin/dashboard" class="activeBtn">
              <i class="bi bi-speedometer"></i>
                Dashboard
            </router-link>
            <router-link to="/admin/registrations" class="activeBtn">
              <i class="bi bi-clipboard-check-fill"></i>
              Registrations
            </router-link>
            <router-link to="/admin/manage-users" class="activeBtn">
              <i class="bi bi-people-fill"></i>
              Manage Accounts
            </router-link>
            <button id="current" type="button" disabled>
              <i class="bi bi-telephone-plus-fill"></i>
              Active Posts
            </button>
            <router-link to="/admin/reports" class="activeBtn">
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
          <h4>Active Postings</h4>
          <h5>Tutor Postings</h5>

          <table class="table table-responsive bg-light">
            <thead>
            <tr>
              <th>Post ID</th>
              <th>Post Title</th>
              <th>Posted by</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="learner of tutorList">
                <td>{{ learner.userType }}</td>
                <td>{{ learner.userEmail }}</td>
                <td>{{ learner.userFirstname + ' ' + learner.userLastname }}</td>
                <td>{{ learner.userAge }}</td>
                <td>{{ learner.userBdate }}</td>
                <td>{{ learner.userContact }}</td>
                <td>{{ learner.userRating }}</td>
              </tr>
            </tbody>
          </table>

          <h5>Learner Postings</h5>

          <table class="table table-responsive bg-light">
            <thead>
            <tr>
              <th>Post ID</th>
              <th>Post Title</th>
              <th>Posted by</th>
              <th>Description</th>
              <th>Tags</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="learner of tutorList">
                <td>{{ learner.userType }}</td>
                <td>{{ learner.userEmail }}</td>
                <td>{{ learner.userFirstname + ' ' + learner.userLastname }}</td>
                <td>{{ learner.userAge }}</td>
                <td>{{ learner.userBdate }}</td>
                <td>{{ learner.userContact }}</td>
                <td>{{ learner.userRating }}</td>
              </tr>
            </tbody>
          </table>
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
        tcList: [],
      }
    },
    setup(){

    },
    methods:{
      logoutClicked(){
        auth.signOut();
        sessionStorage.setItem("isLoggedIn", false);
        console.log(sessionStorage.getItem("isLoggedIn"))
        sessionStorage.setItem("userType", null);
        console.log(this.currentUser);
      }
    },
    async created(){
      const user = ref(null);
      user.value = auth.currentUser;
      console.log(auth.currentUser);
      this.currentUser = user.value;  

      const querySnapshot = await getDocs(collection(db, "/pending_register/users/tutor_center"));
      querySnapshot.forEach((doc) => {
        this.tcList.push(doc.data());
        console.log(this.tcList)
      });
    },
    async created(){
      const user = ref(null);
      user.value = auth.currentUser;
      this.currentUser = user.value;  
      // console.log(auth.currentUser);

      // const querySnapshot = await getDocs(collection(db, "/pending_register/users/tutor_center"));
      // querySnapshot.forEach((doc) => {
      //   this.tcList.push(doc.data());
      //   console.log(this.tcList)
      // });
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