<template>
    <div class="header">
        <nav class="nav-extended">
            <div class="nav-wrapper container">
                <router-link to="/" class="brand-logo">calc</router-link>
                <a
                    href="#"
                    class="sidenav-trigger"
                    @click.prevent="menu_mobile = !menu_mobile"
                    ><i class="material-icons">menu</i></a
                >
                <ul class="right hide-on-med-and-down">
                    <li>
                        <a @click.prevent="logout" href="/login?message=login"
                            >Выйти</a
                        >
                    </li>
                    <li>
                        <!-- <router-link
                            :class="{ active: 'logoaut' === $route.path }"
                            to="/logoaut"
                            >Выйти</router-link
                        > -->
                    </li>
                </ul>
            </div>
            <div class="container">
                <ul class="tab header_tab">
                    <li class="" v-for="tab in tabs" :key="tab.to">
                        <router-link :to="tab.to">{{ tab.text }}</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="sidenav" :class="{ open: menu_mobile }">
            <div class="sidenav__body">
                <div class="flex sidenav__close">
                    <a href="#" @click.prevent="menu_mobile = false">
                        <Icon icon="close" />
                    </a>
                </div>
                <ul>
                    <li>
                        <a @click.prevent="logout" href="/login?message=login"
                            >Выйти</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../html/Icon.vue'
export default {
    components: { Icon },
    name: 'Header',
    data: () => ({
        tabs: [
            { to: '/', text: 'Главная' },
            { to: '/price', text: 'Прайс' },
            { to: '/calc', text: 'Калькулятор' },
        ],
        menu_mobile: false,
    }),
    mounted() {},
    methods: {
        logout() {
            let flag = confirm('Подтвердите выход из приложения')

            if (flag) {
                this.$store.dispatch('logout')
                this.$router.push('/login?message=login')
            }
        },
    },
}
</script>
<style>
.header {
    margin-bottom: 2.5rem;
    box-sizing: border-box;
}
nav.nav-extended {
    height: auto;
}
@media only screen and (min-width: 601px) {
    nav,
    nav .nav-wrapper i,
    nav a.sidenav-trigger,
    nav a.sidenav-trigger i {
        height: 64px;
        line-height: 64px;
    }
    nav.nav-extended .nav-wrapper {
        min-height: 64px;
    }
}

@media only screen and (min-width: 993px) {
    nav a.sidenav-trigger {
        display: none;
    }
}

@media only screen and (max-width: 992px) {
    nav .brand-logo {
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        font-weight: bold;
    }
    .hide-on-med-and-down {
        display: none !important;
    }
}

nav {
    display: block;
    color: #fff;
    background-color: #ee6e73;
    width: 100%;
    height: 56px;
    line-height: 56px;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
        0 1px 5px 0 rgb(0 0 0 / 20%);
}

nav .nav-wrapper {
    position: relative;
    height: 100%;
}

nav.nav-extended .nav-wrapper {
    min-height: 56px;
    height: auto;
}

nav .brand-logo {
    position: absolute;
    color: #fff;
    display: inline-block;
    font-size: 2.1rem;
    padding: 0;
}

nav .sidenav-trigger {
    float: left;
    position: relative;
    z-index: 1;
    height: 56px;
    margin: 0 18px;
    color: white;
}

nav .sidenav-trigger i {
    height: 56px;
    line-height: 56px;
}

nav i,
nav [class^='mdi-'],
nav [class*='mdi-'],
nav i.material-icons {
    display: block;
    font-size: 24px;
    height: 56px;
    line-height: 56px;
}

.right {
    float: right !important;
}

nav ul {
    margin: 0;
}

ul:not(.browser-default) {
    padding-left: 0;
    list-style-type: none;
}

ul:not(.browser-default) > li {
    list-style-type: none;
}

nav ul li {
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
    float: left;
}

nav ul a {
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
    font-size: 1rem;
    color: #fff;
    display: block;
    padding: 0 15px;
    cursor: pointer;
}

nav ul li a:hover,
ul.hide-on-med-and-down li a.router-link-active {
    background-color: #ea454b;
    color: white;
}

nav ul a:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

/* nav content */

/* sidenav */

.sidenav {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    transition: left 0.3s ease-out;
}

.sidenav__body {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -270px;
    box-sizing: border-box;
    width: 270px;
    background: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transition: left 0.3s ease-out;
}

.sidenav.open {
    display: block;
}

.open > .sidenav__body {
    left: 0;
}

.sidenav__close {
    font-size: 2rem;
    justify-content: flex-end;
    padding: 2rem;
}

.sidenav li {
    float: none;
    line-height: 48px;
}

.sidenav li > a {
    color: rgba(0, 0, 0, 0.87);
    display: block;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    line-height: 48px;
    padding: 0 32px;
}

.sidenav li > a:hover {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>
