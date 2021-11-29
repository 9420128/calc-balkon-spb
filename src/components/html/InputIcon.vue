<template>
    <div v-if="icon" class="wrap" :class="wrapClass">
        <label v-if="label" :for="id" :class="labelClass">{{ label }}</label>
        <div class="inline">
            <span class="input-icon"
                ><i class="material-icons">{{ icon }}</i></span
            >
            <input
                class="input"
                :class="inputClass"
                @input="updateInput"
                :value="modelValue"
                :type="type"
                :id="id"
                :required="required"
                :name="name"
            />
        </div>
        <slot></slot>
    </div>
    <div v-else class="wrap" :class="wrapClass">
        <label v-if="label" :for="id" :class="labelClass">{{ label }}</label>
        <input
            class="input"
            :class="inputClass"
            @input="updateInput"
            :value="modelValue"
            :type="type"
            :id="id"
            :required="required"
            :name="name"
        />

        <slot></slot>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'input-icon',

    props: {
        id: {
            type: String,
            default() {
                return (
                    'id' +
                    Math.random()
                        .toString(16)
                        .slice(2)
                )
            },
        },
        modelValue: [String, Number, Object],
        type: {
            type: String,
            default: 'text',
        },
        label: String,
        wrapClass: { type: String, default: '' },
        labelClass: String,
        inputClass: String,
        icon: String,
        required: {
            type: Boolean,
            default: false,
        },
        name: String,
    },

    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value.trim())
        },
    },
}
</script>
<style>
.inline {
    position: relative;
    max-width: 100%;
    vertical-align: middle;
    -webkit-backface-visibility: hidden;
}
.input-icon {
    right: 0;
    left: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #697582;
}

.input-icon:not(a):not(button):not(input) {
    pointer-events: none;
}

.inline input {
    width: 100%;
}
</style>
