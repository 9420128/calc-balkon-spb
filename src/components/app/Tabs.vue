<template>
    <ul class="tab tab-border">
        <li
            v-for="tab in tabs"
            :key="tab.id"
            :class="{ active: hash === tab.id }"
        >
            <a @click="select_tab(tab.id)" :href="'#' + tab.id" class="">{{
                tab.name
            }}</a>
        </li>
        <li v-if="tab_admin" :class="{ active: hash === tab_admin.id }">
            <a
                @click="select_admin_tab(tab_admin.id)"
                :href="'#' + tab_admin.id"
                class=""
                >{{ tab_admin.name }}</a
            >
        </li>
    </ul>
</template>

<script>
/* eslint-disable */
// import Icon from '../html/Icon.vue'
export default {
    // components: { Icon },
    name: 'tabs',
    data: () => ({
        hash: '',
    }),
    props: {
        tabs: [Array, Object],
        tab_admin: Object,
    },
    async mounted() {
        // this.tabs()
        const hash = await this.tabs
        if (hash) {
            this.hash = hash[0]?.id
            this.$router.push('#' + this.hash)
        }
    },
    watch: {
        tabs() {
            this.hash = this.tabs[0]?.id
            this.$router.push('#' + this.hash)
        },
    },
    methods: {
        select_tab(id) {
            this.hash = id
        },
        select_admin_tab(id) {
            this.hash = id
            console.log(id)
        },
    },
}
</script>

<style>
/* .tab {
    display: flex;
    margin-left: -20px;
    padding: 0;
    list-style: none;
    height: 48px;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
}

.tab.tab-border::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 0;
    border-bottom: 1px solid #e5e5e5;
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%),
        0 1px 5px 0 rgb(0 0 0 / 20%);
}
.tab > * {
    flex: none;
    padding-left: 20px;
    position: relative;
}
.tab.tab-border > .active > a {
    color: #222;
}
.tab > * > a {
    display: flex;
    align-items: center;
    column-gap: 0.25em;
    justify-content: center;
    padding: 12px 24px;
    color: #999;
    text-transform: uppercase;
    transition: color 0.1s ease-in-out;
    line-height: 24px;
    position: relative;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.tab > * > a:hover {
    background-color: transparent;
}

.tab.header_tab > * > a {
    color: white;
}

.tab.tab-border > .active > a::before,
.tab.header_tab > * > a.router-link-active::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background-color: white;
}
.tab.tab-border > .active > a::before {
    background-color: #ee6e73;
} */
</style>
