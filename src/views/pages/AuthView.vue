<template>
    <v-app>
        <v-container class="d-flex justify-center align-center" style="margin-top: 150px">
            <Signin v-if="isLogin" @isRegister="() => { isLogin = false; }" />
            <Signup v-if="!isLogin" @isLogin="() => { isLogin = true; }" />
        </v-container>
    </v-app>
</template>

<script setup lang="ts">
import Signin from '@/components/auth/Signin.vue';
import Signup from '@/components/auth/Signup.vue';
</script>

<script lang="ts">

export default {
    data() {
        return {
            isLogin: true,
        }
    }
}
</script>