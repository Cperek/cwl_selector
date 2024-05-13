<script setup>
defineProps(['title'])
defineEmits(['remove'])
</script>

<template>
    <v-chip-group>
        <v-chip  @click:close="$emit('remove')" closable label :draggable="true" class="px-5" variant="outlined" size="large">
            <v-avatar size="22" start color="surface-variant">
                <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
            <span class="pr-12 pl-2">{{ title }}</span>     
        </v-chip>
    </v-chip-group>
</template>