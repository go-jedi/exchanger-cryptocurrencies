<template>
  <div class="container">
    <div class="main-faq">
      <div class="main-faq-left">
        <div class="container-faq">
          <div class="main-faq-left__title">ПАРТНЁРСКИЙ FAQ</div>
          <div class="main-faq-left__content">
            <div class="main-faq-left__content_title">
              Вопрос: Как работает партнерская программа?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Зарегистрировавшись в нашей партнерской программе, Вы
              получаете уникальный партнерский идентификатор, который
              добавляется во все Ваши ссылки (?exbpid=777) и HTML-код. Вы можете
              размещать ссылки на любые страницы нашего сервиса на своем сайте,
              блоге, страничке, в сообществах и социальных сетях.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Сколько я буду зарабатывать, участвуя в Вашей партнерской
              программе?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Это зависит от многих факторов, таких как:
            </div>
            <div class="main-faq-left__content_text">
              1. Посещаемость Вашего веб-сайта или сайтов, где Вы размещаете о
              нас информацию.
            </div>
            <div class="main-faq-left__content_text">
              2. Соответствие тематики сайта той целевой аудитории, которая
              может заинтересоваться услугами обмена валют. Проще говоря, не
              стоит рассчитывать на большое количество переходов по Вашей
              партнерской ссылке, размещенной на сайте, посвященном разведению
              попугаев.
            </div>
            <div class="main-faq-left__content_text">
              3. Правильная подача информации. Например, мало кого привлечет
              одна лишь ссылка "обмен валют" без всяких описаний где-нибудь в
              углу веб-страницы.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Если я поставлю свою партнерскую ссылку в подпись на
              форуме, будут ли учитываться переходы и все остальные условия ПП?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Да, конечно будут.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: На моем сайте уже установлены другие партнерские
              программы. Могу ли я быть Вашим партнером?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Да, можете. У нас нет ограничений на работу с другими
              партнерскими программами.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Подходит ли мой сайт для участия в партнерской программе?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Мы приветствуем любые сайты, которые не противоречат
              условиям нашей партнерской программы. Посмотреть список условий
              можно <router-link to="/partner">здесь</router-link> (пункт 2.5).
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Сколько уровней в Вашей партнерской программе?
              Оплачивается ли привлечение новых партнеров?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: В нашей партнерской программе 6 уровней. Привлечение новых
              партнеров не оплачивается.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Не могу войти в свой аккаунт партнера. Пишет "Неверное
              сочетание логина и пароля". При этом я уверен, что ввожу пароль
              правильно.
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Убедитесь, что при вводе пароля у Вас не включена русская
              раскладка клавиатуры или Caps Lock. Если Вы точно помните только
              логин – воспользуйтесь функцией
              <router-link to="/recovery">Напоминания пароля</router-link>.
              Пароль будет выслан на Ваш e-mail, указанный при регистрации.
            </div>
            <div class="main-faq-left__content_title">
              Вопрос: Как выплачиваются заработанные деньги?
            </div>
            <div class="main-faq-left__content_text">
              Ответ: Партнерские выплаты производятся с помощью валют,
              используемых в нашем сервисе, указанный партнером при регистрации
              в партнерской программе. Как правило, на это уходит не более 2-3
              часов. Не спешите отправлять нам сообщения, если с момента подачи
              заявки не прошло 3 часов – администратор видит все заявки и
              обработает Вашу в любом случае.
            </div>
          </div>
        </div>
      </div>
      <div v-show="!personIsAuth" class="main-faq-right">
        <div class="main-faq-right__title">Авторизация</div>
        <form
          class="main-faq-right__form"
          @submit.prevent="authorizationSubmitForm"
        >
          <div class="main-faq-right__form_login">
            <input
              class="main-faq-right__form_login_input"
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
          <div class="main-faq-right__form_password">
            <input
              type="password"
              class="main-faq-right__form_password_input"
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
          <div class="main-faq-right__form_options">
            <router-link to="/recovery">Забыли пароль?</router-link>
            <router-link to="/register">Регистрация</router-link>
          </div>
          <div class="main-faq-right__form_btn">
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
  name: "faq-view",
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

//
.main-faq {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 25px 30px;
}

.container-faq {
  max-width: 610px;
}

.main-faq-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-faq-left__content_title {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  font-weight: 600;
}

.main-faq-left__content_text {
  padding: 0 0 20px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-faq-left__content_text > a {
  color: #ffc512;
  text-decoration: none;
}

.main-faq-left__content_text > a:hover {
  color: #545454;
  text-decoration: underline;
}

.main-faq-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

.main-faq-right__form_login {
  padding: 0 0 20px 0;
}

.main-faq-right__form_login_input {
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

.main-faq-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-faq-right__form_password {
  padding: 0 0 20px 0;
}

.main-faq-right__form_password_input {
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

.main-faq-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-faq-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-faq-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-faq-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-faq-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-faq-right__form_btn > button {
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

.main-faq-right__form_btn > button:hover {
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

  .main-faq {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-faq-right {
    margin-top: 40px;
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

  .main-faq-left__content_title {
    font: 11px/1.5em "Segoe UI", sans-serif;
    font-weight: 600;
  }

  .main-faq-left__content_text {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-faq-right__form_login_input {
    font: 12px/40px "Segoe UI", sans-serif;
  }

  .main-faq-right__form_password_input {
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

  .main-faq-left__title {
    font: 300 20px/26px "Segoe UI";
  }

  .main-faq-left__content_title {
    font: 11px/1.5em "Segoe UI", sans-serif;
    font-weight: 600;
  }

  .main-faq-left__content_text {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-faq-right__form_password_input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-faq-right__form_options > a {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-faq-right__form_login_input {
    font: 11px/40px "Segoe UI", sans-serif;
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

  .main-faq-left__content_title {
    font: 10px/1.5em "Segoe UI", sans-serif;
    font-weight: 600;
  }

  .main-faq-left__content_text {
    font: 9px/1.5em "Segoe UI", sans-serif;
  }
}

@media (max-width: 360px) {
  .container {
    max-width: 333px;
  }

  .main-faq-left__content_title {
    font: 10px/1.5em "Segoe UI", sans-serif;
    font-weight: 600;
  }

  .main-faq-left__content_text {
    font: 9px/1.5em "Segoe UI", sans-serif;
  }

  .main-faq-right__form_login_input {
    font: 10px/40px "Segoe UI", sans-serif;
  }

  .main-faq-right__form_password_input {
    font: 10px/40px "Segoe UI", sans-serif;
  }
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
  }

  .main-faq-left__title {
    font: 300 18px/26px "Segoe UI";
  }

  .main-faq-left__content_title {
    font: 9px/1.5em "Segoe UI", sans-serif;
    font-weight: 600;
  }

  .main-faq-left__content_text {
    font: 8px/1.5em "Segoe UI", sans-serif;
  }
}
</style>