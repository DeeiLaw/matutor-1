<template>
  <transition name="inLeft" appear>
    <img src="..\assets\graphics\studentsLP.png" alt="" class="imgStud"/>
  </transition>
  <div class="col-md-12 row d-flex justify-content-center ">
      <div class="col-md-7 d-flex containerField inputs ">
        <div class="col-md-12 d-flex pseudoTab">Login</div>
        <transition name="fade" appear>
          <div class="col-md-7 d-flex">
            <img class="img-fluid" src="..\assets\logo\for dark bg.png" alt="">
          </div>
        </transition>
          
        <!-- Email field -->
        <transition name="inLeft" appear>
          <div class="col-md-12 d-flex input">
            <!-- <i class="bi bi-clipboard"></i> -->
            <i class="bi bi-envelope-at-fill"></i>
            <input type="text" placeholder="Email" 
            v-model="username"
            @keyup.enter="loginClicked">
          </div>
        </transition>
        <transition name="inRight" appear>
          <!-- password field -->
          <div class="col-md-7 d-flex input">
            <!-- <img src="../src/assets/icons/password.png"  alt="wala"> -->
            <i class="bi bi-lock-fill"></i>
            <!-- text box with hidden text password -->
            <input v-show="hidePass" type="password" placeholder="Password"
              v-model="password"
              @keyup.enter="loginClicked">
            <!-- text box with show text password -->
            <input v-show="!hidePass" type="text" placeholder="Password"
              v-model="password"
              @keyup.enter="loginClicked">
              <!-- show password -->
              <i class="bi bi-eye eye" 
              v-show="hidePass"
              @mouseover="hidePass = !hidePass"></i>
              <!-- hide password -->
              <i class="bi bi-eye-slash eye"
              v-show="!hidePass"
              @mouseleave="hidePass = !hidePass"></i>
          </div>
        </transition>
        <transition name="fadeLong" appear>
          <div class="col-md-7 d-flex submit-container">
            <button type="button" class="btn btn-primary buttonLogin" 
              @click="loginClicked"
              @keyup.enter="loginClicked">
              Login
            </button>

            <button type="button" class="btn btn-secondary buttonRegister"
              @mouseover="registerText ='Register Now!'"
              @mouseleave="registerText ='New to Matutor?'"
              @click="registerClicked">
              {{ registerText }}
            </button>
         </div>
       </transition>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import router from '../router';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

  export default{
    data(){
      return {
        registerText: "New to Matutor?",
        hidePass: true,

        username: '',
        password: '',
        // role:'',
      }
    },

    methods:{
      async loginClicked(){
        if(this.fieldsIsEmpty() === false){
          const auth = getAuth();
          signInWithEmailAndPassword(auth, this.username, this.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(auth){
              localStorage.setItem("isLoggedIn", true);
            } else {
              localStorage.setItem("isLoggedIn", false);
            }
            console.log(localStorage.getItem("isLoggedIn"));
            router.push('/admin/dashboard');
            // ...
            
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Invalid email or password!");
          });
        }
      },
      fieldsIsEmpty(){
        if(this.username === '' || this.username === null){
          alert("Please Enter an Email Address");
          return true; 
        } else if(this.password === '' || this.password === null){
          alert("Please Enter your password")
          return true;
        } else {
          return false;
        }
      },
      registerClicked(){
        router.push('/register-tutorcenter');
      },
    },
    created(){
      const user = ref(null);
      user.value = auth.currentUser;
      this.currentUser = user.value;

      if(localStorage.getItem('isLoggedIn') === 'true'){
        router.push('./admin/dashboard')
      }
    }
  };
</script>

<style scoped>
  @import "bootstrap/dist/css/bootstrap.css";
  
  /* custom css */
  .containerField{
    margin-top: 8%;
    padding: 0;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    align-items: center;
    background:  #006df3;
    box-shadow: 0px 0px 50px #006df3;
  }
  .pseudoTab{
    padding-left: 3%;
    height: 6.5%;
    color: #fff;
    background: #0099ff;
  }
  .imgStud{
    position: relative;
    max-width: 33%;
    height: auto;
    position: absolute;
    top: 35%;
    left: 62%;
    pointer-events:none;
}
    /* Input fields */
  .inputs{
    flex-direction: column;
    gap: 15px;
  }
  .input{
    display: flex;
    align-items: center;
    margin: auto;
    width: 58%;
    min-height: 60px;
    /* width: 480px;
    height: 60px; */
    background: #eaeaea;
    border-radius: 25px;
  }
  .input input{
    background: transparent;
    border: none;
    outline: #797979;
    font-size: 1.3rem;
    width: 80%;
  }
  /* buttons */
  .submit-container{
    gap: 10%;
    padding: 1% 0% 3% 0%;
    display: flex;
    justify-content: center;
  } 
  .buttonLogin, .buttonRegister{
    width: 220px;
    height: 59px;
    border-radius: 25px;
    font-size: 1.13rem;
    font-weight: 700;    
    border: 0;
    text-decoration: none;
    text-align: center;
    text-align: center;
    line-height: 2.5;
  }
  .buttonLogin{
    color: #fff;
    background-color: #0099ff;
  }
  .buttonRegister{
    font-weight: 450;
    background: #7bcaff;
  }
  .input i{
    margin: 0px 5%;
    font-size: 1.7rem;
    color: gray;
  }
  .eye{
    cursor: help;
  }
</style>
