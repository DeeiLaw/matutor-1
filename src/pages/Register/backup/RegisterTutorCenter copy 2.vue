<template>
  <div class="col-md-12 row d-flex justify-content-center ">
    <div class="col-md-7 d-flex containerField inputs">
      <transition name="inLeft" appear>
        <h1>Tutor Center Register</h1>
      </transition>
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
                <!-- <input type="file" name="myImage" 
                ref="fileInput" accept="image/png, image/gif, image/jpeg"/> -->
                <input type="file" name="myImage" 
                ref="fileInput" accept="image/png, image/gif, image/jpeg"
                @change="handleFileUpload()"/>
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
  // import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
  import { getStorage, ref, getDownloadURL,uploadBytes } from "firebase/storage";

  export default{
    data(){
      return {
        hidePass: true,
        loginText: 'Already Have an Account?',
        email: 'tc123@gmail.com',
        name: 'Tutor Center Sample',
        contactNumber: '091981313381',
        address: 'Banilad, Cebu City',
        password: 'test1234',
        password2: '', //holds password confirmation textbox text
        files: [],
        businessPermitURL: '',
      }
    },
    methods:{
      handleFileUpload(){
        let fileTest = event.target.files[0];
        let fileName = fileTest.name;
        const reader = new FileReader();

        reader.onload = (e) => {
        // Create a root reference
        const storage = getStorage();

        // Create a reference to 'mountains.jpg'
        const storageRef = ref(storage, fileName);

        // Create a reference to 'images/mountains.jpg'
        const mountainImagesRef = ref(storage, e.target.result);

        // While the file names are the same, the references point to different files
        storageRef.name === mountainImagesRef.name;           // true
        storageRef.fullPath === mountainImagesRef.fullPath;   // false

        uploadBytes(storageRef, fileTest).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
        }
        reader.readAsDataURL(fileTest);
        
        this.businessPermitURL = fileName;
        console.log(this.businessPermitURL)
      },
      async registerClicked(){
        console.log(typeof docRef);

        if(this.fieldsIsEmpty() === true){
          // this.resetVmodel();
          console.log('[console.log] register failed');
        } else {
          var value = this.validateEmail();
          if(value){
            console.log("validateEmail() passed");
            if(this.validateContact() === true){
              console.log("validateContact() passed");
              if(this.validatePasswordLength() === true){
                console.log("validatePwLength() passed");
                if(this.confirmPassword() === true) {
                  console.log("confirmPw() passed");
                  var value2 = this.emailRegistered();
                  if(value2){
                    console.log("email unique");
                    var value3 = this.emailExists();
                    if( value3){
                      console.log("accountExists() passed");

                      try{
                        await setDoc(doc(db, "pending_register", "users", 
                        "tutor_center",this.email), {
                          email: this.email,
                          name: this.name,
                          address: this.address,
                          contactNumber: this.contactNumber,
                          businessPermitURL: this.businessPermitURL,
                          password: this.password,
                          // tutors[]: ,
                          userType: "tc",
                        });
                        console.log("success");
                        alert("Succesfully Registered!") 
                        router.push('/login');
                      }catch(error){
                        console.log("[" +error.code + "] " + error.message);
                      }
                    } 
                  } 
                } 
              } 
            } 
          } else {
            alert("Please make sure the details are correct");
          }
        }
      },
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
          console.log("validateEmail() failed");
          alert("Invalid email address!");
          return false;
        }
      },
      validateContact(){
        //check for contact number length
        console.log(this.contactNumber.length);
        if(this.contactNumber.length === 12){
          return true;
        } else {
          console.log("validateContact() failed");
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
          console.log("validatePwLength() failed");
          alert("Password length must be more than 6")
          return false;
        }
      },
      confirmPassword(){
        //confirm password validation check
        if( this.password === this.password2){
          return true;
        } else {
          console.log("confirmPw() failed");
          alert("Password did not match!")
          return false;
        }
      },
      async emailRegistered(){
        //check if already "authenticated"
        const docRef = doc(db, "all_users", "tutor_center", "users", this.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          alert("Email is already registered");
          console.log("[!]email exist, already registered");
          return false;
        } else {
          return true;
        }
      },
      async emailExists(){
        //check if already pending
        const docRef = doc(db, "pending_register", "users", "tutor_center", this.email);
        const docSnap = await getDoc(docRef);
        
        console.log(docSnap.exists());
        // if (docSnap.exists()) {
        //   alert("Email is already pending for approval");
        //   console.log("accountExists() failed");
        //   return false;
        // } else {
        //   return true;
        // }
      },
      resetVmodel(){
        this.email = '';
        this.name = '';
        this.contactNumber = '';
        this.address = '';
        this.password = '';
        this.password2 = '';
        this.file = null;
        this.businessPermitURL = '';
      },
    },
    created(){
      const storage = getStorage();

      const pathReference = ref(storage, '438162893_8013419042015074_4233462147508933817_n.jpg')
      getDownloadURL(ref(storage, '438162893_8013419042015074_4233462147508933817_n.jpg'))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
        
          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();
        
          // Or inserted into an <img> element
          const img = document.getElementById('myimg');
          img.setAttribute('src', url);
        })
        .catch((error) => {
          // Handle any errors
        });
      }
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
