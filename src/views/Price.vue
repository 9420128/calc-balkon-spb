<template>
    <Loader v-if="loader" />
    <div class="price">
        <h1>Прайс</h1>
        <Tabs :tabs="id_map(BD_USER_ITEM?.prise?.tabs)" class="m-top"/>

        <div v-if="flag_edit">
            <table class="table table-divider">
                <thead>
                    <tr>
                        <th>Услуга</th>
                        <th>Расположение в меню</th>
                    </tr>
                </thead>
                <tbody  @click="price_edit_click($event.target)" class="edit">
                <tr>
                    <td
                        :data-id="hash_id"
                        data-key="tabs">
                        {{ BD_USER_ITEM.prise.tabs[hash_id]?.name }}
                    </td>
                    <td nowrap>{{ BD_USER_ITEM.prise.tabs[hash_id]?.num }}</td>

                </tr>
                </tbody>
            </table>
        </div>
        
        <div class="m-top">
            <TableMy>
                <thead>
                    <tr>
                        <th>Вид работ</th>
                        <th>Материал</th>
                        <th width="80px">Ед.изм</th>
                        <th width="80px">Руб.</th>
                    </tr>
                </thead>
                <tbody @click="price_edit_click($event.target)" :class="{'edit': flag_edit}">
                    <tr
                        v-if="catalog_filter"
                        v-for="catalog in catalog_filter"
                        :key="catalog.id"
                    >
                        <td
                            :data-id="catalog.id"
                            data-key="catalog"
                        >
                            {{ catalog?.name }}
                        </td>

                        <td style="padding: 0" colspan="3">
                            <table class="tr-table table-divider">
                               <tbody :class="{'edit': flag_edit}">
                                   <tr v-for="material in material_filter(catalog.id)" :key="material.id">
                                       <td
                                           :data-id="material.id"
                                           data-key="material">
                                           {{ material.name }}
                                       </td>
                                       <td width="80px" nowrap>{{ material.material_i }}</td>
                                       <td width="80px" nowrap>{{ material.material_sum }}</td>
                                   </tr>
                               </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </TableMy>
            <div class="btn-grup">
                <Btn class="btn-prim" @click="price_tabs">Услуга <icon icon="add"/></Btn>
                <Btn class="btn-prim" @click="price_catalog">Вид работы <icon icon="add"/></Btn>
                <Btn class="btn-prim" @click="price_material">Материал <icon icon="add"/></Btn>
                <Btn class="btn-danger" @click="flag_edit = !flag_edit">Редактировать <icon icon="edit"/></Btn>
            </div>
        </div>
       
    </div>

    <form @submit.prevent="submit_modal()">
        <Modal v-show="modal" @close="close_modal">
            <template v-slot:header>
                {{modal_header}}
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
                           <sel label="Вид работы"
                                v-if="catalog_filter"
                                :options="catalog_filter"
                                :selected_disabled="true"
                                @change="catalog_id = $event.target.value"
                                :selected="catalog_id ? catalog_id : ''"
                           />

                           <input-icon type="tel" label="Стоимость, (руб.)" v-model="material_sum" />

                           <sel label="Еденица измерения"
                                :options="BD_MATERIAL_I"
                                @change="material_i = $event.target.options[$event.target.selectedIndex].text"
                                :no_id="true"
                                :selected_disabled="true"
                                :selected="material_i ? material_i : ''"
                           />

                           <sel label="Формула подсчета"
                                :options="BD_MATERIAL_F"
                                @change="material_f = $event.target.options[$event.target.selectedIndex].text"
                                :no_id="true"
                                :selected_disabled="true"
                                :selected="material_f ? material_f : ''"
                           />

                       </div>
                       <input-icon type="tel" label="Расположение в меню" v-model="menu_num" />
                       <div v-if="flag_remove" class="wrap">
                           <Btn class="btn-danger" @click.prevent="item_remove">Удалить <icon icon="delete"/></Btn>
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
import { mapGetters, mapActions } from 'vuex'
import TableMy from '../components/html/Table-my.vue'
import Btn from '../components/html/Btn.vue'
import Modal from '../components/app/Modal.vue'
import Tabs from "@/components/app/Tabs";
import Icon from "@/components/html/Icon";
import Grid from "@/components/html/Grid";
import InputIcon from "@/components/html/InputIcon";
import Sel from "@/components/html/Sel";

