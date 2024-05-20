<template>
    <v-app-bar>
        <v-app-bar-nav-icon @click="$emit('drawer')"></v-app-bar-nav-icon>

        <v-app-bar-title>PT Siloam Internatiol Hospitals Tbk</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-notify</v-icon>
        </v-btn>

        <v-menu rounded transition="scale-transition">
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                    <v-avatar color="info">
                        <v-icon icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                </v-btn>
            </template>

            <v-list min-width="200px" density="compact" nav>
                <v-list-item prepend-icon="mdi-account" title="Profile" @click="$router.push('/profile')"></v-list-item>
                <v-list-item prepend-icon="mdi-logout" title="Signout" @click="$emit('signout')"></v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>