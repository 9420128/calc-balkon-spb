<template>
    <!-- dogovor -->
    <div
        v-if="flag.dogovor"
        v-html="dogovor"
        class="printDogovor"
        style="page-break-after: always; page-break-before: always"
    ></div>

    <!-- akt -->
    <div
        v-if="flag.akt"
        style="
            page-break-after: always;
            page-break-before: always;
            font-size: 12px;
        "
        v-html="akt"
    ></div>

    <!-- invois -->
    <table
        v-if="flag.invois"
        class="invois printDogovor"
        style="
            page-break-after: always;
            page-break-before: always;
            width: 100%;
            border-collapse: collapse;
            font-size: 8px;
        "
    >
        <tr>
            <td></td>
            <td
                class="in__td"
                style="padding: 5px 20px; border: 1px solid #666; width: 270px"
            >
                <div
                    class="in__firm"
                    style="
                        display: block;
                        text-align: center;
                        border-bottom: 1px solid #666;
                        font-weight: bold;
                        margin-bottom: 3em;
                    "
                >
                    {{ form.firma.name }}
                </div>
                <div style="text-align: center">
                    <b>КВИТАНЦИЯ</b>
                    <p style="text-align: center">
                        к приходному кассовому ордеру №
                        <span class="in__border">
                            {{ form.num }}
                        </span>
                    </p>
                    <p style="text-align: center">
                        от
                        <span class="in__border">
                            {{ form.date }}
                        </span>
                    </p>
                </div>
                <ul style="margin: 0 0 6em 0; padding: 0; list-style: none">
                    <li class="in_flex">
                        <span>Принято от:</span>
                        <span class="in__border-full">{{ form.name }}</span>
                    </li>
                    <li class="in_flex">
                        <span>Основание:</span>
                        <span class="in__border-full"> {{ form.usluga }}</span>
                    </li>
                    <li class="in_flex">
                        <span class="in__border-full">&nbsp;</span>
                    </li>
                    <li class="in_flex">
                        <span class="in__border-full">&nbsp;</span>
                    </li>

                    <li class="in_flex">
                        <span>Сумма</span>
                        <span class="in__border"
                            >{{ form.avans }}
                            <span class="in__footer">цифрами</span></span
                        >

                        <span>руб.</span>
                        <span class="in__border">00</span>
                        <span>коп.</span>
                    </li>
                    <li>&nbsp;</li>
                    <li class="in_flex">
                        <span class="in__border-full"
                            >{{ sum_str_buid(form.avans) }}
                            <span class="in__footer">прописью</span></span
                        >
                    </li>
                    <li>&nbsp;</li>
                    <li class="in_flex">
                        <span
                            >В том<br />
                            числе</span
                        >
                        <span class="in__border-full">&nbsp;</span>
                    </li>
                </ul>
                <p>М.П. (штампа)</p>
                <ul style="margin: 0 0 6em 0; padding: 0; list-style: none">
                    <li class="in_flex">
                        <span
                            >Главный<br />
                            бухгалтер</span
                        >
                        <span class="in__border" style="width: 25%">
                            &nbsp;
                            <span class="in__footer">подпись</span>
                        </span>
                        <span class="in__border-full">
                            {{ form.firma.director[1] }}
                            <span class="in__footer">расшифровка подписи</span>
                        </span>
                    </li>
                    <li>&nbsp;</li>
                    <li class="in_flex">
                        <span>Получил</span>
                        <span class="in__border" style="width: 25%">
                            &nbsp;
                            <span class="in__footer">подпись</span>
                        </span>
                        <span class="in__border-full">
                            &nbsp;
                            <span class="in__footer">расшифровка подписи</span>
                        </span>
                    </li>
                </ul>
            </td>
        </tr>
    </table>
</template>

