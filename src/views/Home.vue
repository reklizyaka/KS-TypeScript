<template>
  <div>
    <div class="main">
      <div class="header">
        <p class="user">{{ userEmail }}</p>
        <button @click="logout()" class="logout">Log Out</button>
      </div>
      <div class="task-board">
        <div class="task-card">
          <ListNotes :notes="notes" :onEdit="setEditMode" :onRemove="remove" />
        </div>
        <button class="add-btn" @click="toggleModal(true)">+</button>
      </div>
      <Drawer
        :addAction="add"
        :editAction="editComplete"
        :data="editNote"
        v-if="showModal"
        @close="toggleModal(false)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import shortid from "shortid";

import Drawer from "../components/Drawer.vue";
import ListNotes from "@/components/ListNotes.vue";

import { Vue, Component } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const tasks = namespace("tasks");

interface Note {
  id?: any;
  title?: string;
  description?: string;
}

@Component({
  components: { Drawer, ListNotes },
})
export default class Home extends Vue {
  public notes: Note[];
  public showModal: boolean;
  public editNote: Note | null | undefined;
  public userEmail: string;
  public parsedString: string;

  @tasks.Action actionSaveTask: any;
  @tasks.Action actionRemoveTask: any;
  @tasks.Action actionRemoveAll: any;
  @tasks.Action actionEditTask: any;
  @tasks.Getter getKokoko: any;
  @tasks.Getter GET_TASK: any;

  constructor() {
    super();
    this.showModal = false;
    this.userEmail = localStorage.getItem("login") || "";
    this.parsedString = localStorage.getItem("notes") || "";
    this.notes = this.parsedString ? JSON.parse(this.parsedString) : [];
  }

  public created() {
    if (!localStorage.getItem("login")) {
      this.$router.push({ path: "/login", name: "login" });
    }
  }
  public add(note: object) {
    const { title, description }: any = note;
    const newNote: Note = {
      id: shortid(),
      title,
      description,
    };

    this.notes.push(newNote);
    this.GET_TASK;
    console.log(this.GET_TASK);
    console.log(this.getKokoko);
    this.actionSaveTask(this.notes);
    this.GET_TASK;

    this.save();
    this.toggleModal(false);
  }
  public setEditMode(value: string | null) {
    this.toggleModal(true);
    this.editNote = value ? this.notes.find(({ id }) => id === value) : null;
  }
  public editComplete(note: object) {
    if (this.editNote) {
      const id = this.editNote.id;
      const index = this.getNoteById(id);
      this.notes.splice(index, 1, { id, ...note });
      this.setEditMode(null);
      this.GET_TASK;
      this.actionEditTask(index, note);
      console.log(note);

      this.save();
      this.toggleModal(false);
    }
  }
  public remove(id: string) {
    const index = this.getNoteById(id);
    this.notes.splice(index, 1);
    this.actionRemoveTask(index, 1);
    this.save();
  }
  public save() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }
  public logout() {
    this.actionRemoveAll(this.notes);
    localStorage.removeItem("login");
    localStorage.removeItem("notes");
    this.$router.push({ path: "/login", name: "login" });
  }
  public getNoteById(id: string) {
    return this.notes.findIndex(({ id: noteId }) => noteId === id);
  }
  public toggleModal(value: boolean) {
    this.showModal = value;
  }
}
</script>

<style scoped>
.main {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  z-index: 101;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #c6ccd8;
  background-color: #fff;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 50px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user {
  color: #b9bdc3;
  font-size: 24px;
}

.logout {
  width: 100px;
  height: 100%;
  border-radius: 10px;
  border: 0.5px solid #b9bdc3;
  background: transparent;
  font-size: 17px;
  font-weight: 500;
  color: #b9bdc3;
}

.add-btn {
  width: 70px;
  height: 70px;
  position: absolute;
  right: 50px;
  bottom: 50px;
  background: #c6ccd8;
  border-radius: 100%;
  border: 3px solid #c6ccd8;
  color: #fff;
  font-size: 50px;
}

.task-board {
  position: relative;
  min-height: 500px;
  background-color: #fff;
  border: 2px solid #c6ccd8;
  border-radius: 15px;
  overflow: hidden;
  padding: 30px;
  margin: 70px 16px 30px;
}

.task-card {
  width: 100%;
  height: 100%;
}

.task-list {
  height: 100%;
  max-width: 1013px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.task-list > li {
  margin: 0;
  padding: 0;
}
</style>
