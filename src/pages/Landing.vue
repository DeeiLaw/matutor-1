<template>
  <div  style="margin-top: 5%;" class="col-md-12 row d-flex justify-content-center">
    <!--  -->
    <div class="col-md-5 box1">
      <transition name="inRight" appear>
        <img src="..\assets\graphics\what is matutor.png" 
        alt="Matutor Logo" 
        class="img-fluid whatIMG"/>
      </transition>
      <transition name="fadeLong" appear>
        <div class="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consectetur aliquam mi quis vehicula. Praesent aliquet neque metus, eu mollis ante bibendum nec. Suspendisse nunc leo, pellentesque vitae semper in, consequat non tortor. Curabitur arcu purus, mollis in blandit et, imperdiet a lectus. In fermentum vehicula ultrices. 
        </div>
      </transition>
      <router-link to="/login"
        class="btn btn-primary button">
        Ready to Join Us?
      </router-link>
      <br/>
      <p style="color: rgb(167, 167, 167);">
        developed by: Ysabel Madarang Colina | Timothy Tuason | Russelle Dianon
      </p>
    </div>
    <!--  -->
    
    <div class="col-md-6 box2">
      <transition name="inLeft" appear>
        <img src="..\assets\graphics\students.png" alt="" class="studentsLP"/>
      </transition>
    </div>
  </div>
  
</template>

<script>
  export default{
    data(){
      return {
      
      }
    },

    methods:{
      
    },
  };
</script>

<style scoped>
  @import "bootstrap/dist/css/bootstrap.css";

  /* custom css */
.box1{
  flex-direction: column;
  align-items: left;
  margin-left: 5%;
}
.box2{
  flex-direction: column;
  align-items: left;
}
.paragraph{
  padding: 5% 0% 5% 0%;
  color: #00406a;
  width: 500px;
  font-size: 18px;
}
.studentsLP{
  object-fit: contain;
  top: 25%;
  left: 42%;
  width: 700px;
  /* width: 60%; */
  height: auto;
  position: absolute;
  /* top: 30%;
  left: 47%; */
  pointer-events:none;
}.whatIMG{
    width: 500px;
    height: auto;
}
.button{
    width: 220px;
    height: 59px;
    border-radius: 25px;
    font-size: 1.13rem;
    font-weight: 700;    
    border: 0;
    text-decoration: none;
    text-align: center;
    line-height: 2.5;
  }
</style>
