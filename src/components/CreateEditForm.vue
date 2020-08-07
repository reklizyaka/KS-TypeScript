<template>
  <form @submit.prevent="onSubmit()">
    <label>
      <span class="span">Title</span>
      <input class="title form" v-model="title" type="text" />
    </label>
    <label>
      <span class="span">Description</span>
      <textarea class="desc form" v-model="description"></textarea>
    </label>
    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { ITask } from "../interfaces";
import shortid from "shortid";
// import { requests } from "@/store/requests";

const tasks = namespace("tasks");
const login = namespace("login");
// const requests = namespace("requests");

@Component({})
export default class CreateEditForm extends Vue {
  @Prop() data: ITask | null | undefined;
  author!: string;
  title!: string;
  description!: string;

  @tasks.Action requestAddNewTask: any;
  @tasks.Action actionToggleModal: any;
  @tasks.Action actionSaveEdit: any;
  @tasks.Action actionClearEditTask: any;
  @tasks.Action actionEditTask: any;
  @login.Getter getMail: any;

  created() {
    this.author = this.getMail;
    this.title = this.data?.title || "";
    this.description = this.data?.description || "";
  }

  public onSubmit() {
    const { title, description } = this;
    if (!this.data) {
      this.requestAddNewTask({
        author: this.getMail,
        id: shortid(),
        title,
        description,
      });
    } else {
      const { id = "" }: any = this.data;

      this.actionEditTask({
        title,
        description,
        id,
      });
    }
    this.actionClearEditTask();
    this.actionToggleModal(false);
  }
}
</script>

<style scoped>
.span {
  margin-left: 15px;
}

.form {
  font-family: "Gilroy", sans-serif;
  font-size: 17px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #e7e8ea;
  background-color: #f8f9fa;
  color: #000;
  background: transparent;
  padding: 5px 0 5px 5px;
  padding-left: 10px;
  box-sizing: border-box;
  max-width: 100%;
  margin-top: 10px;
}

.title {
  height: 40px;
}

.desc {
  height: 120px;
  resize: none;
}
</style>
