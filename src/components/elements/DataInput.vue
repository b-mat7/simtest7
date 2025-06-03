<template>
    <div class="data-input-container" :class="{ 'error': error }">
        <input
            ref="inputField"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
            :disabled="disabled"
            :required="required"
            v-bind="$attrs"
            :class="{ 'error': error }"
            @input="handleInput"
            @click="handleInputClicked"
        />

        <label
            v-if="label"
            class="input-label"
            @click="handleLabelClick"
        >{{ label }} {{ required ? '*' : '' }}</label>

        <label
            v-if="modelValue && !disabled"
            class="clear-label"
            @click="handleClearInput"
        >X</label>

        <div class="btn-container">
            <div class="input-btn btn-interact" @click="increaseByStep">+</div>
            <div class="input-btn btn-interact" @click="decreaseByStep">-</div>
        </div>
    </div>
</template>

<script>
const EMITS = {
    UPDATE_MODEL_VALUE : 'update:modelValue',
    CLICK: 'click'
}
</script>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(Object.values(EMITS))

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: null
    },
    type: {
        type: String,
        default: 'number'
    },
    placeholder: {
        type: String,
        default: ' ' // used to trigger the floating label so it cant be empty
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: [String, Number], // vue issue? :max="5" interpreted as str statt num?!
        default: Infinity
    },
    step: {
        type: Number,
        default: 1
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: null
    },
    error: {
        type: Boolean,
        default: false
    }
})

const inputField = ref(null)

const increasedVal = computed(() => props.modelValue + props.step)
const decreasedVal = computed(() => props.modelValue - props.step)

const handleInput = (event) => emit(EMITS.UPDATE_MODEL_VALUE, event.target.value)
const handleInputClicked = (event) => emit(EMITS.CLICK, event)
const handleLabelClick = () => inputField.value.focus()
const handleClearInput = () => emit(EMITS.UPDATE_MODEL_VALUE, null)

const increaseByStep = () => emit(EMITS.UPDATE_MODEL_VALUE, increasedVal.value)
const decreaseByStep = () => emit(EMITS.UPDATE_MODEL_VALUE, decreasedVal.value)

const focus = () => inputField.value.focus()

defineExpose({
    focus
})
</script>

<style lang="scss" scoped>
.data-input-container {
    position: relative;
    padding-top: 12px;

    &.error :deep(*) {
        color: red;
    }

    input {
        max-width: 72px;

        &:disabled,
        &:disabled + .input-label {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &.error {
            border-color: red;
        }
    }

    // hide up/down arrow (aka spinners) for input type=number fields
    input[type="number"] {
        -moz-appearance: textfield; /* Firefox */
    }
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none; /* Chrome, Safari, Edge */
        margin: 0; /* Remove margin */
    }

    .input-label {
        position: absolute;
        left: 4px;
        font-weight: 400;
        transform-origin: left top;
        transition: 200ms all;
        cursor: text;
    }

    /* Adjust label position when input is not empty or focused */
    /* https://zellwk.com/blog/check-empty-input-css/ */
    input:not(:placeholder-shown) + .input-label,
    input:focus:not(:read-only) + .input-label {
        font-size: 0.5rem;
        font-weight: 700;
        top: 0px;
        left: 0px;
        cursor: default;
    }

    .clear-label {
        position: absolute;
        right: 4px;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }

    .btn-container {
        display: flex;
        column-gap: 4px;
        margin-top: 2px;

        .input-btn {
            display: flex;
            place-content: center;
            flex: 1;
            border-radius: 4px;
            border: 1px solid rgb(107, 107, 107);
            background-color: rgb(107, 107, 107);
        }
    }
}

@media (max-width: 576px) {
    .data-input-container {
        padding-top: 10px;

        input {
            max-width: 56px;
            font-size: 0.5rem;
        }

        input:not(:placeholder-shown) + .input-label,
        input:focus:not(:read-only) + .input-label {
            font-size: 0.4rem;
        }

        .clear-label {
            top: 11px
        }
    }
}
</style>