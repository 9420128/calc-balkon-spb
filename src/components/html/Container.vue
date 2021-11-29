<template>
    <div class="container">
        <slot></slot>
    </div>
</template>

<style>
.container {
    display: flow-root;
    box-sizing: content-box;
    max-width: 1380px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
}

@media (min-width: 640px) {
    .container {
        padding-left: 30px;
        padding-right: 30px;
    }
}

@media (min-width: 960px) {
    .container {
        padding-left: 40px;
        padding-right: 40px;
    }
}
</style>
