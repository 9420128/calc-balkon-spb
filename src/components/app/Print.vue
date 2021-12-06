<template>
    <btn @click="print" class="btn-prim">
        Распечатать <icon icon="print" />
    </btn>
</template>

<script>
import Btn from '../html/Btn.vue'
import Icon from '../html/Icon.vue'

export default {
    components: { Icon, Btn },
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

            const el = document.querySelector('#print')

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
    },
}
</script>
