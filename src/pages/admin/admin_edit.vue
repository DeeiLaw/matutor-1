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
          <p>{ Admin Account }</p>
          <router-link to="/admin/dashboard" class="activeBtn">
            <i class="bi bi-speedometer"></i>
            Dashboard
          </router-link>
          <router-link to="/admin/registrations" class="activeBtn">
            <i class="bi bi-clipboard-check-fill"></i>
            Registrations
          </router-link>
          <button id="current" type="button" disabled>
            <i class="bi bi-people-fill"></i>
            Manage Accounts
          </button>
          <router-link to="/admin/postings" class="activeBtn">
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
        <h4>Edit User Details (currently only gets Tutor List)</h4>
        <div class="input">
            <!-- <i class="bi bi-clipboard"></i> -->
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Search User's Email" 
            v-model="username"
            @keyup.enter="loginClicked">
          </div>
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
                <i class="bi bi-pencil-square text-primary buttonIcon"
                @click="editClicked(learner)"></i>
              </td>
              <td>
                <i class="bi bi-trash3-fill text-danger buttonIcon"
                @click="deleteClicked"></i>
              </td>
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
        tutorList: [],

        editEmail: '',
        editFirstname: '',
        editLastname: '',
        userType: '',
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
      async editClicked(tutor){
        this.showEdit = true;
        this.editEmail = tutor.userEmail;
        this.editFirstname = tutor.userFirstname;
        this.editLastname = tutor.userLastname;
        this.editBdate = tutor.userBdate;
        this.editAddress = tutor.userAddress;
        this.editContact = tutor.userContact;
      },
      deleteClicked(){
        //delete auth and document in firebase
      },
      async popupConfirm(){
        this.tutorList = [];

        this.showEdit = false;
        await updateDoc(doc(db, "all_users", "tutor", "users", this.editEmail), {
          // editEmail: 'test1',
          userFirstname: this.editFirstname,
          userLastname: this.editLastname,
          userAge: this.editAge,
          userBdate: this.editBdate,
          userContact: this.editContact,
        });
        
        const querySnapshot = await getDocs(collection(db, "all_users/tutor/users"));
        querySnapshot.forEach((doc) => {
          this.tutorList.push(doc.data());
          console.log(this.tutorList)
        });
      },
      popupCancel(){
        this.showEdit = false;
      },
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

      const querySnapshot = await getDocs(collection(db, "all_users/tutor/users"));
      querySnapshot.forEach((doc) => {
        this.tutorList.push(doc.data());
      });

      console.log(user);
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

  .input{
    display: flex;
    align-items: center;
    /* margin: auto; */
    width: 45%;
    min-height: 40px;
    /* width: 480px;
    height: 60px; */
    background: #eaeaea;
    border-radius: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .input input{
    background: transparent;
    border: none;
    outline: #797979;
    font-size: 1rem;
    width: 80%;
  }  
  .input i{
    margin: 0px 3%;
    font-size: 1.3rem;
    color: gray;
  }
</style>