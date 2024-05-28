const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const props = defineProps({
    text: String,
    show: Boolean
});
const emit = defineEmits(['update']);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: {
        text: String,
        show: Boolean
    },
    emits: {},
});
let __VLS_functionalComponentProps;
let __VLS_modelEmitsType;
function __VLS_template() {
    let __VLS_ctx;
    /* Components */
    let __VLS_otherComponents;
    let __VLS_own;
    let __VLS_localComponents;
    let __VLS_components;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("text-center"), });
    const __VLS_0 = {}.VSnackbar;
    ({}.VSnackbar);
    ({}.VSnackbar);
    __VLS_components.VSnackbar;
    __VLS_components.vSnackbar;
    __VLS_components.VSnackbar;
    __VLS_components.vSnackbar;
    // @ts-ignore
    [VSnackbar, VSnackbar,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ modelValue: ((props.show)), timeout: ((2000)), color: ("orange-accent-4"), variant: ("outlined"), }));
    const __VLS_2 = __VLS_1({ modelValue: ((props.show)), timeout: ((2000)), color: ("orange-accent-4"), variant: ("outlined"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ modelValue: ((props.show)), timeout: ((2000)), color: ("orange-accent-4"), variant: ("outlined"), }));
    (props.text);
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        (__VLS_5.slots).actions;
        const __VLS_6 = {}.VBtn;
        ({}.VBtn);
        ({}.VBtn);
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        // @ts-ignore
        [VBtn, VBtn,];
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onClick': {}, }, color: ("orange-accent-4"), variant: ("tonal"), }));
        const __VLS_8 = __VLS_7({ ...{ 'onClick': {}, }, color: ("orange-accent-4"), variant: ("tonal"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        ({}({ ...{ 'onClick': {}, }, color: ("orange-accent-4"), variant: ("tonal"), }));
        let __VLS_12 = {
            /**__VLS_emit,__VLS_9,click*/
            'click': __VLS_pickEvent(__VLS_10['click'], {}.onClick)
        };
        __VLS_12 = { click: $event => {
                __VLS_ctx.emit('update', false);
                ;
                // @ts-ignore
                [emit,];
            }
        };
        (__VLS_11.slots).default;
        const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
        let __VLS_9;
        let __VLS_10;
    }
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['text-center'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                emit: emit,
            };
        },
        props: {
            text: String,
            show: Boolean
        },
        emits: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        text: String,
        show: Boolean
    },
    emits: {},
});
;
//# sourceMappingURL=AlertSnackBar.vue.js.map