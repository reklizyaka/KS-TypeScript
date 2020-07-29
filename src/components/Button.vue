<template>
  <button @click="callback($event)" class="button">
    <slot></slot>
  </button>
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
.button {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

.edit-btn {
  margin: 5px 0 0 130px;
}

.remove-btn {
  margin: 0 10px 0 15px;
}

.icon {
  width: 30px;
  height: 30px;
  padding: 5px;
}
</style>
