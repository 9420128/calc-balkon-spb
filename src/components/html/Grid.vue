<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>

<style>
.grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: -30px;
}

.grid > * {
    padding-left: 30px;
    box-sizing: border-box;
    width: 100%;
}

@media (min-width: 640px) {
    .grid > * {
        flex: 1;
        min-width: 1px;
    }
}

/* @media (min-width: 960px) {
    .grid {
        padding-left: 40px;
        padding-right: 40px;
    } */
</style>
