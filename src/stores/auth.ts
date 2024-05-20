import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface AuthData {
    isLoggedin: boolean;
    isVerified: boolean;
}

const localStorageTokenKey = "token";
const token = ref<string | null>(localStorage.getItem(localStorageTokenKey));

export const authStore = defineStore({
    id: 'auth',
    state: () => ({
        data: {
            isLoggedin: computed(() => !!token.value),
            isVerified: false
        },
        token: token
    }),
    actions: {
        setData(data: AuthData) {
            this.data = data;
        },
        setDataToken(token: string) {
            this.token = token;
            localStorage.setItem(localStorageTokenKey, this.token);
        },
        signout() {
            this.data = {
                isLoggedin: false,
                isVerified: false
            }

            localStorage.removeItem(localStorageTokenKey);
        }
    }
});