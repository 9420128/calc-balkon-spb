<template>
    <div class="wrap" :class="wrapClass">
        <label v-if="label" :for="id" :class="labelClass">{{ label }}</label>

        <select
            @change="changeOption"
            :id="id"
            :class="selectClass"
            :name="name"
            ref="sel"
        >
            <option v-if="selected_disabled" disabled selected value=""
                >Выберите из списка</option
            >
            <option
                v-if="!no_id"
                v-for="option in options"
                :key="option.id"
                :value="option.id"
                :selected="option.id == selected || option.name == selected">
                {{ option.name }}
            </option>
            <option
                v-else
                v-for="(option, index) in options"
                :key="index"
                :value="index"
                :selected="option == selected">
                {{option}}
            </option>
        </select>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'sel',

    props: {
        options: {
            type: [Array, Object],
            default: () => [],
        },
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
        modelValue: { type: String },
        selected: { type: [String, Number, Boolean] },
        selected_disabled: { type: Boolean, default: () => false },
        label: [String, Number],
        wrapClass: String,
        labelClass: String,
        selectClass: String,
        name: String,
        no_id:  { type: Boolean, default: () => false },
    },

    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target)
        },
    },
    watch: {
        options() {
            if (this.selected_disabled) {
                this.$refs.sel.options.selectedIndex = 0
            }
        },
    },
}
</script>
