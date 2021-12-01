<template>
    <Loader v-if="loader" />
    <div class="price">
        <h1>Прайс {{ BD_USER_ITEM?.prise?.catalog }}</h1>
        <Tabs :tabs="id_map(BD_USER_ITEM?.prise?.tabs)"/>
        <div class="m-top">
            <TableMy>
                <thead>
                    <tr>
                        <th>Вид работ</th>
                        <th>Материал</th>
                        <th>Стоимость</th>
                    </tr>
                </thead>
                <tr
                    v-for="(catalog, index) in id_map(BD_USER_ITEM?.prise?.tabs[$route.hash.replace('#', '')]?.catalog)"
                    :key="catalog.id"
                >
                    <td :data-key="index">{{ catalog.name }}</td>
                    <td></td>
                    <td>Стоимость</td>
                </tr>
            </TableMy>
            <div class="btn-grup">
                <Btn class="btn-prim" @click="price_tabs">Услуга <icon icon="add"/></Btn>
                <Btn class="btn-prim" @click="price_catalog">Вид работы <icon icon="add"/></Btn>
            </div>
        </div>
    </div>

    <form @submit.prevent="submit_modal">
        <Modal v-show="modal" @close="close_modal">
            <template v-slot:header>
                {{modal_header}}
            </template>
            <template v-slot:body>
               <grid>
                   <div>
                       <label for="textarea">Наименование</label>
                       <textarea
                       class="textarea wrap"
                       ref="textarea"
                       v-model="data_text"
                       id="textarea"
                   ></textarea></div>
                   <div>
                       <input-icon type="tel" label="Расположение в меню" v-model="menu_num" />
                   </div>
               </grid>
            </template>
            <template v-slot:footer>
                <div class="btn-grup">
                    <button
                        type="button"
                        class="btn"
                        @click.prevent="close_modal"
                    >
                        Закрыть
                    </button>
                    <button type="submit" class="btn btn-prim">
                        Сохранить
                    </button>
                </div>
            </template>
        </Modal>
    </form>
</template>

<script>
import Loader from '../components/app/Loader.vue'
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
import Btn from '../components/html/Btn.vue'
import Modal from '../components/app/Modal.vue'
import Tabs from "@/components/app/Tabs";
import Icon from "@/components/html/Icon";
import Grid from "@/components/html/Grid";
import InputIcon from "@/components/html/InputIcon";

export default {
    name: 'price',
    components: {InputIcon, Grid, Icon, Tabs, Btn, TableMy, Loader, Modal },
    computed: {
        // ...mapGetters(['BD_USER_ALL']),
        // ...mapGetters(['BD_UID']),
        ...mapGetters(['BD_USER_ITEM']),
    },
    data: () => ({
        loader: false,
        modal: false,
        data_text: '',
        folder: '',
        menu_num: 1,
        modal_header: ''
    }),
    methods: {
        id_map(arr){
            if (arr)
                return Object.keys(arr).map((key) => ({
                    ...arr[key],
                    id: key,
                }))
        },

        async submit_modal() {
            const val = {
                folder: this.folder,
                text: {
                    name: this.data_text,
                    menu_num: this.menu_num
                },
            }
            try {
                const success = await this.$store.dispatch(
                    'createValuePush',
                    val
                )

                if (success) {
                    this.$store.dispatch('notic', 'Изменения сохранены')

                    this.close_modal()
                }

                // this.$router.push('/')
            } catch (e) {
                console.log(e)
            }

            this.menu_num ++
        },

        price_catalog() {
            this.modal_header = 'Добавить вид работы'
            this.folder = 'prise/tabs/' + this.$route.hash.replace('#', '') + '/catalog'
            this.show_modal()
        },
        price_tabs(){
            this.modal_header = 'Добавить услугу'
            this.folder = 'prise/tabs'
            this.show_modal()
        },
        show_modal() {
            this.modal = true

            setTimeout(() => {
                this.$refs.textarea.select()
                // this.$refs.textarea.focus()
            }, 0)
        },

        close_modal() {
            this.modal = false
        },
    },
}
</script>
