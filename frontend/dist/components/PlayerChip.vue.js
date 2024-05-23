const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
const __VLS_props = defineProps(['title', 'index', 'startdrag']);
const __VLS_emit = defineEmits(['remove']);
const __VLS_fnComponent = (await import('vue')).defineComponent({
    props: ['title', 'index', 'startdrag'],
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
    const __VLS_0 = {}.VChip;
    ({}.VChip);
    ({}.VChip);
    __VLS_components.VChip;
    __VLS_components.vChip;
    __VLS_components.VChip;
    __VLS_components.vChip;
    // @ts-ignore
    [VChip, VChip,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onDragstart': {}, 'onClick:close': {}, }, closable: (true), label: (true), draggable: ((true)), class: ("px-5 mr-2 mt-2 playerchip"), variant: ("outlined"), size: ("large"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onDragstart': {}, 'onClick:close': {}, }, closable: (true), label: (true), draggable: ((true)), class: ("px-5 mr-2 mt-2 playerchip"), variant: ("outlined"), size: ("large"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onDragstart': {}, 'onClick:close': {}, }, closable: (true), label: (true), draggable: ((true)), class: ("px-5 mr-2 mt-2 playerchip"), variant: ("outlined"), size: ("large"), }));
    let __VLS_6 = {
        /**__VLS_emit,__VLS_3,dragstart*/
        'dragstart': __VLS_pickEvent(__VLS_4['dragstart'], {}.onDragstart)
    };
    __VLS_6 = { dragstart: $event => {
            __VLS_ctx.startdrag($event, __VLS_ctx.index);
            // @ts-ignore
            [startdrag, index,];
        }
    };
    let __VLS_7 = {
        /**__VLS_emit,__VLS_3,click:close*/
        'click:close': __VLS_pickEvent(__VLS_4['click:close'], {}['onClick:close'])
    };
    __VLS_7 = { "click:close": $event => {
            __VLS_ctx.$emit('remove');
            // @ts-ignore
            [$emit,];
        }
    };
    const __VLS_8 = {}.VIcon;
    ({}.VIcon);
    ({}.VIcon);
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    // @ts-ignore
    [VIcon, VIcon,];
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ icon: ("mdi-account-circle"), }));
    const __VLS_10 = __VLS_9({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    ({}({ icon: ("mdi-account-circle"), }));
    const __VLS_13 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10);
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({ class: ("pr-12 pl-2"), });
    (__VLS_ctx.title);
    // @ts-ignore
    [title,];
    (__VLS_5.slots).default;
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['px-5'];
        __VLS_styleScopedClasses['mr-2'];
        __VLS_styleScopedClasses['mt-2'];
        __VLS_styleScopedClasses['playerchip'];
        __VLS_styleScopedClasses['pr-12'];
        __VLS_styleScopedClasses['pl-2'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {};
        },
        props: ['title', 'index', 'startdrag'],
        emits: {},
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: ['title', 'index', 'startdrag'],
    emits: {},
});
;
//# sourceMappingURL=PlayerChip.vue.js.map