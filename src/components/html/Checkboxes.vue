<template>
    <label :for="id" class="flex">
        <input type="checkbox" :id="id" :checked="checked">
        {{ name }}
    </label>
</template>

<script>
export default {
    name: 'Checkboxes',

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
        label: String,
        checked: {
            type: Boolean,
            default: false,
        },
        name: String,
    },
}
</script>
<style>
[type="checkbox"] {
    display: inline-block;
    height: 18px;
    width: 18px;
    overflow: hidden;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border: 2px solid #5a5a5a;
    transition: .2s ease-in-out;
    transition-property: background-color, border;
    box-sizing: border-box;
    margin-left: 0;
    margin-right: .5em;
    border-radius: 2px;
    font: inherit;
}

[type="checkbox"]:not(:disabled) {
    cursor: pointer;
}

[type="checkbox"]:checked {
    background-image: url(data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2214%22%20height%3D%2211%22%20viewBox%3D%220%200%2014%2011%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23fff%22%20points%3D%2212%201%205%207.5%202%205%201%205.5%205%2010%2013%201.5%22%20%2F%3E%0A%3C%2Fsvg%3E%0A);
    border: 2px solid #26a69a;
    background-color: #26a69a;
}
</style>
