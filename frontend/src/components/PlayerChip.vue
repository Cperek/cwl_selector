<script setup>
defineProps(['title','index','startdrag'])


defineEmits(['remove'])
</script>

<template>
    <v-chip-group>
        <v-chip @dragstart="startdrag($event,index)"  @click:close="$emit('remove')" closable label :draggable="true" class="px-5" variant="outlined" size="large">
            <v-avatar size="20" start color="surface-variant">
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <span class="pr-12 pl-2">{{ title }}</span>     
        </v-chip>
    </v-chip-group>
</template>