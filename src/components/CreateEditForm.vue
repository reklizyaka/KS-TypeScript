<template>
  <form @submit.prevent="onSubmit()">
    <label class="label">
      <span>Title</span>
      <input v-model="title" type="text" />
    </label>
    <label class="label">
      <span>Description</span>
      <textarea v-model="description"></textarea>
    </label>
    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { ITask } from "../interfaces";
import shortid from "shortid";

const tasks = namespace("tasks");

@Component({})
export default class CreateEditForm extends Vue {
  @Prop() data: ITask | null | undefined;
  title: string;
  description: string;

  @tasks.Action actionCreateTask: any;
  @tasks.Action actionToggleModal: any;
  @tasks.Action actionSaveEdit: any;
  @tasks.Action actionClearEditTask: any;

  constructor() {
    super();
    this.title = this.data?.title || "";
    this.description = this.data?.description || "";
  }

  public onSubmit() {
    const { title, description } = this;

    if (!this.data) {
      this.actionCreateTask({
        title,
        id: shortid(),
        description,
      });
    } else {
      const { id = "" }: any = this.data;

      this.actionSaveEdit({
        title,
        description,
        id,
      });
    }
    this.actionClearEditTask();
    this.actionToggleModal(false);

    // this.GET_EDIT ? this.actionSetEdit() : this.actionCreateTask();
  }
}
</script>

<style scoped>
input {
  width: 80%;
  font-size: 14px;
  margin: 0 0.5em;
  border-radius: 2em;
  padding: 0.75em 1.5em;
  background: none;
  border: #e3e3e3 1px solid;
  transition: border 250ms ease-out;
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

textarea {
  height: 120px;
  resize: none;
  background-color: #f8f9fa;
  border: 1px solid #e7e8ea;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 17px;
  text-align: left;
  box-sizing: border-box;
  color: #000;
  width: 100%;
  max-width: 100%;
  padding: 5px 0 5px 5px;
  font-family: "Gilroy", sans-serif;
  border: 2px solid #2f485811;
  border-radius: 4px;
}
</style>
