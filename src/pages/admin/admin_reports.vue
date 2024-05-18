<template>
  <div class="text-bg-dark" style="height: 100vh;">

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
            <router-link to="/admin/manage-users" class="activeBtn">
              <i class="bi bi-people-fill"></i>
              Manage Accounts
            </router-link>
            <router-link to="/admin/postings" class="activeBtn">
              <i class="bi bi-telephone-plus-fill"></i>
              Active Posts
            </router-link>
            <button id="current" type="button" disabled>
              <i class="bi bi-people-fill"></i>
              Reports
            </button>
            <router-link to="/login" class="activeBtn logoutBtn"
            @click="logoutClicked()">
              <i class="bi bi-box-arrow-left"></i>
              Logout
            </router-link>
          </aside>
          <!--end of side nav-->  
        </div>
      
        <div class="col-lg-10 pt-5">
          <h4>Automated Reports</h4>

          <table class="table table-responsive bg-light">
            <thead>
              <tr>
                <!-- <th>Post ID</th> -->
                <th>Post Title</th>
                <th>Posted by</th>
                <th>Description</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="posting of detectedPosts">
                <!-- <td>{{ posting.postId }}</td> -->
                <td class="short">{{ posting.postTitle }}</td>
                <td class="short">{{ posting.userEmail }}</td>
                <td>{{ posting.postDescription }}</td>
                <td class="icontd">
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
        learnerList: [],
        learnerPostList: [],

        detectedPosts: [],

        badWords: ["4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"],
      }
    },
    setup(){

    },
    async created(){
      const user = ref(null);
      user.value = auth.currentUser;
      // console.log(auth.currentUser);
      this.currentUser = user.value;  
      
      let querySnapshot = await getDocs(collection(db, "/all_users/learner/users"));
        querySnapshot.forEach((doc) => {
        this.learnerList.push(doc.data());
      });
     
      for await (const learner of this.learnerList) {
        const temp = await getDocs(collection(db, "createdPosts", "createdPost_learner", learner.userEmail));
        temp.forEach(doc => {
          this.learnerPostList.push(doc.data());
        })
      }
    

      this.learnerPostList.forEach(post => {
        console.log(post)
        if (this.badWords.some(x => post.postTitle.includes(x) || post.postDescription.includes(x))) {    
          this.detectedPosts.push(post)
        }
      })

      // this.loadLearners();
      // this.loadLearnerPostsCollection();
      // this.loadDetectedPosts();
    },
    methods:{
      logoutClicked(){
        console.log(localStorage.getItem("isLoggedIn"))
        auth.signOut();
        console.log(this.currentUser);
      },

      // async loadLearners(){
      //   const querySnapshot = await getDocs(collection(db, "/all_users/learner/users"));
      //   querySnapshot.forEach((doc) => {
      //     this.learnerList.push(doc.data());
      //   });
      //   console.log("Learner List: ")
      //   console.log(this.learnerList)
      // },

      // async loadLearnerPostsCollection(){
      //   for await (const learner of this.learnerList) {
      //     const temp = await getDocs(collection(db, "createdPosts", "createdPost_learner", learner.userEmail));
      //     temp.forEach(doc => {
      //       this.learnerPostList.push(doc.data());
      //       console.log(doc.data);
      //     })
      //   }
      //   console.log("Post List: ")
      //   console.log(this.learnerPostList);
      // },

      // async loadDetectedPosts(){
      //   this.learnerPostList.forEach(post => {
      //     if (this.badWords.some(x => post.postTitle.includes(x) || post.postDescription.includes(x))) {    
      //       this.detectedPosts.push(post)
      //     }
      //   })
      //   console.log("Detected Posts: ")
      //   console.log(this.detectedPosts)
      // },
    },
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
  td .short{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  td .icontd{
    font-size: 1.7rem;
  } 
</style>