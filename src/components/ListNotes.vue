<template>
  <ol class="task-list">
    <li v-bind:key="task.id" v-for="task in tasks">
      <section class="task-btns">
        <Button @click="onEdit(task.id)" class="edit-btn" />
        <Button @click="onRemove(task.id)" class="remove-btn" />
      </section>
      <hr />
      <div class="task-content">
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-desc">{{ task.description }}</p>
      </div>
    </li>
  </ol>
</template>

<script lang = 'ts'>
import Button from "./Button.vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { mapState } from "vuex";

const tasks = namespace("tasks");

@Component({
  components: { Button },
  computed: {
    ...mapState("tasks", ["tasks"]),
  },
})
export default class ListNotes extends Vue {
  @tasks.Action actionRemoveTask: any;
  @tasks.Action actionEditTask: any;
  @tasks.Action actionToggleModal: any;

  onRemove(id: string) {
    this.actionRemoveTask(id);
  }

  onEdit(id: string) {
    this.actionEditTask(id);
    this.actionToggleModal(true);
  }
}
</script>

<style scoped>
.task-btns {
  padding: 5px 0;
}

.edit-btn,
.remove-btn {
  width: 30px;
  height: 30px;
  background: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.edit-btn {
  margin: 5px 0 0 130px;
  background-image: url("../../public/edit.png");
}

.remove-btn {
  margin: 0 10px 0 15px;
  background-image: url("../../public/remove.png");
}

hr {
  background-color: #2c3e50;
  border: 1px solid #2c3e50;
}

.task-title {
  padding: 0 15px;
}
.task-content {
  padding: 15px;
}

ol {
  display: flex;
  width: 100%;
  height: 50px;
  margin: 0 0;
}

ol > li {
  background: transparent;
  min-width: 50px;
  width: 25%;
  height: 45%;
  margin: 20px 30px;
  border-radius: 15px;
  border: 2px solid #2c3e50;
}
</style>
