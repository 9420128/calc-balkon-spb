<template>
    <div class="calc">
        <h1>Калькулятор</h1>
        <Grid class="m-top">
            <form @submit.prevent="calc_submit">
                <Card>
                    <template v-slot:header>
                        <Tabs :tabs="id_map(BD_PRISE_TABS)" />
                    </template>
                    <Grid>
                        <div v-if="catalog_filter">
                            <Sel
                                label="Вид работ"
                                :options="catalog_filter"
                                @change="catalog_change($event.target)"
                            />
                            <switches />
                        </div>

                        <div v-if="material_filter">
                            <Sel
                                label="Материал"
                                :options="material_filter"
                                :selected="material_filter[0].id"
                                @change="material_change($event.target)"
                            />
                            <input-icon
                                v-if="material._sum !== false"
                                label="Стоимость (руб.)"
                                v-model="material._sum"
                                id="material_sum"
                            />
                        </div>
                    </Grid>
                    <Grid>
                        <div>
                            <input-icon
                                v-if="flag_w"
                                label="Размер w (мм.)"
                                v-model.number="calc_w"
                                @click="$event.target.select()"
                            />
                        </div>
                        <div>
                            <input-icon
                                v-if="flag_h"
                                label="Размер h (мм.)"
                                v-model.number="calc_h"
                                @click="$event.target.select()"
                            />
                        </div>
                    </Grid>
                    <template v-slot:footer>
                        <div class="flex gap-2">
                            <div>S: {{ calc_i_tofixed }} {{ material._i }}</div>
                            <div>₽: {{ calc_s }}</div>
                        </div>
                        <div>
                            <btn class="button-icon btn-danger"
                                ><icon icon="forward"
                            /></btn>
                        </div>
                    </template>
                </Card>
            </form>
            <div>
                <EditTable
                    v-if="sd_build.length"
                    :sd="sd_build"
                    :catalog="catalog_build"
                    :flag_save="flag_save"
                />
            </div>
        </Grid>
        <modal-min v-show="modal_min" @close_modal_min="close_modal_min">
           <p v-html="modal_min_text"></p>
            <switches on="Добавить новую" off="Соеденить"/>
        </modal-min>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import EditTable from '../components/app/EditTable.vue'
