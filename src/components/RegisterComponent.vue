<template>
  <form class="main-register-left__form" @submit.prevent="registerSubmitForm">
    <div class="main-register-left__form_login">
      <label
        class="main-register-left__form_login_label"
        for="register-username"
        >Логин <span>*</span>:</label
      >
      <div class="main-register-left__form_login_input">
        <input
          type="text"
          id="register-username"
          @blur="$v.formRegister.username.$touch()"
          :class="status($v.formRegister.username)"
          v-model.trim="formRegister.username"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formRegister.username.$error ||
            ($v.formRegister.username.$dirty &&
              !$v.formRegister.username.required)
          "
        >
          Необходимо указать Имя Пользователя
        </div>
      </div>
    </div>
    <div class="main-register-left__form_email">
      <label class="main-register-left__form_email_label" for="login-login"
        >E-mail <span>*</span>:</label
      >
      <div class="main-register-left__form_email_input">
        <input
          type="text"
          @blur="$v.formRegister.email.$touch()"
          :class="status($v.formRegister.email)"
          v-model.trim="formRegister.email"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formRegister.email.$error ||
            ($v.formRegister.email.$dirty && !$v.formRegister.email.required)
          "
        >
          Необходимо указать email
        </div>
        <div class="invalid-feed" v-if="!$v.formRegister.email.email">
          Пожалуйста введите Email адрес
        </div>
      </div>
    </div>
    <div class="main-register-left__form_password">
      <label class="main-register-left__form_password_label" for="login-login"
        >Пароль <span>*</span>:</label
      >
      <div class="main-register-left__form_password_input">
        <input
          type="password"
          @blur="$v.formRegister.password.$touch()"
          :class="status($v.formRegister.password)"
          v-model.trim="formRegister.password"
        />
        <div class="invalid-feed" v-if="!$v.formRegister.password.minLength">
          {{ minLengthText }}
        </div>
        <div
          class="invalid-feed"
          v-if="
            $v.formRegister.password.$error ||
            ($v.formRegister.password.$dirty &&
              !$v.formRegister.password.required)
          "
        >
          Необходимо указать пароль
        </div>
      </div>
    </div>
    <div class="main-register-left__form_passwordag">
      <label class="main-register-left__form_passwordag_label" for="login-login"
        >Пароль снова <span>*</span>:</label
      >
      <div class="main-register-left__form_passwordag_input">
        <input
          type="password"
          @blur="$v.formRegister.confirmPassword.$touch()"
          :class="status($v.formRegister.confirmPassword)"
          v-model.trim="formRegister.confirmPassword"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formRegister.confirmPassword.$error ||
            ($v.formRegister.confirmPassword.$dirty &&
              !$v.formRegister.confirmPassword.required)
          "
        >
          Необходимо повторить пароль
        </div>
        <div
          class="invalid-feed"
          v-if="!$v.formRegister.confirmPassword.sameAs"
        >
          {{ passwordConfirmText }}
        </div>
      </div>
    </div>
    <div class="main-register-left__form_agree">
      <div class="main-register-left__form_agree_checkbox">
        <input
          type="checkbox"
          v-model.trim="formRegister.ruleRead"
          @change="$v.formRegister.$touch()"
        />
      </div>
      <div class="main-register-left__form_agree_info">
        С <a href="#">правилами сервеса</a> ознакомлен и согласен
      </div>
    </div>
    <div class="main-register-left__form_btn">
      <div class="main-register-left__form_btn_submit">
        <button
          type="submit"
          :disabled="isDisabledBtnSubmit"
          @click.prevent="registerSubmitForm"
        >
          Регистрация
        </button>
      </div>
      <div class="main-register-left__form_btn_auth">
        <a href="#">Авторизация</a>
      </div>
    </div>
  </form>
</template>

<script>
import { email, minLength, required, sameAs } from "vuelidate/lib/validators";

