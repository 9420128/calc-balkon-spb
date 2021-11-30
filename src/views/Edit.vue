<template>
    <div class="edit">
        <h1>
            {{ catalog_item }}
        </h1>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Edit',
    components: {},
    data: () => ({
        data: {},
    }),
    async mounted() {
        // console.log(data)
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
