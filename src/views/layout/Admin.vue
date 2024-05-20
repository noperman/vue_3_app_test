<template>
    <v-app id="inspire">
        <SideBar :drawer="drawer" :rail="rail" @rail="() => { rail = !rail; }" @signout="signout" />

        <AppBar @drawer="() => { drawer = !drawer; }" @signout="signout" />

        <RouterView />
    </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { authStore } from '@/stores/auth';
import router from '@/router';
import AppBar from '../template/AppBar.vue'
import SideBar from '../template/SideBar.vue'

</script>

<script>
export default {
    data: () => ({
        drawer: true,
        rail: true
    }),
    methods: {
        signout() {
            authStore().signout()
            router.push('auth')
        }
    }
}
</script>
