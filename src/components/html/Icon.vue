<template>
    <i class="material-icons">{{ icon }}</i>
</template>

<script>
export default {
    name: 'icon',

    props: {
        icon: String,
    },
}
</script>

<style lang="sass" scoped>
.material-icons
    font-size: inherit
    height: inherit
    line-height: inherit

p > i.material-icons
    margin-bottom: -2px
    margin-right: .5em
    font-size: 1.2em

i.large
    font-size: 26px
</style>
