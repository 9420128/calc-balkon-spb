<template>
    <Loader v-if="loader" />
    <div class="price">
        <h1>Прайс</h1>
        <div class="m-top">
            <Btn @click="">Вид работы +</Btn>
        </div>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
import Btn from '../components/html/Btn.vue'

export default {
    name: 'price',
    components: { Btn, TableMy, Loader },
    data: () => ({
        loader: false,
    }),
}
</script>
