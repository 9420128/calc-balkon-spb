<template>
    <div class="home">
        <h1>Заказы</h1>
        <div class="search m-top">
            <form @submit.prevent="search_submit">
                <InputIcon icon="search" v-model="search" class="nowrap" />
            </form>

            <TableMy v-if="search_build" class="table-search table-hover">
                <tr v-for="el in search_build" :key="el.id">
                    <td>
                        <router-link
                            :to="'/edit/' + el.user_id + '/' + el.id"
                            >{{ el.adres ? el.adres : el.id }}</router-link
                        >
                    </td>
                    <td width="100px">{{ el.data }}</td>
                </tr>
            </TableMy>
        </div>

        <Loader v-if="!BD_USER_ALL.length" />
        <h3 v-else-if="!BD_USER_ALL">Заказов пока нет</h3>

        <div class="overlow m-top" v-else>
            <TableMy
                v-for="user in BD_USER_ALL"
                :key="user.id"
                class="table-hover"
            >
                <tr>
                    <th>{{ user.name }}</th>
                    <th width="100px">Дата</th>
                    <th width="1px"></th>
                </tr>
                <tr
                    v-for="zakaz in date_filter(BD_DATA_ALL[user.id].catalog)"
                    :key="zakaz.id"
                >
                    <td>
                        <router-link
                            :to="'/edit/' + user.id + '/' + zakaz.id"
                            >{{
                                zakaz.adres ? zakaz.adres : zakaz.id
                            }}</router-link
                        >
                    </td>
                    <td>{{ zakaz.data }}</td>
                    <td>
                        <a
                            href="#"
                            @click.prevent="sd_remove(user.id, zakaz.id)"
                            ><Icon icon="close"></Icon
                        ></a>
                    </td>
                </tr>
            </TableMy>
        </div>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
import { mapGetters } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
import InputIcon from '@/components/html/InputIcon'
import Icon from '@/components/html/Icon'
export default {
    name: 'Home',
    components: { Icon, InputIcon, Loader, TableMy },
    data: () => ({
        search: '',
        search_data: [],
    }),

    mounted() {
        document.title = 'calc-balkon-spb'
    },

    computed: {
        ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_DATA_ALL']),

        search_build() {
            if (this.search.length > 7) return this.search_data

            if (this.search.length > 2) {
                this.search_data = []
                this.BD_USER_ALL.forEach((el) => {
                    const arr = this.date_filter(
                        this.BD_DATA_ALL[el.id].catalog
                    )

                    for (let i in arr) {
                        if (
                            arr[i].adres &&
                            arr[i].adres
                                .toLowerCase()
                                .indexOf(this.search.toLowerCase()) > -1
                        ) {
                            arr[i].user_id = el.id
                            this.search_data.push(arr[i])
                        }
                    }
                })
                return this.search_data
            }
            return false
        },
    },

    methods: {
        search_submit() {
            if (this.search_data.length) {
                const user_id = this.search_data[0].user_id
                const id = this.search_data[0].id

                return this.$router.push(`/edit/${user_id}/${id}`)
            }
        },
        date_filter(obj) {
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
                if (el) {
                    for (let i in aray) {
                        if (el === aray[i].date) arr.push(aray[i])
                    }
                }
            })

            aray = aray.filter((el) => !el.date)

            aray.forEach((el) => arr.push(el))

            return arr
        },

        async sd_remove(route_user, route_id) {
            if (route_user && route_id) {
                const folder_sd = 'data/' + route_user + '/sd/' + route_id

                const folder_catalog =
                    'data/' + route_user + '/catalog/' + route_id

                try {
                    const sd_success = await this.$store.dispatch(
                        'removeFolder',
                        folder_sd
                    )

                    const catalog_success = await this.$store.dispatch(
                        'removeFolder',
                        folder_catalog
                    )

                    if (sd_success && catalog_success) {
                        this.$store.dispatch('notic', 'Данные удалены')
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        },
    },
}
</script>
<style lang="sass">
.sklad_wrap>p
    margin-bottom: 2px
    min-width: 240px

.table-search
    background-color: #f2f2f2
</style>
