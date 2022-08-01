<template>
  <div class="auth-card">
    <form @submit.prevent="onSubmit">
      <h2 class="auth-card__title">Войти</h2>
      <div>
        <input
          class="auth-card__input"
          v-model="login"
          type="text"
          placeholder="Логин"
        />
      </div>
      <div>
        <input
          class="auth-card__input"
          v-model="password"
          type="password"
          placeholder="Пароль"
        />
      </div>
      <div class="auth-card__aller">{{this.$store.state.AuthModule.errors }}</div>
      <button class="auth-card__button">
        <span v-if="this.$store.state.AuthModule.isLoade === true">Войти</span>
        <div v-else class="auth-card__spinner"></div>
      </button>
    </form>
  </div>
</template>

<script>

export default {
  name: "login",
  components: {},
  data() {
    return {
      login: "803286",
      password: "NH2Pepn",
      usernameError: "",
      passwordError: "",
      nonFieldErrors: "",
      error: "",
      IMEI: "",
      isLoade: true,
    };
  },
  methods: {
    async onSubmit() {
      this.$store.commit("AuthModule/setLogin", this.login);
      this.$store.commit("AuthModule/setPassword", this.password);
      this.$store.dispatch("AuthModule/onLogin");
    },
  },
  mounted() {
    this.$store.commit('AuthModule/setIMEI')
    this.$store.dispatch('AuthModule/LoginCheck')
    
  },
};
</script>
<style>
.auth-card {
  max-width: 450px;
  margin: auto;
  margin-top: 10vh;
  padding: 30px;
  border-radius: 10px;
  border: solid rgb(219, 217, 217) 1px;
  background-color: rgb(250, 250, 250);
}

.auth-card__title {
  font-size: 2rem;
}

.auth-card__input {
  width: 90%;
  height: 22px;
  margin: 23px 0px;
  font-size: 1rem;
  text-indent: 0px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgb(193, 195, 205);
  cursor: pointer;
  transition: border 0.3s linear;
}

.auth-card__input:active,
:hover,
:focus {
  outline: 0;
  outline-offset: 0;
}

.auth-card__input:focus {
  border-color: #5e79ec;
}

.auth-card__input:hover::-webkit-input-placeholder {
  color: transparent;
  transition: 0.2s linear;
}

:-moz-placeholder {
  color: transparent;
  transition: 0.2s linear;
}

::-moz-placeholder {
  color: transparent;
  transition: 0.2s linear;
}

:-ms-input-placeholder {
  color: transparent;
  transition: 0.2s linear;
}

.auth-card__button {
  height: 46px;
  width: 70%;
  border: none;
  border-radius: 5px;
  background-color: #5e79ec;
  margin-bottom: 15px;
  color: azure;
  font-size: 1.2rem;
}

.auth-card__button:hover {
  background-color: #4864df;
  transition: 0.2s linear;
}

.auth-card__button:active {
  background-color: #8a8d99;
  border: #4f505228 solid 3px;
}

.auth-card__aller {
  position: relative;
  bottom: 20px;
  height: 1rem;
  font-size: 0.9rem;
  color: tomato;
}
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.auth-card__spinner {
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #b4b4b4;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: donut-spin 1.2s linear infinite;
}
</style>
