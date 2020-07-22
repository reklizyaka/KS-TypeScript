<template>
  <form @submit.prevent="onSubmit(note)">
    <label for="title" class="label">Title</label>
    <input v-model="note.title" type="text" />
    <label for="textarea" class="label">Description</label>
    <textarea v-model="note.description"></textarea>
    <button>Submit</button>
  </form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class CreateEditForm extends Vue {
  // @Prop() value: Object;
  @Prop() onSubmit!: Function;

  public note: object;
  public title: string;
  public description: string;

  constructor() {
    super();
    this.note = {
      // title: this.value ? this.value.title : "",
      // description: this.value ? this.value.description : "",
    };
    this.title = "";
    this.description = "";
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
