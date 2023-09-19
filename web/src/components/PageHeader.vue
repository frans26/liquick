<template>
  <div class="w-full fixed px-6 py-4 bg-white shadow-sm">
    <div class="flex justify-between items-center">
      <slot name="left"></slot>

      <h4 class="flex-1 text-center text-2xl font-semibold">
        <slot></slot>
      </h4>

      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
