<template>
  <div class="text-bg-dark" style="height: 100vh;">
    <div class="container-fluid" style="position: relative;">
      <div class="row">
        <div class="col-lg-2">
          <aside>
            <p> Admin </p>
            <router-link to="/admin/dashboard" class="activeBtn">
              <i class="bi bi-speedometer"></i>
              Dashboard
            </router-link>
            <button id="current" type="button" disabled>
              <i class="bi bi-clipboard-check-fill"></i>
              Registrations
            </button>
            <router-link to="/admin/manage-users" class="activeBtn">
              <i class="bi bi-people-fill"></i>
              Manage Accounts
            </router-link>
            <router-link to="/admin/postings" class="activeBtn">
              <i class="bi bi-telephone-plus-fill"></i>
              Active Posts
            </router-link>
            <router-link to="/admin/reports" class="activeBtn">
              <i class="bi bi-telephone-plus-fill"></i>
              Reports
            </router-link>
            <router-link to="/login" class="activeBtn logoutBtn" @click="logoutClicked()">
              <i class="bi bi-box-arrow-left"></i>
              Logout
            </router-link>
          </aside>
        </div>
        <div class="col-lg-10 pt-5">
          <h4>Incoming Tutor Center Registration Requests</h4>
          <table id="table" class="table table-responsive bg-light">
            <thead>
              <tr>
                <th>Tutor Center Name</th>
                <th>Location</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Business Permit</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tc of tcList">
                <td>{{ tc.name }}</td>
                <td class="gmap" @click="getGmapsSearch(tc)">{{ tc.address }}</td>
                <!-- <td>{{ tc.address }}</td> -->
                <td>{{ tc.contactNumber }}</td>
                <td>{{ tc.email }}</td>
                <td>
                  <!-- {{tc.businessPermitURL}} -->
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    @click="getBusinessPermitIMG(tc)">
                    View Permit
                  </button>
                </td>
                <td>
                  <i class="bi bi-check-circle-fill text-primary buttonIcon" @click="approveClicked(tc)"> Approve</i>
                </td>
                <td>
                  <i class="bi bi-x-circle-fill text-danger buttonIcon" @click="denyClicked(tc)"> Deny</i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ activeTC }}'s Permit</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img class="permit" id="myimg">
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import router from '../../router';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import * as bootstrap from 'bootstrap';
import axios from 'axios';

export default {
  data() {
    return {
      currentUser: '',
      activeTC: '',
      tcList: [],
    }
  },
  methods: {
    async loadTable() {
      this.tcList = [];

      const querySnapshot = await getDocs(collection(db, "/pending_register/users/tutor_center"));
      querySnapshot.forEach((doc) => {
        this.tcList.push(doc.data());
        console.log(this.tcList)
      });
    },
    async approveClicked(tc) {
      const emailData = {
        to: tc.email,
        subject: `[Matutor] Hello, ${tc.name}!`,
        html: `<h1>Hello ${tc.name}</h1> <img src="https://ibb.co/34cpz4N"/>`,
        attachments: [{
            filename: 'email_approved.png',
            path: 'src/email template/email_approved.png',
            cid: 'imgbody' //same cid value as in the html img src
        }]
        // html: `<h1>Hello ${tc.name}</h1> <img src="https://ibb.co/34cpz4N"/>`,
      };

      try {
        alert("Registration approved!");
        await setDoc(doc(db, "all_users", "tutor_center", "users", tc.email), {
          uuid: crypto.randomUUID(),
          email: tc.email,
          name: tc.name,
          userType: "tc",
          address: tc.address,
          contactNumber: tc.contactNumber,
          password: tc.password,
          businessPermitURL: tc.businessPermitURL,
        });

        await deleteDoc(doc(db, "pending_register", "users", "tutor_center", tc.email));

        const response = await axios.post('https://sendemail-lxr2rd7qeq-as.a.run.app/sendEmail', emailData);
        console.log('Email sent:', response.data);
      } catch (error) {
        alert(`Error approving registration: ` + error.message);
      }
      this.loadTable();
    },
    async denyClicked(tc) {
      const emailData = {
        to: tc.email,
        subject: `[Matutor] Hello, ${tc.name}!`,
        html: `<h1>Hello ${tc.name}</h1><p>Your registration was denied.</p>`,
      };

      try {
        alert("Registration approved!");
        await deleteDoc(doc(db, "pending_register", "users", "tutor_center", tc.email));

        const response = await axios.post('https://sendemail-lxr2rd7qeq-as.a.run.app/sendEmail', emailData);
        console.log('Email sent:', response.data);
      } catch (error) {
        alert(`Error denying registration: ` + error.message);
      }

      this.loadTable();
    },
    logoutClicked() {
      auth.signOut();
      sessionStorage.setItem("isLoggedIn", false);
      console.log(sessionStorage.getItem("isLoggedIn"))
      sessionStorage.setItem("userType", null);
      console.log(this.currentUser);
    },
    getBusinessPermitIMG(tc) {
      this.activeTC = tc.name;
      console.log("clicked business Permit");
      console.log(tc.businessPermitURL);
      // console.log(this.tcList);

      const storage = getStorage();
      const pathReference = storageRef(storage, tc.businessPermitURL)
      getDownloadURL(storageRef(storage, pathReference))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'

          // This can be downloaded directly:
          const xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = (event) => {
            const blob = xhr.response;
            console.log(blob);
          };
          xhr.open('GET', url);
          xhr.send();

          // Or inserted into an <img> element
          const img = document.getElementById('myimg');
          img.setAttribute('src', url);
          console.log(url);
        })
        .catch((error) => {
          // Handle any errors
        });
    },
    getGmapsSearch(tc) {
      let str = tc.name.split('');

      for (let i = 0; i < str.length; i++) {
        if (str[i] === " ") {
          str[i] = "+";
        }
      }
      let str2 = str.join('');
      str2 = str2 + " " + tc.address;
      let link = "https://www.google.com/maps/search/" + str2 + "/";
      console.log(link);
      window.open(link, '_blank')
    }
  },
  async created() {
    const user = ref(null);
    user.value = auth.currentUser;
    this.currentUser = user.value;

    const querySnapshot = await getDocs(collection(db, "/pending_register/users/tutor_center"));
    querySnapshot.forEach((doc) => {
      this.tcList.push(doc.data());
      console.log(this.tcList)
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
  background: #006df3;
  border-top-right-radius: 40px;
}

aside a {
  font-size: 12px;
  color: #fff;
  display: block;
  padding: 12px;
  padding-left: 30px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

aside .activeBtn {
  font-size: 12px;
  color: #fff;
  display: block;
  padding: 12px;
  padding-left: 30px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  border: 0;
  text-decoration: none;
  background: #006df3;
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

aside .activeBtn i,
aside button i {
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
  -webkit-tap-highlight-color: transparent;
  border: 0;
  text-decoration: none;
  background: #334dbe;
  width: 100%;
  text-align: left;
  transition: 0.2s ease;
}

aside .logoutBtn:hover {
  color: #ffffff !important;
  background: #ff3045 !important;
}

aside .logoutBtn:hover::after {
  box-shadow: 0 20px 0 0 #ff3045 !important;
}

aside .logoutBtn:hover:before {
  box-shadow: 0 -20px 0 0 #ff3045 !important;
}

aside p {
  margin: 0;
  padding: 40px 0;
}

.permit {
  width: 100%;
  height: 100%;
}

.gmap {
  color: #334dbe !important;
  text-decoration: underline;
  cursor: pointer;
}
</style>