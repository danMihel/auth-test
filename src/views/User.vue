<template>
  <div v-if="this.logged === true">
    <div class="" v-if="this.$store.state.AuthModule.isLoade === true">
      <div v-if="this.$store.state.AuthModule.errors != ''">
        <div>{{ this.$store.state.AuthModule.errors }}</div>
      </div>
      <div v-else>
        <div class="card-header">
          <LogoutBtn class="card-header__btn" />
          <span>Ваш логин: {{ this.id_login }}</span>
        </div>
        <div class="user-profile user-profile__data">
          <div
            class="product"
            v-for="item in this.$store.state.AuthModule.userData"
            :key="item.id_document"
          >
            <Card :card="item" :key="item.doc_name" @download="onDownload" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="user-profile__spinner"></div>
  </div>
  <div v-else>Доступ запрещен</div>
</template>
<script>
import Card from "@/components/Card.vue";
import LogoutBtn from "@/components/LogoutBtn.vue";
export default {
  name: "User",
  data() {
    return {
      id_login: localStorage.id_login,
      logged: false,
    };
  },
  methods: {
    onDownload(data) {
      this.$store.dispatch("AuthModule/onDoc", [data.document, data.type]);
    },
  },
  components: {
    Card,
    LogoutBtn,
  },
  mounted() {
    localStorage.logged == "true" ? (this.logged = true) : null;
    this.$store
      .dispatch("AuthModule/onProfile")
      .then(() => {
        if (!localStorage.userData && this.$store.state.AuthModule.logged) {
          localStorage.userData = JSON.stringify(
            this.$store.state.AuthModule.userData
          );
        }
      })
      .then(() =>
        this.$store.commit(
          "AuthModule/setUserData",
          JSON.parse(localStorage.userData)
        )
      );
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

.card-header{
  display: flex;
  align-items:  baseline;
  flex-direction: row-reverse;
}

.card-header__btn{
  margin: 10px;
}
</style>
