<script setup lang="ts">
import { ref } from 'vue';
import { useCurrencyStore } from '@/stores/currencyPairs';

const {
  currencyPairs,
  selectedCurrency,
  update,
  currencyChangeLog,
} = useCurrencyStore();

const format = useDateFormatter({
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

const currentCurrency = ref(selectedCurrency);
let prevCurrency = currentCurrency.value;
</script>

<template>
  <v-container class="pt-16">
    <v-row class="pb-10">
      <h1 class="text-2xl font-bold">Settings</h1>
    </v-row>
    <v-row>
      <v-select
        label="Валютная пара"
        :items="currencyPairs"
        v-model="currentCurrency"
        @update:modelValue="(value) => {
          update(value, prevCurrency);
          prevCurrency = value;
        }"
        variant="outlined"
        class="max-w-[320px]"
      ></v-select>
    </v-row>
    <v-row class="flex-col mt-16">
      <span class="font-semibold">Change Log</span>
      <div class="flex flex-col gap-4 p-4 mt-2 border rounded-sm max-h-[400px] overflow-y-auto">
        <div
          v-if="currencyChangeLog.length > 0"
          v-for="{ from, to, timestamp} in currencyChangeLog"
          :key="timestamp"
          class="text-lg"
        >
          <span class="text-sm bg-gray-100 p-1 rounded-lg">{{ format(timestamp) }}</span>: {{ from }} <span class="text-base">changed to</span> {{ to }}
        </div>
        <div
          v-else
          class="text-sm"
        >
          There are no items yet.
        </div>
      </div>
    </v-row>
  </v-container>
</template>