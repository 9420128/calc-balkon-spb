<template>
    <transition name="modal-fade">
        <div class="modal">
            <div class="modal__body">
                <header class="modal-header">
                    <h2><slot name="header"></slot></h2>
                    <button type="button" class="btn-close" @click="close">
                        <Icon icon="close" />
                    </button>
                </header>
                <section class="modal-body m-top">
                    <slot name="body"> </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button
                            type="button"
                            class="btn btn-prim"
                            @click="close"
                        >
                            Закрыть
                        </button>
                    </slot>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script>
import Icon from '../html/Icon.vue'
export default {
    components: { Icon },
    name: 'modal',
    methods: {
        close() {
            this.$emit('close')
        },
    },
}
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1010;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 15px;
    background: rgba(0, 0, 0, 0.6);
}

.modal__body {
    position: relative;
    box-sizing: border-box;
    margin: 0 auto;
    width: 1100px;
    max-width: calc(100% - 0.01px) !important;
    background: #fff;
}

@media (min-width: 640px) {
    .modal {
        padding: 50px 30px;
    }
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    /* color: #4aae9b; */
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    padding: 0 15px;
    /* overflow: auto;
    min-height: 150px;
    max-height: 580px;
    -webkit-overflow-scrolling: touch; */
}

.btn-close {
    border: none;
    font-size: 1.8em;
    cursor: pointer;
}

.modal-fade-enter,
.modal-fade-leave-active {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
