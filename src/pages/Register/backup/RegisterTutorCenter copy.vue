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
          <transition name="inLeft" appear>
            <div class="col-md-12 d-flex input">
              <i class="bi bi-envelope-at-fill"></i>
              <input type="text" placeholder="Email" 
              v-model="email">
            </div>
          </transition>
          <transition name="inRight" appear>
            <div class="col-md-12 d-flex input">
              <i class="bi bi-person-fill-up"></i>
              <input type="text" placeholder="Tutor Center Name" 
              v-model="name">
            </div>
          </transition>
          <transition name="inLeft" appear>
            <div class="col-md-12 d-flex input">
              <i class="bi bi-telephone-plus-fill"></i>
              <input type="text" placeholder="Contact Number" 
              v-model="contactNumber">
            </div>
          </transition>
          <transition name="inRight" appear>
            <div class="col-md-12 d-flex input">
              <i class="bi bi-house-door-fill"></i>
              <input type="text" placeholder="Address" 
              v-model="address">
            </div>
          </transition>
          <transition name="inRight" appear>
            <div class="col-md-7 d-flex input">
              <i class="bi bi-lock-fill"></i>
              <!-- text box with hidden text password -->
              <input :type="hidePass === true ? 'password':'text'" placeholder="Password"
                v-model="password"
                @keyup.enter="registerClicked">
                <i :class="hidePass === true ? 'bi bi-eye eye':'bi bi-eye-slash eye'" 
                @mouseover="hidePass = !hidePass"
                @mouseleave="hidePass = !hidePass"></i>
            </div>
          </transition>
          <transition name="inLeft" appear>
            <!-- Confirm Password -->
            <div class="col-md-7 d-flex input">
              <i class="bi bi-lock-fill"></i>
              <input :type="hidePass === true ? 'password':'text'" placeholder="Confirm Password"
                v-model="password2"
                @keyup.enter="registerClicked">
            </div>
          </transition>

          <transition name="inRight" appear>
            <!-- Image Select -->
            <div class="col-md-7 d-flex input">
              <i class="bi bi-image"></i>
              <label>Upload an Image of your Business Permit
                <input type="file" name="myImage" accept="image/png, image/gif, image/jpeg" @change="onFileSelected"/>
              </label>
            </div>
          </transition>

          <div class="col-md-7 d-flex submit-container">
            <button type="button" class="btn btn-primary buttonLogin" 
              @click="registerClicked">
              Register
            </button>
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
import { db } from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default{
    data(){
      return {
        role: "Tutoring Center",
        hidePass: true,
        loginText: 'Already Have an Account?',
        
        email: 'tc123@gmail.com',
        name: 'Tutor Center Sample',
        contactNumber: '091981313381',
        address: 'Banilad, Cebu City',
        password: 'test1234',
        password2: '', //holds password confirmation textbox text
        selectedFile: null,
      }
    },
    methods:{
      uploadImage(){
        // const fileUpload = async (file) => {
        //   if (!file) {
        //     return;
        //   }
        //   const storageRef = ref(storage, chat/${chatRoomId}/${Date.parse(new Date())}_${file.name});
        //   const result = await uploadBytes(storageRef, file);
        //   console.log('result ', result);
        //   const downloadURL = await getDownloadURL(storageRef);
        //   console.log('downloadURL', downloadURL);

        //   // Add a new message with the uploaded image to the chat room
        //   await addDoc(listCollection, {
        //     message,
        //     senderName: user.displayName ?? user.email,
        //     senderId: user.uid,
        //     chatRoomId: chatRoomId,
        //     image: downloadURL,
        //     timestamp: serverTimestamp()
        //   });
        // };
      },
      async registerClicked(){
        console.log(typeof docRef);

        if(this.fieldsIsEmpty()){
          // this.resetVmodel();
          console.log('[console.log] register failed');
        } else {
          if(this.validateEmail()){
            if(this.validateContact()){
              if(this.validatePasswordLength()){
                if(this.confirmPassword()) {
                  if(this.emailRegistered()){
                    if(this.emailExists()){
                      try{
                        await setDoc(doc(db, "pending_register", "users", "tutor_center",this.email), {
                          email: this.email,
                          name: this.name,
                          address: this.address,
                          contactNumber: this.contactNumber,
                          businessPermitURL: 'url',
                          password: this.password,
                        });
                        console.log("success");
                        alert("Succesfully Registered!") 
                        router.push('/login');
                      }catch(error){
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error.message);
                      }
                      // this block creates an auth meaning it makes the actual account!!
                      // this should only execute once the admin has approved the register
                      // // if(this.emailExists()){
                      //   const auth = getAuth();
                      //   createUserWithEmailAndPassword(auth, this.email, this.password)

                      //   .then((userCredential) => {
                      //     // Signed up
                      //     alert("Succesfully Registered!")
                      //     const user = userCredential.user;
                      //    console.log(user);
                      //     router.push('/login');
                      //   })
                      //   .catch((error) => {
                      //     const errorCode = error.code;
                      //     const errorMessage = error.message;
                      //     alert(error.message);
                      //   });
                      // }
                    }
                  }
                }
              }
            }
          } else {
            alert("imo mama");
          }
        }
      },
      // 1 check if any fields are empty
      // 2 validate input of each field
      //   - validate email format
      //   - validate name 
      //   - validate contact number if +63 or exact length
      //   - validate password if 6 or more characters
      //   - confirm password
      // validations
      fieldsIsEmpty(){
        if(this.email === '' || this.email === null){
          alert("Email address must not be empty");
          return true;
        } else if(this.name === '' || this.name === null){
          alert("Please Enter a valid name")
          return true;
        } else if(this.contactNumber === '' || this.contactNumber === null){
          alert("Please Enter a valid contact number")
          return true;
        } else if(this.address === '' || this.address === null){
          alert("Please Enter a valid address")
          return true;
        } else if(this.password === '' || this.password === null){
          alert("Please Enter a valid password")
          return true;
        } else if( this.password2 === '' || this.password2 === null){
          alert("Please confirm your password")
          return true;
        } else {
          return false;
        }
      },
      async validateEmail(){
        //check if email is valid
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (this.email.match(validRegex)) {
          return true;
        } else {
          alert("Invalid email address!");
          return false;
        }
      },
      async emailExists(){
        //check if already pending
        const docRef = doc(db, "pending_register", "users", "tutor_center", this.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          alert("Email is already pending for approval");
          console.log("[!]email exists in pending");
          return false;
        } else {
          console.log("email unique");
          return true;
        }
      },
      async emailRegistered(){
        //check if already authenticated
        const docRef = doc(db, "all_users", "tutor_center", "users", this.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          alert("Email is already registered");
          console.log("[!]email exists already registered");
          return false;
        } else {
          console.log("email unique");
          return true;
        }
      },
      validateContact(){
        //check for contact number length
        console.log(this.contactNumber.length);
        if(this.contactNumber.length === 12){
          return true;
        } else {
          alert("Enter a valid mobile number!")
          return false;
        }
      },
      validatePasswordLength(){
        console.log(this.password.length);
        //check for password length as per firebase requirement
        if(this.password.length >= 6){
          return true;
        } else {
          alert("Password length must be more than 6")
          return false;
        }
      },
      confirmPassword(){
        //confirm password validation check
        if( this.password === this.password2){
          return true;
        } else {
          alert("Password did not match!")
          return false;
        }
      },
      resetVmodel(){
        this.email = '';
        this.name = '';
        this.contactNumber = '';
        this.address = '';
        this.password = '';
        this.password2 = '';
      },
      onFileSelected(e){
        this.selectedFile = e.target.files[0]
      },
      uploadImage(){


      },
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
</style>
