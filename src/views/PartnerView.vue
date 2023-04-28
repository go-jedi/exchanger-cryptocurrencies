<template>
  <div class="container">
    <div class="main-partners">
      <div class="main-partners-left">
        <div class="container-partners">
          <div class="main-partners-left__title">
            Условия для партнеров и постоянных клиентов
          </div>
          <div class="main-partners-left__one">
            1. При регистрации Вы получаете статус партнера. За каждый
            совершенный обмен по вашей партнерской ссылке вы получает
            вознаграждение в размере от 0,1% от суммы обмена.
          </div>
          <div class="main-partners-left__two">
            2. Мы сотрудничаем с мониторингами — условия на
            support@365change.biz.
          </div>
          <div class="main-partners-left__three">
            3. Данные условия могут изменяться в одностороннем порядке с
            обязательной публикацией на страницах сервиса обмена валют
            365change.biz.
          </div>
          <div class="main-partners-left__program">
            <router-link to="/faq">
              Часто задаваемые вопросы по партнерской программе.
            </router-link>
          </div>
        </div>
      </div>
      <div v-show="!personIsAuth" class="main-partners-right">
        <div class="main-partners-right__title">Авторизация</div>
        <form
          class="main-partners-right__form"
          @submit.prevent="authorizationSubmitForm"
        >
          <div class="main-partners-right__form_login">
            <input
              type="text"
              class="main-partners-right__form_login_input"
              @blur="$v.formAuthorization.email.$touch()"
              v-model.trim="formAuthorization.email"
              placeholder="Email"
            />
            <div
              class="invalid-feed"
              v-if="
                $v.formAuthorization.email.$error ||
                ($v.formAuthorization.email.$dirty &&
                  !$v.formAuthorization.email.required)
              "
            >
              Необходимо указать email
            </div>
            <div class="invalid-feed" v-if="!$v.formAuthorization.email.email">
              Пожалуйста введите Email адрес
            </div>
          </div>
          <div class="main-partners-right__form_password">
            <input
              type="password"
              class="main-partners-right__form_password_input"
              @blur="$v.formAuthorization.password.$touch()"
              v-model.trim="formAuthorization.password"
              placeholder="Пароль"
            />
            <div
              class="invalid-feed"
              v-if="!$v.formAuthorization.password.minLength"
            >
              {{ minLengthText }}
            </div>
            <div
              class="invalid-feed"
              v-if="
                $v.formAuthorization.password.$error ||
                ($v.formAuthorization.password.$dirty &&
                  !$v.formAuthorization.password.required)
              "
            >
              Необходимо указать пароль
            </div>
          </div>
          <div class="main-partners-right__form_options">
            <router-link to="/recovery">Забыли пароль?</router-link>
            <router-link to="/register">Регистрация</router-link>
          </div>
          <div class="main-partners-right__form_btn">
            <button
              type="submit"
              :disabled="isDisabledBtnSubmit"
              @click.prevent="authorizationSubmitForm"
            >
              Войти
            </button>
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
import { minLength, required, email } from "vuelidate/lib/validators";

import LoadingComponent from "@/components/LoadingComponent.vue";

export default {
  name: "partner-view",
  created() {
    if (localStorage.getItem("token")) {
      this.personIsAuth = true;
    } else {
      this.personIsAuth = false;
    }
  },
  data() {
    return {
      personIsAuth: false,
      formAuthorization: {
        email: "",
        password: "",
      },
      isDisabledBtnSubmit: false,
      minLengthText: "Минимальная длина 8 символов!",
      isLoading: false,
    };
  },
  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
      };
    },
    async authorizationSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        console.log("Success");
        try {
          this.isLoading = true;
          this.isDisabledBtnSubmit = true;
          const formData = {
            email: this.formAuthorization.email,
            password: this.formAuthorization.password,
          };
          const resultAuthorization = await this.$store.dispatch(
            "authorization",
            formData
          );

          if (
            resultAuthorization.message === "Пользователь успешно авторизовался"
          ) {
            this.isLoading = false;
            this.$alert(`${resultAuthorization.message}`, "Авторизация", {
              confirmButtonText: "На домашнюю страницу",
              callback: () => {
                this.isDisabledBtnSubmit = false;
                this.$router.push("/");
                this.$router.go(0);
              },
            });
          } else if (
            resultAuthorization.message === "Неправильный логин или пароль"
          ) {
            this.isLoading = false;
            this.$alert(`${resultAuthorization.message}`, "Авторизация", {
              confirmButtonText: "Попробовать ещё раз",
              callback: () => {
                this.isDisabledBtnSubmit = false;
                return;
              },
            });
          } else if (
            resultAuthorization.message ===
            "Пользователь с такой почтой не найден"
          ) {
            this.isLoading = false;
            this.$alert(`${resultAuthorization.message}`, "Авторизация", {
              confirmButtonText: "Попробовать ещё раз",
              callback: () => {
                this.isDisabledBtnSubmit = false;
                return;
              },
            });
          }
        } catch (error) {
          this.isLoading = false;
          this.isDisabledBtnSubmit = false;
          console.log(
            "Error in authorizationSubmitForm in LoginView func -->",
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
    formAuthorization: {
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8),
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

// Страница партнеров
.main-partners {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 25px 30px;
}

.container-partners {
  max-width: 610px;
}

.main-partners-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-partners-left__one {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-partners-left__two {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-partners-left__three {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-partners-left__program > a {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #ffc512;
  text-decoration: none;
}

.main-partners-left__program > a:hover {
  color: #000;
  text-decoration: underline;
}

.main-partners-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

.main-partners-right__form_login {
  padding: 0 0 20px 0;
}

.main-partners-right__form_login_input {
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

.main-partners-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-partners-right__form_password {
  padding: 0 0 20px 0;
}

.main-partners-right__form_password_input {
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

.main-partners-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-partners-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-partners-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-partners-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-partners-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-partners-right__form_btn > button {
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

.main-partners-right__form_btn > button:hover {
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

  //   Страница партнеров
  .main-partners {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-partners-right {
    margin-top: 60px;
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

  // Страница партнеров
  .main-partners-left__title {
    font: 300 18px/26px "Segoe UI";
  }

  .main-partners-left__one {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__two {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__three {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__program > a {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-right__form_login_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-partners-right__form_password_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-partners-right__title {
    font: 600 16px/20px "Segoe UI";
  }

  .main-partners-right__form_btn > button {
    font: 100 12px/40px "Segoe UI", serif;
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

  //   Страница партнеров
  .main-partners-left__one {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__two {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__three {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-partners-left__program > a {
    font: 9px/1.5em "Segoe UI", sans-serif;
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
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
  }
}
</style>