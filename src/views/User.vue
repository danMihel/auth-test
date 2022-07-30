<template>
  <div v-if="this.$store.state.AuthModule.isLoade === true">
    <div class="user-profile__data">
      <div class="product" v-for="item in this.$store.state.AuthModule.userData" :key="item.id_document">
        <Card :card="item" :key="item.doc_name"  @download='onDownload'/>
      </div>
    </div>
  </div>
  <div v-else class="user-profile__spinner"></div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  name: "User",
  data() {
    return {

    }
  },
  methods: {
  onDownload (data) {
     this.$store.dispatch('AuthModule/onDoc', [data.document, data.type])
  }
},
  components: {
    Card
  },
  mounted() {
    this.$store.dispatch("AuthModule/onProfile").then(() => {
      if (!localStorage.userData) {
        localStorage.userData = JSON.stringify(this.$store.state.AuthModule.userData)
      }
    }).then(() => this.$store.commit("AuthModule/setUserData", JSON.parse(localStorage.userData)));
  },
};
</script>
<style>
.user-profile {
  max-width: 450px;
  margin: auto;
  margin-top: 10vh;
  padding: 30px;
  border-radius: 10px;
  border: solid rgb(219, 217, 217) 1px;
  background-color: rgb(250, 250, 250);
}

.user-profile__data {
  text-align: left;
}

@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.user-profile__spinner {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7983ff;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
