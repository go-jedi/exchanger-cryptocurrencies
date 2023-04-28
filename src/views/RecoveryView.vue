<template>
  <div class="container">
    <div class="main-recovery">
      <div class="main-recovery-left">
        <div class="container-recovery">
          <div class="main-recovery-left__title">ВОССТАНОВЛЕНИЕ ПАРОЛЯ</div>
          <form
            class="main-recovery-left__form"
            @submit.prevent="recoverySubmitForm"
          >
            <div class="main-recovery-left__form_name">
              <label
                class="main-recovery-left__form_name_label"
                for="recovery-email"
                >E-mail <span>*</span>:</label
              >
              <div class="main-recovery-left__form_name_input">
                <input
                  id="recovery-email"
                  type="text"
                  @blur="$v.formRecovery.email.$touch()"
                  v-model.trim="formRecovery.email"
                  placeholder="Email"
                />
                <div
                  class="invalid-feed"
                  v-if="
                    $v.formRecovery.email.$error ||
                    ($v.formRecovery.email.$dirty &&
                      !$v.formRecovery.email.required)
                  "
                >
                  Необходимо указать email
                </div>
                <div class="invalid-feed" v-if="!$v.formRecovery.email.email">
                  Пожалуйста введите Email адрес
                </div>
              </div>
            </div>
            <div class="main-recovery-left__form_btn">
              <button
                type="submit"
                :disabled="isDisabledBtnSubmit"
                @click.prevent="recoverySubmitForm"
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="main-recovery-right">
        <div class="main-recovery-right__title">Авторизация</div>
        <form class="main-recovery-right__form">
          <div class="main-recovery-right__form_login">
            <input
              class="main-recovery-right__form_login_input"
              type="text"
              placeholder="Логин"
            />
          </div>
          <div class="main-recovery-right__form_password">
            <input
              class="main-recovery-right__form_password_input"
              type="password"
              placeholder="Пароль"
            />
          </div>
          <div class="main-recovery-right__form_options">
            <router-link to="/recovery">Забыли пароль?</router-link>
            <router-link to="/register">Регистрация</router-link>
          </div>
          <div class="main-recovery-right__form_btn">
            <button type="submit">Войти</button>
          </div>
        </form>
      </div>
    </div>
    <div v-if="isLoading">
      <LoadingComponent />
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  name: "recovery-view",
  data() {
    return {
      formRecovery: {
        email: "",
      },
      isDisabledBtnSubmit: false,
      isLoading: false,
    };
  },
  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
      };
    },
    async recoverySubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        try {
          this.isLoading = true;
          this.isDisabledBtnSubmit = true;
          const formData = {
            email: this.formRecovery.email,
          };

          const resultRecovery = await this.$store.dispatch(
            "recovery",
            formData
          );
          if (resultRecovery.message === "Успешное восстановление пароля") {
            this.isLoading = false;
            this.$alert(
              `На вашу почту ${this.formRecovery.email} отправлен новый пароль`,
              "Успешное восстановление пароля",
              {
                confirmButtonText: "Продолжить",
                callback: () => {
                  this.isDisabledBtnSubmit = false;
                  this.$router.push("/login");
                  this.$router.go(0);
                },
              }
            );
          } else if (
            resultRecovery.message === "Пользователь с данным email не найден"
          ) {
            this.isLoading = false;
            this.$alert(
              `${resultRecovery.message}`,
              "Успешное восстановление пароля",
              {
                confirmButtonText: "Попробовать ещё раз",
                callback: () => {
                  this.isDisabledBtnSubmit = false;
                  return;
                },
              }
            );
          }
        } catch (error) {
          this.isLoading = false;
          console.log(
            "Error in recoverySubmitForm in RecoveryView func -->",
            error
          );
        }
      }
    },
  },
  components: {
    LoadingComponent,
  },
  validations: {
    formRecovery: {
      email: {
        email,
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}

//
.main-recovery {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 65px 30px;
}

.container-recovery {
  max-width: 610px;
}

.main-recovery-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-recovery-left__form_name {
  padding: 8px 0;
}

.main-recovery-left__form_name_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-recovery-left__form_name_label > span {
  color: #ff0000;
}

.main-recovery-left__form_name_input > input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 200px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-recovery-left__form_name_input > input:focus {
  border: 1px solid #00cccb;
}

.main-recovery-left__form_btn {
  margin-top: 8px;
}

.main-recovery-left__form_btn > button {
  transition: all 0.3s linear;
  box-sizing: border-box;
  border: none;
  background: #e4e4e4;
  height: 40px;
  font: 100 14px/40px "Segoe UI", serif;
  text-transform: uppercase;
  color: #000;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
}

.main-recovery-left__form_btn > button:hover {
  background: #ffc512;
}

.main-recovery-right {
  opacity: 0;
}

.main-recovery-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

.main-recovery-right__form_login {
  padding: 0 0 20px 0;
}

.main-recovery-right__form_login_input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 200px;
  padding: 0 10px;
  transition: all 0.3s linear;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-recovery-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-recovery-right__form_password {
  padding: 0 0 20px 0;
}

.main-recovery-right__form_password_input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 200px;
  padding: 0 10px;
  transition: all 0.3s linear;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-recovery-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-recovery-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-recovery-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-recovery-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-recovery-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-recovery-right__form_btn > button {
  cursor: pointer;
  transition: all 0.3s linear;
  box-sizing: border-box;
  border: none;
  background: #e4e4e4;
  height: 40px;
  font: 100 14px/40px "Segoe UI", serif;
  text-transform: uppercase;
  color: #000;
  padding: 0 30px;
  text-decoration: none;
}

.main-recovery-right__form_btn > button:hover {
  background: #ffc512;
}

.is-invalid {
  font-size: 12px;
  border: 1px solid #dc3545;
}

.invalid-feed {
  margin-top: 3px;
  font-size: 12px;
  color: #dc3545;
}

@media (max-width: 926px) {
  .container {
    max-width: 838px;
  }

  .main-recovery {
    flex-wrap: wrap;
  }
}

@media (max-width: 844px) {
  .container {
    max-width: 763px;
  }
}

@media (max-width: 834px) {
  .container {
    max-width: 754.77px;
  }
}

@media (max-width: 780px) {
  .container {
    max-width: 705.89px;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 695px;
  }
}

@media (max-width: 667px) {
  .container {
    max-width: 603px;
  }
}

@media (max-width: 568px) {
  .container {
    max-width: 514px;
  }

  .main-recovery {
    justify-content: center;
  }

  .main-recovery-right {
    margin-top: 50px;
  }

  .main-recovery-left__title {
    font: 300 20px/26px "Segoe UI";
  }

  .main-recovery-left__form_name_input > input {
    width: 100%;
  }

  .main-recovery-left__form_btn {
    display: flex;
    justify-content: center;
  }

  .main-recovery-right__title {
    display: flex;
    justify-content: center;
  }

  .main-recovery-left__form_name_input > input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-recovery-right__form_login_input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-recovery-right__form_password_input {
    font: 12px/40px "Segoe UI", sans-serif;
  }
}

@media (max-width: 480px) {
  .container {
    max-width: 452.5px;
  }
}

@media (max-width: 428px) {
  .container {
    max-width: 390px;
  }

  .main-recovery-left__form_name_input > input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-recovery-right__form_login_input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-recovery-right__form_password_input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-recovery-right__form_options > a {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }
}

@media (max-width: 414px) {
  .container {
    max-width: 380px;
  }
}

@media (max-width: 390px) {
  .container {
    max-width: 355px;
  }
}

@media (max-width: 375px) {
  .container-login {
    max-width: 355px;
  }
}

@media (max-width: 360px) {
  .container {
    max-width: 333px;
  }

  .main-recovery-left__title {
    font: 300 17px/26px "Segoe UI";
  }

  .main-recovery-right__title {
    font: 600 17px/20px "Segoe UI";
  }
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
  }
}
</style>