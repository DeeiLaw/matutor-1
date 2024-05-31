<template>
  <div class="text-bg-dark" style="height: 100vh;">
    <div class="container p-5">
      <table class="table table-responsive bg-light">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>BirthDate</th>
            <th>Guardian</th>
            <th>Interest/s</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="learner of learnerList">
            <td>{{ learner.userEmail }}</td>
            <td>{{ learner.userFirstname + ' ' + learner.userLastname }}</td>
            <td>{{ learner.userAge }}</td>
            <td>{{ learner.userBdate }}</td>
            <td>{{ learner.userGuardianName }}</td>
            <td>
              <span class="badge text-bg-dark" v-for="tag in learner.userTag">
                {{ tag }}
              </span><br>
            </td>
            <td><i class="bi bi-pencil-square text-primary ico"></i></td>
            <td><i class="bi bi-trash3-fill text-danger ico"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../../firebase';
import { db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore"; 
  export default{
    data(){
      return {
        currentUser: '',
        learnerList: [],
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
      
    },
    async created(){
      const user = ref(null);
      user.value = auth.currentUser;
      this.currentUser = user.value;  

      const querySnapshot = await getDocs(collection(db, "all_users/learner/users"));
      querySnapshot.forEach((doc) => {
        this.learnerList.push(doc.data());
        console.log(this.learnerList)
      });
    }
  };
</script>

<style scoped>
  @import "bootstrap/dist/css/bootstrap.css";

</style>