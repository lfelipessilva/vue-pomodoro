import { reactive } from 'vue'

// type modeType = 'pomodoro' | 'short' | 'long'

let intervalId
const ONE_SECOND_IN_MILLISECONDS = 1 * 1000
const TWENTY_FIVE_MINUTES_IN_MILLISECONDS = 25 * 60 * 1000
const FIVE_MINUTES_IN_MILLISECONDS = 1 * 60 * 1000
const FIFTEEN_MINUTES_IN_MILLISECONDS = 15 * 60 * 1000

const order = ['pomodoro', 'short', 'pomodoro', 'short', 'pomodoro', 'long']
let orderIndex = 0

export const timer = reactive({
  timer: TWENTY_FIVE_MINUTES_IN_MILLISECONDS,
  state: 'idle',
  mode: 'pomodoro',
  start() {
    this.state = 'running'

    const decrementCounter = () => {
      this.timer -= ONE_SECOND_IN_MILLISECONDS

      if (this.timer === 0) {
        this.changeCounter()
      }
    }

    intervalId = setInterval(decrementCounter, 1000)
  },
  stop() {
    this.state = 'idle'
    clearInterval(intervalId)
    intervalId = null
  },
  changeMode(option) {
    this.mode = option
    switch (option) {
      case 'short':
        this.timer = FIVE_MINUTES_IN_MILLISECONDS
        break
      case 'long':
        this.timer = FIFTEEN_MINUTES_IN_MILLISECONDS
        break
      default:
        this.timer = TWENTY_FIVE_MINUTES_IN_MILLISECONDS
        break
    }
  },
  changeCounter() {
    orderIndex > order.length ? 0 : (orderIndex += 1)
    this.changeMode(order[orderIndex])
    clearInterval(intervalId)
    this.playBell()
    this.start()
  },
  playBell() {
    const audio = new Audio('/bell.wav')
    audio.loop = false
    audio.play()
  }
})
