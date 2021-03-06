<template>
    <h1 v-if="!$route.params.id">Калькулятор</h1>
    <Tabs :tabs="id_map(BD_PRISE_TABS)" class="m-top" />
    <div class="calc m-top">
        <form class="calc__form" @submit.prevent="calc_submit">
            <Card>
                <Grid class="m-top">
                    <div v-if="catalog_filter">
                        <Sel
                            label="Вид работ"
                            :options="catalog_filter"
                            @change="catalog_change($event.target)"
                        />
                    </div>

                    <div v-if="material_filter">
                        <Sel
                            label="Материал"
                            :options="material_filter"
                            :selected="material_filter[0].id"
                            @change="material_change($event.target)"
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
                            type="tel"
                        />
                    </div>
                    <div>
                        <input-icon
                            v-if="flag_h"
                            label="Размер h (мм.)"
                            v-model.number="calc_h"
                            @click="$event.target.select()"
                            type="tel"
                        />
                    </div>
                </Grid>
                <template v-slot:footer>
                    <div class="flex gap-2">
                        <div class="calc__info hidden-550">
                            S: {{ calc_i_tofixed }} {{ material._i }}
                        </div>
                        <div class="calc__info">₽: {{ calc_s }}</div>
                        <input-icon
                            style="padding-right: 2em"
                            title="Стоимость материала"
                            v-if="material._sum !== false"
                            v-model="material._sum"
                            id="material_sum"
                            wrapClass="nowrap"
                            type="tel"
                        />
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
                :flag_calc="flag_calc"
            />
        </div>
    </div>
    <form @submit.prevent="modal_grup_submit">
        <Modal v-show="modal_min" @close="close_modal_min" :modal_min="true">
            <template v-slot:header>
                <icon icon="notifications_active" /> Настройки
            </template>
            <template v-slot:body>
                <p v-html="modal_min_text"></p>
                <switches
                    @change="modal_default_submit($event.target)"
                    on="Добавить новую"
                    off="Соеденить"
                />
            </template>
            <template v-slot:footer>
                <btn class="btn-prim">Ок</btn>
            </template>
        </Modal>
    </form>
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
import Modal from '../components/app/Modal.vue'

export default {
    name: 'Calc',
    components: {
        Grid,
        Card,
        Tabs,
        Sel,
        InputIcon,
        Switches,
        Btn,
        Icon,
        EditTable,
        Modal,
    },
    data: () => ({
        catalog_id: '',
        calc_w: 3000,
        calc_h: 1000,
        calc_i_tofixed: 0,
        flag_w: true,
        flag_h: true,
        flag_calc: false,
        modal_min: false,
        modal_min_text: '',
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
            data: '',
            isp: '',
            key: '',
            prim: 'Сумма указана с учетом стоимости материала.',
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

    mounted() {
        document.title = 'Калькулятор'
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
                    let item = []
                    this.flag_w = this.flag_h = true
                    arr.forEach((elem, i) => {
                        if (elem.catalog_id_arr && elem.catalog_id_arr.length) {
                            const el = elem.catalog_id_arr.filter(
                                (el) => el === this.catalog_id
                            )

                            if (el.length) item.push(arr[i])
                        }
                    })
                    if (item.length) {
                        this.material._sum = item[0].material_sum
                        this.material._i = item[0].material_i
                        this.material._f = item[0].material_f
                        this.sd_option = item[0].name
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

            if (isNaN(this.calc_h) || !this.calc_h) this.calc_h = 0
            if (isNaN(this.calc_w) || !this.calc_w) this.calc_w = 0

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

            if (isNaN(+res)) {
                res = eval(formula)

                if (isNaN(+res) || +res <= 0) res = 0
            } else res = +res

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
            const summ = +(this.calc_i * this.material._sum)
            if (!isNaN(summ)) return +summ.toFixed(1)
            else return 0
        },
    },
    methods: {
        modal_default_submit(event) {
            if (event.checked) {
                let sd = this.sd_arr_build()
                sd.flag = true
                this.sd.push(sd)

                this.close_modal_min()

                event.checked = false

                this.flag_calc = true // показать кнопку сохранить
                return this.notic('Расчет добавлен')
            } else return this.notic('Ошибка! Расчет не добавлен')
        },

        modal_grup_submit() {
            let sd = this.sd_arr_build()

            let index = ''

            for (let i in this.sd) {
                const el = this.sd[i]

                if (el.option === sd.option && el.text === sd.text) {
                    index = i
                    break
                }
            }

            if (index) {
                let izm = this.sd[index].s
                this.sd[index].s = +izm + +sd.s

                let summ = this.sd[index].p
                this.sd[index].p = +summ + +sd.s

                this.sd[index].flag = true

                this.flag_calc = true // показать кнопку сохранить
                this.close_modal_min()

                return this.notic('Расчет добавлен')
            } else return this.notic('Ошибка! Расчет не добавлен')
        },

        sd_arr_build() {
            let sd = {}
            sd.s = +this.calc_i_tofixed // Площадь
            sd.i = this.material._i // Ед.Изм
            sd.p = this.calc_s // Сумма
            sd.option = this.sd_option
            sd.text = this.sd_text

            return sd
        },

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
                }
            }
        },

        calc_submit() {
            if (!this.calc_s) return this.notic('Отмена! Стоимость равна нулю')

            if (this.sd.length) {
                const grup_i = this.sd.filter((el) => {
                    if (
                        el.text === this.sd_text &&
                        el.option === this.sd_option
                    )
                        return true
                })

                if (grup_i.length) {
                    this.modal_min_text = `Таблица уже содержит <b>${this.sd_text}</b> и <b>${this.sd_option}</b>.<br>Поместить расчет в имеющую строку или добавить новую?`
                    this.modal_min = true
                    return
                }
            }

            let sd = this.sd_arr_build()

            sd.flag = true

            this.sd.push(sd)

            this.notic('Расчет добавлен')

            this.flag_calc = true // показать кнопку сохранить
        },

        notic(text) {
            return this.$store.dispatch('notic', text)
        },
    },
}
</script>
<style lang="sass">
.calc
    display: flex
    flex-wrap: nowrap
    gap: 3rem

    >*
        box-sizing: border-box
        width: 100%
        max-width: 100%

    &__form
        max-width: 530px
        width: 100%

    &__info
        white-space: nowrap

    .tab
        height: 74px
        margin-bottom: 0

        > * > a
            line-height: 50px

@media (max-width: 1200px)
    .calc
        flex-wrap: wrap

@media (max-width: 550px)
    .hidden-550
        display: none
</style>
