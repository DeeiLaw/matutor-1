<template>
    <div class="col-md-12 row d-flex justify-content-center ">
      <div class="col-md-7 d-flex containerField inputs">
          <select
          v-model="role" 
          @change="roleSelect">
            <option value="Learner">Learner</option>
            <option value="Tutor">Tutor</option>
            <option value="Tutoring Center">Tutoring Center</option>
          </select>

          <!-- text here -->
      <div class="col-md-7 d-flex submit-container">
        <router-link to="/login"
          class="btn btn-secondary buttonRegister"
          @mouseover="loginText ='Login'"
          @mouseleave="loginText ='Already Have an Account?'">
          {{ loginText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router';

  export default{
    data(){
      return {
        role: "Tutor",
        hidePass: true,
        loginText: 'Already Have an Account?',
        
        tutorUid: '',
        tutorEmail: '',
        tutorFirstname: '',
        tutorLastName: '',

        tutorContact: '',
        tutorAddress: '',
        tutorBdate: '',
        tutorAge: '',
        tutorPassword: '',
        password2: '',

        // learnerIdBackImage: '',
        // learnerIdFrontImage: '',
        // learnerSelfieImage: '',
      }
    },

    methods:{
      roleSelect(){
        if(this.role === "Learner"){
          router.push('/register-learner')
        } else if (this.role === "Tutoring Center") {
          router.push('/register-tutorcenter')
        } 
      },
      registerClicked(){
        // console.log("Register button clicked,");
        if(this.passIsEmpty()){
          console.log("Password is empty");
        } else {
          if(this.confirmPassword()){
            console.log("Password is matched");
          } else {
            console.log("Password did not match");
          }
        }
      },
      passIsEmpty(){
        if(this.tutorPassword === '' || this.password2 === '' 
           || this.tutorPassword === null || this.password2 === null){
            return true;
        } else { 
          return false;
        }
      },
      confirmPassword(){
        if( this.tutorPassword === this.password2){
          return true;
        } else {
          return false;
        }
      },
      getFields(){
        
      }
    },
  };
</script>

<style scoped>
  @import "bootstrap/dist/css/bootstrap.css";

  /* custom css */
  .containerField{
    margin-top: 3%;
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
    padding-top: 1.3%;
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
    font-weight: 350;
    background: #7bcaff;
    font-size: 1.03rem;
  }
  .input i{
    margin: 0px 5%;
    font-size: 1.7rem;
    color: gray;
  }
  select{
    padding-left: 9%;
    display: flex;
    align-items: center;
    width: 58%;
    height: 50px;
    background: #0099ff;
    border-radius: 6px;
    color: #eaeaea;
    font-size: 19px;
    border: none;
  }

  .spanPhone{
      color: #3c009d;
      font-size: 19px;
      font-weight: 700;
      padding-right: 1%;
}
</style>
