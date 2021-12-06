<template>
    <Loader v-if="!BD_USER_ALL" />
    <div class="home" v-else>
        <h1>Заказы</h1>
        <div class="overlow m-top">
            <TableMy
                v-for="user in BD_USER_ALL"
                :key="user.id"
                class="table-hover"
            >
                <tr>
                    <th>{{ user.name }}</th>
                    <th width="100px">Дата</th>
                </tr>
                <tr
                    v-for="(zakaz, i) in BD_DATA_ALL[user.id].catalog"
                    :key="zakaz.id"
                >
                    <td>
                        <router-link :to="'/edit/' + user.id + '/' + i">{{
                            zakaz.adres
                        }}</router-link>
                    </td>
                    <td>{{ zakaz.data }}</td>
                </tr>
            </TableMy>
        </div>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
export default {
    name: 'Home',
    components: { Loader, TableMy },
    computed: {
        ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_DATA_ALL']),
    },
    data: () => ({}),
    mounted() {
        // console.log(this.BD_DATA_ALL)
    },
}
</script>
<style lang="sass">
.sklad_wrap>p
    margin-bottom: 2px
    min-width: 240px
</style>
