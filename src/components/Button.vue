<template>
  <button @click="callback($event)"></button>
</template>

<script lang="ts">
import { Vue, Prop, Emit } from "vue-property-decorator";

export default class Button extends Vue {
  public callback(e: any) {
    this.$emit("click", e);
  }
}
</script>

<style scoped>
button {
  padding: 4px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
}
</style>
