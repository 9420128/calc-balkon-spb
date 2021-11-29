<template>
    <!-- <header-html logo></header-html> -->

    <form @submit.prevent="loginSubmit">
        <div class="wrap">
            <h1>Войти</h1>
            <p>Чтобы продолжить пользоваться программой авторизируйтесь</p>
        </div>

        <!--email-->
        <input-icon
            labelClass="required"
            v-model="email"
            type="email"
            id="email"
            label="Email"
            required
        >
            <small class="helper-text invalid"></small>
        </input-icon>

        <!--password-->

        <input-icon
            labelClass="required"
            v-model="password"
            type="password"
            id="password"
            label="Пароль"
            required
        >
            <small
                class="helper-text invalid"
                v-if="this.password && this.password.length < 6"
                >Длина пароля не менее 6 символов</small
            >
        </input-icon>

        <p>
            Нет аккаунта?
            <router-link to="/registr">Зарегистрироваться</router-link>
        </p>
        <p class="m-top">
            <btn class="btn-prim">Войти</btn>
        </p>

        <!-- <footer-html submitText="Войти" /> -->
    </form>
</template>

<script>
import InputIcon from '../components/html/InputIcon.vue'
import Btn from '../components/html/Btn'
import messadges from '../function/messadges'
/* eslint-disable */
export default {
    components: { InputIcon, Btn },
    name: 'login',
    data: () => ({
        email: '',
        password: '',
    }),
    mounted() {
        if (messadges[this.$route.query.message]) {
            this.$store.dispatch('notic', messadges[this.$route.query.message])
        }
    },
    methods: {
        async loginSubmit() {
            if (this.password.length >= 6 && this.email.length >= 4) {
                const formData = {
                    email: this.email,
                    password: this.password,
                }

                try {
                    await this.$store.dispatch('login', formData)

                    this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }
            }
        },
    },
}
</script>
