<template>
    <div class="card">
        <header class="calc-header">
            <slot name="header"></slot>
        </header>
        <div class="card-body">
            <slot></slot>
        </div>
        <footer class="card-footer">
            <slot name="footer"></slot>
        </footer>
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
    padding: 0 30px;
}

.card-body h3 {
    margin-top: 0;
    font-size: 1.5rem;
}

.card-body > :last-child,
.card-body > ul > li > :last-child {
    margin-bottom: 0;
}

.card-footer {
    border-top: 1px solid #e5e5e5;
    height: 74px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}

@media only screen and (max-width: 992px) {
    .card {
        margin-bottom: 2rem;
    }

    .card-body,
    .card-footer {
        padding: 0 20px;
    }
}
</style>
