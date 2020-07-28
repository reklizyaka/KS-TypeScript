<template>
  <div>
    <div class="main">
      <div class="header">
        <p class="user">{{ userEmail }}</p>
        <button @click="logout()" class="logout">Log Out</button>
      </div>
      <div class="task-board">
        <div class="task-card">
          <ListNotes />
        </div>
        <button class="add-btn" @click="actionToggleModal(true)">+</button>
      </div>
      <Drawer v-if="isShowModal" @close="actionToggleModal(false)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { mapState } from "vuex";
import shortid from "shortid";

import Drawer from "@/components/Drawer.vue";
import ListNotes from "@/components/ListNotes.vue";

const tasks = namespace("tasks");

@Component({
  components: { Drawer, ListNotes },
  computed: {
    ...mapState("tasks", ["isShowModal"]),
  },
})
export default class Home extends Vue {
  private userEmail: string;

  @tasks.Action actionCreateTaskList: any;
  @tasks.Action actionRemoveAll: any;
  @tasks.Action actionToggleModal: any;

  constructor() {
    super();
    this.userEmail = localStorage.getItem("login") || "";
  }

  public created() {
    if (!localStorage.getItem("login")) {
      this.$router.push({ path: "/login", name: "login" });
    }
    this.actionCreateTaskList(
      JSON.parse(localStorage.getItem("notes") || "[]")
    );
  }

  public logout() {
    this.actionRemoveAll();
    this.$router.push({ path: "/login", name: "login" });
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
