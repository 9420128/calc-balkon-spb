<template>
    <table class="table table-divider table-hover">
        <slot></slot>
    </table>
</template>

<script>
export default {
    name: 'table-my',
}
</script>

<style lang="sass">
.table
    border-collapse: collapse
    border-spacing: 0
    width: 100%
    margin-bottom: 20px

    th
        padding: 16px 12px
        text-align: left
        vertical-align: bottom
        font-size: 14px
        font-weight: normal
        color: #999
        text-transform: uppercase

    &__product
        display: block
        font-size: .8em

    tbody tr
        transition: background-color .1s linear

    td
        padding: 16px 12px
        vertical-align: top

.table-hover>tr:hover, .table-hover tbody tr:hover
    background: #ffd

.table-divider>tr:not(:first-child),
.table-divider>:not(:first-child)>tr,
.table-divider>:first-child>tr:not(:first-child)
    border-top: 1px solid #e5e5e5

.table.table-divider tr:last-child
    border-bottom: 1px solid #333

// .observer
//     height: 30px
//     background-color: inherit
</style>
