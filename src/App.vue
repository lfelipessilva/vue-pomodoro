<script setup lang="ts">
</script>

<template>
  <main>
    <section class="mode-selector">
      <button class="btn">Pomodoro</button>
      <button class="btn">Short break</button>
      <button class="btn">Long break</button>
    </section>
    <p class="counter">25:00</p>
    <button class="btn start">START</button>
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
