<script setup>
defineProps(['title','index','startdrag'])


defineEmits(['remove'])
</script>

<template>
        <v-chip @dragstart="startdrag($event,index)"  @click:close="$emit('remove')" closable label :draggable="true" class="px-5 mr-2 mt-2" variant="outlined" size="large">
                <v-icon icon="mdi-account-circle"></v-icon>
            <span class="pr-12 pl-2">{{ title }}</span>     
        </v-chip>
</template>