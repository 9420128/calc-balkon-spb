<template>
    <div class="edit-table">
        <div id="print">
            <h3>
                Спецификация №
                <span
                    class="edit-text"
                    @click="edit_catalog($event.target)"
                    data-key="spec"
                    >{{ catalog_spec }}
                </span>
                от
                <span
                    class="edit-text"
                    @click="edit_catalog($event.target)"
                    data-key="data"
                    >{{ catalog_date }}
                </span>
            </h3>
            <p class="text-border">
                Адрес:
                <span
                    class="edit-text"
                    @click="edit_catalog($event.target)"
                    data-key="adres"
                    >{{ catalog?.adres }}
                </span>
            </p>
            <div class="overlow m-top">
                <TableMy>
                    <thead>
                        <tr>
                            <th style="text-align: center; width: 1px">#</th>
                            <th>Вид работ</th>
                            <th style="min-width: 150px">Материал</th>
                            <th
                                style="text-align: center; width: 1px"
                                colspan="2"
                            >
                                Ед.изм
                            </th>
                            <th style="text-align: center; width: 1px">
                                Сумма
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody v-if="sd">
                        <tr
                            v-for="(item, i) in filter_sd(sd)"
                            :key="item.id"
                            :class="{ 'tr-bg': item?.flag }"
                        >
                            <td nowrap>
                                {{ i + 1 }}
                            </td>
                            <td
                                @click="edit_sd($event.target)"
                                :data-key="item.id"
                                data-el="text"
                            >
                                {{ item.text }}
                            </td>
                            <td
                                @click="edit_sd($event.target)"
                                :data-key="item.id"
                                data-el="option"
                            >
                                {{ item.option }}
                            </td>
                            <td
                                class="text-right"
                                @click="edit_sd($event.target)"
                                :data-key="item.id"
                                data-el="s"
                            >
                                {{ item.s }}
                            </td>
                            <td
                                nowrap
                                @click="edit_sd($event.target)"
                                :data-key="item.id"
                                data-el="i"
                            >
                                {{ item.i }}
                            </td>
                            <td
                                nowrap
                                @click="edit_sd($event.target)"
                                :data-key="item.id"
                                data-el="p"
                            >
                                {{ item.p }}
                            </td>
                            <td>
                                <a
                                    @click.prevent="sd_item_remove(item.id)"
                                    href="#"
                                    ><icon icon="close"
                                /></a>
                            </td>
                        </tr>
                    </tbody>
                </TableMy>
            </div>
            <div class="">
                <h3>
                    Итого стоимость заказа:
                    <span>{{
                        new Intl.NumberFormat('ru-RU').format(summ)
                    }}</span>
                    р.
                </h3>
                <div class="wrap">
                    <p class="edit_prim">
                        <b>Примечание:</b><br />
                        <span
                            class="edit-text"
                            :class="{ empty: !catalog?.prim }"
                            @click="edit_catalog($event.target)"
                            data-key="prim"
                            >{{ catalog?.prim }}</span
                        >
                    </p>
                </div>
                <p>
                    С внутренними размерами в спецификации Заказчик согласен.С
                    функциональным значением всех элементов изделия Заказчик
                    согласен. Все интересующие Заказчика вопросы ему разъяснены.
                </p>
                <p class="text-border">
                    <span>Дата монтажа:</span>
                    <span
                        class="edit-text"
                        @click="edit_catalog($event.target)"
                        data-key="montag"
                        >{{ catalog?.montag }}
                    </span>
                </p>

                <p class="text-border">
                    Исполнитель:
                    <span
                        class="edit-text"
                        @click="edit_catalog($event.target)"
                        data-key="isp"
                        >{{ catalog?.isp }}
                    </span>
                </p>
                <p class="text-border">
                    Заказчик:
                    <span
                        class="edit-text"
                        @click="edit_catalog($event.target)"
                        data-key="user"
                        >{{ catalog?.user }}
                    </span>
                </p>
            </div>
        </div>

        <div class="btn-grup m-top-2">
            <Btn class="btn-danger" @click.prevent="sd_remove">
                Удалить
                <icon icon="delete" />
            </Btn>

            <print />

            <Btn v-if="flag_save" @click.prevent="save_bd" class="btn-prim"
                >Сохранить
                <icon icon="save" />
            </Btn>
        </div>

        <form @submit.prevent="submit_modal_edit">
            <Modal v-show="modal" @close="close_modal">
                <template v-slot:header> Редактирование </template>
                <template v-slot:body>
                    <textarea
                        class="textarea wrap"
                        ref="textarea"
                        v-model="data_text"
                        id="textarea"
                    ></textarea>
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Btn from '../html/Btn.vue'
import Icon from '../html/Icon.vue'
import TableMy from '../html/Table-my.vue'
import Modal from './Modal.vue'
import Print from './Print.vue'
// import Icon from '../html/Icon.vue'
export default {
    components: { TableMy, Icon, Modal, Print, Btn },
    name: 'edit-table',

    props: {
        catalog: {
            type: [Array, Object],
            // required: true,
        },
        sd: {
            type: [Array, Object],
            // required: true,
        },
        flag_calc: {
            type: Boolean,
            default: () => false,
        },
    },

    data: () => ({
        modal: false,
        data_key: '',
        data_id: '',
        data_folder: '',
        data_text: '',
        bd_id: '', // id полученный при сохранении cataloga
        flag_save: false
    }),

    mounted() {
        this.flag_save = this.flag_calc
        if (this.catalog.adres && this.sd.length) {
            if (this.$route.params.id) {
                this.bd_id = this.$route.params.id
            }
        }
    },

    computed: {
        ...mapGetters(['BD_UID']),

        // calc(){
        //     if (this.sd.length) {
        //         console.log(this.sd)
        //         let flag = false
        //         this.sd.forEach(el => {
        //             if (el.flag) flag = true
        //         })
        //
        //         // if(flag) {
        //         //     console.log(111)
        //         //     return false
        //         //
        //         // }
        //         return flag
        //     }
        //     return true
        // },

        summ() {
            if (this.sd.length) {
                const arr = this.filter_sd(this.sd)
                return Math.round(
                    arr.reduce((accumulator, el) => accumulator + +el.p, 0)
                )
            }
        },

        catalog_date() {
            if (this.catalog?.data) return this.catalog?.data
            else {
                let today = new Date()
                let dd = String(today.getDate()).padStart(2, '0')
                const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
                let yyyy = today.getFullYear()
                today = dd + '.' + mm + '.' + yyyy

                return today
            }
        },

        catalog_spec() {
            let spec = this.catalog?.spec
            if (!spec) spec = Math.floor(Math.random() * (999 - 101)) + 101
            return spec
        },
    },

    methods: {
        filter_sd(sd) {
            return Object.keys(sd).map((key) => {
                if (sd[key])
                    return {
                        ...sd[key],
                        id: key,
                    }
            })
        },
        edit_catalog(event) {
            this.show_modal()
            this.data_folder = 'catalog'
            this.data_text = event.textContent
            this.data_key = event.dataset.key
        },
        edit_sd(event) {
            this.show_modal()
            this.data_folder = 'sd'
            this.data_text = event.textContent
            this.data_key = event.dataset.key + '/' + event.dataset.el
        },

        async submit_modal_edit() {
            const key = this.data_key.split('/')[0]
            const name = this.data_key.split('/')[1]

            if (key && name) this.sd[key][name] = this.data_text

            // if (!this.calc) {
            //     if (this.data_folder) {
            //         let val = {
            //             folder: '',
            //             text: '',
            //         }
            //
            //         if (!name) {
            //             val.folder =
            //                 'data/' +
            //                 this.$route.params.user +
            //                 '/' +
            //                 this.data_folder +
            //                 '/' +
            //                 this.$route.params.id +
            //                 '/' +
            //                 this.data_key
            //
            //             val.text = this.data_text
            //         } else {
            //             val.folder =
            //                 'data/' +
            //                 this.$route.params.user +
            //                 '/' +
            //                 this.data_folder +
            //                 '/' +
            //                 this.$route.params.id +
            //                 '/' +
            //                 key
            //
            //             val.text = this.sd[key]
            //
            //             if (val.text.flag) delete val.text.flag
            //         }
            //
            //         try {
            //             const success = await this.$store.dispatch(
            //                 'createValueSetGlobal',
            //                 val
            //             )
            //
            //             if (success) this.notic('Изменения сохранены')
            //
            //             this.close_modal()
            //
            //             // this.$router.push('/')
            //         } catch (e) {
            //             console.log(e)
            //         }
            //     }
            // } else {
            //     if (key && !name) this.catalog[key] = this.data_text
            //
            //     this.notic('Изменения сохранены')
            //
            //     this.close_modal()
            // }
            if(key === 'adres') return this.save_bd()
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

        async sd_item_remove(id) {
            // console.log(this.sd[id].flag)
            // this.sd.splice(id, 1)
            if(this.calc) this.sd.splice(id, 1)
            else {
                const folder =
                    'data/' +
                    this.$route.params.user +
                    '/sd/' +
                    this.$route.params.id +
                    '/' +
                    id

                try {
                    const success = await this.$store.dispatch('removeFolder', folder)

                    if(success) this.notic('Данные удалены')

                    this.close_modal()

                } catch (e) {
                    console.log(e)
                }
            }
        },

        async sd_remove() {
            if (!this.calc) {
                const folder_sd =
                    'data/' +
                    this.$route.params.user +
                    '/sd/' +
                    this.$route.params.id

                const folder_catalog =
                    'data/' +
                    this.$route.params.user +
                    '/catalog/' +
                    this.$route.params.id

                try {
                    const sd_sucses = await this.$store.dispatch(
                        'removeFolder',
                        folder_sd
                    )

                    const catalog_sucses = await this.$store.dispatch(
                        'removeFolder',
                        folder_catalog
                    )

                    if (sd_sucses && catalog_sucses) {
                        this.notic('Данные удалены')

                        this.close_modal()

                        this.$router.push('/')
                    }
                } catch (e) {
                    console.log(e)
                }
            } else {
                if (!this.bd_id) this.sd.splice(0, this.sd.length)
                else {
                    const folder_sd =
                        'data/' + this.BD_UID + '/sd/' + this.bd_id

                    const folder_catalog =
                        'data/' + this.BD_UID + '/catalog/' + this.bd_id

                    try {
                        const sd_sucses = await this.$store.dispatch(
                            'removeFolder',
                            folder_sd
                        )

                        const catalog_sucses = await this.$store.dispatch(
                            'removeFolder',
                            folder_catalog
                        )

                        if (sd_sucses && catalog_sucses) {
                            this.notic('Данные удалены')

                            this.close_modal()

                            this.$router.push('/')
                        }
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        },
        async save_bd() {
            if (!this.catalog.adres) return this.notic('Введите адрес')
            if (this.catalog && this.sd.length) {
                this.catalog.key = this.catalog.adres
                    .replace(/[^a-zа-яё0-9 ]/gi, '_')
                    .replace(/ /g, '_')
                    .trim()

                this.catalog.data = this.catalog_date
                this.catalog.spec = this.catalog_spec
                this.catalog.date = Date.now()

                let catalog = {
                    folder: 'catalog',
                    text: this.catalog,
                }

                this.sd.forEach((el) => {
                    if (el.flag) {
                        delete el.flag
                    }
                })

                let sd = {
                    folder: '',
                    text: this.sd,
                }

                // Если нет id сохраняется новый расчет
                if (!this.bd_id && this.calc) {
                    try {
                        const id = await this.$store.dispatch(
                            'createDataPush',
                            catalog
                        )

                        if (id) {
                            this.bd_id = id
                            sd.folder = 'sd/' + id

                            const success = await this.$store.dispatch(
                                'createDataSet',
                                sd
                            )

                            if (success) this.notic('Расчет сохранен')

                            this.close_modal()
                        }

                        // this.$router.push('/')
                    } catch (e) {
                        console.log(e)
                    }
                }
                // если есть id изменяется существующий расчет
                if (this.bd_id && this.calc) {
                    catalog.folder = 'catalog/' + this.bd_id

                    try {
                        const id = await this.$store.dispatch(
                            'createDataSet',
                            catalog
                        )

                        sd.folder = 'sd/' + this.bd_id

                        const success = await this.$store.dispatch(
                            'createDataSet',
                            sd
                        )

                        if (id && success) this.notic('Изменения сохранены')

                        this.close_modal()
                    } catch (e) {
                        console.log(e)
                    }
                }

                // Сохранение всех изменений сохраненного заказа глобально

                if (this.bd_id && this.$route.params.user) {
                    catalog.folder =
                        'data/' +
                        this.$route.params.user +
                        '/catalog/' +
                        this.bd_id

                    sd.folder =
                        'data/' + this.$route.params.user + '/sd/' + this.bd_id

                    try {
                        const id = await this.$store.dispatch(
                            'createValueSetGlobal',
                            catalog
                        )

                        const success = await this.$store.dispatch(
                            'createValueSetGlobal',
                            sd
                        )

                        if (id && success) {
                            this.notic('Изменения сохранены')
                        }

                        this.close_modal()
                    } catch (e) {
                        console.log(e)
                    }
                }
            }
        },
        notic(text) {
            return this.$store.dispatch('notic', text)
        },
    },
}
</script>

<style>
.text-border {
    display: flex;
    border-bottom: 1px solid #dee2e6;
}

.text-right {
    text-align: right;
    padding-right: 0 !important;
}

.edit-text {
    height: 1.4em;
    padding: 0 0.2em;
}

.edit-text.empty {
    padding-right: 4em;
    background-color: beige;
}

.text-border .edit-text {
    padding-left: 0.6em;
    flex: 1;
    min-width: 1px;
}

.edit-text:hover {
    background-color: beige;
    cursor: copy;
}

.edit-text__empty {
    padding: 0 4em;
}

.edit_prim {
    display: block;
    margin: 2em 0;
    border: 1px solid #dee2e6;
    padding: 0.5em;
}

.tr-bg {
    background-color: #f5f5f5;
}
</style>
