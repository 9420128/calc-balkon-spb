<template>
    <div class="main-layout">
        <Header />

        <Container>
            <router-view />
        </Container>

        <div class="fixed-btn">
            <router-link class="fixed-btn__btn btn-icon" to="/calc">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
        <div class="footer"></div>
    </div>
</template>

<script>
import Header from '@/components/app/Header.vue'
import Container from '@/components/html/Container.vue'
import { mapActions } from 'vuex'

export default {
    name: 'main-layout',
    components: { Header, Container },

    mounted() {
        this.DATA_ALL_BUILD()
        this.USER_ALL_BUILD()
    },
    methods: {
        ...mapActions(['DATA_ALL_BUILD']),
        ...mapActions(['USER_ALL_BUILD']),

        // date_sort(zakaz) {
        //     const arr = zakaz.reduce((result, item) => {
        //         return result.includes(item.date)
        //             ? result
        //             : [...result, item.date]
        //     }, [])

        //     return arr.sort((a, b) => b - a)
        // },
    },
}
</script>
<style scoped>
.footer {
    display: block;
    height: 60px;
}
</style>
