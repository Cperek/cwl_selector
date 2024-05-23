import { reactive, ref } from 'vue';
import PlayerChip from '../components/PlayerChip.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let Players = ref([]);
let nick = ref('');
let nextID = 0;
let teams = reactive({
    team0: [],
    team1: []
});
const AddChip = () => {
    Players.value.push({
        id: nextID++,
        title: nick.value,
        locked: false,
    });
    nick.value = '';
};
const lockPlayer = (playerId) => {
    console.log("Player locked: " + playerId);
    if (playerId >= 0) {
        let data = Players.value.find((e) => e && e.id === playerId);
        console.log("Player locked data: ", data);
        if (data) {
            data.locked = !data.locked;
        }
    }
};
const chipRemove = (index, title) => {
    Players.value.splice(index, 1);
    let existsTeam0 = teams.team0.findIndex((e) => e && e.title === title);
    let existsTeam1 = teams.team1.findIndex((e) => e && e.title === title);
    if (existsTeam0 >= 0) {
        delete teams.team0[existsTeam0];
    }
    if (existsTeam1 >= 0) {
        delete teams.team1[existsTeam1];
    }
};
const ResetTeam = (teamSlot) => {
    if (teamSlot && teamSlot.locked)
        return true;
    return false;
};
const RandomizeTeams = () => {
    teams.team0 = teams.team0.filter(ResetTeam);
    teams.team1 = teams.team1.filter(ResetTeam);
    let SortedPlayers = Players.value
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    SortedPlayers.forEach((element) => {
        let existsTeam0 = teams.team0.find((e) => e && e.title === element.title);
        let existsTeam1 = teams.team1.find((e) => e && e.title === element.title);
        if (!existsTeam0 && !existsTeam1) {
            let randomTeam = Math.round(Math.random());
            if ((randomTeam && teams.team1.length < 5) || teams.team0.length >= 5) {
                teams.team1.push(element);
            }
            else {
                teams.team0.push(element);
            }
        }
    });
};
const startDrag = (event, index, slotindex = 0, team = -1) => {
    const item = Players.value.find((e) => e && e.id === index);
    if (item) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('PlayerIndex', index.toString());
        event.dataTransfer.setData('SlotIndex', slotindex.toString());
        event.dataTransfer.setData('SlotTeam', team.toString());
    }
    else {
        console.error("startDrag - Invalid item at index:", item);
        return;
    }
};
const onDrop = (event, team, index) => {
    let PlayerIndex = event.dataTransfer.getData('PlayerIndex');
    let SlotIndex = Number(event.dataTransfer.getData('SlotIndex'));
    let SlotTeam = Number(event.dataTransfer.getData('SlotTeam'));
    let playerIndexNum = Number(PlayerIndex);
    if (PlayerIndex === '' || isNaN(playerIndexNum) || playerIndexNum < 0) {
        console.error("onDrop - Invalid PlayerIndex:", PlayerIndex);
        return;
    }
    let data = Players.value.find((e) => e && e.id === playerIndexNum);
    if (!data) {
        console.error("onDrop - Invalid player data at index:", playerIndexNum);
        return;
    }
    let existsTeam0 = teams.team0.findIndex((e) => e && e.title === data.title);
    let existsTeam1 = teams.team1.findIndex((e) => e && e.title === data.title);
    if (existsTeam0 >= 0) {
        delete teams.team0[existsTeam0];
    }
    if (existsTeam1 >= 0) {
        delete teams.team1[existsTeam1];
    }
    let oldTeam = null;
    if (team) {
        oldTeam = teams.team1[index];
    }
    else {
        oldTeam = teams.team0[index];
    }
    if (SlotIndex >= 0 && SlotTeam === 1 && oldTeam) {
        teams.team1[SlotIndex] = oldTeam;
    }
    if (SlotIndex >= 0 && SlotTeam === 0 && oldTeam) {
        teams.team0[SlotIndex] = oldTeam;
    }
    if (team) {
        teams.team1[index] = data;
    }
    else {
        teams.team0[index] = data;
    }
};
const __VLS_fnComponent = (await import('vue')).defineComponent({});
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
    // CSS variable injection 
    // CSS variable injection end 
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), });
    const __VLS_0 = {}.VTextField;
    ({}.VTextField);
    ({}.VTextField);
    __VLS_components.VTextField;
    __VLS_components.vTextField;
    __VLS_components.VTextField;
    __VLS_components.vTextField;
    // @ts-ignore
    [VTextField, VTextField,];
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }));
    const __VLS_2 = __VLS_1({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    ({}({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }));
    let __VLS_6 = {
        /**__VLS_emit,__VLS_3,keyup*/
        'keyup': __VLS_pickEvent(__VLS_4['keyup'], {}.onKeyup)
    };
    __VLS_6 = { keyup: (__VLS_ctx.AddChip)
    };
    // @ts-ignore
    [nick, AddChip,];
    const __VLS_5 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2);
    let __VLS_3;
    let __VLS_4;
    const __VLS_7 = {}.VBtn;
    ({}.VBtn);
    ({}.VBtn);
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    // @ts-ignore
    [VBtn, VBtn,];
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }));
    const __VLS_9 = __VLS_8({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    ({}({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }));
    let __VLS_13 = {
        /**__VLS_emit,__VLS_10,click*/
        'click': __VLS_pickEvent(__VLS_11['click'], {}.onClick)
    };
    __VLS_13 = { click: (__VLS_ctx.AddChip)
    };
    const __VLS_14 = {}.VIcon;
    ({}.VIcon);
    ({}.VIcon);
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    // @ts-ignore
    [VIcon, VIcon,];
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({ icon: ("mdi mdi-plus"), }));
    const __VLS_16 = __VLS_15({ icon: ("mdi mdi-plus"), }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    ({}({ icon: ("mdi mdi-plus"), }));
    // @ts-ignore
    [AddChip,];
    const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_14, __VLS_16);
    (__VLS_12.slots).default;
    const __VLS_12 = __VLS_pickFunctionalComponentCtx(__VLS_7, __VLS_9);
    let __VLS_10;
    let __VLS_11;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    (__VLS_ctx.Players.length);
    // @ts-ignore
    [Players,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("PlayersChips"), style: ({}), });
    for (const [player, index] of __VLS_getVForSourceType((__VLS_ctx.Players))) {
        // @ts-ignore
        [PlayerChip,];
        const __VLS_20 = __VLS_asFunctionalComponent(PlayerChip, new PlayerChip({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }));
        const __VLS_21 = __VLS_20({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        ({}({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }));
        let __VLS_25 = {
            /**__VLS_emit,__VLS_22,remove*/
            'remove': __VLS_pickEvent(__VLS_23['remove'], {}.onRemove)
        };
        __VLS_25 = { remove: $event => {
                __VLS_ctx.chipRemove(index, player.title);
                // @ts-ignore
                [Players, startDrag, chipRemove,];
            }
        };
        const __VLS_24 = __VLS_pickFunctionalComponentCtx(PlayerChip, __VLS_21);
        let __VLS_22;
        let __VLS_23;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_26 = {}.VContainer;
    ({}.VContainer);
    ({}.VContainer);
    __VLS_components.VContainer;
    __VLS_components.vContainer;
    __VLS_components.VContainer;
    __VLS_components.vContainer;
    // @ts-ignore
    [VContainer, VContainer,];
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({ class: ("mt-4 ml-0 pl-0"), }));
    const __VLS_28 = __VLS_27({ class: ("mt-4 ml-0 pl-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    ({}({ class: ("mt-4 ml-0 pl-0"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_32 = {}.VBtn;
    ({}.VBtn);
    ({}.VBtn);
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    // @ts-ignore
    [VBtn, VBtn,];
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
    const __VLS_34 = __VLS_33({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    ({}({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
    let __VLS_38 = {
        /**__VLS_emit,__VLS_35,click*/
        'click': __VLS_pickEvent(__VLS_36['click'], {}.onClick)
    };
    __VLS_38 = { click: (__VLS_ctx.RandomizeTeams)
    };
    const __VLS_39 = {}.VIcon;
    ({}.VIcon);
    ({}.VIcon);
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    // @ts-ignore
    [VIcon, VIcon,];
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
    const __VLS_41 = __VLS_40({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    ({}({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
    // @ts-ignore
    [RandomizeTeams,];
    const __VLS_44 = __VLS_pickFunctionalComponentCtx(__VLS_39, __VLS_41);
    (__VLS_37.slots).default;
    const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    let __VLS_35;
    let __VLS_36;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("mt-16"), });
    const __VLS_45 = {}.VRow;
    ({}.VRow);
    ({}.VRow);
    __VLS_components.VRow;
    __VLS_components.vRow;
    __VLS_components.VRow;
    __VLS_components.vRow;
    // @ts-ignore
    [VRow, VRow,];
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({ class: ("mx-6"), noGutters: (true), }));
    const __VLS_47 = __VLS_46({ class: ("mx-6"), noGutters: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    ({}({ class: ("mx-6"), noGutters: (true), }));
    const __VLS_51 = {}.VCol;
    ({}.VCol);
    ({}.VCol);
    __VLS_components.VCol;
    __VLS_components.vCol;
    __VLS_components.VCol;
    __VLS_components.vCol;
    // @ts-ignore
    [VCol, VCol,];
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({ cols: ("4"), }));
    const __VLS_53 = __VLS_52({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    ({}({ cols: ("4"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t0"), });
    (__VLS_56.slots).default;
    const __VLS_56 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53);
    const __VLS_57 = {}.VSpacer;
    ({}.VSpacer);
    ({}.VSpacer);
    __VLS_components.VSpacer;
    __VLS_components.vSpacer;
    __VLS_components.VSpacer;
    __VLS_components.vSpacer;
    // @ts-ignore
    [VSpacer, VSpacer,];
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({}));
    const __VLS_59 = __VLS_58({}, ...__VLS_functionalComponentArgsRest(__VLS_58));
    ({}({}));
    const __VLS_62 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
    const __VLS_63 = {}.VCol;
    ({}.VCol);
    ({}.VCol);
    __VLS_components.VCol;
    __VLS_components.vCol;
    __VLS_components.VCol;
    __VLS_components.vCol;
    // @ts-ignore
    [VCol, VCol,];
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({ cols: ("4"), }));
    const __VLS_65 = __VLS_64({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    ({}({ cols: ("4"), }));
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t1"), });
    (__VLS_68.slots).default;
    const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_63, __VLS_65);
    (__VLS_50.slots).default;
    const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
    for (const [n] of __VLS_getVForSourceType((5))) {
        const __VLS_69 = {}.VRow;
        ({}.VRow);
        ({}.VRow);
        __VLS_components.VRow;
        __VLS_components.vRow;
        __VLS_components.VRow;
        __VLS_components.vRow;
        // @ts-ignore
        [VRow, VRow,];
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({ class: ("mx-6 player{{ n }}"), noGutters: (true), key: ((n)), }));
        const __VLS_71 = __VLS_70({ class: ("mx-6 player{{ n }}"), noGutters: (true), key: ((n)), }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        ({}({ class: ("mx-6 player{{ n }}"), noGutters: (true), key: ((n)), }));
        const __VLS_75 = {}.VCol;
        ({}.VCol);
        ({}.VCol);
        __VLS_components.VCol;
        __VLS_components.vCol;
        __VLS_components.VCol;
        __VLS_components.vCol;
        // @ts-ignore
        [VCol, VCol,];
        const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ cols: ("4"), }));
        const __VLS_77 = __VLS_76({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_76));
        ({}({ cols: ("4"), }));
        const __VLS_81 = {}.VSheet;
        ({}.VSheet);
        ({}.VSheet);
        __VLS_components.VSheet;
        __VLS_components.vSheet;
        __VLS_components.VSheet;
        __VLS_components.vSheet;
        // @ts-ignore
        [VSheet, VSheet,];
        const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
        const __VLS_83 = __VLS_82({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }, ...__VLS_functionalComponentArgsRest(__VLS_82));
        ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
        let __VLS_87 = {
            /**__VLS_emit,__VLS_84,dragstart*/
            'dragstart': __VLS_pickEvent(__VLS_85['dragstart'], {}.onDragstart)
        };
        __VLS_87 = { dragstart: $event => {
                __VLS_ctx.startDrag($event, __VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1, n - 1, 0);
                // @ts-ignore
                [startDrag, teams, teams,];
            }
        };
        let __VLS_88 = {
            /**__VLS_emit,__VLS_84,drop*/
            'drop': __VLS_pickEvent(__VLS_85['drop'], {}.onDrop)
        };
        __VLS_88 = { drop: $event => {
                __VLS_ctx.onDrop($event, 0, n - 1);
                // @ts-ignore
                [onDrop,];
            }
        };
        let __VLS_89 = {
            /**__VLS_emit,__VLS_84,dragenter*/
            'dragenter': __VLS_pickEvent(__VLS_85['dragenter'], {}.onDragenter)
        };
        __VLS_89 = { dragenter: () => { }
        };
        let __VLS_90 = {
            /**__VLS_emit,__VLS_84,dragover*/
            'dragover': __VLS_pickEvent(__VLS_85['dragover'], {}.onDragover)
        };
        __VLS_90 = { dragover: () => { }
        };
        if (__VLS_ctx.teams.team0[n - 1]) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
            const __VLS_91 = {}.VAvatar;
            ({}.VAvatar);
            ({}.VAvatar);
            __VLS_components.VAvatar;
            __VLS_components.vAvatar;
            __VLS_components.VAvatar;
            __VLS_components.vAvatar;
            // @ts-ignore
            [VAvatar, VAvatar,];
            const __VLS_92 = __VLS_asFunctionalComponent(__VLS_91, new __VLS_91({ size: ("20"), start: (true), color: ("surface-variant"), }));
            const __VLS_93 = __VLS_92({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_92));
            ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
            const __VLS_97 = {}.VIcon;
            ({}.VIcon);
            ({}.VIcon);
            __VLS_components.VIcon;
            __VLS_components.vIcon;
            __VLS_components.VIcon;
            __VLS_components.vIcon;
            // @ts-ignore
            [VIcon, VIcon,];
            const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({ icon: ("mdi-account-circle"), }));
            const __VLS_99 = __VLS_98({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_98));
            ({}({ icon: ("mdi-account-circle"), }));
            // @ts-ignore
            [teams,];
            const __VLS_102 = __VLS_pickFunctionalComponentCtx(__VLS_97, __VLS_99);
            (__VLS_96.slots).default;
            const __VLS_96 = __VLS_pickFunctionalComponentCtx(__VLS_91, __VLS_93);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
            (__VLS_ctx.teams.team0[n - 1].title);
            // @ts-ignore
            [teams,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
            if (__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)) {
                const __VLS_103 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                const __VLS_105 = __VLS_104({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_104));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                let __VLS_109 = {
                    /**__VLS_emit,__VLS_106,click*/
                    'click': __VLS_pickEvent(__VLS_107['click'], {}.onClick)
                };
                __VLS_109 = { click: $event => {
                        if (!((__VLS_ctx.teams.team0[n - 1])))
                            return;
                        if (!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true))))
                            return;
                        __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                        // @ts-ignore
                        [Players, teams, teams, teams, teams, lockPlayer,];
                    }
                };
                const __VLS_108 = __VLS_pickFunctionalComponentCtx(__VLS_103, __VLS_105);
                let __VLS_106;
                let __VLS_107;
            }
            else {
                const __VLS_110 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                const __VLS_112 = __VLS_111({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_111));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                let __VLS_116 = {
                    /**__VLS_emit,__VLS_113,click*/
                    'click': __VLS_pickEvent(__VLS_114['click'], {}.onClick)
                };
                __VLS_116 = { click: $event => {
                        if (!((__VLS_ctx.teams.team0[n - 1])))
                            return;
                        if (!(!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)))))
                            return;
                        __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                        // @ts-ignore
                        [teams, teams, lockPlayer,];
                    }
                };
                const __VLS_115 = __VLS_pickFunctionalComponentCtx(__VLS_110, __VLS_112);
                let __VLS_113;
                let __VLS_114;
            }
            const __VLS_117 = {}.VBtn;
            ({}.VBtn);
            ({}.VBtn);
            __VLS_components.VBtn;
            __VLS_components.vBtn;
            __VLS_components.VBtn;
            __VLS_components.vBtn;
            // @ts-ignore
            [VBtn, VBtn,];
            const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
            const __VLS_119 = __VLS_118({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_118));
            ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
            let __VLS_123 = {
                /**__VLS_emit,__VLS_120,click*/
                'click': __VLS_pickEvent(__VLS_121['click'], {}.onClick)
            };
            __VLS_123 = { click: $event => {
                    if (!((__VLS_ctx.teams.team0[n - 1])))
                        return;
                    delete __VLS_ctx.teams.team0[n - 1];
                    // @ts-ignore
                    [teams,];
                }
            };
            const __VLS_122 = __VLS_pickFunctionalComponentCtx(__VLS_117, __VLS_119);
            let __VLS_120;
            let __VLS_121;
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex ml-1"), style: ({}), });
        }
        (__VLS_86.slots).default;
        const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_81, __VLS_83);
        let __VLS_84;
        let __VLS_85;
        (__VLS_80.slots).default;
        const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77);
        const __VLS_124 = {}.VSpacer;
        ({}.VSpacer);
        ({}.VSpacer);
        __VLS_components.VSpacer;
        __VLS_components.vSpacer;
        __VLS_components.VSpacer;
        __VLS_components.vSpacer;
        // @ts-ignore
        [VSpacer, VSpacer,];
        const __VLS_125 = __VLS_asFunctionalComponent(__VLS_124, new __VLS_124({}));
        const __VLS_126 = __VLS_125({}, ...__VLS_functionalComponentArgsRest(__VLS_125));
        ({}({}));
        const __VLS_129 = __VLS_pickFunctionalComponentCtx(__VLS_124, __VLS_126);
        const __VLS_130 = {}.VCol;
        ({}.VCol);
        ({}.VCol);
        __VLS_components.VCol;
        __VLS_components.vCol;
        __VLS_components.VCol;
        __VLS_components.vCol;
        // @ts-ignore
        [VCol, VCol,];
        const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({ cols: ("4"), }));
        const __VLS_132 = __VLS_131({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_131));
        ({}({ cols: ("4"), }));
        const __VLS_136 = {}.VSheet;
        ({}.VSheet);
        ({}.VSheet);
        __VLS_components.VSheet;
        __VLS_components.vSheet;
        __VLS_components.VSheet;
        __VLS_components.vSheet;
        // @ts-ignore
        [VSheet, VSheet,];
        const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
        const __VLS_138 = __VLS_137({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }, ...__VLS_functionalComponentArgsRest(__VLS_137));
        ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
        let __VLS_142 = {
            /**__VLS_emit,__VLS_139,dragstart*/
            'dragstart': __VLS_pickEvent(__VLS_140['dragstart'], {}.onDragstart)
        };
        __VLS_142 = { dragstart: $event => {
                __VLS_ctx.startDrag($event, __VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1, n - 1, 1);
                // @ts-ignore
                [startDrag, teams, teams,];
            }
        };
        let __VLS_143 = {
            /**__VLS_emit,__VLS_139,drop*/
            'drop': __VLS_pickEvent(__VLS_140['drop'], {}.onDrop)
        };
        __VLS_143 = { drop: $event => {
                __VLS_ctx.onDrop($event, 1, n - 1);
                // @ts-ignore
                [onDrop,];
            }
        };
        let __VLS_144 = {
            /**__VLS_emit,__VLS_139,dragenter*/
            'dragenter': __VLS_pickEvent(__VLS_140['dragenter'], {}.onDragenter)
        };
        __VLS_144 = { dragenter: () => { }
        };
        let __VLS_145 = {
            /**__VLS_emit,__VLS_139,dragover*/
            'dragover': __VLS_pickEvent(__VLS_140['dragover'], {}.onDragover)
        };
        __VLS_145 = { dragover: () => { }
        };
        if (__VLS_ctx.teams.team1[n - 1]) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
            const __VLS_146 = {}.VAvatar;
            ({}.VAvatar);
            ({}.VAvatar);
            __VLS_components.VAvatar;
            __VLS_components.vAvatar;
            __VLS_components.VAvatar;
            __VLS_components.vAvatar;
            // @ts-ignore
            [VAvatar, VAvatar,];
            const __VLS_147 = __VLS_asFunctionalComponent(__VLS_146, new __VLS_146({ size: ("20"), start: (true), color: ("surface-variant"), }));
            const __VLS_148 = __VLS_147({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_147));
            ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
            const __VLS_152 = {}.VIcon;
            ({}.VIcon);
            ({}.VIcon);
            __VLS_components.VIcon;
            __VLS_components.vIcon;
            __VLS_components.VIcon;
            __VLS_components.vIcon;
            // @ts-ignore
            [VIcon, VIcon,];
            const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({ icon: ("mdi-account-circle"), }));
            const __VLS_154 = __VLS_153({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_153));
            ({}({ icon: ("mdi-account-circle"), }));
            // @ts-ignore
            [teams,];
            const __VLS_157 = __VLS_pickFunctionalComponentCtx(__VLS_152, __VLS_154);
            (__VLS_151.slots).default;
            const __VLS_151 = __VLS_pickFunctionalComponentCtx(__VLS_146, __VLS_148);
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
            (__VLS_ctx.teams.team1[n - 1].title);
            // @ts-ignore
            [teams,];
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
            if (__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)) {
                const __VLS_158 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                const __VLS_160 = __VLS_159({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_159));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                let __VLS_164 = {
                    /**__VLS_emit,__VLS_161,click*/
                    'click': __VLS_pickEvent(__VLS_162['click'], {}.onClick)
                };
                __VLS_164 = { click: $event => {
                        if (!((__VLS_ctx.teams.team1[n - 1])))
                            return;
                        if (!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true))))
                            return;
                        __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                        // @ts-ignore
                        [Players, teams, teams, teams, teams, lockPlayer,];
                    }
                };
                const __VLS_163 = __VLS_pickFunctionalComponentCtx(__VLS_158, __VLS_160);
                let __VLS_161;
                let __VLS_162;
            }
            else {
                const __VLS_165 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_166 = __VLS_asFunctionalComponent(__VLS_165, new __VLS_165({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                const __VLS_167 = __VLS_166({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_166));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                let __VLS_171 = {
                    /**__VLS_emit,__VLS_168,click*/
                    'click': __VLS_pickEvent(__VLS_169['click'], {}.onClick)
                };
                __VLS_171 = { click: $event => {
                        if (!((__VLS_ctx.teams.team1[n - 1])))
                            return;
                        if (!(!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)))))
                            return;
                        __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                        // @ts-ignore
                        [teams, teams, lockPlayer,];
                    }
                };
                const __VLS_170 = __VLS_pickFunctionalComponentCtx(__VLS_165, __VLS_167);
                let __VLS_168;
                let __VLS_169;
            }
            const __VLS_172 = {}.VBtn;
            ({}.VBtn);
            ({}.VBtn);
            __VLS_components.VBtn;
            __VLS_components.vBtn;
            __VLS_components.VBtn;
            __VLS_components.vBtn;
            // @ts-ignore
            [VBtn, VBtn,];
            const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
            const __VLS_174 = __VLS_173({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_173));
            ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
            let __VLS_178 = {
                /**__VLS_emit,__VLS_175,click*/
                'click': __VLS_pickEvent(__VLS_176['click'], {}.onClick)
            };
            __VLS_178 = { click: $event => {
                    if (!((__VLS_ctx.teams.team1[n - 1])))
                        return;
                    delete __VLS_ctx.teams.team1[n - 1];
                    // @ts-ignore
                    [teams,];
                }
            };
            const __VLS_177 = __VLS_pickFunctionalComponentCtx(__VLS_172, __VLS_174);
            let __VLS_175;
            let __VLS_176;
        }
        else {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("ml-1 d-flex"), style: ({}), });
        }
        (__VLS_141.slots).default;
        const __VLS_141 = __VLS_pickFunctionalComponentCtx(__VLS_136, __VLS_138);
        let __VLS_139;
        let __VLS_140;
        (__VLS_135.slots).default;
        const __VLS_135 = __VLS_pickFunctionalComponentCtx(__VLS_130, __VLS_132);
        (__VLS_74.slots).default;
        const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71);
    }
    (__VLS_31.slots).default;
    const __VLS_31 = __VLS_pickFunctionalComponentCtx(__VLS_26, __VLS_28);
    if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
        __VLS_styleScopedClasses['d-flex'];
        __VLS_styleScopedClasses['align-self-center'];
        __VLS_styleScopedClasses['ma-4'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['ml-0'];
        __VLS_styleScopedClasses['pl-0'];
        __VLS_styleScopedClasses['align-self-center'];
        __VLS_styleScopedClasses['ma-2'];
        __VLS_styleScopedClasses['ml-2'];
        __VLS_styleScopedClasses['mt-16'];
        __VLS_styleScopedClasses['mx-6'];
        __VLS_styleScopedClasses['t0'];
        __VLS_styleScopedClasses['t1'];
        __VLS_styleScopedClasses['mx-6'];
        __VLS_styleScopedClasses['player{{'];
        __VLS_styleScopedClasses['n'];
        __VLS_styleScopedClasses['}}'];
        __VLS_styleScopedClasses['ma-2'];
        __VLS_styleScopedClasses['ml-0'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-6'];
        __VLS_styleScopedClasses['bg-surface-variant'];
        __VLS_styleScopedClasses['team_player'];
        __VLS_styleScopedClasses['team_0'];
        __VLS_styleScopedClasses['playerDiv'];
        __VLS_styleScopedClasses['d-flex'];
        __VLS_styleScopedClasses['remove_team_card'];
        __VLS_styleScopedClasses['d-flex'];
        __VLS_styleScopedClasses['ml-1'];
        __VLS_styleScopedClasses['ma-2'];
        __VLS_styleScopedClasses['ml-0'];
        __VLS_styleScopedClasses['px-4'];
        __VLS_styleScopedClasses['py-6'];
        __VLS_styleScopedClasses['bg-surface-variant'];
        __VLS_styleScopedClasses['team_player'];
        __VLS_styleScopedClasses['team_1'];
        __VLS_styleScopedClasses['playerDiv'];
        __VLS_styleScopedClasses['d-flex'];
        __VLS_styleScopedClasses['remove_team_card'];
        __VLS_styleScopedClasses['ml-1'];
        __VLS_styleScopedClasses['d-flex'];
    }
    var __VLS_slots;
    return __VLS_slots;
    const __VLS_componentsOption = {};
    let __VLS_name;
    const __VLS_internalComponent = (await import('vue')).defineComponent({
        setup() {
            return {
                PlayerChip: PlayerChip,
                Players: Players,
                nick: nick,
                teams: teams,
                AddChip: AddChip,
                lockPlayer: lockPlayer,
                chipRemove: chipRemove,
                RandomizeTeams: RandomizeTeams,
                startDrag: startDrag,
                onDrop: onDrop,
            };
        },
    });
}
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
;
//# sourceMappingURL=HomeView.vue.js.map