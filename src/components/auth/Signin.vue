<template>
    <v-form v-model="form">
        <v-card class="elevation-12" min-width="350px" :loading=loading>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field v-model="email" prepend-icon="mdi-mail" label="Email" :rules="[
                    v => !!v || 'Email tidak boleh kosong',
                    v => /.+@.+/.test(v) || 'Email harus valid',
                    v => v.length <= 40 || 'Email tidak lebih dari 20 karakter',
                ]" required outlined shaped dense></v-text-field>

                <v-text-field v-model="password" prepend-icon="mdi-lock" label="Password" type="password" :rules="[
                    v => !!v || 'Password tidak boleh kosong',
                    v => v.length <= 20 || 'Password tidak lebih dari 20 karakter',
                    v => v.length >= 6 || 'Password tidak kurang dari 6 karakter'
                ]" required outlined shaped dense></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn class="text-capitalize" color="primary" outlined @click="$emit('isRegister')">Belum Punya
                    Akun?</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="text-capitalize" color="primary" :disabled="!form" @click="signin">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">
import AxiosResponse from '@/helper/AxiosResponse';
import swal from '@/plugins/swal';
import router from '@/router';
import { authStore } from '@/stores/auth';
import { mainStore } from '@/stores/main';
import { reactive } from 'vue';

export default {
    data: () => ({
        form: false,

        email: "",
        password: "",
    }),
    computed: {
        loading() {
            return mainStore().loading;
        },
    },
    methods: {
        async signin() {
            mainStore().startStopLoading();

            // const emailRegex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!this.email || !this.password) return swal.doToast("error", "Email atau password tidak boleh kosong")

            await this.$http.post('/signin', {
                email: this.email,
                password: this.password
            }).then(async res => {
                let data = reactive<{ success: Boolean; token: string }>(res.data);

                if (!data || !data.success) return swal.doToast("erro", "Periksa kembali email atau password anda")

                authStore().setData({ isLoggedin: true, isVerified: false })
                authStore().setDataToken(data.token)

                router.push('/')
            }).catch(async (err) => {
                swal.doToast("error", AxiosResponse.error(err))
            })

            mainStore().startStopLoading();
        },
    },
}
</script>