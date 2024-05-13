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
          <router-link to="/mytutors" class="activeBtn">
            <i class="bi bi-clipboard-check-fill"></i>
            My Tutors
          </router-link>
          <router-link to="/reviews" class="activeBtn">
            <i class="bi bi-telephone-plus-fill"></i>
            Reviews
          </router-link>
          <button id="current" type="button" disabled>
            <i class="bi bi-telephone-plus-fill"></i>
            My Account
          </button>
          <router-link to="/login" class="activeBtn logoutBtn"
          @click="logoutClicked()">
            <i class="bi bi-box-arrow-left"></i>
              Logout
          </router-link>
        </aside>
        <!--end of side nav-->  
      </div>
      
      <div class="col-lg-10 pt-5">
        <h4>Edit My Account</h4>
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

        editEmail: '',
        editFirstname: '',
        editLastname: '',
        editAge: '0',
        editBdate: '0/0/0',
        editAddress: '',
        editContact: '',

        showEdit: false,
      }
    },
    setup(){
      // const user = ref(null);s
      // const db = getFirestore();
      // const usersList = ref([]);
      // onMounted(async () => {
        // const itemsCollection = collection(db, 'all_users/admin');
        // try {
        //   const querySnapshot = await getDoc(itemsCollection);
        //   usersList.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // } catch (error) {
        //   console.error('Error fetching data from Firestore:', error.message);
        // }
        // user.value = auth.currentUser;
        // console.log(user.value)
      // })
      // return user;
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
</style>