<script>
import Modal from './Modal.vue'
import Print from './Print.vue'
import Btn from '../html/Btn.vue'
import Card from '../html/Card.vue'
import Checkboxes from '../html/Checkboxes.vue'
import Grid from '../html/Grid.vue'
import InputIcon from '../html/InputIcon.vue'
import Sel from '../html/Sel.vue'
export default {
    name: 'dogovor',
    components: {
        Sel,
        Card,
        Grid,
        InputIcon,
        Btn,
        Print,
        Modal,
        Checkboxes,
    },
    data: () => ({
        god: new Date().getFullYear(),
        dogovor_store: [
            'ДОГОВОР на оказание услуг № %num%',
            // '%num%',
            '%date%',
            '%firma%, в лице Генерального директора %director_0%, именуемое в дальнейшем  ПОДРЯДЧИК, действующее на основании Устава, с одной стороны, и с другой в лице- %name%, именуемый (-ая) в дальнейшем ЗАКАЗЧИК, вместе именуемые СТОРОНЫ, заключили настоящий Договор о нижеследующем:',
            '1.ПРЕДМЕТ ДОГОВОРА',
            `1.Заказчик поручает, а Подрядчик принимает на себя обязательства по выполнению следующих работ:
            - Осуществить замеры балкона / лоджии  на объекте по адресу: %adres%
- Произвести доставку материала.
- Изготовить металлоконструкции.
- Произвести монтаж крыши / козырька  на объекте Заказчика.
- Произвести  монтаж оконных конструкций, элементов обшивки.
1.2. Характеристика изделия указана в  «Бланке замера».
1.3. Сроки выполнения работ определяются Календарным планом работ, согласованным Сторонами и указанным в «Бланке замера».
1.4. В случае, если монтаж изделия невозможен без повреждения материала, прилегающего к устанавливаемому изделию, об указанных обстоятельствах Заказчик предупреждается в момент заключения договора. Заказчик также предупреждается о возможности повышения содержд.ания уровня пыли в воздухе помещения, понижения температуры и других неблагоприятных явлениях, могущих возникнуть при исполнении настоящего договора. Обстоятельства, указанные в настоящем пункте, фиксируются в «Бланке  замера».
1.5. В обязанности Подрядчика  не входит:
Демонтаж старых конструкций,  вывоз мусора, устранение протечек перекрытий и стен в доме заказчика. (Данные работы производятся за отдельное вознаграждение, размер которого согласовывается Сторонами и указанном в «Бланке оконного замера»).
Согласование размеров, характеристик изделия  с управляющими компания / ЖКХ , а также с органами пожарной безопасности.
1.6.Заказчик  ознакомлен со сведениями об изделии и его монтаже, техническими характеристиками изделий и соответствии их требованиям.
1.7.Настоящим Заказчик подтверждает, что условные обозначения, применяемые в «Бланке замера» ему разъяснены и понятны.`,
            '2. СТОИМОСТЬ ДОГОВОРА И ПОРЯДОК РАСЧЕТОВ.',
            '2.1. Общая стоимость Договора составляет: %summ%',
            '2.2. Заказчик обязуется оплатить стоимость всех  услуг, предоставляемых Подрядчиком, в следующем порядке:',
            '- авансовый платеж: %avans%',
            '- при подписании акта о выполненных работах: %ostatok%',
            '3. ОБЯЗАННОСТИ СТОРОН.',
            `3.1. Подрядчик обязан:
3.1.1. Подрядчик обязуется предоставить Заказчику и согласовать с ним эскизы и конфигурацию изделий
(«Бланк замера»).
3.1.2. Подрядчик производит работы по замеру проемов и стен на  объекте Заказчика.
3.1.3. Подрядчик изготавливает конструкции согласно  «Бланка замера», согласованного с Заказчиком.
3.1.4. Подрядчик производит доставку монтаж готовых изделий на объекте Заказчика в сроки, установленные календарным планом работ.
3.2. Заказчик  обязан:
3.2.1. Заказчик обязан при подписании Договора проверить и подписать « Бланк замера», прилагаемый к Договору.
3.2.2. Заказчик обеспечивает представителям Подрядчика, осуществляющим работы по настоящему договору, необходимые условия (электропитание 220 В, освещение места работы, свободный подход к оконным проемам).
3.2.3. Обязанность по хранению изделия с момента его доставки на объект лежит на Заказчике.
`,
            '4. ПОРЯДОК СДАЧИ – ПРИЕМКИ ГОТОВЫХ ИЗДЕЛИЙ И МОНТАЖ РАБОТ.',
            `4.1. Доставка каждой партии готовых изделий на объект производится согласно Календарному плану работ, согласованному Сторонами. При этом сроки выполнения работ (в том числе все промежуточные сроки), указанные в Календарном плане работ, начинают течь с момента получения Подрядчиком авансового платежа, указанного в п.2.2. Настоящего договора. В случае, если к моменту наступления срока начала монтажа изделия Заказчиком не будет исполнено обязательство, указанное в п.3.2.2. Настоящего договора, сроки окончания монтажа увеличиваются на срок задержки исполнения Заказчиком указанного обязательства.
4.2 Приемка монтажных работ оформляется в данном Договоре  в день окончания монтажа.
4.3.В случае, если в выполненных работах будут выявлены недостатки, представители Заказчика и Подрядчика составляют акт, в котором указываются все обнаруженные недостатки. В этом случае Подрядчик обязан компенсировать стоимость недопоставленных или некачественных изделий , либо произвести замену некачественных изделий в согласованный Сторонами срок.
4.4. При отсутствии представителей Заказчика на объекте на момент окончания работ Подрядчик  в течение в 3 (трех) рабочих дней принимает письменные претензии. При отсутствии претензий работы считаются выполненными надлежащим образом.`,
            '<div style="page-break-before: always;"></div>',
            '5. ОТВЕТСТВЕННОСТЬ СТОРОН.',
            `5.1. Подрядчик гарантирует  применение высококачественных материалов, соблюдение технологического  процесса при монтаже. Если в течение гарантийного срока службы в изделии будет  обнаружен дефект, возникший по вине Подрядчика, Подрядчик в течение согласованного с Заказчиком срока бесплатно устраняет дефект.
5.2. Гарантийный срок на изделия – 1 год, при условии правильной эксплуатации изделий.
5.3. Гарантия на монтаж – 1 год.
5.4. Гарантия не распространяется на изделия, обмер, доставку и монтаж которых Подрядчиком не производились, на изделия и работы, результаты которых были повреждены в  результате производимых в последствии строительных работ, на изделия, изготовленные и смонтированные с отклонениями  от  ТУ и ГОСТ по просьбе Заказчика. Гарантия также не распространяется на комплектующие, предоставленные Заказчиком.
5.5. В случае просрочки оплаты, Заказчик выплачивает Подрядчику пени в размере 0,1 % от неоплаченной части стоимости заказа за каждый день просрочки.
5.6. Подрядчик ответственности не несет:
- За протечки через верхнюю плиту или по несущей стене связанные с нарушением гидроизоляции перекрытий / кровли здания.
5.7. После  монтажа деревянных конструкций или обшивки деревянным материалом в обязанности заказчика входит  поддержка влажности воздуха внутри помещения не более 30% , и не допускать контакта с влагой не окрашенного изделия.
5.8. Вызов мастера для выявления,  устранения дефектов таких как: протечки через плиту, повреждение материала отделки-  не являются гарантийным случаем – оплачиваются заказчиком.
5.9. В случае задержки даты монтажа по вине Подрядчика, Подрядчик  выплачивает Заказчику пени в размере 0,1 % от неоплаченной части стоимости заказа за каждый день просрочки.`,
            '6.ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ.',
            `6.1. Стороны прилагают максимальные усилия, чтобы устранить возникающие разногласия исключительно путем переговоров .
6.2. В случае невозможности разрешения споров путем переговоров Стороны обращаются в Мировой районный суд
г. Санкт -Петербурга и Ленинградской области.`,
            '7.ФОРС - МАЖОР.',
            `7.1. В случае наступления  обстоятельств непреодолимой силы, таких как :пожар, стихийное бедствие, чрезвычайное положение, забастовка, массовая эпидемия, резкое изменение  политической ситуации в стране, законодательные изменения -препятствующие к исполнению обязательств Сторон  по настоящему Договору , Подрядчик обязан в 3-хдневный срок представить акт о выполненных работах и произвести перерасчет на дату ФОРС-МАЖОРных   обстоятельств.
7.2. Сторона, для которой создалась ситуация невозможности исполнения обязательств по настоящему Договору, должна  уведомить другую   сторону о наступлении обстоятельств непреодолимой силы в письменной форме в течение 24-х часов.
7.3. В случае, если температура воздуха и материала, из которого изготовлен проем окна, окажется ниже допустимой для применения монтажных материалов, которые были выбраны Заказчиком, срок выполнения работ увеличивается на срок, в течении которого сохранялась указанная   температура плюс 2 (два) дня.`,
            '8. ПРОЧИЕ ПОЛОЖЕНИЯ.',
            `8.1. Настоящий Договор вступает в силу с момента подписания его Сторонами и прекращается надлежащим его исполнением.
8.2. Вопросы, неурегулированные настоящим Договором , определяются в соответствии с действующим законодательством РФ.
8.3. Все изменения и дополнения к настоящему Договору должны быть составлены в письменной форме и подписаны Сторонами.
8.4. Настоящий Договор составлен в  двух экземплярах , по одному для каждой из Сторон, имеющих одинаковую юридическую силу.`,
            '9. АДРЕСА, РЕКВИЗИТЫ И ПОДПИСИ СТОРОН.',
            `ПОДРЯДЧИК
            %firma%
            Генеральный директор___________________/%director_1%/`,
            `ЗАКАЗЧИК
            %user%`,
        ],

        invois: ``,
        user: `
ФИО: %name% _____________________________________________________________________
Паспорт: _____________________________________________________________________
Когда и кем выдан:  _____________________________________________________________________
_____________________________________________________________________
Зарегистрирован по адресу: _____________________________________________________________________
_____________________________________________________________________
Подпись: _____________________________________________________________________`,
    }),

    props: {
        form: {
            name: [String],
            num: [String, Number],
            date: [String],
            adres: [String],
            sum: [String, Number],
            avans: [String, Number],
            ostatok: [String, Number],
            usluga: [String],
            firma: [Object],
        },
        flag: Object,
    },
    mounted() {},

    computed: {
        dogovor() {
            const firm = this.form.firma

            console.log(firm)

            let dogovor_text = '',
                col_1,
                col_2
            const dogovor_grid = (text_1, text_2) => {
                return (
                    '<div style="display: flex; justify-content: space-between;"><div style="width: 40%">' +
                    text_1 +
                    '</div><div style="width: 35%">' +
                    text_2 +
                    '</div></div>'
                )
            }

            this.dogovor_store.forEach((el) => {
                if (el.includes('%date%')) {
                    el = dogovor_grid(
                        'г. Санкт- Петербург',
                        '<span style="text-align: right; display: block;">' +
                            this.form.date +
                            '</span>'
                    )
                } else if (el.includes('%num%'))
                    el =
                        '<p style="text-align: center; font-weight: bold;">' +
                        el.replace('%num%', this.form.num) +
                        '</p>'
                else if (
                    el.includes('%firma%') &&
                    el.includes('%director_0%') &&
                    el.includes('%name%')
                ) {
                    el = el
                        .replace('%firma%', firm.name)
                        .replace('%director_0%', firm.director[0])
                        .replace('%name%', '<u>' + this.form.name + '</u>')
                } else if (el.includes('%adres%'))
                    el = el.replace('%adres%', '<u>' + this.form.adres + '</u>')
                // summ
                else if (el.includes('%summ%'))
                    el = el.replace(
                        '%summ%',
                        '<u>' + this.sum_ru(this.form.sum) + '</u>'
                    )
                // avans
                else if (el.includes('%avans%'))
                    el = el.replace(
                        '%avans%',
                        '<u>' + this.sum_ru(this.form.avans) + '</u>'
                    )
                // ostatok
                else if (el.includes('%ostatok%'))
                    el = el.replace(
                        '%ostatok%',
                        '<u>' + this.sum_ru(this.form.ostatok) + '</u>'
                    )
                else if (
                    el.includes('%firma%') &&
                    el.includes('%director_1%')
                ) {
                    col_1 = el
                        .replace('%firma%', firm.firma)
                        .replace('%director_1%', firm.director[1])
                        .replace(/\n/g, '<br>')

                    el = ''
                } else if (el.includes('%user%')) {
                    el = el.replace('%user%', this.user).replace(/\n/g, '<br>')

                    col_2 =
                        '<span style="display: block; width: 100%; overflow: hidden; white-space: nowrap;">' +
                        el.replace('%name%', this.form.name) +
                        '</span>'

                    el = ''
                }

                // else el = '<p>' + el + '</p>'

                dogovor_text += '<p>' + el + '</p>'
            })

            return (
                dogovor_text.replace(/\n/g, '<br>') + dogovor_grid(col_1, col_2)
            )
        },

        akt() {
            let html = ''
            let n = 1
            while (n < 3) {
                html += `<p style="text-align: center">
                            <b>АКТ СДАЧИ-ПРИЕМКИ РАБОТ</b>
                        </p>
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                            "
                        >
                            <div>г. Санкт-Петербург</div>
                            <div>"____"____________ ${this.god} г.</div>
                        </div>
                        <p>
                            ПОДРЯДЧИК ООО «Фенстер СПб», в лице Генерального
                            директора ${this.form.firma.director[2]},
                            действующего на основании Устава, с одной стороны, и
                            ЗАКАЗЧИК, в лице
                            <span class="in__border"> ${this.form.name}</span> с
                            другой стороны, составили настоящий Акт о том, что
                            выполненные работы:
                            <span class="in__border"> ${this.form.usluga}</span
                            >, удовлетворяют условиям договора №
                            <span class="in__border"> ${this.form.num}</span> на
                            выполнение работ и услуг от
                            <span class="in__border"> ${this.form.date}</span>
                        </p>
                        <span>Замечания ЗАКАЗЧИКА:</span>
                        <ul
                            style="
                                margin: 0 0 1em 0;
                                padding: 0;
                                list-style: none;
                            "
                        >
                            <li class="in_flex">
                                <span class="in__border-full">&nbsp;</span>
                            </li>
                            <li class="in_flex">
                                <span class="in__border-full">&nbsp;</span>
                            </li>
                            <li class="in_flex">
                                <span class="in__border-full">&nbsp;</span>
                            </li>
                        </ul>
                        <span>
                            Оставшаяся договорная цена выполненных работ
                            составляет:
                        </span>
                        <ul
                            style="
                                margin: 1.5em 0 5em 0;
                                padding: 0;
                                list-style: none;
                            "
                        >
                            <li class="in_flex">
                                <span class="in__border"
                                    >${this.form.ostatok} руб.
                                    <span class="in__footer">цифрами</span>
                                </span>
                                <span class="in__border-full"
                                    >${this.sum_str_buid(this.form.ostatok)}
                                    <span class="in__footer"
                                        >прописью</span
                                    ></span
                                >
                            </li>
                        </ul>
                        <p>
                            Работу сдал от ПОДРЯДЧИКА:
                            ______________________________/_________________
                        </p>
                        <p>
                            Работу принял от ЗАКАЗЧИКА:
                            ______________________________/_________________
                        </p>
                        `
                if (n === 1) {
                    html += '<hr style="margin-top: 6em; margin-bottom: 3em"/>'
                }
                n++
            }

            return html
        },
    },

    methods: {
        sum_str_buid(money) {
            if (!money) return ''
            var price
            var rub, kop, res
            let litera = ''
            let sotny = ''
            let desatky = ''
            let edinicy = ''
            let minus = ''
            var k = 0,
                i,
                j,
                N = [
                    '',
                    'один',
                    'два',
                    'три',
                    'четыре',
                    'пять',
                    'шесть',
                    'семь',
                    'восемь',
                    'девять',
                    '',
                    'одиннадцать',
                    'двенадцать',
                    'тринадцать',
                    'четырнадцать',
                    'пятнадцать',
                    'шестнадцать',
                    'семнадцать',
                    'восемнадцать',
                    'девятнадцать',
                    '',
                    'десять',
                    'двадцать',
                    'тридцать',
                    'сорок',
                    'пятьдесят',
                    'шестьдесят',
                    'семьдесят',
                    'восемьдесят',
                    'девяносто',
                    '',
                    'сто',
                    'двести',
                    'триста',
                    'четыреста',
                    'пятьсот',
                    'шестьсот',
                    'семьсот',
                    'восемьсот',
                    'девятьсот',
                    'тысяч',
                    'тысяча',
                    'тысячи',
                    'тысячи',
                    'тысячи',
                    'тысяч',
                    'тысяч',
                    'тысяч',
                    'тысяч',
                    'тысяч',
                    'миллионов',
                    'миллион',
                    'миллиона',
                    'миллиона',
                    'миллиона',
                    'миллионов',
                    'миллионов',
                    'миллионов',
                    'миллионов',
                    'миллионов',
                    'миллиардов',
                    'миллиард',
                    'миллиарда',
                    'миллиарда',
                    'миллиарда',
                    'миллиардов',
                    'миллиардов',
                    'миллиардов',
                    'миллиардов',
                    'миллиардов',
                ]
            var M = new Array(10)
            for (j = 0; j < 10; ++j) M[j] = new Array(N.length)
            for (i = 0; i < N.length; i++)
                for (j = 0; j < 10; j++) M[j][i] = N[k++]
            var R = new Array(
                'рублей',
                'рубль',
                'рубля',
                'рубля',
                'рубля',
                'рублей',
                'рублей',
                'рублей',
                'рублей',
                'рублей'
            )
            var K = new Array(
                'копеек',
                'копейка',
                'копейки',
                'копейки',
                'копейки',
                'копеек',
                'копеек',
                'копеек',
                'копеек',
                'копеек'
            )

            rub = ''
            kop = ''
            money = String(money)
            money = money.replace(',', '.')
            if (isNaN(money)) {
                return alert('Не числовое значение')
            }

            if (money.substr(0, 1) == '-') {
                money = money.substr(1)
                minus = 'минус '
            } else minus = ''
            money = Math.round(money * 100) / 100 + ''
            if (money.indexOf('.') != -1) {
                rub = money.substr(0, money.indexOf('.'))
                kop = money.substr(money.indexOf('.') + 1)
                if (kop.length == 1) kop += '0'
            } else rub = money
            if (rub.length > 12) {
                return alert('Слишком большое число')
            }
            let ru = propis((price = rub), R)
            let ko = propis((price = kop), K)
            ko != '' ? (res = ru + ' ' + ko) : (res = ru)
            ru == 'Ноль ' + R[0] && ko != '' ? (res = ko) : 0
            kop == 0 ? (res += ' ноль ' + K[0]) : 0

            // return
            return (
                (minus + res).substr(0, 1).toUpperCase() +
                (minus + res).substr(1)
            )

            function propis(price, D) {
                litera = ''
                for (i = 0; i < price.length; i += 3) {
                    sotny = desatky = edinicy = ''
                    if (n(i + 2, 2) > 10 && n(i + 2, 2) < 20) {
                        edinicy =
                            ' ' + M[n(i + 1, 1)][1] + ' ' + M[0][i / 3 + 3]
                        i == 0 ? (edinicy += D[0]) : 0
                    } else {
                        edinicy = M[n(i + 1, 1)][0]
                        edinicy == 'один' && (i == 3 || D == K)
                            ? (edinicy = 'одна')
                            : 0
                        edinicy == 'два' && (i == 3 || D == K)
                            ? (edinicy = 'две')
                            : 0
                        i == 0 && edinicy != ''
                            ? 0
                            : (edinicy += ' ' + M[n(i + 1, 1)][i / 3 + 3])
                        edinicy == ' '
                            ? (edinicy = '')
                            : edinicy == ' ' + M[n(i + 1, 1)][i / 3 + 3]
                            ? 0
                            : (edinicy = ' ' + edinicy)
                        i == 0 ? (edinicy += ' ' + D[n(i + 1, 1)]) : 0
                        ;(desatky = M[n(i + 2, 1)][2]) != ''
                            ? (desatky = ' ' + desatky)
                            : 0
                    }
                    ;(sotny = M[n(i + 3, 1)][3]) != ''
                        ? (sotny = ' ' + sotny)
                        : 0
                    if (
                        price.substr(price.length - i - 3, 3) == '000' &&
                        edinicy == ' ' + M[0][i / 3 + 3]
                    )
                        edinicy = ''
                    litera = sotny + desatky + edinicy + litera
                }
                if (litera == ' ' + R[0]) return 'ноль' + litera
                else return litera.substr(1)
            }
            function n(start, len) {
                if (start > price.length) return 0
                else return Number(price.substr(price.length - start, len))
            }
        },
        sum_ru(val) {
            if (val)
                return (
                    '<b>' +
                    new Intl.NumberFormat('ru-RU').format(val) +
                    ' р.</b> <i>(' +
                    this.sum_str_buid(val) +
                    ')</i>'
                )
            else return ''
        },
    },
}
</script>

<style>
.invois {
    width: 100%;
    border-collapse: collapse;
    page-break-after: always;
}
.in__td {
    padding: 5px 20px;
    border: 1px solid #666;
}
.in__firm {
    display: block;
    text-align: center;
    border-bottom: 1px solid #666;
    font-weight: bold;
    margin-bottom: 4em;
}

.in_list li {
    list-style: none;
    padding-top: 0.5em;
}
.in_flex {
    display: flex;
    gap: 0.5em;
    align-items: flex-end;
}
.in__border-full {
    border-bottom: 1px solid #666;
    flex: 1;
    position: relative;
}
.in__border {
    border-bottom: 1px solid #666;
    padding: 0 1em;
    position: relative;
}
.in__footer {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 9px;
    top: 1.4em;
}
</style>
