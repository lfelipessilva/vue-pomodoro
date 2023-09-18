<script setup lang="ts">
import MainButton from './components/MainButton.vue'
import SettingsButton from './components/SettingsButton.vue'
import TimeCounter from './components/TimeCounter.vue'

import { timer } from './store/timer.js'

function addZeroToDate(date: number) {
  if (date < 10) {
    return `0${date}`
  }
  return date
}
</script>

<template>
  <main>
    <section class="mode-selector">
      <SettingsButton
        :class="{ active: timer.mode === 'pomodoro' }"
        @click="timer.changeMode('pomodoro')"
      >
        Pomodoro
      </SettingsButton>
      <SettingsButton
        class="btn"
        :class="{ active: timer.mode === 'short' }"
        @click="timer.changeMode('short')"
      >
        Short break
      </SettingsButton>
      <SettingsButton
        class="btn"
        :class="{ active: timer.mode === 'long' }"
        @click="timer.changeMode('long')"
      >
        Long break
      </SettingsButton>
    </section>
    <TimeCounter>
      {{ addZeroToDate(new Date(timer.timer).getMinutes()) }}:{{
        addZeroToDate(new Date(timer.timer).getSeconds())
      }}
    </TimeCounter>
    <MainButton @click="timer.start()" v-if="timer.state === 'idle'">START</MainButton>
    <MainButton @click="timer.stop()" v-if="timer.state === 'running'">STOP</MainButton>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.mode-selector {
  display: flex;
  gap: 1rem;
}
</style>
./store/timer
