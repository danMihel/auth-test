<template>
  <div v-if="this.$store.state.AuthModule.logged === true" class="user-profile">
    <div v-if="$store.state.getProfile === true">
      <h2>Профиль</h2>
      <div class="user-profile__data">
        <p> <strong>Пользователь:</strong> {{ $store.state.userName }}</p>
        <p> <strong>Имя:</strong> {{ $store.state.firstName }}</p>
        <p> <strong>Фамилия:</strong> {{ $store.state.lastName }}</p>
      </div>
      <LogoutBtn />
    </div>
    <div v-else-if="$store.state.error">
      <p>{{ $store.state.error }}</p>
      <LogoutBtn />
    </div>
    <div v-else class="user-profile__spinner"></div>
  </div>
  <div v-else>
    <h2> Для просмотра необходимо авторизироваться</h2>
  </div>
</template>
<script>
import LogoutBtn from '@/components/LogoutBtn.vue';
export default {
  name: 'User',
  components: {
    LogoutBtn
  },
  mounted() {
    console.log(this.$store.state.logied)
    this.$store.state.logied === true ? this.$store.dispatch('getUser') : null;
  },
}
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