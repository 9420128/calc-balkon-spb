<template>
    <Loader v-if="loader" />
    <div class="price">
        <h1>Прайс</h1>

        <div class="flex between  m-top-2">
            <div class="btn-grup" v-if="flag_btn">
                <Btn @click="btn_tabs_click"
                >Услуга <icon icon="add"
                /></Btn>

                <!-- v-if="flag_catalog" -->
                <Btn @click="btn_catalog_click"
                >Вид работы <icon icon="add"
                /></Btn>
                <Btn
                    v-if="catalog_filter && catalog_filter.length"
                    @click="btn_material_click"
                >Материал <icon icon="add"
                /></Btn>

                <PriceFormula folder="formula" :BD="BD_PRISE_FORMULA" btn_text="Формулы"/>
                <PriceFormula folder="izm" :BD="BD_PRISE_IZM" btn_text="Ед. Изм."/>

                <Btn class="btn-danger" @click="flag_edit = !flag_edit"
                >Редактировать <icon icon="edit"
                /></Btn>
                <print />
            </div>
            <div>
                <btn v-if="flag_btn" class="button-icon btn-danger" @click="flag_btn = !flag_btn">
                    <icon icon="keyboard_arrow_left" />
                </btn>
                <btn v-else class="button-icon btn-danger" @click="flag_btn = !flag_btn">
                    <icon icon="keyboard_arrow_right" />
                </btn>
            </div>
        </div>

        <Tabs :tabs="id_map(BD_PRISE_TABS)" class="m-top" />

        <div class="overlow" v-if="flag_edit">
            <table class="table table-divider">
                <thead>
                    <tr>
                        <th>Услуга</th>
                        <th>Расположение в меню</th>
                    </tr>
                </thead>
                <tbody @click="price_edit_click($event.target)" class="edit">
                    <tr>
                        <td :data-id="hash_id" data-key="tabs">
                            {{ BD_PRISE_TABS[hash_id]?.name }}
                        </td>
                        <td nowrap>
                            {{ BD_PRISE_TABS[hash_id]?.num }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="m-top overlow">
            <TableMy id="print">
                <thead>
                    <tr>
                        <th>Вид работ</th>
                        <th>Материал</th>
                        <th width="80px">Ед.изм</th>
                        <th width="80px">Руб.</th>
                    </tr>
                </thead>
                <tbody
                    v-if="catalog_filter && catalog_filter.length"
                    @click="price_edit_click($event.target)"
                    :class="{ edit: flag_edit }"
                >
                    <tr v-for="catalog in catalog_filter" :key="catalog.id">
                        <td :data-id="catalog.id" data-key="catalog">
                            {{ catalog?.name }}
                        </td>

                        <td style="padding: 0" colspan="3">
                            <table class="tr-table table-divider">
                                <tbody :class="{ edit: flag_edit }">
                                    <tr v-for="material in material_filter(catalog.id)" :key="material.id">
                                        <td
                                            :data-id="material.id"
                                            data-key="material"
                                        >
                                            {{ material.name }}
                                        </td>
                                        <td width="80px" nowrap>
                                            {{ material.material_i }}
                                        </td>
                                        <td width="80px" nowrap>
                                            {{ material.material_sum }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </TableMy>

        </div>
    </div>

    <form @submit.prevent="submit_modal()">
        <Modal v-show="modal" @close="close_modal">
            <template v-slot:header>
                {{ modal_header }}
            </template>
            <template v-slot:body>
                <grid>
                    <div>
                        <label>Наименование</label>
                        <textarea
                            class="textarea wrap"
                            ref="textarea"
                            v-model="data_text"
                            id="name1"
                        ></textarea>
                    </div>
                    <div>
                        <div v-if="flag_material">
                            <p v-for="(el, i) in catalog_filter" :key="el.id">
                                <checkboxes :id="el.id" :name="el.name" :checked="checkbox_checked(el.id)" @change="checkbox_change($event.target, i)"/>
                            </p>

                            <input-icon
                                type="tel"
                                label="Стоимость, (руб.)"
                                v-model="material_sum"
                            />

                            <sel
                                label="Еденица измерения"
                                :options="BD_PRISE_IZM"
                                @change="
                                    material_i =
                                        $event.target.options[
                                            $event.target.selectedIndex
                                        ].text
                                "
                                :no_id="true"
                                :selected_disabled="true"
                                :selected="material_i ? material_i : ''"
                            />

                            <sel
                                label="Формула подсчета"
                                :options="BD_PRISE_FORMULA"
                                @change="
                                    material_f =
                                        $event.target.options[
                                            $event.target.selectedIndex
                                        ].text
                                "
                                :no_id="true"
                                :selected_disabled="true"
                                :selected="material_f ? material_f : ''"
                            />
                        </div>
                        <input-icon
                            type="tel"
                            label="Расположение в меню"
                            v-model="menu_num"
                        />
                        <div v-if="flag_remove" class="wrap">
                            <Btn class="btn-danger" @click.prevent="item_remove"
                                >Удалить <icon icon="delete"
                            /></Btn>
                        </div>
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
import { mapGetters } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
import Btn from '../components/html/Btn.vue'
import Modal from '../components/app/Modal.vue'
import Tabs from '@/components/app/Tabs'
import Icon from '@/components/html/Icon'
import Grid from '@/components/html/Grid'
import InputIcon from '@/components/html/InputIcon'
import Sel from '@/components/html/Sel'
import Print from '../components/app/Print.vue'
import PriceFormula from "@/components/app/PriceFormula";
import Checkboxes from "@/components/html/Checkboxes";

export default {
    name: 'price',
    components: {
        Checkboxes,
        PriceFormula,
        Sel,
        InputIcon,
        Grid,
        Icon,
        Tabs,
        Btn,
        TableMy,
        Loader,
        Modal,
        Print,
    },
    computed: {
        ...mapGetters(['BD_USER_PRISE']),
        ...mapGetters(['BD_PRISE_TABS']),
        ...mapGetters(['BD_PRISE_CATALOG']),
        ...mapGetters(['BD_PRISE_MATERIAL']),
        ...mapGetters(['BD_PRISE_FORMULA']),
        ...mapGetters(['BD_PRISE_IZM']),

        catalog_filter() {
            if (this.BD_PRISE_CATALOG) {
                const arr = this.id_map(this.BD_PRISE_CATALOG)
                if (arr && this.$route.hash)
                    return arr.filter(
                        (el) => el.tab_id === this.$route.hash.replace('#', '')
                    )
                else return false
            }
        },

        hash_id() {
            if (this.$route.hash) return this.$route.hash.replace('#', '')
        },
    },
    data: () => ({
        loader: false,
        modal: false,
        modal_header: '', // Заголовок модального окна
        data_text: '', // Текст из textarea
        folder: '', // Путь сохранения в базе данных
        tab_id: '',
        catalog_id_arr: [],
        menu_num: 1,
        flag_tabs: false,
        flag_catalog: false,
        flag_material: false,
        flag_edit: false,
        flag_remove: true,
        flag_remove_click: true,
        flag_btn: true,
        material_sum: '',
        material_i: '',
        material_f: '',
    }),
    methods: {
        checkbox_checked(id){
            if(this.catalog_id_arr.length){
                const flag = this.catalog_id_arr.filter(el => el === id)
                if(flag.length) return true
                else return false
            }
        },

        checkbox_change(event, i){
            const id = event.id
            const checked = event.checked

            if(id && checked) {
                this.catalog_id_arr.push(id)
            }
            if(id && !checked){
                this.catalog_id_arr = this.catalog_id_arr.filter(el => el !== id)
            }
        },

        price_edit_click(event) {
            if (!this.flag_edit) return

            const key = event.dataset.key ? event.dataset.key : ''
            const id = event.dataset.id ? event.dataset.id : ''

            if (event.tagName === 'TD' && key && id) {
                this.modal_header = 'Редактирование'
                this.folder = `prise/${key}/${id}`
                this.data_text = event.textContent

                const item = this.BD_USER_PRISE[key][id]

                this.menu_num = item.num

                this.tab_id = item.tab_id ? item.tab_id : ''
                this.material_sum = item.material_sum ? item.material_sum : ''
                this.material_i = item.material_i ? item.material_i : ''
                this.material_f = item.material_f ? item.material_f : ''

                if (key === 'tabs') {
                    this.flag_tabs = true
                    if (
                        this.BD_PRISE_TABS &&
                        Object.keys(this.BD_PRISE_TABS).length === 1
                    )
                        this.flag_remove = false

                    const arr = this.BD_PRISE_CATALOG

                    for (let i in arr) {
                        const el = arr[i]
                        if (el.tab_id === id) this.flag_remove = false
                    }
                }

                if (key === 'catalog') {
                    this.flag_catalog = true
                    // Запрет на удаление Вид работы если в нем есть материал
                    const item = this.material_filter(id)
                    if(item.length) this.flag_remove = false
                }

                if (key === 'material') {
                    this.flag_material = true
                    this.catalog_id_arr = item.catalog_id_arr
                }

                this.show_modal()
            }
        },

        material_filter(id) {
            if (this.BD_PRISE_MATERIAL) {
                const arr = this.id_map(this.BD_PRISE_MATERIAL) // все материалы
                let array = []
                arr.forEach((elem, i) => {
                    if(elem.catalog_id_arr && elem.catalog_id_arr.length){
                        const item = elem.catalog_id_arr.filter((el) => el === id)
                        if(item.length) {
                            array.push(arr[i])
                        }
                    }
                })
                if(array.length) {
                    return array
                }
                else
                    return false
            }
        },

        id_map(arr) {
            if (arr) {
                const array = Object.keys(arr).map((key) => ({
                    ...arr[key],
                    id: key,
                }))

                return array.sort((a, b) => a.num - b.num)
            }
        },

        async prise_key_arr(key) {
            if (key) {
                return await Object.keys(key)
            } else return false
        },

        notic(text) {
            return this.$store.dispatch('notic', text)
        },

        async submit_modal() {
            const val = {
                folder: this.folder,
                text: {
                    name: this.data_text,
                    num: this.menu_num,
                },
            }

            if (!val.text.name)
                return this.notic('Отмена! Не заполнено поле Наименование')

            if (isNaN(val.text.num))
                return this.notic(
                    'Отмена! Поле Расположение в меню заполнено не корректно'
                )

            if (this.tab_id) val.text.tab_id = this.tab_id

            if (this.flag_material) {
                if (isNaN(this.material_sum)) {
                    this.material_sum = this.material_sum.replace(',', '.')
                    if (isNaN(this.material_sum))
                        return this.notic(
                            'Отмена! Поле Стоимость заполнено не корректно'
                        )
                }

                val.text.catalog_id_arr = this.catalog_id_arr
                val.text.material_sum = this.material_sum
                val.text.material_i = this.material_i
                val.text.material_f = this.material_f

                if (!val.text.catalog_id_arr.length)
                    return this.notic('Отмена! Не заполнено поле Вид работы')
            }

            try {
                if (!this.flag_edit) {
                    const success = await this.$store.dispatch(
                        'createValuePush',
                        val
                    )
                    this.submit_success(success)
                } else {
                    const success = await this.$store.dispatch(
                        'createValueSet',
                        val
                    )
                    this.submit_success(success)
                }
            } catch (e) {
                console.log(e)
            }
        },

        submit_success(success) {
            if (success) {
                this.notic('Изменения сохранены')

                this.tab_id = this.folder = ''

                this.material_sum =
                    this.material_i =
                    this.material_f =
                        ''
                this.catalog_id_arr = []

                this.menu_num++

                this.close_modal()
            }
        },

        btn_tabs_click() {
            this.flag_edit = false
            this.flag_remove = false
            this.flag_tabs = true
            this.modal_header = 'Добавить услугу'
            this.folder = 'prise/tabs'
            this.catalog_id_arr = []

            this.show_modal()
        },

        btn_catalog_click() {
            this.flag_edit = false
            this.flag_remove = false
            this.flag_catalog = true
            this.modal_header = 'Добавить вид работы'
            this.folder = 'prise/catalog'
            this.catalog_id_arr = []

            this.tab_id = this.$route.hash.replace('#', '')
            this.show_modal()
        },

        btn_material_click() {
            this.flag_edit = false
            this.flag_remove = false
            this.flag_material = true
            this.catalog_id_arr = []

            this.modal_header = 'Добавить материал'
            this.folder = 'prise/material'

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
            this.flag_tabs = false
            this.flag_catalog = false
            this.flag_material = false
            this.flag_remove = true
            this.flag_remove_click = true
        },

        async item_remove() {
            this.flag_remove_click = false

            const folder = this.folder

            try {
                if (folder) {
                    const success = await this.$store.dispatch(
                        'removeBd',
                        folder
                    )

                    this.submit_success(success)

                    this.close_modal()
                }
            } catch (e) {
                console.log(e)
            }

            const hash_arr = await this.prise_key_arr(this.BD_PRISE_TABS)

            if (hash_arr) this.$router.push('#' + hash_arr[0])
            else this.$router.push('price')

            this.flag_edit = false
        },
    },

    watch: {
        // '$route.hash': {
        //     handler: function (hash) {
        //         this.catalog_filter
        //         // const id = hash.replace('#', '')
        //         // for (let i in this.BD_PRISE_CATALOG) {
        //         //     const el = this.BD_PRISE_CATALOG[i]
        //         //     // if (el.tab_id === id) this.flag_catalog = false
        //         // }
        //     },
        //     deep: true,
        //     immediate: true,
        // },
    },
}
</script>
<style scoped>
.tr-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
}

.tr-table tr:last-child {
    border-bottom: none;
}

.edit {
    background-color: #f4f4f4;
}
.edit > tr > td:first-child:hover {
    background-color: #ffc2b9;
}
</style>
