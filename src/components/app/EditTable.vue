<template>
    <div class="edit-table">
        <div ref="printer" id="print">
            <h3>
                Спецификация №
                <span
                    class="edit-text"
                    @click="edit_catalog($event.target)"
                    data-key="spec"
                    >{{ catalog?.spec }}
                </span>
                от
                <span
                    class="edit-text"
                    @click="edit_catalog($event.target)"
                    data-key="data"
                    >{{ catalog?.data }}
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
                        <tr v-for="(item, i) in filter_sd(sd)" :key="item.id">
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
                    Итого стоимость заказа: <span>{{ summ }}</span> рублей
                </h3>
                <div class="wrap">
                    <p class="edit_prim">
                        <b>Примечание:</b><br />
                        <span
                            class="edit-text"
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

        <div class="btn-grup m-top">
            <p>&nbsp;</p>
            <button
                type="button"
                class="btn btn-danger"
                @click.prevent="sd_remove"
            >
                Удалить
                <icon icon="delete" />
            </button>

            <button type="button" @click="print" class="btn btn-prim">
                Распечатать <icon icon="print" />
            </button>
        </div>

        <form @submit.prevent="submit_modal">
            <Modal v-show="modal" @close="close_modal">
                <template v-slot:body>
                    <textarea
                        class="textarea wrap"
                        ref="textarea"
                        v-model="data_text"
                        id="textarea"
                        autofocus
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
import Icon from '../html/Icon.vue'
import TableMy from '../html/Table-my.vue'
import Modal from './Modal.vue'
// import Icon from '../html/Icon.vue'
export default {
    components: { TableMy, Icon, Modal },
    // components: { Icon },
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
    },

    computed: {
        summ() {
            if (this.sd) {
                const arr = this.filter_sd(this.sd)
                return arr.reduce((accumulator, el) => accumulator + +el.p, 0)
            }
        },
    },

    data: () => ({
        modal: false,
        data_key: '',
        data_id: '',
        data_folder: '',
        data_text: '',
    }),

    methods: {
        print() {
            let printing_css = `<style media=print>
                * {font-family: -apple-system, BlinkMacSystemFont, "Open Sans", Arial; font-size: 11px; text-align: left;}
                #print {padding: 0 20px}
                table {caption-side: bottom; width: 100%; border-collapse: collapse; margin-top: 25px}
                .text-border {display: block; border-bottom: 1px solid  #999}
                td,th {padding: 6px 8px;}
                h3 span{font-size: 14px;}

                th:nth-child(6),td:nth-child(7), .slid, #calc, button {display: none}
                tr{border-bottom: 1px solid #999;}
                td:nth-child(2),td:nth-child(3) {width: 45%}
                td:nth-child(4) {padding: 6px 0, width: 1px; text-align: right}
                td:nth-child(5) {width: 1px;  white-space: nowrap}
                td:nth-child(6) {text-align: center; width: 1px;  white-space: nowrap}
                h3 {font-size: 14px; font-weight: 700; margin-bottom: 20px}
                </style>`

            const el = this.$refs.printer
            let html_to_print = printing_css + el.innerHTML
            let iframe = '<iframe id="print_frame"></iframe>'

            document.body.insertAdjacentHTML('beforeend', iframe)

            let doc =
                document.getElementById('print_frame').contentDocument ||
                document.getElementById('print_frame').contentWindow.document
            let win =
                document.getElementById('print_frame').contentWindow ||
                document.getElementById('print_frame')

            doc.getElementsByTagName('body')[0].innerHTML = html_to_print
            win.print()

            document.getElementById('print_frame').remove()
        },
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

        async submit_modal() {
            if (this.data_folder && this.data_key) {
                const val = {
                    folder:
                        'data/' +
                        this.$route.params.user +
                        '/' +
                        this.data_folder +
                        '/' +
                        this.$route.params.id +
                        '/' +
                        this.data_key,
                    text: this.data_text,
                }

                try {
                    await this.$store.dispatch('createValueSet', val)

                    this.$store.dispatch('notic', 'Изменения сохранены')

                    this.close_modal()

                    // this.$router.push('/')
                } catch (e) {
                    console.log(e)
                }
            }
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
            const folder =
                'data/' +
                this.$route.params.user +
                '/sd/' +
                this.$route.params.id +
                '/' +
                id

            try {
                await this.$store.dispatch('removeFolder', folder)

                this.$store.dispatch('notic', 'Данные удалены')

                this.close_modal()

                // this.$router.push('/')
            } catch (e) {
                console.log(e)
            }
        },

        async sd_remove() {
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
                    this.$store.dispatch('notic', 'Данные удалены')

                    this.close_modal()

                    this.$router.push('/')
                }
            } catch (e) {
                console.log(e)
            }
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

/* .table {
    width: 100%;
    margin-bottom: 1rem;
    vertical-align: top;
    border-color: #dee2e6;
    background-color: #fff;
    border-collapse: collapse;
} */
</style>
