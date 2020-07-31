<template>
  <div class="login">
    <div class="wrapper">
      <div class="login-card">
        <img class="avatar" src="../assets/avatar.png" alt="user-icon" />
        <form class="log-form" @submit.prevent="checkForm" novalidate="true">
          <div class="form-inner-wr">
            <div class="input-wr">
              <input v-model="email" type="text" class="in" placeholder="Enter E-Mail" />
              <div v-if="errors.length" class="error">
                <p v-for="error in errors" :key="error">{{ error }}</p>
              </div>
            </div>
            <div class="submit">
              <input class="submit-btn" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const login = namespace("login");

@Component({})
class Login extends Vue {
  public errors!: string[];
  public email!: string;

  @login.Action actionSaveMail: any;
  created() {
    this.errors = [];
    this.email = "";
  }

  public checkForm() {
    this.errors = [];
    if (!this.email) {
      this.errors.push("email required.");
    } else if (!this.validEmail(this.email)) {
      this.errors.push("valid email required.");
    }
    if (!this.errors.length) {
      this.actionSaveMail(this.email);

      this.$router.push({ path: "/", name: "home" });
      localStorage.setItem("login", this.email);
    }
  }
  public validEmail(email: string) {
    const re: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
export default Login;
</script>

<style scoped>
.login {
  position: fixed;
  height: 100vh;
  width: 100vw;
}
.wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-card {
  width: 370px;
  height: 450px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  box-shadow: 0px 12px 24px 0px rgba(40, 43, 49, 0.16);
}
.avatar {
  height: 150px;
  width: 150px;
}
.form-inner-wr {
  text-align: center;
  width: 200px;
}

.in {
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

.submit {
  margin-top: 30px;
}

.submit-btn {
  width: 100%;
  height: 40px;
  background: transparent;
  border-radius: 15px;
  box-shadow: 0px 6px 12px 0px rgba(40, 43, 49, 0.08);
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
  transition: 250ms ease-out;
}

.error {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
@media (max-width: 420px) {
  .login-card {
    width: 320px;
  }
}
@media (max-width: 320px) {
  .login-card {
    width: 270px;
    height: 390px;
  }
  .message {
    margin: 10px;
  }
}
</style>