export default {
  name: "register-component",
  data() {
    return {
      formRegister: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        ruleRead: false,
      },
      isDisabledBtnSubmit: false,
      minLengthText: "Минимальная длина 8 символов!",
      passwordConfirmText: "Пароли не совпадают",
    };
  },
  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
      };
    },
    async registerSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        console.log("Success");
        try {
          this.$emit("isLoadingBehavior", true);
          this.isDisabledBtnSubmit = true;
          const formData = {
            username: this.formRegister.username,
            email: this.formRegister.email,
            password: this.formRegister.password,
          };
          const resultRegistration = await this.$store.dispatch(
            "registration",
            formData
          );

          if (
            resultRegistration.message ===
            "Пользователь успешно зарегистрирован"
          ) {
            this.$emit("isLoadingBehavior", false);
            this.$alert("Вы успешно зарегистрировались", "Регистрация", {
              confirmButtonText: "На домашнюю страницу",
              callback: () => {
                this.isDisabledBtnSubmit = false;
                this.$router.push("/");
                this.$router.go(0);
              },
            });
          } else if (
            resultRegistration.message ===
            "Пользователь с такой почтой уже существует"
          ) {
            this.$emit("isLoadingBehavior", false);
            this.$alert(`${resultRegistration.message}`, "Регистрация", {
              confirmButtonText: "Попробовать ещё раз",
              callback: () => {
                this.isDisabledBtnSubmit = false;
                return;
              },
            });
          }
        } catch (error) {
          this.$emit("isLoadingBehavior", false);
          this.isDisabledBtnSubmit = false;
          console.log(
            "Error in registerSubmitForm in RegisterComponent func",
            error
          );
        }
      }
    },
  },
  validations: {
    formRegister: {
      username: {
        required,
      },
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAs: sameAs("password"),
      },
      ruleRead: {
        checked(val) {
          return val === true ? true : false;
        },
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

.nav-menu-mobile {
  display: none;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 10000;
}

.nav-menu-mobile__close {
  position: absolute;
  right: 50px;
  top: 50px;
}

.nav-menu-mobile__content {
  padding: 35px;
}

.nav-menu-mobile__content_item:not(:first-child) {
  margin-top: 50px;
}

.nav-menu-mobile__content_item_link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-menu-mobile__content_item_text_active {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 80px 80px;
}

.nav-menu-mobile__content_item_text {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 35px;
  font-size: 18px;
  font: 18px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  text-transform: uppercase;
}

.nav-menu-mobile__content_item_text:hover {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 80px 80px;
}

.main-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
}

.main-header-left {
  display: flex;
  align-items: center;
}

.main-header-left__telegram {
  display: flex;
  align-items: center;
  padding: 0 14px;
}

.main-header-left__telegram_text_link {
  text-decoration: none;
  font-size: 14px;
  color: #000;
  font-weight: 600;
}

.main-header-left__telegram_text_link:hover {
  transition: 0.2s;
  text-decoration: none;
  color: #ffc512;
}

.main-header-left__email {
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding: 0 14px;
}

.main-header-left__email_text_link {
  text-decoration: none;
  font-size: 14px;
  color: #000;
}

.main-header-left__email_text_link:hover {
  transition: 0.2s;
  text-decoration: none;
  color: #ffc512;
}

.main-header-right__signin {
  padding: 0 20px 0 0;
}

.main-header-right__signin_link {
  text-decoration: none;
  color: #000;
  font-size: 13px;
}

.main-header-right__signin_link:hover {
  transition: 0.2s;
  text-decoration: none;
  color: #ffc512;
}

.main-header-right__signup {
  padding: 0 20px 0 0;
}

.main-header-right__signup_link {
  text-decoration: none;
  color: #000;
  font-size: 13px;
}

.main-header-right__signup_link:hover {
  transition: 0.2s;
  text-decoration: none;
  color: #ffc512;
}

.main-header-right {
  display: flex;
  align-items: center;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 42px;
}

.main-mobile-nav {
  display: none;
}

.main-mobile-nav > a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.main-mobile-nav__text {
  margin-left: 5px;
  font-size: 12px;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  text-decoration: none;
}

.main-nav__left {
  padding: 17px 0;
}

.main-nav__left_img > img {
  width: 220px;
  height: 50.58px;
}

.main-nav__right_items {
  display: flex;
  align-items: center;
}

.main-nav__right_link:not(:last-child):after {
  content: "•";
}

.main-nav__right_link > a {
  font: 300 17px/40px "Segoe UI", sans-serif;
  padding: 50px 20px;
  font-size: 17px;
  color: #2a2a2a;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 400;
}

.main-nav__right_link > a:hover {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 80px 80px;
}

.main-nav__right_link_active > a {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 80px 80px;
}

// Домашняя страница
.main-home-crypto {
  display: flex;
  justify-content: space-between;
  padding: 40px 0 0;
}

.main-home-left {
  width: 432px;
}

.main-home-left__title {
  font: 300 36px/40px "Segoe UI", sans-serif;
  padding: 20px;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
  color: #000;
}

.main-home-left__select {
  margin: 4px 4px 4px -4px;
  padding: 20px 0;
}

.main-home-left__select_link {
  padding: 20px 13px;
  color: #2f3030;
  text-decoration: none;
  font-size: 12px;
  font: 12px/1.5em "Segoe UI", sans-serif;
}

.main-home-left__select_link:hover {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 50px 50px;
}

.main-home-left__select_link_active {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 50px 50px;
}

.main-home-left__wallets {
  background-color: #fff;
}

.main-home-left__wallets_wall {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 100 16px/40px "Segoe UI";
  padding: 6px 10px;
  background-color: #fff;
}

.main-home-left__wallets_wall:not(:first-child) {
  margin-top: 10px;
}

.main-home-left__wallets_wall:hover {
  background-color: #f7d567;
}

.main-home-left__wallets_wall_active {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 100 16px/40px "Segoe UI";
  padding: 6px 10px;
  background-color: #f7d567;
}

.main-home-left__wallets_wall_left {
  display: flex;
  align-items: center;
}

.main-home-left__wallets_wall_img {
  margin-right: 10px;
}

.main-home-left__wallets_wall_img > img {
  width: 32px;
  height: 32px;
}

.main-home-left__wallets_wall_text {
  font-size: 16px;
}

.main-home-left__wallets_wall_count {
  float: right;
  margin-right: 50px;
  font-weight: 700;
}

.main-home-right {
  width: 432px;
}

.main-home-right__title {
  font: 300 36px/40px "Segoe UI", sans-serif;
  padding: 20px;
  font-size: 36px;
  text-transform: uppercase;
  text-align: center;
  color: #000;
}

.main-home-right__select {
  margin: 4px 4px 4px -4px;
  padding: 20px 0;
}

.main-home-right__select_link {
  padding: 20px 13px;
  color: #2f3030;
  text-decoration: none;
  font-size: 12px;
  font: 12px/1.5em "Segoe UI", sans-serif;
}

.main-home-right__select_link:hover {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 50px 50px;
}

.main-home-right__select_link_active {
  background: url("@/assets/menu_li_background.png") no-repeat center;
  background-size: 50px 50px;
}

.main-home-right__wallets {
  background-color: #fff;
}

.main-home-right__wallets_wall {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 100 16px/40px "Segoe UI";
  padding: 0 10px;
  background-color: #fff;
}

.main-home-right__wallets_wall:not(:first-child) {
  margin-top: 10px;
}

.main-home-right__wallets_wall:hover {
  background-color: #f7d567;
}

.main-home-right__wallets_wall_active {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: 100 16px/40px "Segoe UI";
  padding: 6px 10px;
}

.main-home-right__wallets_wall_left {
  display: flex;
  align-items: center;
}

.main-home-right__wallets_wall_right {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.main-home-right__wallets_wall_img {
  margin-right: 10px;
}

.main-home-right__wallets_wall_img > img {
  width: 32px;
  height: 32px;
}

.main-home-right__wallets_wall_text {
  font-size: 16px;
}

.main-home-right__wallets_wall_info {
  margin-top: -23px;
  font-size: 12px;
}

.main-home-right__wallets_wall_count {
  margin-right: 20px;
  font-weight: 700;
}

.main-home-right__wallets_wall_price {
  margin-top: -23px;
  font: 10px/45px "Segoe UI";
}

// main-home-cryptoinfo

.main-home-cryptoinfo {
  margin-top: 40px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 10px 50px -15px RGB(0 0 0 / 22%);
  padding: 20px 60px;
}

.main-home-cryptoinfo__title {
  margin: 0 0 20px 0;
  color: #000;
  font: 300 36px/40px "Segoe UI", sans-serif;
  font-size: 34px;
  text-transform: uppercase;
}

.main-home-cryptoinfo__left > img {
  float: left;
  margin: 10px 50px 30px 0;
}

.main-home-cryptoinfo__right_text {
  padding: 0 0 20px 0;
  font-size: 14px;
  font: 300 14px "Segoe UI", sans-serif;
}

.main-home-cryptoinfo__right_texttwo {
  padding: 0 0 20px 0;
  font-size: 14px;
  font: 300 14px "Segoe UI", sans-serif;
}

.main-home-cryptoinfo__right_textthree {
  padding: 0 0 20px 0;
  font-size: 14px;
  font: 300 14px "Segoe UI", sans-serif;
}

.main-home-reserves {
  padding: 20px 35px;
}

.main-home-reserves__title {
  margin: 0 0 20px;
  color: #000;
  font: 300 36px/40px "Segoe UI", sans-serif;
  font-size: 34px;
  text-transform: uppercase;
}

.main-home-reserves__content {
  display: flex;
  flex-wrap: wrap;
}

.main-home-reserves__content_wall {
  display: flex;
  align-items: center;
  margin: 0 10px 10px 0;
  padding: 10px;
  width: 206.89px;
  background: #fff;
}

.main-home-reserves__content_wall:hover {
  background-color: #f0f5f3;
}

.main-home-reserves__content_wall_info {
  margin-left: 5px;
}

.main-home-reserves__content_wall_title {
  font: 600 14px "Segoe UI", sans-serif;
}

.main-home-reserves__content_wall_text {
  color: #545454;
  font: 14px "Segoe UI", sans-serif;
}

.main-home-reviews {
  margin-top: 10px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 10px 50px -15px RGB(0 0 0 / 22%);
  padding: 20px 35px 0;
}

.main-home-reviews__title {
  margin: 0 0 20px;
  padding-top: 10px;
  color: #000;
  font: 300 36px/40px "Segoe UI", sans-serif;
  text-transform: uppercase;
}

.main-home-reviews__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-home-reviews__content_rev {
  padding: 10px;
  width: 210px;
  min-height: 135px;
  text-align-last: left;
  border-image: url("@/assets/border_rewv.png") 0 fill;
}

.main-home-reviews__content__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-home-reviews__content__title_name {
  margin: 0 0 5px;
  font-size: 12px;
  font: 300 12px "Segoe UI", sans-serif;
  color: #000;
}

.main-home-reviews__content__title_time {
  margin: 0 0 5px;
  font-size: 10px;
  font: 300 10px "Segoe UI", sans-serif;
  color: #000;
}

.main-home-reviews__content__text {
  font-size: 12px;
  font: 300 12px "Segoe UI", sans-serif;
  color: #000;
}

.main-links {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 34px 0;
}

.main-links > a {
  width: 82px;
}

.main-links > a:not(:first-child) {
  margin-left: 25px;
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

// Страница Регистрации
.container-register {
  max-width: 610px;
}

.main-register {
  display: flex;
  justify-content: space-between;
  margin: 0 0 30px;
  padding: 40px 30px 25px 30px;
}

.main-register-left__title {
  margin: 0 0 25px;
  font: 300 23px/26px "Segoe UI";
  color: #929292;
  text-transform: uppercase;
}

.main-register-left__form_login {
  padding: 8px 0;
}

.main-register-left__form_login_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-register-left__form_login_label > span {
  color: #ff0000;
}

.main-register-left__form_login_input > input {
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

.main-register-left__form_login_input > input:focus {
  border: 1px solid #00cccb;
}

.main-register-left__form_email {
  padding: 8px 0;
}

.main-register-left__form_email_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-register-left__form_email_label > span {
  color: #ff0000;
}

.main-register-left__form_email_input > input {
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

.main-register-left__form_email_input > input:focus {
  border: 1px solid #00cccb;
}

.main-register-left__form_password {
  padding: 8px 0;
}

.main-register-left__form_password_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-register-left__form_password_label > span {
  color: #ff0000;
}

.main-register-left__form_password_input > input {
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

.main-register-left__form_password_input > input:focus {
  border: 1px solid #00cccb;
}

.main-register-left__form_passwordag {
  padding: 8px 0;
}

.main-register-left__form_passwordag_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-register-left__form_passwordag_label > span {
  color: #ff0000;
}

.main-register-left__form_passwordag_input > input {
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

.main-register-left__form_passwordag_input > input:focus {
  border: 1px solid #00cccb;
}

.main-register-left__form_agree {
  display: flex;
  align-items: center;
  font: 13px/18px "Segoe UI", sans-serif;
  padding: 8px 0;
}

.main-register-left__form_agree_checkbox > input {
  background-color: red;
}

.main-register-left__form_agree_info {
  margin-left: 5px;
}

.main-register-left__form_agree_info > a {
  text-decoration: none;
  color: #ffc512;
}

.main-register-left__form_agree_info > a:hover {
  text-decoration: underline;
  color: #000;
}

.main-register-left__form_btn {
  display: flex;
  align-items: center;
  padding: 8px 0;
}
.main-register-left__form_btn_submit > button {
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

.main-register-left__form_btn_submit > button:hover {
  background-color: #ffc512;
}

.main-register-left__form_btn_auth {
  margin-left: 20px;
}

.main-register-left__form_btn_auth > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  text-decoration: none;
  text-transform: none;
  color: #ffc512;
}

.main-register-left__form_btn_auth > a:hover {
  text-decoration: underline;
  color: #000;
}

.main-register-right__title {
  margin: 0 -30px 0;
  padding: 20px 30px 25px;
  font: 600 18px/20px "Segoe UI";
  color: #929292;
}

//
.main-register-right__form_login {
  padding: 0 0 20px 0;
}

.main-register-right__form_login_input {
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

.main-register-right__form_login_input:focus {
  border: 1px solid #00cccb;
}

.main-register-right__form_password {
  padding: 0 0 20px 0;
}

.main-register-right__form_password_input {
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

.main-register-right__form_password_input:focus {
  border: 1px solid #00cccb;
}

.main-register-right__form_options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-register-right__form_options > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #000;
  text-decoration: none;
}

.main-register-right__form_options > a:hover {
  color: #ffc512;
  text-decoration: underline;
}

.main-register-right__form_btn {
  display: flex;
  justify-content: center;
  padding: 15px 20px;
  margin: 20px -30px 0;
}

.main-register-right__form_btn > button {
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

.main-register-right__form_btn > button:hover {
  background: #ffc512;
}

// Footer:
.main-footer {
  padding: 15px 0 20px;
  background: #bebbbb;
  width: 100%;
  font: 12px "Segoe UI", sans-serif;
}

.main-footer-content {
  display: flex;
  justify-content: space-between;
}

.main-footer-left__title {
  font: 12px "Segoe UI", sans-serif;
  color: #fff;
  padding: 0 0 20px;
}

.main-footer-left__links_link {
  color: #fff;
  font: italic 12px "Segoe UI", sans-serif;
  text-decoration: none;
}

.main-footer-left__links_link:not(:first-child) {
  margin-left: 10px;
}

.main-footer-left__links_link:hover {
  text-decoration: underline;
}

.main-footer-right__top {
  display: flex;
  align-items: center;
}

.main-footer-right__top > div {
  margin-left: 20px;
  font-size: 18px;
  font: 600 18px/27px "Segoe UI", sans-serif;
  color: #fff;
}

.main-footer-right__bottom {
  margin-top: 15px;
}

.main-footer-right__bottom_start {
  color: #fff;
}

.main-footer-right__bottom_end {
  color: #fff;
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

  .main-header-left {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .main-header-left__email {
    margin-left: 0;
  }

  .main-header-right {
    flex-direction: column;
    align-items: end;
  }

  .main-mobile-nav {
    display: block;
  }

  .main-nav__right {
    display: none;
  }

  .main-home-left {
    width: 362px;
  }

  .main-home-right {
    width: 362px;
  }

  .main-nav__left_img > img {
    width: 80px;
    height: 18.39px;
  }

  .main-home-left__title {
    font-size: 24px;
    text-align: start;
  }

  .main-home-left__wallets_wall_count {
    display: none;
  }

  .main-home-left__wallets_wall {
    justify-content: center;
    width: 100%;
    height: 110px;
  }

  .main-home-left__wallets_wall:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-left__wallets_wall_left {
    flex-direction: column;
    align-items: center;
  }

  .main-home-right__title {
    font-size: 24px;
    text-align: start;
  }

  .main-home-right__wallets_wall {
    justify-content: center;
    width: 100%;
    height: 110px;
  }

  .main-home-right__wallets_wall:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-right__wallets_wall_left {
    flex-direction: column;
  }

  .main-home-right__wallets_wall_right {
    display: none;
  }

  .main-home-cryptoinfo__title {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }

  .main-home-cryptoinfo__left {
    display: flex;
    justify-content: center;
  }

  .main-home-cryptoinfo__left > img {
    float: none;
    width: 377.38px;
    height: 284.17px;
  }

  .main-home-reserves__content {
    justify-content: center;
  }

  .main-home-reserves__content_wall {
    width: 320px;
    height: 101px;
  }

  .main-home-reviews__title {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }

  .main-home-reviews__content {
    flex-direction: column;
  }

  .main-home-reviews__content_rev {
    width: 100%;
    min-height: 104px;
  }

  .main-home-reviews__content__title_name {
    font-size: 16px;
  }

  .main-home-reviews__content__title_time {
    font-size: 16px;
  }

  .main-home-reviews__content__text {
    font-size: 14px;
  }

  .main-home-reviews {
    padding: 20px 35px 35px;
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

  //   Страница регистрации
  .main-register-right__form_login_input {
    width: 100%;
  }

  //   links and footer

  .main-links {
    margin-top: 60px;
  }

  .main-footer-content {
    display: flex;
    flex-direction: column;
  }

  .main-footer-left {
    margin-top: 15px;
  }

  .main-footer-center {
    margin-top: 25px;
  }

  .main-footer-right {
    margin-top: 15px;
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

  .main-header-left {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }

  .main-header-left__email {
    margin-left: 0;
  }

  .main-header-right {
    flex-direction: column;
    align-items: end;
  }

  .main-mobile-nav {
    display: block;
  }

  .main-nav__right {
    display: none;
  }

  .main-home-left {
    width: 362px;
  }

  .main-home-right {
    width: 362px;
  }

  .main-nav__left_img > img {
    width: 80px;
    height: 18.39px;
  }

  .main-home-left__title {
    font-size: 24px;
    text-align: start;
  }

  .main-home-left__wallets_wall_count {
    display: none;
  }

  .main-home-left__wallets_wall {
    justify-content: center;
    width: 100%;
    height: 110px;
  }

  .main-home-left__wallets_wall:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-left__wallets_wall_left {
    flex-direction: column;
    align-items: center;
  }

  .main-home-right__title {
    font-size: 24px;
    text-align: start;
  }

  .main-home-right__wallets_wall {
    justify-content: center;
    width: 100%;
    height: 110px;
  }

  .main-home-right__wallets_wall:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-right__wallets_wall_left {
    flex-direction: column;
  }

  .main-home-right__wallets_wall_right {
    display: none;
  }

  .main-home-cryptoinfo__title {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }

  .main-home-cryptoinfo__left {
    display: flex;
    justify-content: center;
  }

  .main-home-cryptoinfo__left > img {
    float: none;
    width: 377.38px;
    height: 284.17px;
  }

  .main-home-reserves__content {
    justify-content: center;
  }

  .main-home-reserves__content_wall {
    width: 320px;
    height: 101px;
  }

  .main-home-reviews__title {
    display: flex;
    justify-content: center;
    font-size: 24px;
  }

  .main-home-reviews__content {
    flex-direction: column;
  }

  .main-home-reviews__content_rev {
    width: 100%;
    min-height: 104px;
  }

  .main-home-reviews__content__title_name {
    font-size: 16px;
  }

  .main-home-reviews__content__title_time {
    font-size: 16px;
  }

  .main-home-reviews__content__text {
    font-size: 14px;
  }

  .main-home-reviews {
    padding: 20px 35px 35px;
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

  //   Страница регистрации
  .main-register {
    flex-wrap: wrap;
  }

  .main-register-left__form_login_input > input {
    width: 100%;
  }

  .main-register-left__form_email_input > input {
    width: 100%;
  }

  .main-register-left__form_password_input > input {
    width: 100%;
  }

  .main-register-left__form_passwordag_input > input {
    width: 100%;
  }

  //   Links and footer

  .main-links {
    margin-top: 60px;
  }

  .main-footer-content {
    display: flex;
    flex-direction: column;
  }

  .main-footer-left {
    margin-top: 15px;
  }

  .main-footer-center {
    margin-top: 25px;
  }

  .main-footer-right {
    margin-top: 15px;
  }
}

@media (max-width: 780px) {
  .container {
    max-width: 705.89px;
  }

  .main-home-left {
    width: 340px;
  }

  .main-home-right {
    width: 340px;
  }

  .main-home-reserves__content_wall {
    width: 280px;
    height: 101px;
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

  .main-home-left {
    width: 333px;
  }

  .main-home-right {
    width: 333px;
  }

  .main-home-reserves__content_wall {
    width: 290px;
    height: 95px;
  }

  .main-links {
    flex-wrap: wrap;
    grid-gap: 20px;
  }
}

@media (max-width: 667px) {
  .container {
    max-width: 603px;
  }

  .main-home-left {
    width: 295px;
  }

  .main-home-right {
    width: 295px;
  }

  .main-home-reserves__content_wall {
    width: 237px;
    height: 95px;
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

  .main-home-left__title {
    font-size: 20px;
    text-align: start;
  }

  .main-home-right__title {
    font-size: 20px;
    text-align: start;
  }

  .main-home-left__select_link {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-home-right__select_link {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-home-right {
    width: 250px;
  }

  .main-home-left {
    width: 250px;
  }

  .main-home-cryptoinfo__left > img {
    width: 307.38px;
    height: 275.17px;
  }

  .main-home-cryptoinfo__title {
    font-size: 20px;
  }

  .main-home-reserves__content_wall {
    width: 197px;
    height: 95px;
  }

  //   Страница регистрации
  .main-register {
    justify-content: center;
  }

  .main-register-right {
    margin-top: 40px;
  }
}

@media (max-width: 480px) {
  .container {
    max-width: 452.5px;
  }

  .main-home-left {
    width: 215px;
  }

  .main-home-right {
    width: 215px;
  }

  .main-home-cryptoinfo__title {
    font-size: 18px;
  }

  .main-home-cryptoinfo__left > img {
    margin: 0;
    width: 280.38px;
    height: 260.17px;
  }

  .main-home-reserves__title {
    display: flex;
    justify-content: center;
    font-size: 18px;
  }

  .main-home-reserves__content_wall {
    width: 165px;
    height: 95px;
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

  .main-nav {
    margin-top: 12px;
  }

  .main-home-crypto {
    padding: 10px 0 0;
  }

  .main-header-left__telegram_text_link {
    font-size: 12px;
  }

  .main-header-left__email_text_link {
    font-size: 12px;
  }

  .main-header-right__signin_link {
    font-size: 12px;
  }

  .main-header-right__signup_link {
    font-size: 12px;
  }

  .main-home-left {
    width: 217.19px;
  }

  .main-home-left__title {
    font-size: 18px;
  }

  .main-home-left__select_link {
    font-size: 10px;
  }

  .main-home-left__select_link {
    padding: 20px 8px;
  }

  .main-home-left__wallets_wall_text {
    font-size: 13px;
  }

  .main-home-right {
    width: 217.19px;
  }

  .main-home-right__title {
    font-size: 18px;
    text-align: end;
  }

  .main-home-right__select_link {
    font-size: 10px;
  }

  .main-home-right__select_link {
    padding: 20px 8px;
  }

  .main-home-right__wallets_wall_text {
    font-size: 13px;
  }

  .main-home-right__wallets_wall_info {
    font-size: 11px;
  }

  .main-home-right__wallets_wall_in {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .main-home-cryptoinfo {
    padding: 20px 30px;
  }

  .main-home-cryptoinfo__title {
    font-size: 18px;
  }

  .main-home-cryptoinfo__left > img {
    margin: 0 0 10px 0;
    width: 226.25px;
    height: 170.26px;
  }

  .main-home-cryptoinfo__right_text {
    font-size: 13px;
  }

  .main-home-cryptoinfo__right_texttwo {
    font-size: 13px;
  }

  .main-home-cryptoinfo__right_textthree {
    font-size: 13px;
  }

  .main-home-reserves__title {
    display: flex;
    justify-content: center;
    font: 300 18px/40px "Segoe UI", sans-serif;
    font-size: 18px;
  }

  .main-home-reserves__content_wall {
    flex-direction: column;
    align-items: baseline;
  }

  .main-home-reserves__content_wall {
    width: 134px;
    height: 110px;
  }

  .main-home-reserves__content_wall_img > img {
    width: 30px;
    height: 30px;
  }

  .main-home-reserves__content_wall_title {
    font-size: 12px;
    font: 600 12px "Segoe UI", sans-serif;
  }

  .main-home-reserves__content_wall_text {
    font-size: 12px;
    font: 12px "Segoe UI", sans-serif;
  }

  .main-home-reviews__title {
    font-size: 18px;
  }

  .main-home-reviews__content__title_name {
    font-size: 12px;
  }

  .main-home-reviews__content__title_time {
    font-size: 12px;
  }

  .main-home-reviews__content__text {
    font-size: 12px;
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

  //   Страница регистрации
  .main-register {
    justify-content: center;
  }

  .main-register-right {
    margin-top: 20px;
  }

  //   footer

  .main-footer-left__title {
    font: 11px "Segoe UI", sans-serif;
  }

  .main-footer-left__links_link {
    font: italic 11px "Segoe UI", sans-serif;
  }

  .main-footer-right__top > div {
    margin-left: 10px;
    font: 600 12px/27px "Segoe UI", sans-serif;
  }

  .main-footer-right__bottom_start {
    font-size: 11px;
  }

  .main-footer-right__bottom_end {
    font-size: 11px;
  }
}

@media (max-width: 414px) {
  .container {
    max-width: 380px;
  }

  .main-home-left {
    width: 185.19px;
  }

  .main-home-right {
    width: 185.19px;
  }

  .main-home-right__wallets_wall_text {
    font-size: 11px;
  }

  .main-home-right__wallets_wall_info {
    font-size: 9px;
  }

  .main-home-reserves__content_wall {
    height: 97px;
  }
}

@media (max-width: 390px) {
  .container {
    max-width: 355px;
  }

  .main-header-left__telegram_text_link {
    font-size: 11px;
  }

  .main-header-left__email_text_link {
    font-size: 11px;
  }

  .main-header-left__signin_link {
    font-size: 11px;
  }

  .main-home-left {
    width: 173.19px;
  }

  .main-home-right {
    width: 173.19px;
  }

  .main-home-left__title {
    padding: 10px;
  }

  .main-home-left__select_link {
    font-size: 9px;
  }

  .main-home-left__wallets_wall:not(:first-child) {
    margin-top: 13px;
  }

  .main-header-right__signin_link {
    font-size: 11px;
  }

  .main-home-right__title {
    padding: 10px;
  }

  .main-home-right__select_link {
    font-size: 9px;
  }

  .main-home-right__wallets_wall:not(:first-child) {
    margin-top: 13px;
  }

  .main-home-cryptoinfo__title {
    font-size: 18px;
  }

  .main-home-cryptoinfo__right_text {
    font-size: 11px;
  }

  .main-home-cryptoinfo__right_texttwo {
    font-size: 11px;
  }

  .main-home-cryptoinfo__right_textthree {
    font-size: 11px;
  }

  .main-home-reserves__content_wall {
    width: 127px;
    height: 96px;
  }

  .main-home-reviews__content__title_name {
    font-size: 10px;
  }

  .main-home-reviews__content__title_time {
    font-size: 10px;
  }

  .main-home-reviews__content__text {
    font-size: 10px;
  }

  //   Страница входа в кабинет
  .container-login {
    max-width: 360px;
  }

  //   Footer

  .main-footer-left__title {
    font: 10px "Segoe UI", sans-serif;
  }

  .main-footer-left__links_link {
    font: italic 10px "Segoe UI", sans-serif;
  }

  .main-footer-right__top > div {
    font: 600 10px/27px "Segoe UI", sans-serif;
  }

  .main-footer-center__img > a > img {
    width: 30px;
    height: 30px;
  }

  .main-footer-right__bottom_start {
    font-size: 10px;
  }

  .main-footer-right__bottom_end {
    font-size: 10px;
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

  .main-home-left {
    width: 162.19px;
  }

  .main-home-right {
    width: 162.19px;
  }

  .main-home-left__title {
    padding: 7px;
    font-size: 16px;
  }

  .main-home-left__select_link {
    font-size: 8px;
  }

  .main-home-right__title {
    padding: 7px;
    font-size: 16px;
  }

  .main-home-right__select_link {
    font-size: 8px;
  }

  .main-home-right__wallets_wall_text {
    font-size: 11px;
  }

  .main-home-right__wallets_wall_info {
    font-size: 9px;
  }

  .main-home-cryptoinfo {
    padding: 15px 20px;
  }

  .main-home-cryptoinfo__title {
    font-size: 15px;
  }

  .main-home-cryptoinfo__left > img {
    width: 176.25px;
    height: 160.26px;
  }

  .main-home-cryptoinfo__right_text {
    font-size: 10px;
  }

  .main-home-cryptoinfo__right_texttwo {
    font-size: 10px;
  }

  .main-home-cryptoinfo__right_textthree {
    font-size: 10px;
  }

  .main-home-reserves__title {
    font-size: 16px;
    font: 300 16px/40px "Segoe UI", sans-serif;
  }

  .main-home-reserves__content_wall {
    width: 115px;
    height: 80px;
  }

  .main-home-reserves__content_wall_title {
    font-size: 12px;
    font: 600 10px "Segoe UI", sans-serif;
  }

  .main-home-reserves__content_wall_text {
    font-size: 12px;
    font: 10px "Segoe UI", sans-serif;
  }

  .main-home-reserves__content_wall_img > img {
    width: 25px;
    height: 25px;
  }

  .main-home-reviews__title {
    font-size: 16px;
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

  .main-header-left__telegram_text_link {
    font-size: 9px;
  }

  .main-header-left__email_text_link {
    font-size: 9px;
  }

  .main-header-right__signin_link {
    font-size: 9px;
  }

  .main-header-right__signup_link {
    font-size: 9px;
  }

  .main-home-left {
    width: 145.19px;
  }

  .main-home-left__title {
    padding: 6px;
    font-size: 14px;
  }

  .main-home-left__select_link {
    font-size: 7px;
  }

  .main-home-left__wallets_wall_text {
    font-size: 11px;
  }

  .main-home-right {
    width: 145.19px;
  }

  .main-home-right__title {
    padding: 6px;
    font-size: 14px;
  }

  .main-home-right__select_link {
    font-size: 7px;
  }

  .main-home-right__wallets_wall_text {
    font-size: 10px;
  }

  .main-home-right__wallets_wall_info {
    font-size: 8px;
  }

  .main-home-cryptoinfo__title {
    font-size: 13px;
  }

  .main-home-cryptoinfo__left > img {
    width: 146.25px;
    height: 140.26px;
  }

  .main-home-cryptoinfo__right_text {
    font-size: 9px;
  }

  .main-home-cryptoinfo__right_texttwo {
    font-size: 9px;
  }

  .main-home-cryptoinfo__right_textthree {
    font-size: 9px;
  }

  .main-home-reserves__title {
    font: 300 14px/40px "Segoe UI", sans-serif;
  }

  .main-home-reserves__content_wall {
    width: 100px;
    height: 73px;
  }

  .main-home-reviews__title {
    font-size: 14px;
  }

  //   Страница входа в кабинет
  .container-login {
    max-width: 300px;
  }
}
</style>