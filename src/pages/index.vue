<script setup lang="ts">
const { loadDeals, asks, bids } = useCurrencyStore();
const { currentSymbol } = useSymbolStore();
const currentLimit = ref(100);

await loadDeals(currentSymbol, currentLimit.value);

const computedAsks = computed(() => {
  return asks?.slice(0, currentLimit.value);
});

const computedBids = computed(() => {
  return bids?.slice(0, currentLimit.value);
});

</script>

<template>
  <v-container class="mt-10">
    <v-row>
      <v-select
        v-model="currentLimit"
        class="max-w-[320px]"
        label="Кол-во элементов в таблице"
        :items="[100, 500, 1000]"
        variant="outlined"
      ></v-select>
    </v-row>
    <v-row class="gap-1 sm:gap-4">
      <DealTable :data="computedAsks"/>
      <DealTable :data="computedBids" />
    </v-row>
  </v-container>
</template>