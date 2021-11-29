<template>
    <div class="switch wrap" :class="{ 'switch-reset': switch_reset }">
        <label>
            {{ off }}
            <input
                type="checkbox"
                @input="updateInput"
                :value="modelValue"
                :checked="modelValue"
                @change="switch_shenge"
            />
            <span class="lever"></span>
            {{ on }}
        </label>
    </div>
</template>

<script>
export default {
    name: 'switches',

    props: {
        off: String,
        on: String,
        modelValue: [Boolean],
        switch_reset: [Boolean],
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.checked)
        },
        switch_shenge() {
            this.$emit('switch_shenge')
        },
    },
}
</script>

<style>
.switch,
.switch * {
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.switch.switch-reset {
    margin-bottom: 0;
    font-size: 1rem;
}
.switch label {
    cursor: pointer;
}
.switch label input[type='checkbox'] {
    opacity: 0;
    width: 0;
    height: 0;
}

[type='checkbox']:not(:checked),
[type='checkbox']:checked {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.switch label .lever {
    content: '';
    display: inline-block;
    position: relative;
    width: 36px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.38);
    border-radius: 15px;
    margin-right: 10px;
    -webkit-transition: background 0.3s ease;
    transition: background 0.3s ease;
    vertical-align: middle;
    margin: 0 16px;
}

.switch label .lever:before {
    background-color: rgba(38, 166, 154, 0.15);
}

.switch label .lever:before,
.switch label .lever:after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    -webkit-transition: left 0.3s ease, background 0.3s ease,
        -webkit-box-shadow 0.1s ease, -webkit-transform 0.1s ease;
    transition: left 0.3s ease, background 0.3s ease,
        -webkit-box-shadow 0.1s ease, -webkit-transform 0.1s ease;
    transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease,
        transform 0.1s ease;
    transition: left 0.3s ease, background 0.3s ease, box-shadow 0.1s ease,
        transform 0.1s ease, -webkit-box-shadow 0.1s ease,
        -webkit-transform 0.1s ease;
}

.switch label .lever:after {
    background-color: #f1f1f1;
    -webkit-box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}

.switch label input[type='checkbox']:checked + .lever {
    background-color: #84c7c1;
}

.switch label input[type='checkbox']:checked + .lever:before,
.switch label input[type='checkbox']:checked + .lever:after {
    left: 18px;
}

.switch label input[type='checkbox']:checked + .lever:after {
    background-color: #26a69a;
}
</style>
