import { defineStore } from 'pinia';

export const mainStore = defineStore({
    id: 'main',
    state: () => ({
        loading: false as boolean
    }),
    actions: {
        startStopLoading() {
            this.loading = !this.loading
        }
    }
});