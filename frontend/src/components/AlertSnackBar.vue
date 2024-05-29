<script setup lang="ts">

const props = defineProps({
  text: String,
  show: Boolean,
  timeout: Number,
});
const emit = defineEmits(['update']);

</script>

<template>
  <div class="text-center">
    <v-snackbar
      v-model="props.show"
      color="orange-accent-4"
      variant="outlined"
      open-delay="500"
    >
      {{ props.text }}

      <template v-slot:actions>
        <v-btn
            color="orange-accent-4"
            variant="tonal"
          @click="emit('update', false);"
        >
          Zamknij
        </v-btn>
      </template>

    </v-snackbar>
  </div>
</template>