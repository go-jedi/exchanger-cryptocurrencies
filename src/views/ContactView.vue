<template>
  <div class="container">
    <div class="main-contacts">
      <div class="main-contacts-left">
        <div class="container-contacts">
          <div class="main-contacts-left__title">Контакты</div>
          <div class="main-contacts-left__one">
            Мы всегда готовы ответить на интересующие Вас вопросы, а также
            выслушать Ваши предложения по улучшению нашего сервиса.
          </div>
          <div class="main-contacts-left__two">
            Используйте данную форму, если хотите задать нам вопрос, или
            сообщить о ошибке. Пожалуйста, делайте Ваше сообщение как можно
            более развернутым, тогда мы сможем решить проблему намного быстрее.
          </div>
          <div class="main-contacts-left__three">
            Наш телеграмм: <a href="#">Telegram</a> переходите только по этой
            ссылке, ни в коем случае не ищите по ник нейму через телеграм.
            Опасайтесь мошенников, используйте только эту ссылку
            <a href="#">Telegram</a> . Все обмены только через заявки в
            обменнике.
          </div>
          <ContactComponent @isLoadingBehavior="loadingBehaviorNeed" />
        </div>
      </div>
      <div v-show="!personIsAuth" class="main-contacts-right">
        <div class="main-contacts-right__title">Авторизация</div>
        <form
          class="main-contacts-right__form"
          @submit.prevent="authorizationSubmitForm"
        >
          <div class="main-contacts-right__form_login">
            <input
              class="main-contacts-right__form_login_input"
              type="text"
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
          <div class="main-contacts-right__form_password">
            <input
              type="password"
              class="main-contacts-right__form_password_input"
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
          <div class="main-contacts-right__form_options">
            <router-link to="/recovery">Забыли пароль?</router-link>
            <router-link to="/register">Регистрация</router-link>
          </div>
          <div class="main-contacts-right__form_btn">
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
import { minLength, required, email } from "vuelidate/lib/validators";

import LoadingComponent from "@/components/LoadingComponent.vue";
import ContactComponent from "@/components/ContactComponent.vue";

export default {
  name: "contact-view",
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
    ContactComponent,
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

// Страница Контакты
.main-contacts {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 25px 30px;
}

.container-contacts {
  max-width: 610px;
}

.main-contacts-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-contacts-left__one {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-contacts-left__two {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-contacts-left__three {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-contacts-left__three > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #ffc512;
  text-decoration: none;
}

.main-contacts-left__three > a:hover {
  color: #000;
  text-decoration: underline;
}

.main-contacts-left__form_name {
  padding: 8px 0;
}

.main-contacts-left__form_name_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-contacts-left__form_name_label > span {
  color: #ff0000;
}

.main-contacts-left__form_name_input > input {
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

.main-contacts-left__form_name_input > input:focus {
  border: 1px solid #00cccb;
}

.main-contacts-left__form_email {
  padding: 8px 0;
}

.main-contacts-left__form_email_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-contacts-left__form_email_label > span {
  color: #ff0000;
}

.main-contacts-left__form_email_input > input {
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

.main-contacts-left__form_email_input > input:focus {
  border: 1px solid #00cccb;
}

.main-contacts-left__form_id {
  padding: 8px 0;
}

.main-contacts-left__form_id_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-contacts-left__form_id_label > span {
  color: #ff0000;
}

.main-contacts-left__form_id_input > input {
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

.main-contacts-left__form_id_input > input:focus {
  border: 1px solid #00cccb;
}

.main-contacts-left__form_message {
  padding: 8px 0;
}

.main-contacts-left__form_message_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-contacts-left__form_message_label > span {
  color: #ff0000;
}

.main-contacts-left__form_message_textarea > textarea {
  overflow: hidden;
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  height: 150px;
  min-height: 150px;
  padding: 0 10px;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-contacts-left__form_message_textarea > textarea:focus {
  border: 1px solid #00cccb;
}

.main-contacts-left__form_btn {
  padding: 8px 0;
}

.main-contacts-left__form_btn > button {
  transition: all 0.3s linear;
  box-sizing: border-box;
  border: none;
  background-color: #e4e4e4;
  height: 40px;
  font: 100 14px/40px "Segoe UI", serif;
  text-transform: uppercase;
  color: #000;
  padding: 0 30px;
  cursor: pointer;
  text-decoration: none;
}

.main-contacts-left__form_btn > button:hover {
  background-color: #ffc512;
}

.main-contacts-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

.main-contacts-right__form_login {
  padding: 0 0 20px 0;
}

.main-contacts-right__form_login_input {
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

.main-contacts-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-contacts-right__form_password {
  padding: 0 0 20px 0;
}

.main-contacts-right__form_password_input {
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

.main-contacts-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-contacts-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-contacts-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-contacts-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-contacts-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-contacts-right__form_btn > button {
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

.main-contacts-right__form_btn > button:hover {
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

  //   Страница контактов
  .main-contacts {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-contacts-right {
    margin-top: 50px;
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

  //   Страница контактов
  .main-contacts-left__one {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-contacts-left__two {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-contacts-left__three {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-contacts-left__three > a {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-contacts-left__form_btn > button {
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

  //   Страница контактов
  .main-contacts-left__form_name_input > input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-contacts-left__form_email_input > input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-contacts-left__form_id_input > input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-contacts-left__form_message_textarea > textarea {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-contacts-right__form_login_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-contacts-right__form_password_input {
    font: 11px/40px "Segoe UI", sans-serif;
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