import Tabs from '../components/app/Tabs.vue'
import Btn from '../components/html/Btn.vue'
import Card from '../components/html/Card.vue'
import Grid from '../components/html/Grid.vue'
import Icon from '../components/html/Icon.vue'
import InputIcon from '../components/html/InputIcon.vue'
import Sel from '../components/html/Sel.vue'
import Switches from '../components/html/Switches.vue'
import ModalMin from "@/components/app/ModalMin";
export default {
    name: 'Calc',
    components: {
        ModalMin,
        Grid,
        Card,
        Tabs,
        Sel,
        InputIcon,
        Switches,
        Btn,
        Icon,
        EditTable,
    },
    data: () => ({
        catalog_id: '',
        calc_w: 3000,
        calc_h: 1000,
        calc_i_tofixed: 0,
        flag_w: true,
        flag_h: true,
        flag_save: false,
        modal_min: false,
        modal_min_text:'',
        material: {
            _sum: 0,
            _i: '',
            _f: '',
            _name: '',
            _id: '',
        },
        sd: [],
        sd_text: '',
        sd_option: '',
        catalog: {
            // adres: '',
            data: '',
            isp: '',
            key: '',
            // montag: '',
            prim: '',
            spec: '',
            user: '',
        },
    }),
    props: {
        catalog_bd: {
            type: [Array, Object],
        },
        sd_bd: {
            type: [Array, Object],
        },
    },

    computed: {
        ...mapGetters(['BD_PRISE_TABS']),
        ...mapGetters(['BD_PRISE_CATALOG']),
        ...mapGetters(['BD_PRISE_MATERIAL']),

        catalog_build() {
            if (this.catalog_bd) return (this.catalog = this.catalog_bd)
            else return this.catalog
        },

        sd_build() {
            if (this.sd_bd) return (this.sd = this.sd_bd)
            else return this.sd
        },

        catalog_filter() {
            if (this.BD_PRISE_CATALOG) {
                const arr = this.id_map(this.BD_PRISE_CATALOG)
                if (arr && this.$route.hash) {
                    const item = arr.filter(
                        (el) => el.tab_id === this.$route.hash.replace('#', '')
                    )

                    if (item.length) {
                        this.catalog_id = item[0].id
                        this.sd_text = item[0].name
                        return item
                    } else {
                        this.catalog_id = false
                        return false
                    }
                } else return false
            }
        },

        material_filter() {
            if (this.BD_PRISE_MATERIAL) {
                const arr = this.id_map(this.BD_PRISE_MATERIAL)
                if (arr && this.catalog_id) {
                    const item = arr.filter(
                        (el) => el.catalog_id === this.catalog_id
                    )
                    if (item.length) {
                        this.material._sum = item[0].material_sum
                        this.material._i = item[0].material_i
                        this.material._f = item[0].material_f
                        // this.material._name = item[0].name
                        this.sd_option = item[0].name
                        // this.material._id = item[0].id
                        return item
                    } else {
                        this.material._sum = false

                        return false
                    }
                } else {
                    this.flag_w = this.flag_h = false
                    this.calc_h = this.calc_w = 0
                    return false
                }
            }
        },

        calc_i() {
            let formula = this.material._f

            if (!formula) return

            if (formula.indexOf('h') === -1) this.flag_h = false
            else this.flag_h = true
            if (formula.indexOf('w') === -1) this.flag_w = false
            else this.flag_w = true

            formula = formula.replace('h', this.calc_h)
            formula = formula.replace('w', this.calc_w)

            const actions = {
                multiplication: {
                    value: '*',
                    label: 'multiplication',
                    func: (a, b) => parseInt(a) * parseInt(b),
                },
                division: {
                    value: '/',
                    label: 'division',
                    func: (a, b) => a / b,
                },
                addition: {
                    value: '+',
                    label: 'addintion',
                    func: (a, b) => parseInt(a) + parseInt(b),
                },
                subtraction: {
                    value: '-',
                    label: 'subtraction',
                    func: (a, b) => parseInt(a) - parseInt(b),
                },
            }

            let res = parseBrackets(formula)

            if (isNaN(+res)) res = 0
            else res = +res

            this.calc_i_tofixed = +res.toFixed(2)

            return res

            function parseBrackets(str) {
                const out = str.match(/\((.*)\)/)
                if (out) {
                    const expResult = parseBrackets(out[1])
                    str = str.replace(out[0], expResult)
                    return calcExpr(str)
                } else {
                    return calcExpr(str)
                }
            }

            function calcExpr(str) {
                let res
                Object.keys(actions).map(function (type) {
                    res = parseExpr(str, actions[type])
                    if (res) {
                        str = str.replace(res.str, res.value.toString())
                        str = calcExpr(str)
                    }
                })
                return str
            }

            function parseExpr(str, action) {
                const reg = new RegExp(
                    `((\\d+)\\s*\\${action.value}\\s*(\\d+))`
                )
                const out = str.match(reg)
                if (!out) return false

                const result = {
                    str: out[1],
                }

                result.value = action.func(out[2], out[3])
                return result
            }
        },

        calc_s() {
            return +(this.calc_i * this.material._sum).toFixed(1)
        },
    },
    methods: {
        close_modal_min() {
            this.modal_min = false
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

        catalog_change(event) {
            this.catalog_id = event.value
            this.sd_text = event.options[event.selectedIndex].text
        },

        material_change(event) {
            const id = event.value
            this.sd_option = event.options[event.selectedIndex].text

            if (this.BD_PRISE_MATERIAL) {
                const arr = this.id_map(this.BD_PRISE_MATERIAL).filter(
                    (el) => el.id === id
                )

                if (arr.length) {
                    this.material._sum = arr[0].material_sum
                    this.material._i = arr[0].material_i
                    this.material._f = arr[0].material_f
                    // this.material._name = arr[0].name
                    // this.material._id = arr[0].id
                }
            }
        },

        calc_submit() {
            if (!this.calc_s) return this.notic('Отмена! Стоимость равна нулю')

            let sd = {}
            sd.s = +this.calc_i_tofixed // Площадь
            sd.i = this.material._i // Ед.Изм
            sd.p = this.calc_s // Сумма
            sd.option = this.sd_option
            sd.text = this.sd_text

            const sd_length = this.sd.length
            if(sd_length) {
                const sd_item = this.sd[sd_length-1]

                if(sd_item.text === sd.text && sd_item.option === sd.option) {
                    this.modal_min_text = `Таблица уже содержит <b>${sd.text}</b> и <b>${sd.option}</b>.<br>
           Поместить расчет в имеющую строку или добавить новую?`
                    this.modal_min = true
                }
            }
            this.sd.push(sd)

            this.flag_save = true
        },

        notic(text) {
            return this.$store.dispatch('notic', text)
        },
    },
}
</script>
<style lang="sass">
.calc
    .tab
        height: 74px
        margin-bottom: 0

        > * > a
            line-height: 50px
    // padding-top: 2em
    // padding-bottom: 2em
</style>
