<template>
    <div class="card">
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<style>
.card {
    background-color: #fff;
    position: relative;
    /* color: #666; */
    box-shadow: 0 5px 15px rgb(0 0 0 / 8%);
    box-sizing: border-box;
}
.card-body {
    display: flow-root;
    padding: 30px;
}

.card-body h3 {
    margin-top: 0;
    font-size: 1.5rem;
}

.card-body > :last-child,
.card-body > ul > li > :last-child {
    margin-bottom: 0;
}

@media only screen and (max-width: 992px) {
    .card {
        margin-bottom: 2rem;
    }
}
</style>
