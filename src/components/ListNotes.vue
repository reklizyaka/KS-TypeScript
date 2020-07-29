<template>
  <ol class="task-list">
    <li v-bind:key="task.id" v-for="task in tasks">
      <section class="task-btns">
        <Button @click="onEdit(task.id)" class="edit-btn">
          <img class="icon" src="../../public/edit.png" alt="Edit" />
        </Button>
        <Button @click="onRemove(task.id)" class="remove-btn">
          <img class="icon" src="../../public/remove.png" alt="Remove" />
        </Button>
      </section>
      <hr />
      <div class="task-content">
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-desc">{{ task.description }}</p>
      </div>
    </li>
  </ol>
</template>

<script lang="ts">
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
hr {
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
