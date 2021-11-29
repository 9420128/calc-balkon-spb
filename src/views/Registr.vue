<template>
    <!-- <header-html logo></header-html> -->

    <form @submit.prevent="registrSubmit">
        <div class="input-field">
            <h1>Регистрация</h1>
            <p>Чтобы начать пользоваться программой зарегистрируйтесь</p>
        </div>

        <input-icon
            labelClass="required"
            v-model="name"
            id="name"
            label="Имя"
            required
        >
        </input-icon>

        <input-icon
            labelClass="required"
            v-model="email"
            type="email"
            id="email"
            label="Email"
            required
        >
        </input-icon>

        <input-icon
            labelClass="required"
            v-model="password"
            type="password"
            id="password"
            label="Пароль"
            required
        >
            <small class="invalid" v-if="password && password.length < 6"
                >Длина пароля не менее 6 символов</small
            >
        </input-icon>

        <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>

        <p class="m-top">
            <btn class="btn-prim">Зарегистрироваться</btn>
        </p>

        <!-- <footer-html submitText="Продолжить" /> -->
    </form>
</template>

<script>
import InputIcon from '../components/html/InputIcon.vue'
import Btn from '../components/html/Btn'
export default {
    name: 'registr',
    components: { InputIcon, Btn },
    data: () => ({
        name: '',
        email: '',
        password: '',
    }),
    methods: {
        async registrSubmit() {
            if (
                this.password.length >= 6 &&
                this.email.length >= 4 &&
                this.name
            ) {
                const formData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }

                try {
                    await this.$store.dispatch('registr', formData)
                    this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }
            }
        },
    },
}
</script>
