<template>
  <!-- Pop up edit field-->
  <transition name="fade">
    <div class="editField bg-light" style="width: 650px;" v-show="showEdit">
      <h1>{{ editEmail }}</h1>
      <div class="txtContainer col-md-12 row ">
        <!-- <div class="col-md-12">
          <input type="text" placeholder="Email" 
          v-model="editEmail">
        </div> -->
        <div class="col-md-6">
          <input type="text" placeholder="Firstname" 
          v-model="editFirstname">
        </div>
        <div class="col-md-6 ">
          <input type="text" placeholder="Lastname"
          v-model="editLastname">
        </div>
        <div class="col-md-12">
          <input type="text" placeholder="Birthdate"
          v-model="editBdate">
          <input type="text" placeholder="Address"
          v-model="editAddress">
          <input type="text" placeholder="Contact #"
          v-model="editContact">
        </div>
      </div>
      <button type="button" class="btn btn-primary" 
      @click="popupConfirm">
        Confirm
      </button>
      <button type="button" class="btn btn-danger" 
      @click="popupCancel">
        Cancel
      </button>
    </div>
  </transition>
  <div class="dark" style="height: 100vh;" v-show="showEdit">
    <!-- BG of Pop up edit field-->  
  </div>
  <!-- end of Pop up edit field-->
  
  <div class="text-bg-dark" style="height: 100vh;" v-show="!showEdit">

    <div class="container-fluid" style="position: relative;">
      <div class="row">
        <div class="col-lg-2">
        <!--side nav-->
        <aside>
          <p> {TC Account Name} </p>
          <router-link to="/dashboard" class="activeBtn">
            <i class="bi bi-speedometer"></i>
            Dashboard
          </router-link>
          <button id="current" type="button" disabled>
            <i class="bi bi-clipboard-check-fill"></i>
            My Tutors
          </button>
          <router-link to="/reviews" class="activeBtn">
            <i class="bi bi-telephone-plus-fill"></i>
            Reviews
          </router-link>
          <router-link to="/myaccount" class="activeBtn">
            <i class="bi bi-telephone-plus-fill"></i>
            My Account
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
        <h4>Your Current Tutors</h4>
        <!-- <router-link class="btn btn-primary"  to="/add-tutor">
            Add Tutor/s
          </router-link> -->
          <button type="button" class="btn btn-primary" 
          data-bs-toggle="modal" data-bs-target="#exampleModal"
          @click="">
            Register a Tutor
          </button>
        <table class="table table-responsive bg-light">
          <thead>
          <tr>
            <th>User Type</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>BirthDate</th>
            <th>Contact #</th>
            <th>Rating</th>
            <th>Remove</th>
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
              <td>
                <i class="bi bi-x-circle-fill text-danger buttonIcon"
                @click="remove()"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add a Tutor
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input class="modal-input" type="text" placeholder="Email" 
            v-model="userEmail">
          <input class="modal-input" type="text" placeholder="Firstname" 
            v-model="userFirstname">
          <input class="modal-input" type="text" placeholder="Lastname"
            v-model="userLastname">
          <input class="modal-input" type="text" placeholder="Birthdate"
            v-model="userBdate">
          <input class="modal-input" type="text" placeholder="Address"
            v-model="userAddress">
          <input class="modal-input" placeholder="Contact #"
            v-model="userContact">
          <input class="modal-input" placeholder="Password"
            v-model="userPassword">
          <input class="modal-input" placeholder="Confirm Password"
            v-model="userPassword">
          <div class="modal-buttons">
            <button id="register" type="button" class="btn btn-primary" 
              @click="popupConfirm">
            Confirm
            </button>
            <button id="cancel" type="button" class="btn btn-danger" data-bs-dismiss="modal"
              @click="popupCancel">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
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
          tutorList: [],
          //Tutor info
          userEmail: '',
          userFirstname: '',
          userLastname: '',
          userAddress: '',
          userPassword: '',
          userBdate: '',
          userContact: '',

          userAge: '',
          userRating: '',
          userSessionPrice: '',
          userTag: [],
          userTutoringCenter: '',
          userType: 'tutor',
          userUid: '',
          userAbout: '',
          password2: '',
        }
      },
      setup(){
      },
      methods:{
        logoutClicked(){
          auth.signOut();
          localStorage.setItem("isLoggedIn", false);
          console.log(localStorage.getItem("isLoggedIn"))
          localStorage.setItem("userType", null);
          console.log(this.currentUser);
        }
      },
      async created(){
        const user = ref(null);
        user.value = auth.currentUser;
        this.currentUser = user.value;  

        const querySnapshot = await getDocs(collection(db, "all_users/tutor/users"));
        querySnapshot.forEach((doc) => {
          this.tutorList.push(doc.data());
          console.log(this.tutorList)
        });
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

  aside p {
    margin: 0;
    padding: 40px 0;
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

  .modal-input{
    width: 100%;
    margin-bottom: 2%;
  }
  .modal-buttons{
    width: 100%;
  }
  #register{
    width: 88%;
    margin-right: 2%;
  }
  #cancel{
    width: 10%;
  }
</style>