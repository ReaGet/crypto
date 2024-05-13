<script setup lang="ts">
import { ref } from 'vue';

const { setSymbol, changeLog } = useSymbolStore();

const symbols = [
  "BTCUSDT",
  "BNBBTC",
  "ETHBTC",
];

const format = useDateFormatter({
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

const currentSymbol = ref(symbols[0]);
let prevSymbol = currentSymbol.value;
</script>

<template>
  <v-container class="pt-16">
    <v-row class="pb-10">
      <h1 class="text-2xl font-bold">Settings</h1>
    </v-row>
    <v-row>
      <v-select
        label="Валютная пара"
        :items="symbols"
        v-model="currentSymbol"
        @update:modelValue="(value) => {
          setSymbol(value, prevSymbol);
          prevSymbol = value;
        }"
        variant="outlined"
        class="max-w-[320px]"
      ></v-select>
    </v-row>
    <v-row class="flex-col mt-16">
      <span class="font-semibold">Change Log</span>
      <div class="flex flex-col gap-4 p-4 mt-2 border rounded-sm max-h-[400px] overflow-y-auto">
        <div
          v-if="changeLog.length > 0"
          v-for="{ from, to, timestamp } in changeLog"
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