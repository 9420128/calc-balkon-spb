/* eslint-disable */

export const statusStore = {
    state: () => ({
        status: [
            { name: 'Предложение', id: '1' },
            { name: 'Подтверждение оплаты', id: '2' },
            { name: 'Дата готовности', id: '3' },
            { name: 'Закз готов', id: '4' },
            { name: 'Отгружен', id: '5' },
        ],

        // mail_user: {
        //     1: {
        //         0: 'Здравствуйте,',
        //         1: '%NAME%,',
        //         2: `отправляю спецификацию заказа, пожалуйста проверьте размеры, количество и перечень услуг.
        // Если все верно, Вы можете оплатить заказ у нас в офисе: ул. Бухарестская 94 к1 (вход с бухарестской, синяя вывеска окна, двери жалюзи, карнизы “ЕвроДом”) в будние дни с 10:00 до 20:00.`,
        //         3: `Если Вы находитесь далеко от нашего офиса, мы можем принять оплату на карту СберБанка. Документы подтверждающие оплату и подробности заказа пришлем на электронную почту.
        // Карта Сбербанка: 4276 1609 8127 0987  Евгений Евгеньевич К

        // К оплате:`,
        //         4: '%SUMM%',
        //         5: '%SUMM_BTN%',
        //         6: 'Срок изготовления стеклопакетов 4-5 рабочих дней после оплаты.',

        //         a: `
        //         Обратите внимание, что оконные изделия изготовленные на заказ являются товаром с индивидуальными- определёнными свойствами- не подлежат возврату или обмену (исключение: товар ненадлежащего качества). Поэтому, чтобы не было недоразумений с особым вниманием отнеситесь к замеру стеклопакетов.`,
        //     },

        //     2: {
        //         0: 'Здравствуйте,',
        //         1: '%NAME%,',
        //         2: 'от Вас поступила оплата в сумме:',
        //         3: '%SUMM%',
        //         4: `Мы незамедлительно запустим Ваш заказ в производство.
        // О сроке отгрузки и номере заказа сообщим в следующем письме.`,
        //         a: `Спасибо за Ваш заказ!`,
        //     },

        //     3: {
        //         0: 'Здравствуйте,',
        //         1: '%NAME%,',
        //         2: `Ваш заказ на сумму:`,
        //         3: '%SUMM%',
        //         4: `запущен в производство.

        //     Дата готовности:`,
        //         5: '%ZAVOD_DATA%',
        //         6: `(вторая половина дня);

        //     Производственный номер заказа:`,
        //         7: '%ZAVOD_NUMER%',
        //         8: `(назовите этот номер сотруднику склада).`,
        //         9: '%ZAVOD_ADRES%',
        //         a: `Стекло-пакеты отгружаются без упаковки, изделия имеют острый край, пожалуйста примите меры безопасности при погрузке и транспортировке.
        //     Пожалуйста, убедитесь заранее в том, что габариты стеклопакета уместятся в Вашем авто.`,
        //     },

        //     4: {
        //         0: 'Здравствуйте,',
        //         1: '%NAME%,',
        //         2: 'Ваш заказ готов к отгрузке.',
        //         3: `Производственный номер заказа:`,
        //         4: '%ZAVOD_NUMER%',
        //         5: `(назовите этот номер сотруднику склада).`,
        //         6: '%ZAVOD_ADRES%',
        //         a: `Стекло-пакеты отгружаются без упаковки, изделия имеют острый край, пожалуйста примите меры безопасности при погрузке и транспортировке.
        //     Пожалуйста, убедитесь заранее в том, что габариты стеклопакета уместятся в Вашем авто.`,
        //     },

        //     5: { 0: 'Здравствуйте,', 1: '%NAME%,', a: 'Заказ отгружен' },
        // },
        // input: {},
    }),

    // getters: {
    //     MAIL_USER(state) {
    //         return state.mail_user
    //     },
    // },
    // mutations: {
    //     MAIL_USER_CHANGE(state, val) {
    //         state.mail_user = val
    //     },
    //     MAIL_2_CHANGE(state, val) {
    //         state.mail_2 = val
    //     },
    //     MAIL_3_CHANGE(state, val) {
    //         state.mail_3 = val
    //     },
    //     MAIL_4_CHANGE(state, val) {
    //         state.mail_4 = val
    //     },
    //     MAIL_5_CHANGE(state, val) {
    //         state.mail_5 = val
    //     },
    // },
    actions: {
        // MAIL_USER_BUILD({ commit }, value) {
        //     commit('MAIL_USER_CHANGE', value[0])
        // },
        // statusStore_user_mail({ dispatch }, mail) {
        //     var value = ''
        //     for (var key in mail) {
        //         value += mail[key]
        //     }
        //     return value
        // },
        // statusStore_user_mail_2({ commit, dispatch }, mail) {
        //     return (
        //         mail.arr[0] +
        //         mail.name +
        //         mail.arr[2_1] +
        //         mail.summ +
        //         mail.arr[2_2] +
        //         mail.arr[1]
        //     )
        // },
        // statusStore_user_mail_3({ commit, dispatch }, mail) {
        //     return (
        //         mail.arr[0] +
        //         mail.name +
        //         mail.arr[3_1] +
        //         mail.summ +
        //         mail.arr[3_2] +
        //         mail.zavod_date +
        //         mail.arr[3_3] +
        //         mail.zavod_numer +
        //         mail.arr[3_4] +
        //         mail.arr[2]
        //     )
        // },
    },
}
