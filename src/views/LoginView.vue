<template>
  <div class="container">
    <div class="main-login">
      <div class="main-login-left">
        <div class="container-login">
          <div class="main-login-left__title">Авторизация</div>
          <div class="main-login-left__info">
            Если вы уже являетесь зарегистрированным пользователем нашего сайта,
            выполните вход, используя следующую форму авторизации:
          </div>
          <LoginComponent @isLoadingBehavior="loadingBehaviorNeed" />
          <div class="main-login-left__regtitle">Регистрация</div>
          <div class="main-login-left__regtext">
            Для регистрации в кабинете, пройдите
            <a href="#">по этой ссылке</a> и заполните простую форму. Перед
            регистрацией вам будет необходимо ознакомиться с условиями работы и
            принять пользовательское соглашение.
          </div>
          <div class="main-login-left__partnertitle">Партнёрам</div>
          <div class="main-login-left__partnertext">
            Мы предлагаем вам зарегистрироваться в личном кабинет, чтобы
            активировать накопительную систему скидок, отслеживать статус ваших
            заявок и статистику обменов.
          </div>
          <div class="main-login-left__otherstext">
            Также мы предлагает вам поучаствовать в партнерской программе по
            привлечению клиентов. Зарегистрировавшись в нашей партнерской
            программе, вы будете получать процент от суммы обмена. После
            регистрации вы получите на выбор большое количество различных
            промо-материалов (тексты, баннеры), а также файл экспорта курсов для
            мониторингов. Все, что потребуется – это приглашать посетителей на
            наш сайт, размещая промо-материалы на своих домашних страницах,
            блогах, форумах, сервисах вопросов и ответов, досках объявлений и на
            других ресурсах. Ваша ссылка будет содержать уникальный код, который
            позволит определить, что посетитель пришел по ссылке именно от вас.
          </div>
        </div>
      </div>
      <div class="main-login-right">
        <div class="main-login-right__title">Авторизация</div>
        <form
          class="main-login-right__form"
          @submit.prevent="authorizationSubmitForm"
        >
          <div class="main-login-right__form_login">
            <input
              type="text"
              class="main-login-right__form_login_input"
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
          <div class="main-login-right__form_password">
            <input
              type="password"
              class="main-login-right__form_password_input"
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
          <div class="main-login-right__form_options">
            <router-link to="/recovery">Забыли пароль?</router-link>
            <router-link to="/register">Регистрация</router-link>
          </div>
          <div class="main-login-right__form_btn">
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
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "login-view",
  data() {
    return {
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
    loadingBehaviorNeed(value) {
      this.isLoading = value;
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
    LoginComponent,
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

// Cтраница входа в кабинет:
.container-login {
  max-width: 610px;
}

.main-login {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 25px 30px;
}

.main-login-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-login-left__info {
  padding: 0 0 20px;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-login-left__form_login {
  padding: 8px 0;
}

.main-login-left__form_login_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-login-left__form_login_label > span {
  color: #ff0000;
}

.main-login-left__form_login_input > input {
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

.main-login-left__form_login_input > input:focus {
  border: 1px solid #00cccb;
}

.main-login-left__form_password {
  padding: 8px 0;
}

.main-login-left__form_password_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-login-left__form_password_label > span {
  color: #ff0000;
}

.main-login-left__form_password_input > input {
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

.main-login-left__form_password_input > input:focus {
  border: 1px solid #00cccb;
}

.main-login-left__form_options {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.main-login-left__form_options_btn > button {
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

.main-login-left__form_options_btn > button:hover {
  background: #ffc512;
}

.main-login-left__form_options_opt {
  margin-left: 20px;
}

.main-login-left__form_options_opt > div {
  cursor: pointer;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #ffc512;
}

.main-login-left__form_options_opt > div:hover {
  text-decoration: underline;
  color: #000;
}

.main-login-left__regtitle {
  margin: 20px 0 10px 0;
  font: 600 15px "Segoe UI";
  color: #929292;
}

.main-login-left__regtext {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-login-left__regtext > a {
  text-decoration: none;
  text-transform: none;
  color: #ffc512;
}

.main-login-left__regtext > a:hover {
  text-decoration: underline;
  color: #000;
}

.main-login-left__partnertitle {
  margin: 20px 0 10px 0;
  font: 600 15px "Segoe UI";
  color: #929292;
}

.main-login-left__partnertext {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-login-left__otherstext {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-login-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

.main-login-right__form_login {
  padding: 0 0 20px 0;
}

.main-login-right__form_login_input {
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

.main-login-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-login-right__form_password {
  padding: 0 0 20px 0;
}

.main-login-right__form_password_input {
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

.main-login-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-login-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-login-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-login-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-login-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-login-right__form_btn > button {
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

.main-login-right__form_btn > button:hover {
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

  //   Страница входа в кабинет
  .container-login {
    max-width: 754px;
  }

  .main-login {
    flex-wrap: wrap;
  }

  .main-login-left__info {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__form_login_input > input {
    width: 100%;
  }

  .main-login-left__form_password_input > input {
    width: 100%;
  }

  .main-login-left__form_options_btn > button {
    border-radius: 6px;
    height: auto;
    font: 100 16px / normal "Segoe UI", serif;
    padding: 14px 30px;
    width: 100%;
  }

  .main-login-left__form_options_opt > div {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-right {
    margin-top: 50px;
    width: 100%;
  }

  .main-login-right__form_login_input {
    width: 100%;
  }

  .main-login-right__form_password_input {
    width: 100%;
  }

  .main-login-right__form_btn > button {
    width: 100%;
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

  //   Страница Входа в кабинет
  .container-login {
    max-width: 754px;
  }

  .main-login {
    flex-wrap: wrap;
  }

  .main-login-left__info {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__form_login_input > input {
    width: 100%;
  }

  .main-login-left__form_password_input > input {
    width: 100%;
  }

  .main-login-left__form_options_btn > button {
    border-radius: 6px;
    height: auto;
    font: 100 16px / normal "Segoe UI", serif;
    padding: 14px 30px;
    width: 100%;
  }

  .main-login-left__form_options_opt > div {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-right {
    margin-top: 50px;
    width: 100%;
  }

  .main-login-right__form_login_input {
    width: 100%;
  }

  .main-login-right__form_password_input {
    width: 100%;
  }

  .main-login-right__form_btn > button {
    width: 100%;
  }
}

@media (max-width: 780px) {
  .container {
    max-width: 705.89px;
  }

  //   Страница входа в кабинет

  .container-login {
    max-width: 720px;
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

  //   Страница входа в кабинет
  .container-login {
    max-width: 548px;
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

  //   Cnраница входа в кабинет
  .container-login {
    max-width: 460px;
  }
}

@media (max-width: 428px) {
  .container {
    max-width: 390px;
  }

  //   Страница входа в кабинет
  .main-login {
    padding: 40px 0 0;
  }

  .container-login {
    max-width: 390px;
  }

  .main-login-left__title {
    font: 300 18px/26px "Segoe UI";
  }

  .main-login-left__info {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__form_login {
    padding: 5px 0;
  }

  .main-login-left__form_login_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-login-left__form_password {
    padding: 5px 0;
  }

  .main-login-left__form_password_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-login-left__form_options_btn > button {
    font: 100 13px / normal "Segoe UI", serif;
    padding: 14px 30px;
  }

  .main-login-left__form_options_opt > div {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__regtitle {
    font: 600 13px "Segoe UI";
  }

  .main-login-left__regtext {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__partnertitle {
    font: 600 13px "Segoe UI";
  }

  .main-login-left__partnertitle {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-left__otherstext {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-right__title {
    font: 600 13px "Segoe UI";
  }

  .main-login-right__form_login_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-login-right__form_password_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-login-right__form_options > a {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-login-right__form_btn > button {
    font: 100 13px/40px "Segoe UI", serif;
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

  //   Страница входа в кабинет
  .container-login {
    max-width: 360px;
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

  //   Страница входа в кабинет
  .main-login {
    padding: 20px 0 0;
  }

  .container-login {
    max-width: 340px;
  }

  .main-login-left__title {
    font: 300 15px/26px "Segoe UI";
  }
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
  }

  //   Страница входа в кабинет
  .container-login {
    max-width: 300px;
  }
}
</style>
