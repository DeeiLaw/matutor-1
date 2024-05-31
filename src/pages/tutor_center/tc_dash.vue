<template>
  <div class="text-bg-light">
    <div class="container-fluid" style="position: relative;">
      <div class="row">
        <div class="col-lg-2">
        <!--side nav-->
        <aside>
          <p> {{currentUser}} </p>
          <button id="current" type="button" disabled>
            <i class="bi bi-speedometer"></i>
            Dashboard
          </button>
          <router-link to="/mytutors" class="activeBtn">
            <i class="bi bi-clipboard-check-fill"></i>
            My Tutors
          </router-link>
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
        <div class="reviewDiv col-md-12 row d-flex">
          <div class="reviewAverage col-md-2 d-flex bg-primary">
            <div>
              <h4 class="text-white" style="font-size: 1.3rem;">Your Avg. Rating</h4>
              <h1 class="text-white" style="font-size: 6.0rem;">4.5</h1>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-fill"></i>
              <i class="bi bi-star-half"></i>
              <i class="bi bi-star"></i>
            </div>
          </div>

          <div class="col-md-9 d-flex ">
            <div>
               <h5>Recent Reviews</h5>
              <table class="tableRating table table-responsive bg-light">
                <thead>
                  <tr>
                    <th>Rating</th>
                    <th>Tutor Name</th>
                    <th>Reviewed by</th>
                    <th>Review description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="rating">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-half"></i>
                      <i class="bi bi-star"></i>
                    </td>
                    <td>Tutor's Name</td>
                    <td>Learner's Name</td>
                    <td>
                        Lorem Ipsum Dolor sit amet. The Quick brown fox jumps over the lazy dog
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <h5 style="padding-top: 2%;">Your Tutors</h5>
        <table class="table table-responsive bg-light">
          <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Interests</th>
            <th>Contact #</th>
            <th>Rating</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="learner of tutorList">
              <td>{{ learner.userFirstname + ' ' + learner.userLastname }}</td>
              <td>{{ learner.userEmail }}</td>
              <td>
                <span class="badge text-bg-dark" v-for="tag in learner.userTag">
                  {{ tag }}
                </span><br>
               </td>
              <td>{{ learner.userContact }}</td>
              <td>{{ learner.userRating }}</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/mytutors" class="btn btn-primary">
          View more
        </router-link>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, onAuthStateChanged  } from "firebase/auth";
import { ref } from 'vue';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDocs, doc, updateDoc, getDocFromCache, getDoc} from "firebase/firestore"; 
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
      // const user = ref(null);
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
        auth.signOut();
        sessionStorage.setItem("isLoggedIn", false);
        console.log(sessionStorage.getItem("isLoggedIn"))
        sessionStorage.setItem("userType", null);
        console.log(this.currentUser);
      }
    },
    async created(){
      const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {

            console.log(user.email);
            this.currentUser = user.email;
            
          } else {
            auth.signOut();
            sessionStorage.setItem("isLoggedIn", false);
            console.log(sessionStorage.getItem("isLoggedIn"))
            sessionStorage.setItem("userType", null);
            console.log(this.currentUser);
          }
      });

      let noOfTutors = 0;

      const querySnapshot = await getDocs(collection(db, "all_users/tutor/users"));
        querySnapshot.forEach((doc) => {
          if(doc.data().userTutoringCenter === this.currentUser){
            this.tutorList.push(doc.data());
            noOfTutors++;
          }
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
    color: #334dbe;
    display: block;
    padding: 12px;
    padding-left: 30px;
    text-decoration: none;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    -webkit-tap-highlight-color:transparent;
    border: 0;
    text-decoration: none;
    background:#ffdd02;
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

  .tableRating {
    
  }
  .reviewAverage{
    /* width: 40%; */
    height: 1%;
    padding: 1%;
    border-radius: 10px;
  }
  .reviewAverage i{
    color: #f3cf00;
    font-size: 2rem;
  }
  td i{
    color: #f3cf00;
  }

</style>