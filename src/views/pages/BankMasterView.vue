<template>
    <v-main class="ma-2">
        <v-card>
            <v-toolbar flat>
                <v-toolbar-title class="primary--text font-weight-bold">Bank Master</v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- FORM -->
                <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="500">
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn color="primary" elevation="6" class="mr-1 text-capitalize" small v-bind="activatorProps"
                            @click="resetForm()">
                            <v-icon small>mdi-plus-thick</v-icon>
                            Tambah
                        </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                        <v-card>
                            <v-toolbar class="pl-2" color="primary font-weight-bold">Form Bank Master</v-toolbar>

                            <v-form v-model="isFormValid">
                                <v-card-text style="padding: 10px 10px 10px 10px">
                                    <v-row style="margin: 10px 0 0 0 !important">
                                        <v-col cols="12" style="padding: unset !important">
                                            <v-file-input v-model="logo" prepend-icon="mdi-camera"
                                                accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                                                label="Logo sponsor png, jpeg, jpg atau svg" outlined shaped
                                                dense></v-file-input>
                                        </v-col>
                                        <v-col cols="12" style="padding: unset !important">
                                            <v-text-field v-model="code" :rules="[v => !!v || 'Required']"
                                                label="Kode Bank" outlined shaped dense></v-text-field>
                                        </v-col>
                                        <v-col cols="12" style="padding: unset !important">
                                            <v-text-field v-model="name" :rules="[v => !!v || 'Required']"
                                                label="Nama Bank" outlined shaped dense></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                                <v-card-actions class="justify-end">
                                    <v-btn class="text-capitalize" color="primary" :disabled="!isFormValid"
                                        @click="save(); isActive.value = false;">Simpan</v-btn>

                                    <v-btn class="text-capitalize" color="primary" outlined
                                        @click="isActive.value = false">Tutup</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </template>
                </v-dialog>
                <!-- FORM -->
            </v-toolbar>

            <v-data-table :headers="dessertsheaders" :items="desserts" :search="search"
                :footer-props="{ 'items-per-page-options': [10, 50, 100, 200, -1] }" :single-expand="singleExpand"
                show-select :loading="loading" loading-text="Loading... Please wait" class="elevation-1">

                <template #[`item.actions`]="{ item }">
                    <v-icon small title="Edit" @click="edit(item)">
                        mdi-pencil
                    </v-icon>
                    <v-icon small title="Hapus" @click="deleteData(item)">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-main>
</template>

<script lang="ts">
import AxiosResponse from '@/helper/AxiosResponse';
import type { BankMaster } from '@/model/BankMaster';
import swal from '@/plugins/swal';
import { mainStore } from '@/stores/main';

export default {
    data() {
        return {
            dialog: false,
            isFormValid: false,
            logo: '',
            code: '',
            name: '',
            isUpdate: false,
            updateID: '',

            loading: false,
            search: "",
            singleExpand: false,
            expanded: [],
            desserts: [],
            dessertsheaders: [
                { value: "name", title: 'Bank' },
                { value: "code", title: 'Kode Bank' },
                { value: "actions", align: "center", sortable: false, title: 'Operasi' },
            ],
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        async getData() {
            mainStore().startStopLoading();

            await this.$http.get(`/bank-master`)
                .then(res => {
                    if (!res.data || !res.data.success) return swal.doToast("error", res.data.msg || "Data tidak ditemukan")
                    this.desserts = res.data.data
                })
                .catch(err => {
                    swal.doToast("error", AxiosResponse.error(err))
                })
                .finally(() => {
                    mainStore().startStopLoading();
                })
        },
        async save() {
            mainStore().startStopLoading();

            const formData = new FormData();
            formData.append("logo", this.logo);
            formData.append("code", this.code);
            formData.append("name", this.name);

            if (this.isUpdate) {
                await this.$http.patch(`/bank-master/${this.updateID}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } },
                ).then(res => {
                    const axiosResponse = AxiosResponse.success(res)
                    swal.doToast(axiosResponse.icon, axiosResponse.message)
                }).catch(err => {
                    swal.doToast("error", AxiosResponse.error(err))
                })
            } else {
                await this.$http.post(`/bank-master`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } },
                ).then(res => {
                    const axiosResponse = AxiosResponse.success(res)
                    swal.doToast(axiosResponse.icon, axiosResponse.message)
                }).catch(err => {
                    swal.doToast("error", AxiosResponse.error(err))
                })
            }

            mainStore().startStopLoading()
            this.resetForm()
            this.getData()
        },
        async edit(item: BankMaster) {
            this.resetForm()
            this.dialog = true
            this.isUpdate = true
            this.updateID = item._id
            this.code = item.code
            this.name = item.name
        },
        async deleteData(item: BankMaster) {
            mainStore().startStopLoading();

            await this.$http.delete(`/bank-master/${item._id}`)
                .then(res => {
                    const axiosResponse = AxiosResponse.success(res)
                    swal.doToast(axiosResponse.icon, axiosResponse.message)
                })
                .catch(err => {
                    swal.doToast("error", AxiosResponse.error(err))
                })
                .finally(() => {
                    mainStore().startStopLoading();
                })

            this.getData()
        },
        resetForm() {
            this.logo = ''
            this.code = ''
            this.name = ''
            this.isUpdate = false
        }
    }
}
</script>