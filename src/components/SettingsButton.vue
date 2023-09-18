<script setup lang="ts"></script>

<template>
  <button class="settings-btn"><slot></slot></button>
</template>

<style>
.settings-btn {
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
.settings-btn:hover {
  opacity: 0.8;
}
.settings-btn:active {
  transform: scale(0.98);
}
</style>
