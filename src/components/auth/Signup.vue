<template>
    <v-form v-model="form">
        <v-card class="elevation-12" min-width="350px">
            <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-text-field v-model="phone" prepend-icon="mdi-phone" class="mt-2" label="Nomor Handphone"
                    type="number" :rules="[
                        v => !!v || 'Nomor Handphone tidka boleh kosong',
                        v => v.length >= 6 || 'Nomor Handphone tidak kurang dari 6 karakter',
                        v => v.length <= 15 || 'Nomor Handphone tidak lebih dari 15 karakter',
                    ]" required outlined shaped dense></v-text-field>
                <v-text-field v-model="fullname" prepend-icon="mdi-account" label="Nama Lengkap" :rules="[
                    v => !!v || 'Nama Lengkap tidka boleh kosong',
                    v => v.length >= 3 || 'Nama Lengkap tidak kurang dari 3 karakter',
                    v => v.length <= 50 || 'Nama Lengkap tidak lebih dari 50 karakter',
                ]" required outlined shaped dense></v-text-field>
                <v-text-field v-model="email" prepend-icon="mdi-mail" label="Email" :rules="[
                    v => !!v || 'Email tidka boleh kosong',
                    v => /.+@.+/.test(v) || 'Email harus valid',
                    v => v.length <= 40 || 'Email tidak lebih dari 20 karakter',
                ]" required outlined shaped dense></v-text-field>
                <v-text-field v-model="password" prepend-icon="mdi-lock" label="Password" type="password" :rules="[
                    v => !!v || 'Password tidak boleh kosong',
                    v => v.length <= 20 || 'Password tidak lebih dari 20 karakter',
                    v => v.length >= 6 || 'Password tidak kurang dari 6 karakter'
                ]" required outlined shaped dense></v-text-field>
                <v-text-field v-model="passwordConfirm" prepend-icon="mdi-lock" label="Password Confirm" type="password"
                    :rules="[
                        v => !!v || 'Password Confirm tidak boleh kosong',
                        v => v.length <= 20 || 'Password Confirm tidak lebih dari 20 karakter',
                        v => v.length >= 6 || 'Password Confirm tidak kurang dari 6 karakter',
                        v => v === password || 'Password tidak sama'
                    ]" required outlined shaped dense></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn class="text-capitalize" color="primary" outlined @click="$emit('isLogin')">Login
                    disini</v-btn>
                <v-spacer></v-spacer>

                <v-btn class="text-capitalize" color="primary" :disabled="!form" @click="signup">Register</v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script lang="ts">

export default {

    data: () => ({
        form: false,

        phone: "",
        fullname: "",
        email: "",
        password: "",
        passwordConfirm: "",

        alert: { type: 'error', value: 'Periksa kembali form input anda', color: '#5e35b1', border: '', text: false }
    }),
}
</script>