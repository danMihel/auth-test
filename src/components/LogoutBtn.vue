<template>
    <router-link  to="/">
        <button class="logout-button" @click="this.logOut()">Выйти</button>
    </router-link>
</template>
<script>
export default {
    name: 'LogoutBtn',
    methods: {
        logOut() {
            localStorage.clear()
             this.$store.commit("AuthModule/setLogged", false);
        }
    }
}
</script>
<style>
.logout-button {
    height: 25px;
    width: 100px;
    border: none;
    border-radius: 5px;
    background-color: #5e79ec;
    margin-bottom: 15px;
    color: azure;
    font-size: 1rem;
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
