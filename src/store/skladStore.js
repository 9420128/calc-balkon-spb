/* eslint-disable */

export const skladStore = {
    state: () => ({
        sklad: [
            {
                name: 'Склад 4 (Обводный канал)',
                adres: 'Глинянная 19',
                info: 'Время работы склада с 10 до 17',
                id: '1',
            },
            {
                name: 'Склад 2 (Янино)',
                adres: 'Янино 1',
                info: 'Подтверждение оплаты',
                id: '2',
            },
            {
                name: 'Склад 3 (г. Пушкин)',
                adres: 'Красносельское ш',
                info: 'Дата готовности',
                id: '3',
            },
            {
                name: 'Склад 5 (Софийская)',
                adres: 'ул. Девятого января',
                info: 'Закз готов',
                id: '4',
            },
            // {
            //     name: 'Самовывоз',
            //     adres: '',
            //     info: 'Отгружен',
            //     id: '5',
            //     disabled: true,
            // },
        ],
    }),

    actions: {
        // statusStore_user_mail({ dispatch }, mail) {
        //     var value = ''
        //     for (var key in mail) {
        //         value += mail[key]
        //     }
        //     return value
        // },
    },
}
