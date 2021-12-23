<template>
    <btn class="btn-prim" @click="flag.modal = !flag.modal"
        >Договор <icon icon="print" />
    </btn>
    <form @submit.prevent="print_click">
        <modal v-if="flag.modal" @close="close_modal">
            <template v-slot:header>Настройки печати</template>
            <template v-slot:body>
                <grid class="m-top">
                    <div>
                        <sel
                            label="Фирма"
                            :options="BD_FIRMA"
                            @change="firma_change($event.target.value)"
                        />
                        <input-icon label="ФИО" v-model="form.name" />
                    </div>

                    <div>
                        <input-icon label="Номер договора" v-model="form.num" />
                        <input-icon
                            label="Дата составления"
                            v-model="form.date"
                        />
                        <input-icon label="Адрес" v-model="form.adres" />
                        <sel
                            label="Наименование услуги"
                            :options="BD_USLUGA"
                            @change="uslugq_change($event.target.value)"
                        />
                    </div>

                    <div>
                        <input-icon label="Вся сумма" v-model="form.sum" />
                        <input-icon
                            label="Аванс"
                            v-model="form.avans"
                            @input="ostatok_build"
                        />
                        <input-icon label="Остаток" v-model="form.ostatok" />
                    </div>
                    <div class="wrap">
                        <checkboxes
                            name="Договор"
                            :checked="flag.dogovor"
                            @change="flag.dogovor = !flag.dogovor"
                        />
                        <checkboxes
                            name="Акт приемки"
                            :checked="flag.akt"
                            @change="flag.akt = !flag.akt"
                        />
                        <checkboxes
                            name="Товарный чек"
                            :checked="flag.invois"
                            @change="flag.invois = !flag.invois"
                        />
                        <checkboxes
                            v-if="flag.smeta"
                            name="Смета"
                            :checked="flag.smeta"
                            @change="flag.smeta = !flag.smeta"
                        />
                    </div>
                </grid>
            </template>
            <template v-slot:footer>
                <btn v-if="flag_btn" class="btn-prim"
                    >Дальше <icon icon="chevron_right"
                /></btn>
                <Print v-else
            /></template>
        </modal>
    </form>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from './Modal.vue'
import Print from './Print.vue'
import Btn from '../html/Btn.vue'
import Card from '../html/Card.vue'
import Checkboxes from '../html/Checkboxes.vue'
import Grid from '../html/Grid.vue'
import InputIcon from '../html/InputIcon.vue'
import Sel from '../html/Sel.vue'
import Icon from '../html/Icon.vue'
export default {
    name: 'dogovor-modal',
    components: {
        Sel,
        Card,
        Grid,
        InputIcon,
        Btn,
        Print,
        Modal,
        Checkboxes,
        Icon,
    },
    data: () => ({
        flag_btn: true,
        flag: {
            modal: false,
            dogovor: true,
            akt: true,
            invois: true,
            smeta: false,
        },
        god: new Date().getFullYear(),
        form: {
            name: '',
            num: '',
            date: '',
            adres: '',
            sum: '',
            avans: '',
            ostatok: '',
            usluga: '',
            firma: {},
        },
    }),

    props: {
        catalog_user: {
            type: [String, Number],
        },
        catalog_adres: {
            type: [String, Number],
        },
        summ: {
            type: [String, Number],
        },
        catalog_spec: {
            type: [String, Number],
        },
        catalog_date: {
            type: [String, Number],
        },
        // firm: Object,
    },

    emits: ['print_click'],

    computed: {
        ...mapGetters(['BD_FIRMA']),
        ...mapGetters(['BD_USLUGA']),

        ostatok_build() {
            const sum = +this.form.sum
            const avans = +this.form.avans
            this.form.ostatok = sum - avans
        },
    },

    mounted() {
        this.form.firma = this.BD_FIRMA[0]
        this.form.usluga = this.BD_USLUGA[0].name

        this.flag.modal = false

        if (this.catalog_user) {
            this.form.name = this.catalog_user
        }
        if (this.catalog_adres) {
            this.form.adres = this.catalog_adres
        }

        if (this.summ) this.form.sum = this.summ

        if (this.catalog_spec) this.form.num = this.catalog_spec
        if (this.catalog_date) this.form.date = this.catalog_date
    },

    methods: {
        close_modal() {
            this.flag.modal = !this.flag.modal
            this.flag.dogovor = false
            this.flag.invois = false
            this.flag.akt = false
            this.flag.smeta = false
        },

        print_click() {
            this.$emit('print_click', { form: this.form, flag: this.flag })
            this.flag_btn = !this.flag_btn
        },
        firma_change(val) {
            this.form.firma = this.BD_FIRMA[val]
        },
        uslugq_change(val) {
            this.form.usluga = val
        },
    },

    watch: {
        summ() {
            if (this.summ) this.form.sum = this.summ
        },
        catalog_spec() {
            if (this.catalog_spec) this.form.num = this.catalog_spec
        },
        catalog_user() {
            if (this.catalog_date) this.form.name = this.catalog_user
        },
        catalog_adres() {
            if (this.catalog_date) this.form.adres = this.catalog_adres
        },
        catalog_date() {
            if (this.catalog_date) this.form.date = this.catalog_date
        },
    },
}
</script>

<style></style>
