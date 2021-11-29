<template>
    <loader v-if="loader" />
    <div class="home" v-else>
        <h1>Заказы</h1>
        <div class="table__wrap m-top">
            <table
                class="table table-divider table-hover"
                v-for="user in BD_USER_ALL"
                :key="user.id"
            >
                <tr>
                    <th>{{ user.name }}</th>
                    <th>Дата</th>
                </tr>
                <tr
                    v-for="(zakaz, i) in BD_DATA_ALL[user.id].catalog"
                    :key="zakaz.id"
                >
                    <td>
                        <router-link :to="'/edit/' + i">{{
                            zakaz.key
                        }}</router-link>
                    </td>
                    <td>{{ zakaz.data }}</td>
                </tr>
                <!-- <tr v-for="(zakaz, i) in BD_ZAKAZ_PAGINATION" :key="zakaz.id">
                    <td>
                        <router-link :to="'/edit/' + zakaz.id">{{
                            i + 1
                        }}</router-link>
                    </td>
                    <td nowrap>
                        {{ zakaz.user.name }} <br />
                        <a :href="'tel:+' + tel_sort(zakaz.user.phone)">{{
                            zakaz.user.phone
                        }}</a>
                        <br />
                        {{ zakaz.user.mail }} <br />
                        <i>{{ zakaz.zakaz.id }} от {{ zakaz.zakaz.time }}</i>
                        <div v-if="zakaz.comment" style="color: #999">
                            {{ zakaz.comment }}
                        </div>
                    </td>
                    <td nowrap>
                        <span
                            class="table__product"
                            v-for="card in zakaz.zakaz.card[0].title"
                            :key="card[0]"
                            >{{ card }}
                        </span>
                    </td>
                </tr> -->
            </table>

            <!-- <div ref="observer" class="observer"></div> -->
        </div>
    </div>
</template>

<script>
import Loader from '../components/app/Loader.vue'
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Home',
    components: { Loader },
    computed: {
        ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_DATA_ALL']),
    },
    data: () => ({
        loader: false,
    }),
    mounted() {
        console.log(this.BD_DATA_ALL)
    },
}
</script>
<style lang="sass">
.table
    border-collapse: collapse
    border-spacing: 0
    width: 100%
    margin-bottom: 20px

    &__wrap
        overflow: auto
        -webkit-overflow-scrolling: touch

    th
        padding: 16px 12px
        text-align: left
        vertical-align: bottom
        font-size: 14px
        font-weight: normal
        color: #999
        text-transform: uppercase

    &__product
        display: block
        font-size: .8em

    tbody tr
        transition: background-color .1s linear

    td
        padding: 16px 12px
        vertical-align: top

.table-hover>tr:hover, .table-hover tbody tr:hover
    background: #ffd

.table-divider>tr:not(:first-child),
.table-divider>:not(:first-child)>tr,
.table-divider>:first-child>tr:not(:first-child)
    border-top: 1px solid #e5e5e5

.sklad_wrap>p
    margin-bottom: 2px
    min-width: 240px

// .observer
//     height: 30px
//     background-color: inherit
</style>
