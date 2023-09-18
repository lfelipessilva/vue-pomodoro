<script setup lang="ts"></script>

<template>
  <button class="main-btn"><slot></slot></button>
</template>

<style>
.main-btn {
  background-color: cornflowerblue;
  border: 0;
  font-size: medium;
  border-radius: 0.3rem;
  padding: 0.5rem;
  color: beige;
  font-weight: 600;
  font-size: xx-large;
  width: 100%;
  cursor: pointer;
}
.main-btn:hover {
  opacity: 0.8;
}
.main-btn:active {
  transform: scale(0.98);
}
</style>
