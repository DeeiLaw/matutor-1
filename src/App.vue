<template>
  <router-view v-slot="{Component, route}">
    <transition name="route" mode="out-in">
      <div :key="route.name">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>


<script setup>
  // // Import the functions you need from the SDKs you need
  // import { initializeApp } from "firebase/app";
  // // TODO: Add SDKs for Firebase products that you want to use
  // // https://firebase.google.com/docs/web/setup#available-libraries

  // // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyABi-ROP9jjrQzZ0zx6SNdcpdlZ1iTDBhA",
  //   authDomain: "matutor-db-9424d.firebaseapp.com",
  //   projectId: "matutor-db-9424d",
  //   storageBucket: "matutor-db-9424d.appspot.com",
  //   messagingSenderId: "65458218474",
  //   appId: "1:65458218474:web:8331f19e42afa21689fe93"
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);

</script>

<style scoped>
/* transitions */
.route-enter-from{
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active{
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active{
  transition: all 0.3s ease-in;
}
</style>
