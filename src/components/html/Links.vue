<template>
    <a :href="href">
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'link',
    props: {
        href: {
            type: String,
            default() {
                return '#'
            },
        },
    },
}
</script>

<style></style>
