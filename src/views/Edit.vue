<template>
    <div class="edit">
        <h1>
            {{
                BD_DATA_ALL[$route.params.user]?.catalog[$route.params.id].name
            }}
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
    mounted() {
        this.data = this.CATALOG_ITEM(
            this.$route.params.user,
            this.$route.params.id
        )

        console.log(this.data)
    },
    computed: {
        // ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_DATA_ALL']),
    },
    methods: {
        ...mapActions(['CATALOG_ITEM']),
    },
}
</script>