export default {
    name: 'price',
    components: {Sel, InputIcon, Grid, Icon, Tabs, Btn, TableMy, Loader, Modal },
    computed: {
        // ...mapGetters(['BD_USER_ALL']),
        ...mapGetters(['BD_MATERIAL_F']),
        ...mapGetters(['BD_MATERIAL_I']),
        ...mapGetters(['BD_USER_ITEM']),

        catalog_filter(){
            if(this.BD_USER_ITEM?.prise?.catalog) {
                const arr = this.id_map(this.BD_USER_ITEM?.prise?.catalog)
                if(arr && this.$route.hash)
                    return arr.filter(el => el.tab_id === this.$route.hash.replace('#', ''))
                else return false
            }
        },

        hash_id(){
            if(this.$route.hash)
                return this.$route.hash.replace('#', '')
        },
    },
    data: () => ({
        loader: false,
        modal: false,
        modal_header: '', // Заголовок модального окна
        data_text: '', // Текст из textarea
        folder: '', // Путь сохранения в базе данных
        tab_id: '',
        catalog_id: '',
        menu_num: 1,
        flag_material: false,
        flag_edit: false,
        flag_remove: true,
        flag_remove_click: true,
        material_sum: '',
        material_i: '',
        material_f: '',

    }),
    methods: {
        price_edit_click(event){
            if(!this.flag_edit) return

            const key = event.dataset.key? event.dataset.key : ''
            const id = event.dataset.id? event.dataset.id : ''

            if(event.tagName === 'TD' && key && id){
                this.modal_header = 'Редактирование'
                this.folder = `prise/${key}/${id}`
                this.data_text = event.textContent

                const item = this.prise()[key][id]

                this.menu_num = item.num

                this.tab_id = item.tab_id ? item.tab_id : ''
                this.catalog_id = item.catalog_id ? item.catalog_id : ''
                this.material_sum = item.material_sum ? item.material_sum : ''
                this.material_i = item.material_i ? item.material_i : ''
                this.material_f = item.material_f ? item.material_f : ''

                if(this.material_sum)
                    this.flag_material = true

                if(key === 'tabs'){
                    if(this.prise()['tabs'] && Object.keys(this.prise()['tabs']).length === 1)
                        this.flag_remove = false
                    
                    const arr = this.prise()['catalog']

                    for (let i in arr){
                        const el = arr[i]
                        if(el.tab_id === id)
                            this.flag_remove = false
                    }
                }

                if(key === 'catalog'){
                    const arr = this.prise()['material']

                    for (let i in arr){
                        const el = arr[i]
                        if(el.catalog_id === id)
                            this.flag_remove = false
                    }
                }

                this.show_modal()
            }
        },

       prise(){
            return this.BD_USER_ITEM?.prise
        },

        material_filter(id){
            if(this.prise().material) {
                const arr = this.id_map(this.prise().material)
                return arr.filter(el => el.catalog_id === id)
            }
        },

        id_map(arr){
            if (arr)
                return Object.keys(arr).map((key) => ({
                    ...arr[key],
                    id: key,
                }))
        },

        async submit_modal() {
            // if(!this.data_text || !this.folder){
            //     this.close_modal()
            //     return this.$store.dispatch('notic', 'Отмена! Не все поля заполнены')
            // }

            const val = {
                folder: this.folder,
                text: {
                    name : this.data_text,
                    num : this.menu_num
                },
            }

            if(this.tab_id)
                val.text.tab_id = this.tab_id

            if(this.flag_material){
                val.text.catalog_id = this.catalog_id
                val.text.material_sum = this.material_sum
                val.text.material_i = this.material_i
                val.text.material_f = this.material_f

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

        submit_success(success){
            if (success) {
                this.$store.dispatch('notic', 'Изменения сохранены')

                this.tab_id = this.folder = ''
                if(this.flag_material) this.flag_material = false
                this.material_sum = this.material_i = this.material_f = this.catalog_id = ''

                this.menu_num ++

                this.close_modal()
            }
        },

        price_tabs(){
            this.flag_edit = false
            this.flag_remove = false
            this.modal_header = 'Добавить услугу'
            this.folder = 'prise/tabs'

            this.show_modal()
        },

        price_catalog() {
            this.flag_edit = false
            this.flag_remove = false
            this.modal_header = 'Добавить вид работы'
            this.folder = 'prise/catalog'
            this.tab_id = this.$route.hash.replace('#', '')
            this.show_modal()
        },

        price_material(){
            this.flag_edit = false
            this.flag_remove = false
            this.flag_material = true
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
            this.flag_remove = true
            this.flag_remove_click = true
        },

        async item_remove(){

            this.flag_remove_click = false

            const folder = this.folder

            try {
                if(folder) {
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

            const hash_arr = this.prise()['tabs'] ? Object.keys(this.prise()['tabs']) : ''

            if(hash_arr)this.$router.push('#' + hash_arr[0])
            else this.$router.push('price')

            this.flag_edit = false
        }
    },
}
</script>
<style scoped>
.tr-table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
}

.tr-table tr:last-child{
    border-bottom: none;
}

.edit{
    background-color: #f4f4f4;
}
.edit>tr>td:first-child:hover{
    background-color: #ffc2b9;
}
</style>
