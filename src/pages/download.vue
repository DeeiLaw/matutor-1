<template>
  <transition name="inLeft" appear>
    <img src="..\assets\graphics\studentsLP.png" alt="" class="imgStud"/>
  </transition>
  <div class="col-md-12 row d-flex justify-content-center ">
      <div class="col-md-7 d-flex containerField inputs ">
        <div class="col-md-12 d-flex pseudoTab">We're sorry!</div>
        <transition name="fade" appear>
          <div class="col-md-7 d-flex">
            <img class="img-fluid" src="..\assets\logo\for dark bg.png" alt="">
          </div>
        </transition>

        <h1>Download the matutor app!</h1>
        <transition name="fadeLong" appear>
          <div class="col-md-7 d-flex submit-container">
            <button type="button" class="btn btn-primary buttonLogin" 
              @click="loginClicked"
              @keyup.enter="loginClicked">
              Back to Login
            </button>
         </div>
       </transition>
      </div>
  </div>
</template>

<script>
import router from '../router';

  export default{
    data(){
      return {
        
      }
    },

    methods:{
      async loginClicked(){
          router.push('/login')
        }
      },
    created(){

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
