<script setup lang="ts">
withDefaults(defineProps<{
  data: [number, number][] | []
}>(), {
  data: () => []
});
</script>

<template>
  <div class="flex flex-col flex-1 border border-[#666666] rounded-sm">
    <div class="flex px-4 py-2 border-b">
      <div class="flex-1 shrink-0">Price</div>
      <div class="hidden sm:flex flex-1 shrink-0 text-right">Quantity</div>
      <div class="flex-1 shrink-0 text-right">Total</div>
    </div>
    <div class="flex flex-col">
      <div
        v-for="([price, qty], index) in data"
        class="flex px-4 py-1"
        :class="{ 'bg-gray-50': index % 2 }"
      >
        <div class="flex-1 shrink-0">{{ price }}</div>
        <div class="hidden sm:flex flex-1 shrink-0 text-right">{{ qty }}</div>
        <div class="flex-1 shrink-0 text-right">{{ (price * qty).toFixed(5) }}</div>
      </div>
    </div>
  </div>
</template>