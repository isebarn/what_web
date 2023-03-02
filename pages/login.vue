<template>
    <v-container>
        <v-form>
            <v-text-field
                v-model="email"
                label="Email"
                required
            ></v-text-field>
            <v-btn
                color="primary"
                @click="login(email)"
            >
                Login
            </v-btn>
        </v-form>
    </v-container>
</template>

<script>
// vuex
import { mapActions } from 'vuex'

export default {
    name: 'Login',
    data() {
        return {
            email: '',
        }
    },
    methods: {
        // map vuex actions to methods
        ...mapActions(['login']),
    }
}
</script>