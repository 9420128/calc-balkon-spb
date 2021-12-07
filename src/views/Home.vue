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
                    v-for="(zakaz, i) in date_filter(BD_DATA_ALL[user.id].catalog)"
                    :key="zakaz.id"
                >
                    <td>
                        <router-link :to="'/edit/' + user.id + '/' + zakaz.id">{{
                            zakaz.adres ? zakaz.adres : zakaz.id
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
    methods:{
        date_filter(obj){
            let aray = Object.keys(obj).map((key) => ({
                ...obj[key],
                id: key,
            }))

            let date_sort = aray.reduce((result, item) => {
                return result.includes(item.date)
                    ? result
                    : [...result, item.date]
            }, [])

            date_sort.sort((a, b) => b - a)

            let arr = []

            date_sort.forEach((el) => {
                if(el) {
                    for (let i in aray) {
                        if (el === aray[i].date) arr.push(aray[i])
                    }
                }
            })

            aray = aray.filter(el => !el.date )

            aray.forEach(el => arr.push(el))

            return arr
        }
    },
}
</script>
<style lang="sass">
.sklad_wrap>p
    margin-bottom: 2px
    min-width: 240px
</style>
