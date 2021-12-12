<template>
    <Link @click.prevent="btn_click"><icon icon="add" /> {{ btn_text }} </Link>
    <modal v-if="modal" :modal_min="true" @close="close_modal">
        <template v-slot:header>{{ btn_text }}</template>
        <template v-slot:body>
            <p v-if="folder === 'formula'">
                Пример площадь м/кв: <b>(w*h)/1000000</b><br />
                Обязательные значения:<br />
                <b>w</b> - ширина<br />
                <b>h</b> - высота
            </p>
            <p v-if="folder === 'izm'">Пример площадь: <b>м/кв</b></p>
            <table-my class="table-input">
                <tr v-for="(el, i) in BD" :key="i">
                    <td>
                        <input
                            type="text"
                            class="input-table"
                            :value="el"
                            :id="i"
                            @change="input_change_edit($event.target)"
                        />
                    </td>
                </tr>
            </table-my>
            <input-icon
                label="Добавить"
                icon="add"
                @change="input_change_new($event.target)"
            />
        </template>
        <template v-slot:footer></template>
    </modal>
</template>

<script>
import Btn from '@/components/html/Btn'
import Icon from '@/components/html/Icon'
import Modal from '@/components/app/Modal'
import InputIcon from '@/components/html/InputIcon'
import TableMy from '@/components/html/Table-my'
import Link from '../html/Link.vue'
export default {
    name: 'price-formula',
    components: { TableMy, InputIcon, Modal, Icon, Btn, Link },

    data: () => ({
        modal: false,
    }),
    props: {
        folder: String,
        btn_text: String,
        BD: [Array, Object, String],
    },
    mounted() {},
    methods: {
        input_change_new(event) {
            if (event.value) {
                const val = {
                    folder: 'prise/' + this.folder,
                    text: event.value.trim(),
                }

                this.bd_push(val)
                event.value = ''
            }
        },

        input_change_edit(event) {
            if (event.value) {
                const val = {
                    folder: 'prise/' + this.folder + '/' + event.id,
                    text: event.value.trim(),
                }

                this.bd_set(val)
            } else {
                const folder = 'prise/' + this.folder + '/' + event.id

                this.bd_item_remove(folder)
            }
        },

        btn_click() {
            this.show_modal()
        },

        show_modal() {
            this.modal = true
        },

        close_modal() {
            this.modal = false
        },

        notic(text) {
            return this.$store.dispatch('notic', text)
        },

        submit_success(success) {
            this.notic('Данные добавлены')
        },

        async bd_push(val) {
            try {
                if (val) {
                    const success = await this.$store.dispatch(
                        'createValuePush',
                        val
                    )
                    this.submit_success(success)
                }
            } catch (e) {
                console.log(e)
            }
        },

        async bd_set(val) {
            if (val) {
                try {
                    const success = await this.$store.dispatch(
                        'createValueSet',
                        val
                    )
                    this.submit_success(success)
                } catch (e) {
                    console.log(e)
                }
            }
        },

        async bd_item_remove(folder) {
            if (folder) {
                try {
                    const success = await this.$store.dispatch(
                        'removeBd',
                        folder
                    )
                    if (success) this.notic('Данные удалены')
                } catch (e) {
                    console.log(e)
                }
            }
        },
    },
}
</script>
<style>
.table-input tr > td {
    padding: 0;
    margin: 0;
}
.input-table {
    border: none;
}
</style>
