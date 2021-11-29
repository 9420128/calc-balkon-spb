<template>
    <div class="wrap" :class="wrapClass">
        <label v-if="label" :for="id" :class="labelClass">{{ label }}</label>
        <textarea
            class="textarea"
            :class="textareaClass"
            :id="id"
            :cols="cols"
            :rows="rows"
            :value="modelValue"
            @input="textareaInput"
            :required="required"
        ></textarea>
    </div>
</template>

<script>
export default {
    name: 'textarea-my',

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
        modelValue: [String, Number, Object, Boolean],
        label: String,
        cols: String,
        rows: String,
        wrapClass: { type: String, default: '' },
        labelClass: String,
        textareaClass: String,
        required: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        textareaInput(event) {
            this.$emit('update:modelValue', event.target.value.trim())
        },
    },
}
</script>

<style lang="sass" scoped></style>
