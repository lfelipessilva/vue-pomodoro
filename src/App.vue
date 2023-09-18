<script setup lang="ts">
import { ref } from 'vue'

type modeType = 'pomodoro' | 'short' | 'long'

let intervalId: any
const ONE_SECOND_IN_MILLISECONDS = 1 * 1000
const TWENTY_FIVE_MINUTES_IN_MILLISECONDS = 25 * 60 * 1000
const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000
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

  intervalId = setInterval(decrementCounter, 1000, changeCounter)
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
</script>

<template>
  <main>
    <section class="mode-selector">
      <button class="btn" :class="{ active: mode === 'pomodoro' }" @click="setMode('pomodoro')">
        Pomodoro
      </button>
      <button class="btn" :class="{ active: mode === 'short' }" @click="setMode('short')">
        Short break
      </button>
      <button class="btn" :class="{ active: mode === 'long' }" @click="setMode('long')">
        Long break
      </button>
    </section>
    <p class="counter">{{ new Date(counter).getMinutes() }}:{{ new Date(counter).getSeconds() }}</p>

    <div class="btn start" v-if="state === 'idle'">
      <button class="btn start" @click="startCounter">
        <p>START</p>
      </button>
    </div>
    <div class="btn start" v-else>
      <button class="btn start" @click="stopCounter">
        <p>STOP</p>
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.counter {
  font-size: 7rem;
}

.mode-selector {
  display: flex;
  gap: 1rem;
}

.btn {
  background-color: azure;
  border: 0;
  font-size: medium;
  border-radius: 0.3rem;
  padding: 0.5rem;
  cursor: pointer;
}
.active {
  background-color: cornflowerblue;
}
.btn:hover {
  opacity: 0.8;
}
.btn:active {
  transform: scale(0.98);
}

.start {
  color: beige;
  font-weight: 600;
  background-color: cornflowerblue;
  font-size: xx-large;
  width: 100%;
  cursor: pointer;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
