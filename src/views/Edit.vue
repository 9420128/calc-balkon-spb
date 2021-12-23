<template>
    <div class="edit">
        <h1>
            {{ catalog_item?.adres }}
        </h1>
        <!-- <grid> -->
        <!-- <div> -->
        <calc :catalog_bd="catalog_item" :sd_bd="sd_item" />
        <!-- </div> -->
        <!-- <EditTable :catalog="catalog_item" :sd="sd_item"/> -->
        <!-- </grid> -->
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import EditTable from '../components/app/EditTable.vue'
import Grid from '../components/html/Grid.vue'
import Calc from './Calc.vue'
export default {
    name: 'Edit',
    components: { EditTable, Grid, Calc },
    data: () => ({
        data: {},
    }),
    async mounted() {
        if (this.catalog_item && this.catalog_item.key)
            document.title = this.catalog_item.key
    },
    computed: {
        // ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_DATA_ALL']),
        ...mapGetters(['BD_ZAKAZ_ITEM']),

        catalog_item() {
            const user = this.$route.params.user
            const id = this.$route.params.id
            return this.BD_DATA_ALL[user]?.catalog[id]
        },

        sd_item() {
            const user = this.$route.params.user
            const id = this.$route.params.id
            return this.BD_DATA_ALL[user]?.sd[id]
        },
    },
    methods: {
        // ...mapActions(['CATALOG_ITEM']),
    },
}
</script>
