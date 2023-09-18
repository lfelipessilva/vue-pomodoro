<script setup lang="ts">
import { ref } from 'vue'

type modeType = 'pomodoro' | 'short' | 'long'

let intervalId: any
const ONE_SECOND_IN_MILLISECONDS = 1 * 1000
const TWENTY_FIVE_MINUTES_IN_MILLISECONDS = 25 * 60 * 1000
const FIVE_MINUTES_IN_MILLISECONDS = 1 * 60 * 1000
const FIFTEEN_MINUTES_IN_MILLISECONDS = 15 * 60 * 1000

const counter = ref(TWENTY_FIVE_MINUTES_IN_MILLISECONDS)
const state = ref('idle')
const mode = ref('pomodoro')

const order: modeType[] = ['pomodoro', 'short', 'pomodoro', 'short', 'pomodoro', 'long']
let orderIndex = 0

function playBell() {
  var audio = new Audio('/bell.wav')
  audio.loop = false
  audio.play()
}

function changeCounter() {
  orderIndex > order.length ? 0 : (orderIndex += 1)
  setMode(order[orderIndex])
  clearInterval(intervalId)
  playBell()
  startCounter()
}

function startCounter() {
  state.value = 'running'

  const decrementCounter = () => {
    counter.value -= ONE_SECOND_IN_MILLISECONDS

    if (counter.value === 0) {
      changeCounter()
    }
  }

  intervalId = setInterval(decrementCounter, 1000)
}

function stopCounter() {
  state.value = 'idle'
  clearInterval(intervalId)
  intervalId = null
}

function setMode(option: modeType) {
  mode.value = option
  switch (option) {
    case 'short':
      counter.value = FIVE_MINUTES_IN_MILLISECONDS
      break
    case 'long':
      counter.value = FIFTEEN_MINUTES_IN_MILLISECONDS
      break
    default:
      counter.value = TWENTY_FIVE_MINUTES_IN_MILLISECONDS
      break
  }
}

function addZeroToDate(date: number) {
  if (date < 10) {
    return `0${date}`
  }
  return date
}
import MainButton from './components/MainButton.vue'
import SettingsButton from './components/SettingsButton.vue'
import TimeCounter from './components/TimeCounter.vue'
</script>

<template>
  <main>
    <section class="mode-selector">
      <SettingsButton :class="{ active: mode === 'pomodoro' }" @click="setMode('pomodoro')">
        Pomodoro
      </SettingsButton>
      <SettingsButton class="btn" :class="{ active: mode === 'short' }" @click="setMode('short')">
        Short break
      </SettingsButton>
      <SettingsButton class="btn" :class="{ active: mode === 'long' }" @click="setMode('long')">
        Long break
      </SettingsButton>
    </section>
    <TimeCounter>
      {{ addZeroToDate(new Date(counter).getMinutes()) }}:{{
        addZeroToDate(new Date(counter).getSeconds())
      }}
    </TimeCounter>
    <MainButton @click="startCounter" v-if="state === 'idle'">START</MainButton>
    <MainButton @click="stopCounter" v-if="state === 'running'">STOP</MainButton>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.mode-selector {
  display: flex;
  gap: 1rem;
}
</style>
