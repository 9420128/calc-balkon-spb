<template>
    <div class="header">
        <nav class="nav-extended">
            <div class="nav-wrapper container">
                <router-link to="/" class="brand-logo">Ok_tab</router-link>
                <a href="#" data-target="mobile-demo" class="sidenav-trigger"
                    ><i class="material-icons">menu</i></a
                >
                <ul id="nav-mobile" class="right hide-on-med-and-down">
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

        <!-- <ul class="sidenav" id="mobile-demo">
            <li><a href="sass.html">Sass</a></li>
            <li><a href="badges.html">Components</a></li>
            <li><a href="collapsible.html">JavaScript</a></li>
        </ul> -->
    </div>
</template>

<script>
export default {
    name: 'Header',
    data: () => ({
        tabs: [
            { to: '/', text: 'Главная' },
            { to: '/price', text: 'Прайс' },
            { to: '/contact', text: 'Контакты' },
            { to: '/zakaz', text: 'Заказ' },
        ],
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

/* 
.tabs {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    height: 48px;
    width: 100%;
    background-color: transparent;
    margin: 0 auto;
    white-space: nowrap;
}

.tabs .tab {
    display: inline-block;
    text-align: center;
    line-height: 48px;
    height: 48px;
    padding: 0;
    margin: 0;
    text-transform: uppercase;
}

.tab a {
    color: rgba(255, 255, 255, 0.7);
    display: block;
    width: 100%;
    height: 100%;
    padding: 0 24px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-transition: color 0.28s ease, background-color 0.28s ease;
    transition: color 0.28s ease, background-color 0.28s ease;
    position: relative;
}

.tab a:hover,
.tab a.active {
    background-color: transparent;
    color: #fff;
}

.tab a.active::before {
    content: '';
    position: absolute;
    left: 1em;
    right: 1em;
    bottom: 0;
    height: 2px;
    background-color: white;
} */

/* sidenav */

.sidenav {
    position: fixed;
    width: 300px;
    left: 0;
    top: 0;
    margin: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    height: 100%;
    height: calc(100% + 60px);
    height: -moz-calc(100%);
    padding-bottom: 60px;
    background-color: #fff;
    z-index: 999;
    overflow-y: auto;
    will-change: transform;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-105%);
    transform: translateX(-105%);
    /* transform: translateX(0%); open */
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
