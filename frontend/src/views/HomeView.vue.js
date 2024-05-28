import { reactive, ref } from 'vue';
import PlayerChip from '../components/PlayerChip.vue';
import { useWindowSize } from '@vueuse/core';
import AlertSnackBar from '../components/AlertSnackBar.vue';
const { defineProps, defineSlots, defineEmits, defineExpose, defineModel, defineOptions, withDefaults, } = await import('vue');
let Players = ref([]);
let nick = ref('');
let nextID = 0;
const { width = ref(1024) } = useWindowSize();
let teams = reactive({
    team0: [],
    team1: []
});
let snackbar_visibility = ref(false);
let snackbar_text = ref('');
const AddChip = () => {
    snackbar_visibility.value = false;
    if (nick.value === '') {
        snackbar_visibility.value = true;
        snackbar_text.value = "Nie wprowadzono nicku gracza!";
        return;
    }
    ;
    if (Players.value.find((e) => e && e.title === nick.value)) {
        snackbar_visibility.value = true;
        snackbar_text.value = "Gracz o takim nicku już został dodany do puli!";
        return;
    }
    ;
    Players.value.push({
        id: nextID++,
        title: nick.value,
        locked: false,
    });
    nick.value = '';
};
const lockPlayer = (playerId) => {
    if (playerId >= 0) {
        let data = Players.value.find((e) => e && e.id === playerId);
        if (data)
            data.locked = !data.locked;
    }
};
const chipRemove = (index, title) => {
    Players.value.splice(index, 1);
    let existsTeam0 = teams.team0.findIndex((e) => e && e.title === title);
    let existsTeam1 = teams.team1.findIndex((e) => e && e.title === title);
    if (existsTeam0 >= 0)
        delete teams.team0[existsTeam0];
    if (existsTeam1 >= 0)
        delete teams.team1[existsTeam1];
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
            if ((randomTeam && teams.team1.length < 5) || teams.team0.length >= 5)
                teams.team1.push(element);
            else
                teams.team0.push(element);
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
    let oldTeam = null;
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
    if (existsTeam0 >= 0)
        delete teams.team0[existsTeam0];
    if (existsTeam1 >= 0)
        delete teams.team1[existsTeam1];
    if (team)
        oldTeam = teams.team1[index];
    else
        oldTeam = teams.team0[index];
    if (SlotIndex >= 0 && SlotTeam === 1 && oldTeam)
        teams.team1[SlotIndex] = oldTeam;
    if (SlotIndex >= 0 && SlotTeam === 0 && oldTeam)
        teams.team0[SlotIndex] = oldTeam;
    if (team)
        teams.team1[index] = data;
    else
        teams.team0[index] = data;
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
    // @ts-ignore
    [AlertSnackBar,];
    const __VLS_0 = __VLS_asFunctionalComponent(AlertSnackBar, new AlertSnackBar({ ...{ 'onUpdate': {}, }, show: ((__VLS_ctx.snackbar_visibility)), text: ((__VLS_ctx.snackbar_text)), }));
    const __VLS_1 = __VLS_0({ ...{ 'onUpdate': {}, }, show: ((__VLS_ctx.snackbar_visibility)), text: ((__VLS_ctx.snackbar_text)), }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    ({}({ ...{ 'onUpdate': {}, }, show: ((__VLS_ctx.snackbar_visibility)), text: ((__VLS_ctx.snackbar_text)), }));
    let __VLS_5 = {
        /**__VLS_emit,__VLS_2,update*/
        'update': __VLS_pickEvent(__VLS_3['update'], {}.onUpdate)
    };
    __VLS_5 = { update: $event => {
            __VLS_ctx.snackbar_visibility = false;
            // @ts-ignore
            [snackbar_visibility, snackbar_visibility, snackbar_text,];
        }
    };
    const __VLS_4 = __VLS_pickFunctionalComponentCtx(AlertSnackBar, __VLS_1);
    let __VLS_2;
    let __VLS_3;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), });
    const __VLS_6 = {}.VTextField;
    ({}.VTextField);
    ({}.VTextField);
    __VLS_components.VTextField;
    __VLS_components.vTextField;
    __VLS_components.VTextField;
    __VLS_components.vTextField;
    // @ts-ignore
    [VTextField, VTextField,];
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }));
    const __VLS_8 = __VLS_7({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    ({}({ ...{ 'onKeyup': {}, }, modelValue: ((__VLS_ctx.nick)), width: ((250)), label: ("Nick"), variant: ("underlined"), }));
    let __VLS_12 = {
        /**__VLS_emit,__VLS_9,keyup*/
        'keyup': __VLS_pickEvent(__VLS_10['keyup'], {}.onKeyup)
    };
    __VLS_12 = { keyup: (__VLS_ctx.AddChip)
    };
    // @ts-ignore
    [nick, AddChip,];
    const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_6, __VLS_8);
    let __VLS_9;
    let __VLS_10;
    const __VLS_13 = {}.VBtn;
    ({}.VBtn);
    ({}.VBtn);
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    __VLS_components.VBtn;
    __VLS_components.vBtn;
    // @ts-ignore
    [VBtn, VBtn,];
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }));
    const __VLS_15 = __VLS_14({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    ({}({ ...{ 'onClick': {}, }, class: ("align-self-center ma-4"), color: ("#66c0f4"), }));
    let __VLS_19 = {
        /**__VLS_emit,__VLS_16,click*/
        'click': __VLS_pickEvent(__VLS_17['click'], {}.onClick)
    };
    __VLS_19 = { click: (__VLS_ctx.AddChip)
    };
    const __VLS_20 = {}.VIcon;
    ({}.VIcon);
    ({}.VIcon);
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    __VLS_components.VIcon;
    __VLS_components.vIcon;
    // @ts-ignore
    [VIcon, VIcon,];
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ icon: ("mdi mdi-plus"), }));
    const __VLS_22 = __VLS_21({ icon: ("mdi mdi-plus"), }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    ({}({ icon: ("mdi mdi-plus"), }));
    // @ts-ignore
    [AddChip,];
    const __VLS_25 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22);
    (__VLS_18.slots).default;
    const __VLS_18 = __VLS_pickFunctionalComponentCtx(__VLS_13, __VLS_15);
    let __VLS_16;
    let __VLS_17;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.h5, __VLS_intrinsicElements.h5)({});
    (__VLS_ctx.Players.length);
    // @ts-ignore
    [Players,];
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ id: ("PlayersChips"), style: ({}), });
    for (const [player, index] of __VLS_getVForSourceType((__VLS_ctx.Players))) {
        // @ts-ignore
        [PlayerChip,];
        const __VLS_26 = __VLS_asFunctionalComponent(PlayerChip, new PlayerChip({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }));
        const __VLS_27 = __VLS_26({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }, ...__VLS_functionalComponentArgsRest(__VLS_26));
        ({}({ ...{ 'onRemove': {}, }, key: ((player.id)), title: ((player.title)), index: ((player.id)), startdrag: ((__VLS_ctx.startDrag)), }));
        let __VLS_31 = {
            /**__VLS_emit,__VLS_28,remove*/
            'remove': __VLS_pickEvent(__VLS_29['remove'], {}.onRemove)
        };
        __VLS_31 = { remove: $event => {
                __VLS_ctx.chipRemove(index, player.title);
                // @ts-ignore
                [Players, startDrag, chipRemove,];
            }
        };
        const __VLS_30 = __VLS_pickFunctionalComponentCtx(PlayerChip, __VLS_27);
        let __VLS_28;
        let __VLS_29;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    if (__VLS_ctx.width >= 1024) {
        const __VLS_32 = {}.VContainer;
        ({}.VContainer);
        ({}.VContainer);
        __VLS_components.VContainer;
        __VLS_components.vContainer;
        __VLS_components.VContainer;
        __VLS_components.vContainer;
        // @ts-ignore
        [VContainer, VContainer,];
        const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({ class: ("mt-4 ml-0 pl-0"), }));
        const __VLS_34 = __VLS_33({ class: ("mt-4 ml-0 pl-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_33));
        ({}({ class: ("mt-4 ml-0 pl-0"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_38 = {}.VBtn;
        ({}.VBtn);
        ({}.VBtn);
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        // @ts-ignore
        [VBtn, VBtn,];
        const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
        const __VLS_40 = __VLS_39({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }, ...__VLS_functionalComponentArgsRest(__VLS_39));
        ({}({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
        let __VLS_44 = {
            /**__VLS_emit,__VLS_41,click*/
            'click': __VLS_pickEvent(__VLS_42['click'], {}.onClick)
        };
        __VLS_44 = { click: (__VLS_ctx.RandomizeTeams)
        };
        const __VLS_45 = {}.VIcon;
        ({}.VIcon);
        ({}.VIcon);
        __VLS_components.VIcon;
        __VLS_components.vIcon;
        __VLS_components.VIcon;
        __VLS_components.vIcon;
        // @ts-ignore
        [VIcon, VIcon,];
        const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
        const __VLS_47 = __VLS_46({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_46));
        ({}({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
        // @ts-ignore
        [width, RandomizeTeams,];
        const __VLS_50 = __VLS_pickFunctionalComponentCtx(__VLS_45, __VLS_47);
        (__VLS_43.slots).default;
        const __VLS_43 = __VLS_pickFunctionalComponentCtx(__VLS_38, __VLS_40);
        let __VLS_41;
        let __VLS_42;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("mt-16"), });
        const __VLS_51 = {}.VRow;
        ({}.VRow);
        ({}.VRow);
        __VLS_components.VRow;
        __VLS_components.vRow;
        __VLS_components.VRow;
        __VLS_components.vRow;
        // @ts-ignore
        [VRow, VRow,];
        const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({ class: ("mx-6 team-head-lg"), noGutters: (true), }));
        const __VLS_53 = __VLS_52({ class: ("mx-6 team-head-lg"), noGutters: (true), }, ...__VLS_functionalComponentArgsRest(__VLS_52));
        ({}({ class: ("mx-6 team-head-lg"), noGutters: (true), }));
        const __VLS_57 = {}.VCol;
        ({}.VCol);
        ({}.VCol);
        __VLS_components.VCol;
        __VLS_components.vCol;
        __VLS_components.VCol;
        __VLS_components.vCol;
        // @ts-ignore
        [VCol, VCol,];
        const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({ cols: ("4"), }));
        const __VLS_59 = __VLS_58({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_58));
        ({}({ cols: ("4"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t0"), });
        (__VLS_62.slots).default;
        const __VLS_62 = __VLS_pickFunctionalComponentCtx(__VLS_57, __VLS_59);
        const __VLS_63 = {}.VSpacer;
        ({}.VSpacer);
        ({}.VSpacer);
        __VLS_components.VSpacer;
        __VLS_components.vSpacer;
        __VLS_components.VSpacer;
        __VLS_components.vSpacer;
        // @ts-ignore
        [VSpacer, VSpacer,];
        const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({}));
        const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
        ({}({}));
        const __VLS_68 = __VLS_pickFunctionalComponentCtx(__VLS_63, __VLS_65);
        const __VLS_69 = {}.VCol;
        ({}.VCol);
        ({}.VCol);
        __VLS_components.VCol;
        __VLS_components.vCol;
        __VLS_components.VCol;
        __VLS_components.vCol;
        // @ts-ignore
        [VCol, VCol,];
        const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({ cols: ("4"), }));
        const __VLS_71 = __VLS_70({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_70));
        ({}({ cols: ("4"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t1"), });
        (__VLS_74.slots).default;
        const __VLS_74 = __VLS_pickFunctionalComponentCtx(__VLS_69, __VLS_71);
        (__VLS_56.slots).default;
        const __VLS_56 = __VLS_pickFunctionalComponentCtx(__VLS_51, __VLS_53);
        for (const [n] of __VLS_getVForSourceType((5))) {
            const __VLS_75 = {}.VRow;
            ({}.VRow);
            ({}.VRow);
            __VLS_components.VRow;
            __VLS_components.vRow;
            __VLS_components.VRow;
            __VLS_components.vRow;
            // @ts-ignore
            [VRow, VRow,];
            const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_77 = __VLS_76({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }, ...__VLS_functionalComponentArgsRest(__VLS_76));
            ({}({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_81 = {}.VCol;
            ({}.VCol);
            ({}.VCol);
            __VLS_components.VCol;
            __VLS_components.vCol;
            __VLS_components.VCol;
            __VLS_components.vCol;
            // @ts-ignore
            [VCol, VCol,];
            const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({ cols: ("4"), }));
            const __VLS_83 = __VLS_82({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_82));
            ({}({ cols: ("4"), }));
            const __VLS_87 = {}.VSheet;
            ({}.VSheet);
            ({}.VSheet);
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            // @ts-ignore
            [VSheet, VSheet,];
            const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
            const __VLS_89 = __VLS_88({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }, ...__VLS_functionalComponentArgsRest(__VLS_88));
            ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
            let __VLS_93 = {
                /**__VLS_emit,__VLS_90,dragstart*/
                'dragstart': __VLS_pickEvent(__VLS_91['dragstart'], {}.onDragstart)
            };
            __VLS_93 = { dragstart: $event => {
                    if (!((__VLS_ctx.width >= 1024)))
                        return;
                    __VLS_ctx.startDrag($event, __VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1, n - 1, 0);
                    // @ts-ignore
                    [startDrag, teams, teams,];
                }
            };
            let __VLS_94 = {
                /**__VLS_emit,__VLS_90,drop*/
                'drop': __VLS_pickEvent(__VLS_91['drop'], {}.onDrop)
            };
            __VLS_94 = { drop: $event => {
                    if (!((__VLS_ctx.width >= 1024)))
                        return;
                    __VLS_ctx.onDrop($event, 0, n - 1);
                    // @ts-ignore
                    [onDrop,];
                }
            };
            let __VLS_95 = {
                /**__VLS_emit,__VLS_90,dragenter*/
                'dragenter': __VLS_pickEvent(__VLS_91['dragenter'], {}.onDragenter)
            };
            __VLS_95 = { dragenter: () => { }
            };
            let __VLS_96 = {
                /**__VLS_emit,__VLS_90,dragover*/
                'dragover': __VLS_pickEvent(__VLS_91['dragover'], {}.onDragover)
            };
            __VLS_96 = { dragover: () => { }
            };
            if (__VLS_ctx.teams.team0[n - 1]) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
                const __VLS_97 = {}.VAvatar;
                ({}.VAvatar);
                ({}.VAvatar);
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                // @ts-ignore
                [VAvatar, VAvatar,];
                const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_99 = __VLS_98({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_98));
                ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_103 = {}.VIcon;
                ({}.VIcon);
                ({}.VIcon);
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                // @ts-ignore
                [VIcon, VIcon,];
                const __VLS_104 = __VLS_asFunctionalComponent(__VLS_103, new __VLS_103({ icon: ("mdi-account-circle"), }));
                const __VLS_105 = __VLS_104({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_104));
                ({}({ icon: ("mdi-account-circle"), }));
                // @ts-ignore
                [teams,];
                const __VLS_108 = __VLS_pickFunctionalComponentCtx(__VLS_103, __VLS_105);
                (__VLS_102.slots).default;
                const __VLS_102 = __VLS_pickFunctionalComponentCtx(__VLS_97, __VLS_99);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
                (__VLS_ctx.teams.team0[n - 1].title);
                // @ts-ignore
                [teams,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
                if (__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)) {
                    const __VLS_109 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_110 = __VLS_asFunctionalComponent(__VLS_109, new __VLS_109({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                    const __VLS_111 = __VLS_110({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_110));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                    let __VLS_115 = {
                        /**__VLS_emit,__VLS_112,click*/
                        'click': __VLS_pickEvent(__VLS_113['click'], {}.onClick)
                    };
                    __VLS_115 = { click: $event => {
                            if (!((__VLS_ctx.width >= 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1])))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                            // @ts-ignore
                            [Players, teams, teams, teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_114 = __VLS_pickFunctionalComponentCtx(__VLS_109, __VLS_111);
                    let __VLS_112;
                    let __VLS_113;
                }
                else {
                    const __VLS_116 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    const __VLS_118 = __VLS_117({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_117));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    let __VLS_122 = {
                        /**__VLS_emit,__VLS_119,click*/
                        'click': __VLS_pickEvent(__VLS_120['click'], {}.onClick)
                    };
                    __VLS_122 = { click: $event => {
                            if (!((__VLS_ctx.width >= 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1])))
                                return;
                            if (!(!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                            // @ts-ignore
                            [teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_121 = __VLS_pickFunctionalComponentCtx(__VLS_116, __VLS_118);
                    let __VLS_119;
                    let __VLS_120;
                }
                const __VLS_123 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                const __VLS_125 = __VLS_124({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_124));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                let __VLS_129 = {
                    /**__VLS_emit,__VLS_126,click*/
                    'click': __VLS_pickEvent(__VLS_127['click'], {}.onClick)
                };
                __VLS_129 = { click: $event => {
                        if (!((__VLS_ctx.width >= 1024)))
                            return;
                        if (!((__VLS_ctx.teams.team0[n - 1])))
                            return;
                        delete __VLS_ctx.teams.team0[n - 1];
                        // @ts-ignore
                        [teams,];
                    }
                };
                const __VLS_128 = __VLS_pickFunctionalComponentCtx(__VLS_123, __VLS_125);
                let __VLS_126;
                let __VLS_127;
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex ml-1"), style: ({}), });
            }
            (__VLS_92.slots).default;
            const __VLS_92 = __VLS_pickFunctionalComponentCtx(__VLS_87, __VLS_89);
            let __VLS_90;
            let __VLS_91;
            (__VLS_86.slots).default;
            const __VLS_86 = __VLS_pickFunctionalComponentCtx(__VLS_81, __VLS_83);
            const __VLS_130 = {}.VSpacer;
            ({}.VSpacer);
            ({}.VSpacer);
            __VLS_components.VSpacer;
            __VLS_components.vSpacer;
            __VLS_components.VSpacer;
            __VLS_components.vSpacer;
            // @ts-ignore
            [VSpacer, VSpacer,];
            const __VLS_131 = __VLS_asFunctionalComponent(__VLS_130, new __VLS_130({}));
            const __VLS_132 = __VLS_131({}, ...__VLS_functionalComponentArgsRest(__VLS_131));
            ({}({}));
            const __VLS_135 = __VLS_pickFunctionalComponentCtx(__VLS_130, __VLS_132);
            const __VLS_136 = {}.VCol;
            ({}.VCol);
            ({}.VCol);
            __VLS_components.VCol;
            __VLS_components.vCol;
            __VLS_components.VCol;
            __VLS_components.vCol;
            // @ts-ignore
            [VCol, VCol,];
            const __VLS_137 = __VLS_asFunctionalComponent(__VLS_136, new __VLS_136({ cols: ("4"), }));
            const __VLS_138 = __VLS_137({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_137));
            ({}({ cols: ("4"), }));
            const __VLS_142 = {}.VSheet;
            ({}.VSheet);
            ({}.VSheet);
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            // @ts-ignore
            [VSheet, VSheet,];
            const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
            const __VLS_144 = __VLS_143({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }, ...__VLS_functionalComponentArgsRest(__VLS_143));
            ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
            let __VLS_148 = {
                /**__VLS_emit,__VLS_145,dragstart*/
                'dragstart': __VLS_pickEvent(__VLS_146['dragstart'], {}.onDragstart)
            };
            __VLS_148 = { dragstart: $event => {
                    if (!((__VLS_ctx.width >= 1024)))
                        return;
                    __VLS_ctx.startDrag($event, __VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1, n - 1, 1);
                    // @ts-ignore
                    [startDrag, teams, teams,];
                }
            };
            let __VLS_149 = {
                /**__VLS_emit,__VLS_145,drop*/
                'drop': __VLS_pickEvent(__VLS_146['drop'], {}.onDrop)
            };
            __VLS_149 = { drop: $event => {
                    if (!((__VLS_ctx.width >= 1024)))
                        return;
                    __VLS_ctx.onDrop($event, 1, n - 1);
                    // @ts-ignore
                    [onDrop,];
                }
            };
            let __VLS_150 = {
                /**__VLS_emit,__VLS_145,dragenter*/
                'dragenter': __VLS_pickEvent(__VLS_146['dragenter'], {}.onDragenter)
            };
            __VLS_150 = { dragenter: () => { }
            };
            let __VLS_151 = {
                /**__VLS_emit,__VLS_145,dragover*/
                'dragover': __VLS_pickEvent(__VLS_146['dragover'], {}.onDragover)
            };
            __VLS_151 = { dragover: () => { }
            };
            if (__VLS_ctx.teams.team1[n - 1]) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
                const __VLS_152 = {}.VAvatar;
                ({}.VAvatar);
                ({}.VAvatar);
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                // @ts-ignore
                [VAvatar, VAvatar,];
                const __VLS_153 = __VLS_asFunctionalComponent(__VLS_152, new __VLS_152({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_154 = __VLS_153({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_153));
                ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_158 = {}.VIcon;
                ({}.VIcon);
                ({}.VIcon);
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                // @ts-ignore
                [VIcon, VIcon,];
                const __VLS_159 = __VLS_asFunctionalComponent(__VLS_158, new __VLS_158({ icon: ("mdi-account-circle"), }));
                const __VLS_160 = __VLS_159({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_159));
                ({}({ icon: ("mdi-account-circle"), }));
                // @ts-ignore
                [teams,];
                const __VLS_163 = __VLS_pickFunctionalComponentCtx(__VLS_158, __VLS_160);
                (__VLS_157.slots).default;
                const __VLS_157 = __VLS_pickFunctionalComponentCtx(__VLS_152, __VLS_154);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
                (__VLS_ctx.teams.team1[n - 1].title);
                // @ts-ignore
                [teams,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
                if (__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)) {
                    const __VLS_164 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_165 = __VLS_asFunctionalComponent(__VLS_164, new __VLS_164({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                    const __VLS_166 = __VLS_165({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_165));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                    let __VLS_170 = {
                        /**__VLS_emit,__VLS_167,click*/
                        'click': __VLS_pickEvent(__VLS_168['click'], {}.onClick)
                    };
                    __VLS_170 = { click: $event => {
                            if (!((__VLS_ctx.width >= 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1])))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                            // @ts-ignore
                            [Players, teams, teams, teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_169 = __VLS_pickFunctionalComponentCtx(__VLS_164, __VLS_166);
                    let __VLS_167;
                    let __VLS_168;
                }
                else {
                    const __VLS_171 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_172 = __VLS_asFunctionalComponent(__VLS_171, new __VLS_171({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    const __VLS_173 = __VLS_172({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_172));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    let __VLS_177 = {
                        /**__VLS_emit,__VLS_174,click*/
                        'click': __VLS_pickEvent(__VLS_175['click'], {}.onClick)
                    };
                    __VLS_177 = { click: $event => {
                            if (!((__VLS_ctx.width >= 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1])))
                                return;
                            if (!(!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                            // @ts-ignore
                            [teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_176 = __VLS_pickFunctionalComponentCtx(__VLS_171, __VLS_173);
                    let __VLS_174;
                    let __VLS_175;
                }
                const __VLS_178 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_179 = __VLS_asFunctionalComponent(__VLS_178, new __VLS_178({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                const __VLS_180 = __VLS_179({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_179));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                let __VLS_184 = {
                    /**__VLS_emit,__VLS_181,click*/
                    'click': __VLS_pickEvent(__VLS_182['click'], {}.onClick)
                };
                __VLS_184 = { click: $event => {
                        if (!((__VLS_ctx.width >= 1024)))
                            return;
                        if (!((__VLS_ctx.teams.team1[n - 1])))
                            return;
                        delete __VLS_ctx.teams.team1[n - 1];
                        // @ts-ignore
                        [teams,];
                    }
                };
                const __VLS_183 = __VLS_pickFunctionalComponentCtx(__VLS_178, __VLS_180);
                let __VLS_181;
                let __VLS_182;
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("ml-1 d-flex"), style: ({}), });
            }
            (__VLS_147.slots).default;
            const __VLS_147 = __VLS_pickFunctionalComponentCtx(__VLS_142, __VLS_144);
            let __VLS_145;
            let __VLS_146;
            (__VLS_141.slots).default;
            const __VLS_141 = __VLS_pickFunctionalComponentCtx(__VLS_136, __VLS_138);
            (__VLS_80.slots).default;
            const __VLS_80 = __VLS_pickFunctionalComponentCtx(__VLS_75, __VLS_77);
        }
        (__VLS_37.slots).default;
        const __VLS_37 = __VLS_pickFunctionalComponentCtx(__VLS_32, __VLS_34);
    }
    if (__VLS_ctx.width < 1024) {
        const __VLS_185 = {}.VContainer;
        ({}.VContainer);
        ({}.VContainer);
        __VLS_components.VContainer;
        __VLS_components.vContainer;
        __VLS_components.VContainer;
        __VLS_components.vContainer;
        // @ts-ignore
        [VContainer, VContainer,];
        const __VLS_186 = __VLS_asFunctionalComponent(__VLS_185, new __VLS_185({ class: ("mt-4 ml-0 pl-0"), }));
        const __VLS_187 = __VLS_186({ class: ("mt-4 ml-0 pl-0"), }, ...__VLS_functionalComponentArgsRest(__VLS_186));
        ({}({ class: ("mt-4 ml-0 pl-0"), }));
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
        const __VLS_191 = {}.VBtn;
        ({}.VBtn);
        ({}.VBtn);
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        __VLS_components.VBtn;
        __VLS_components.vBtn;
        // @ts-ignore
        [VBtn, VBtn,];
        const __VLS_192 = __VLS_asFunctionalComponent(__VLS_191, new __VLS_191({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
        const __VLS_193 = __VLS_192({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }, ...__VLS_functionalComponentArgsRest(__VLS_192));
        ({}({ ...{ 'onClick': {}, }, class: ("align-self-center ma-2"), color: ("#66c0f4"), }));
        let __VLS_197 = {
            /**__VLS_emit,__VLS_194,click*/
            'click': __VLS_pickEvent(__VLS_195['click'], {}.onClick)
        };
        __VLS_197 = { click: (__VLS_ctx.RandomizeTeams)
        };
        const __VLS_198 = {}.VIcon;
        ({}.VIcon);
        ({}.VIcon);
        __VLS_components.VIcon;
        __VLS_components.vIcon;
        __VLS_components.VIcon;
        __VLS_components.vIcon;
        // @ts-ignore
        [VIcon, VIcon,];
        const __VLS_199 = __VLS_asFunctionalComponent(__VLS_198, new __VLS_198({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
        const __VLS_200 = __VLS_199({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_199));
        ({}({ class: ("ml-2"), icon: ("mdi-shuffle-variant"), }));
        // @ts-ignore
        [width, RandomizeTeams,];
        const __VLS_203 = __VLS_pickFunctionalComponentCtx(__VLS_198, __VLS_200);
        (__VLS_196.slots).default;
        const __VLS_196 = __VLS_pickFunctionalComponentCtx(__VLS_191, __VLS_193);
        let __VLS_194;
        let __VLS_195;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("mt-16"), });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t0"), });
        for (const [n] of __VLS_getVForSourceType((5))) {
            const __VLS_204 = {}.VRow;
            ({}.VRow);
            ({}.VRow);
            __VLS_components.VRow;
            __VLS_components.vRow;
            __VLS_components.VRow;
            __VLS_components.vRow;
            // @ts-ignore
            [VRow, VRow,];
            const __VLS_205 = __VLS_asFunctionalComponent(__VLS_204, new __VLS_204({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_206 = __VLS_205({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }, ...__VLS_functionalComponentArgsRest(__VLS_205));
            ({}({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_210 = {}.VCol;
            ({}.VCol);
            ({}.VCol);
            __VLS_components.VCol;
            __VLS_components.vCol;
            __VLS_components.VCol;
            __VLS_components.vCol;
            // @ts-ignore
            [VCol, VCol,];
            const __VLS_211 = __VLS_asFunctionalComponent(__VLS_210, new __VLS_210({ cols: ("4"), }));
            const __VLS_212 = __VLS_211({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_211));
            ({}({ cols: ("4"), }));
            const __VLS_216 = {}.VSheet;
            ({}.VSheet);
            ({}.VSheet);
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            // @ts-ignore
            [VSheet, VSheet,];
            const __VLS_217 = __VLS_asFunctionalComponent(__VLS_216, new __VLS_216({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
            const __VLS_218 = __VLS_217({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }, ...__VLS_functionalComponentArgsRest(__VLS_217));
            ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_0"), }));
            let __VLS_222 = {
                /**__VLS_emit,__VLS_219,dragstart*/
                'dragstart': __VLS_pickEvent(__VLS_220['dragstart'], {}.onDragstart)
            };
            __VLS_222 = { dragstart: $event => {
                    if (!((__VLS_ctx.width < 1024)))
                        return;
                    __VLS_ctx.startDrag($event, __VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1, n - 1, 0);
                    // @ts-ignore
                    [startDrag, teams, teams,];
                }
            };
            let __VLS_223 = {
                /**__VLS_emit,__VLS_219,drop*/
                'drop': __VLS_pickEvent(__VLS_220['drop'], {}.onDrop)
            };
            __VLS_223 = { drop: $event => {
                    if (!((__VLS_ctx.width < 1024)))
                        return;
                    __VLS_ctx.onDrop($event, 0, n - 1);
                    // @ts-ignore
                    [onDrop,];
                }
            };
            let __VLS_224 = {
                /**__VLS_emit,__VLS_219,dragenter*/
                'dragenter': __VLS_pickEvent(__VLS_220['dragenter'], {}.onDragenter)
            };
            __VLS_224 = { dragenter: () => { }
            };
            let __VLS_225 = {
                /**__VLS_emit,__VLS_219,dragover*/
                'dragover': __VLS_pickEvent(__VLS_220['dragover'], {}.onDragover)
            };
            __VLS_225 = { dragover: () => { }
            };
            if (__VLS_ctx.teams.team0[n - 1]) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
                const __VLS_226 = {}.VAvatar;
                ({}.VAvatar);
                ({}.VAvatar);
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                // @ts-ignore
                [VAvatar, VAvatar,];
                const __VLS_227 = __VLS_asFunctionalComponent(__VLS_226, new __VLS_226({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_228 = __VLS_227({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_227));
                ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_232 = {}.VIcon;
                ({}.VIcon);
                ({}.VIcon);
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                // @ts-ignore
                [VIcon, VIcon,];
                const __VLS_233 = __VLS_asFunctionalComponent(__VLS_232, new __VLS_232({ icon: ("mdi-account-circle"), }));
                const __VLS_234 = __VLS_233({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_233));
                ({}({ icon: ("mdi-account-circle"), }));
                // @ts-ignore
                [teams,];
                const __VLS_237 = __VLS_pickFunctionalComponentCtx(__VLS_232, __VLS_234);
                (__VLS_231.slots).default;
                const __VLS_231 = __VLS_pickFunctionalComponentCtx(__VLS_226, __VLS_228);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
                (__VLS_ctx.teams.team0[n - 1].title);
                // @ts-ignore
                [teams,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
                if (__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)) {
                    const __VLS_238 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_239 = __VLS_asFunctionalComponent(__VLS_238, new __VLS_238({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                    const __VLS_240 = __VLS_239({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_239));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("red-accent-3"), size: ("27"), }));
                    let __VLS_244 = {
                        /**__VLS_emit,__VLS_241,click*/
                        'click': __VLS_pickEvent(__VLS_242['click'], {}.onClick)
                    };
                    __VLS_244 = { click: $event => {
                            if (!((__VLS_ctx.width < 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1])))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                            // @ts-ignore
                            [Players, teams, teams, teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_243 = __VLS_pickFunctionalComponentCtx(__VLS_238, __VLS_240);
                    let __VLS_241;
                    let __VLS_242;
                }
                else {
                    const __VLS_245 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_246 = __VLS_asFunctionalComponent(__VLS_245, new __VLS_245({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    const __VLS_247 = __VLS_246({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_246));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    let __VLS_251 = {
                        /**__VLS_emit,__VLS_248,click*/
                        'click': __VLS_pickEvent(__VLS_249['click'], {}.onClick)
                    };
                    __VLS_251 = { click: $event => {
                            if (!((__VLS_ctx.width < 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team0[n - 1])))
                                return;
                            if (!(!((__VLS_ctx.teams.team0[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team0[n - 1].id && e.locked === true)))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team0[n - 1] ? __VLS_ctx.teams.team0[n - 1].id : -1);
                            // @ts-ignore
                            [teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_250 = __VLS_pickFunctionalComponentCtx(__VLS_245, __VLS_247);
                    let __VLS_248;
                    let __VLS_249;
                }
                const __VLS_252 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_253 = __VLS_asFunctionalComponent(__VLS_252, new __VLS_252({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                const __VLS_254 = __VLS_253({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_253));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                let __VLS_258 = {
                    /**__VLS_emit,__VLS_255,click*/
                    'click': __VLS_pickEvent(__VLS_256['click'], {}.onClick)
                };
                __VLS_258 = { click: $event => {
                        if (!((__VLS_ctx.width < 1024)))
                            return;
                        if (!((__VLS_ctx.teams.team0[n - 1])))
                            return;
                        delete __VLS_ctx.teams.team0[n - 1];
                        // @ts-ignore
                        [teams,];
                    }
                };
                const __VLS_257 = __VLS_pickFunctionalComponentCtx(__VLS_252, __VLS_254);
                let __VLS_255;
                let __VLS_256;
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex ml-1"), style: ({}), });
            }
            (__VLS_221.slots).default;
            const __VLS_221 = __VLS_pickFunctionalComponentCtx(__VLS_216, __VLS_218);
            let __VLS_219;
            let __VLS_220;
            (__VLS_215.slots).default;
            const __VLS_215 = __VLS_pickFunctionalComponentCtx(__VLS_210, __VLS_212);
            (__VLS_209.slots).default;
            const __VLS_209 = __VLS_pickFunctionalComponentCtx(__VLS_204, __VLS_206);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({ class: ("t1 mt-4"), });
        for (const [n] of __VLS_getVForSourceType((5))) {
            const __VLS_259 = {}.VRow;
            ({}.VRow);
            ({}.VRow);
            __VLS_components.VRow;
            __VLS_components.vRow;
            __VLS_components.VRow;
            __VLS_components.vRow;
            // @ts-ignore
            [VRow, VRow,];
            const __VLS_260 = __VLS_asFunctionalComponent(__VLS_259, new __VLS_259({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_261 = __VLS_260({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }, ...__VLS_functionalComponentArgsRest(__VLS_260));
            ({}({ class: ("mx-6 player{{ n }} player-rows"), noGutters: (true), key: ((n)), }));
            const __VLS_265 = {}.VCol;
            ({}.VCol);
            ({}.VCol);
            __VLS_components.VCol;
            __VLS_components.vCol;
            __VLS_components.VCol;
            __VLS_components.vCol;
            // @ts-ignore
            [VCol, VCol,];
            const __VLS_266 = __VLS_asFunctionalComponent(__VLS_265, new __VLS_265({ cols: ("4"), }));
            const __VLS_267 = __VLS_266({ cols: ("4"), }, ...__VLS_functionalComponentArgsRest(__VLS_266));
            ({}({ cols: ("4"), }));
            const __VLS_271 = {}.VSheet;
            ({}.VSheet);
            ({}.VSheet);
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            __VLS_components.VSheet;
            __VLS_components.vSheet;
            // @ts-ignore
            [VSheet, VSheet,];
            const __VLS_272 = __VLS_asFunctionalComponent(__VLS_271, new __VLS_271({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
            const __VLS_273 = __VLS_272({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }, ...__VLS_functionalComponentArgsRest(__VLS_272));
            ({}({ ...{ 'onDragstart': {}, 'onDrop': {}, 'onDragenter': {}, 'onDragover': {}, }, minHeight: ("80"), draggable: ("true"), rounded: ((true)), class: ("ma-2 ml-0 px-4 py-6 bg-surface-variant team_player team_1"), }));
            let __VLS_277 = {
                /**__VLS_emit,__VLS_274,dragstart*/
                'dragstart': __VLS_pickEvent(__VLS_275['dragstart'], {}.onDragstart)
            };
            __VLS_277 = { dragstart: $event => {
                    if (!((__VLS_ctx.width < 1024)))
                        return;
                    __VLS_ctx.startDrag($event, __VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1, n - 1, 1);
                    // @ts-ignore
                    [startDrag, teams, teams,];
                }
            };
            let __VLS_278 = {
                /**__VLS_emit,__VLS_274,drop*/
                'drop': __VLS_pickEvent(__VLS_275['drop'], {}.onDrop)
            };
            __VLS_278 = { drop: $event => {
                    if (!((__VLS_ctx.width < 1024)))
                        return;
                    __VLS_ctx.onDrop($event, 1, n - 1);
                    // @ts-ignore
                    [onDrop,];
                }
            };
            let __VLS_279 = {
                /**__VLS_emit,__VLS_274,dragenter*/
                'dragenter': __VLS_pickEvent(__VLS_275['dragenter'], {}.onDragenter)
            };
            __VLS_279 = { dragenter: () => { }
            };
            let __VLS_280 = {
                /**__VLS_emit,__VLS_274,dragover*/
                'dragover': __VLS_pickEvent(__VLS_275['dragover'], {}.onDragover)
            };
            __VLS_280 = { dragover: () => { }
            };
            if (__VLS_ctx.teams.team1[n - 1]) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("playerDiv"), });
                const __VLS_281 = {}.VAvatar;
                ({}.VAvatar);
                ({}.VAvatar);
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                __VLS_components.VAvatar;
                __VLS_components.vAvatar;
                // @ts-ignore
                [VAvatar, VAvatar,];
                const __VLS_282 = __VLS_asFunctionalComponent(__VLS_281, new __VLS_281({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_283 = __VLS_282({ size: ("20"), start: (true), color: ("surface-variant"), }, ...__VLS_functionalComponentArgsRest(__VLS_282));
                ({}({ size: ("20"), start: (true), color: ("surface-variant"), }));
                const __VLS_287 = {}.VIcon;
                ({}.VIcon);
                ({}.VIcon);
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                __VLS_components.VIcon;
                __VLS_components.vIcon;
                // @ts-ignore
                [VIcon, VIcon,];
                const __VLS_288 = __VLS_asFunctionalComponent(__VLS_287, new __VLS_287({ icon: ("mdi-account-circle"), }));
                const __VLS_289 = __VLS_288({ icon: ("mdi-account-circle"), }, ...__VLS_functionalComponentArgsRest(__VLS_288));
                ({}({ icon: ("mdi-account-circle"), }));
                // @ts-ignore
                [teams,];
                const __VLS_292 = __VLS_pickFunctionalComponentCtx(__VLS_287, __VLS_289);
                (__VLS_286.slots).default;
                const __VLS_286 = __VLS_pickFunctionalComponentCtx(__VLS_281, __VLS_283);
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("d-flex"), style: ({}), });
                (__VLS_ctx.teams.team1[n - 1].title);
                // @ts-ignore
                [teams,];
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("remove_team_card"), width: ("100%"), "d-flex": (true), "justify-end": (true), });
                if (__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)) {
                    const __VLS_293 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_294 = __VLS_asFunctionalComponent(__VLS_293, new __VLS_293({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                    const __VLS_295 = __VLS_294({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_294));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-outline"), color: ("teal-accent-4"), size: ("27"), }));
                    let __VLS_299 = {
                        /**__VLS_emit,__VLS_296,click*/
                        'click': __VLS_pickEvent(__VLS_297['click'], {}.onClick)
                    };
                    __VLS_299 = { click: $event => {
                            if (!((__VLS_ctx.width < 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1])))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                            // @ts-ignore
                            [Players, teams, teams, teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_298 = __VLS_pickFunctionalComponentCtx(__VLS_293, __VLS_295);
                    let __VLS_296;
                    let __VLS_297;
                }
                else {
                    const __VLS_300 = {}.VBtn;
                    ({}.VBtn);
                    ({}.VBtn);
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    __VLS_components.VBtn;
                    __VLS_components.vBtn;
                    // @ts-ignore
                    [VBtn, VBtn,];
                    const __VLS_301 = __VLS_asFunctionalComponent(__VLS_300, new __VLS_300({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    const __VLS_302 = __VLS_301({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_301));
                    ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-lock-open-variant-outline"), color: ("transparent"), size: ("27"), }));
                    let __VLS_306 = {
                        /**__VLS_emit,__VLS_303,click*/
                        'click': __VLS_pickEvent(__VLS_304['click'], {}.onClick)
                    };
                    __VLS_306 = { click: $event => {
                            if (!((__VLS_ctx.width < 1024)))
                                return;
                            if (!((__VLS_ctx.teams.team1[n - 1])))
                                return;
                            if (!(!((__VLS_ctx.teams.team1[n - 1] && __VLS_ctx.Players.find((e) => e && e.id === __VLS_ctx.teams.team1[n - 1].id && e.locked === true)))))
                                return;
                            __VLS_ctx.lockPlayer(__VLS_ctx.teams.team1[n - 1] ? __VLS_ctx.teams.team1[n - 1].id : -1);
                            // @ts-ignore
                            [teams, teams, lockPlayer,];
                        }
                    };
                    const __VLS_305 = __VLS_pickFunctionalComponentCtx(__VLS_300, __VLS_302);
                    let __VLS_303;
                    let __VLS_304;
                }
                const __VLS_307 = {}.VBtn;
                ({}.VBtn);
                ({}.VBtn);
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                __VLS_components.VBtn;
                __VLS_components.vBtn;
                // @ts-ignore
                [VBtn, VBtn,];
                const __VLS_308 = __VLS_asFunctionalComponent(__VLS_307, new __VLS_307({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                const __VLS_309 = __VLS_308({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }, ...__VLS_functionalComponentArgsRest(__VLS_308));
                ({}({ ...{ 'onClick': {}, }, floatRight: (true), icon: ("mdi-close-thick"), color: ("transparent"), size: ("27"), }));
                let __VLS_313 = {
                    /**__VLS_emit,__VLS_310,click*/
                    'click': __VLS_pickEvent(__VLS_311['click'], {}.onClick)
                };
                __VLS_313 = { click: $event => {
                        if (!((__VLS_ctx.width < 1024)))
                            return;
                        if (!((__VLS_ctx.teams.team1[n - 1])))
                            return;
                        delete __VLS_ctx.teams.team1[n - 1];
                        // @ts-ignore
                        [teams,];
                    }
                };
                const __VLS_312 = __VLS_pickFunctionalComponentCtx(__VLS_307, __VLS_309);
                let __VLS_310;
                let __VLS_311;
            }
            else {
                __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ class: ("ml-1 d-flex"), style: ({}), });
            }
            (__VLS_276.slots).default;
            const __VLS_276 = __VLS_pickFunctionalComponentCtx(__VLS_271, __VLS_273);
            let __VLS_274;
            let __VLS_275;
            (__VLS_270.slots).default;
            const __VLS_270 = __VLS_pickFunctionalComponentCtx(__VLS_265, __VLS_267);
            (__VLS_264.slots).default;
            const __VLS_264 = __VLS_pickFunctionalComponentCtx(__VLS_259, __VLS_261);
        }
        (__VLS_190.slots).default;
        const __VLS_190 = __VLS_pickFunctionalComponentCtx(__VLS_185, __VLS_187);
    }
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
        __VLS_styleScopedClasses['team-head-lg'];
        __VLS_styleScopedClasses['t0'];
        __VLS_styleScopedClasses['t1'];
        __VLS_styleScopedClasses['mx-6'];
        __VLS_styleScopedClasses['player{{'];
        __VLS_styleScopedClasses['n'];
        __VLS_styleScopedClasses['}}'];
        __VLS_styleScopedClasses['player-rows'];
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
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['ml-0'];
        __VLS_styleScopedClasses['pl-0'];
        __VLS_styleScopedClasses['align-self-center'];
        __VLS_styleScopedClasses['ma-2'];
        __VLS_styleScopedClasses['ml-2'];
        __VLS_styleScopedClasses['mt-16'];
        __VLS_styleScopedClasses['t0'];
        __VLS_styleScopedClasses['mx-6'];
        __VLS_styleScopedClasses['player{{'];
        __VLS_styleScopedClasses['n'];
        __VLS_styleScopedClasses['}}'];
        __VLS_styleScopedClasses['player-rows'];
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
        __VLS_styleScopedClasses['t1'];
        __VLS_styleScopedClasses['mt-4'];
        __VLS_styleScopedClasses['mx-6'];
        __VLS_styleScopedClasses['player{{'];
        __VLS_styleScopedClasses['n'];
        __VLS_styleScopedClasses['}}'];
        __VLS_styleScopedClasses['player-rows'];
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
                AlertSnackBar: AlertSnackBar,
                Players: Players,
                nick: nick,
                width: width,
                teams: teams,
                snackbar_visibility: snackbar_visibility,
                snackbar_text: snackbar_text,
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