<template>
    <div class="">
        <h1 class="wrap">Dogovor</h1>
        <DogovorModal @print_click="print_click" />

        <!-- <btn class="btn-prim" @click="firma_change(firm_id)">Печать</btn> -->

        <card class="m-top" v-if="flag.dogovor || flag.invois || flag.akt">
            <div id="print">
                <Dogovor :form="form" :flag="flag" />
            </div>
        </card>
    </div>
</template>

<script>
import Modal from '../components/app/Modal.vue'
import Print from '../components/app/Print.vue'
import Btn from '../components/html/Btn.vue'
import Card from '../components/html/Card.vue'
import Checkboxes from '../components/html/Checkboxes.vue'
import Grid from '../components/html/Grid.vue'
import InputIcon from '../components/html/InputIcon.vue'
import Sel from '../components/html/Sel.vue'
import Dogovor from '../components/app/Dogovor.vue'
import DogovorModal from '../components/app/DogovorModal.vue'
export default {
    name: 'doc',
    components: {
        Sel,
        Card,
        Grid,
        InputIcon,
        Btn,
        Print,
        Modal,
        Checkboxes,
        Dogovor,
        DogovorModal,
    },

    data: () => ({
        form: {},
        flag: {},
    }),

    mounted() {
        document.title = 'calc-balkon-spb Договор'
    },

    methods: {
        async print_click(data_modal) {
            this.form = await data_modal.form
            this.flag = await data_modal.flag
        },
    },
}
</script>
