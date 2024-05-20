<template>
    <v-navigation-drawer v-model="localDrawer" :rail="rail" permanent>
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider"
            nav></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"
                @click="$router.push('/')"></v-list-item>
            <v-list-item prepend-icon="mdi-bank" title="Bank Master"
                @click="$router.push('/bank-master')"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Signout" @click="$emit('signout')"></v-list-item>
        </v-list>

        <v-divider>
            <v-btn rounded variant="text" @click.stop="$emit('rail')">
                <v-icon v-if="!rail">mdi-chevron-left</v-icon>
                <v-icon v-else>mdi-chevron-right</v-icon>
            </v-btn>
        </v-divider>

    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        drawer: {
            type: Boolean,
            required: true
        },
        rail: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            localDrawer: this.drawer
        };
    },
    watch: {
        drawer(newVal) {
            this.localDrawer = newVal;
        }
    },
}
</script>