<template>
    <router-link v-if="this.$store.state.logied === true" to="/">
        <button class="logout-button" @click="this.logOut()">Выйти</button>
    </router-link>
</template>
<script>
export default {
    name: 'LogoutBtn',
    methods: {
        logOut() {
            localStorage.removeItem("token")
            this.$store.commit('setLogine', true)
            console.log('token delete')
        }
    }
}
</script>
<style>
.logout-button {
    height: 46px;
    width: 300px;
    border: none;
    border-radius: 5px;
    background-color: #5e79ec;
    margin-bottom: 15px;
    color: azure;
    font-size: 1.2rem;

}

.logout-button:hover {
    background-color: #4864df;
    transition: 0.2s linear;
}

.logout-button:active {
    background-color: #8a8d99;
    border: #4f505228 solid 3px;
}
</style>
