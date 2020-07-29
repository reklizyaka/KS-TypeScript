<template>
  <div class="drawer-mask">
    <div class="draver__overlay" @click="onClose"></div>
    <div class="drawer-container">
      <div class="drawer-body">
        <CreateEditForm :data="editTask" />
      </div>
      <div class="drawer-footer">
        <button class="close-btn" @click="onClose">X</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CreateEditForm from "./CreateEditForm.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import { mapState } from "vuex";

const tasks = namespace("tasks");

@Component({
  components: { CreateEditForm },
  computed: {
    ...mapState("tasks", ["editTask"]),
  },
})
export default class Drawer extends Vue {
  onClose() {
    this.$emit("close");
  }
}
</script>

<style scoped>
.drawer-body {
  margin: 20px 0;
}

.drawer-mask {
  position: fixed;
  z-index: 100;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: table;
  transition: opacity 0.3s ease;
}

.draver__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 19;
  background-color: rgba(0, 0, 0, 0.5);
}

.drawer-container {
  position: relative;
  z-index: 20;
  width: 300px;
  height: 100%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.drawer-header,
.drawer-body {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
}

.label {
  margin-left: 15px;
}

.title {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  background: transparent;
  outline: none;
  border: 1px solid #e7e8ea;
  border-radius: 6px;
  background-color: #f8f9fa;
  font-size: 17px;
  padding: 0 15px;
  box-sizing: border-box;
  color: #000;
}

.drawer-footer {
  text-align: center;
  box-sizing: border-box;
  margin-top: 70px;
}

.close-btn {
  width: 45px;
  height: 45px;
  font-size: 30px;
  border-radius: 100%;
  font-weight: bold;
  padding: 0 10px;
  background-color: #fff;
  border: 1px solid #e7e8ea;
}
</style>
