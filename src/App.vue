<template>
  <div class="main" :style="{ overflow: isMobileNav ? 'hidden' : null }">
    <div v-if="isMobileNav" class="nav-menu-mobile">
      <div class="nav-menu-mobile__close">
        <a @click="isMobileNav = false" href="#">
          <img src="@/assets/close-nav.svg" alt="" />
        </a>
      </div>
      <div class="nav-menu-mobile__content">
        <div class="nav-menu-mobile__content_item">
          <router-link class="nav-menu-mobile__content_item_link" to="/">
            <img src="@/assets/mobile-navmenu/m1.png" alt="" />
            <div
              class="nav-menu-mobile__content_item_text"
              :class="{
                'nav-menu-mobile__content_item_text_active':
                  $route.name === 'home',
              }"
            >
              Обмен
            </div>
          </router-link>
        </div>
        <div class="nav-menu-mobile__content_item">
          <router-link class="nav-menu-mobile__content_item_link" to="/review">
            <img src="@/assets/mobile-navmenu/m2.png" alt="" />
            <div
              class="nav-menu-mobile__content_item_text"
              :class="{
                'nav-menu-mobile__content_item_text_active':
                  $route.name === 'review',
              }"
            >
              Отзывы
            </div>
          </router-link>
        </div>
        <div class="nav-menu-mobile__content_item">
          <router-link class="nav-menu-mobile__content_item_link" to="/rate">
            <img src="@/assets/mobile-navmenu/m3.png" alt="" />
            <div
              class="nav-menu-mobile__content_item_text"
              :class="{
                'nav-menu-mobile__content_item_text_active':
                  $route.name === 'rate',
              }"
            >
              Тарифы
            </div>
          </router-link>
        </div>
        <div class="nav-menu-mobile__content_item">
          <router-link class="nav-menu-mobile__content_item_link" to="/partner">
            <img src="@/assets/mobile-navmenu/m4.png" alt="" />
            <div
              class="nav-menu-mobile__content_item_text"
              :class="{
                'nav-menu-mobile__content_item_text_active':
                  $route.name === 'partner',
              }"
            >
              Партнерам
            </div>
          </router-link>
        </div>
        <div class="nav-menu-mobile__content_item">
          <router-link class="nav-menu-mobile__content_item_link" to="/contact">
            <img src="@/assets/mobile-navmenu/m5.png" alt="" />
            <div
              class="nav-menu-mobile__content_item_text"
              :class="{
                'nav-menu-mobile__content_item_text_active':
                  $route.name === 'contact',
              }"
            >
              Контакты
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="main-header">
        <div class="main-header-left">
          <div class="main-header-left__telegram">
            <div class="main-header-left__telegram_img">
              <img src="@/assets/icon_telegram.png" alt="" />
            </div>
            <div class="main-header-left__telegram_text">
              <a href="#" class="main-header-left__telegram_text_link"
                >Telegram</a
              >
            </div>
          </div>
          <div class="main-header-left__email">
            <div class="main-header-left__email_img">
              <img src="@/assets/icon_mail.png" alt="" />
            </div>
            <div class="main-header-left__email_text">
              <a href="#" class="main-header-left__email_text_link"
                >support@365change.org</a
              >
            </div>
          </div>
        </div>
        <div class="main-header-right">
          <div class="main-header-right__signin">
            <router-link
              to="/login"
              v-if="!personIsAuth"
              class="main-header-right__signin_link"
              >Войти</router-link
            >
            <p
              v-if="personIsAuth"
              class="main-header-right__signin_link_isauth"
            >
              Jdale
            </p>
          </div>
          <div class="main-header-right__signup">
            <router-link
              to="/register"
              v-if="!personIsAuth"
              class="main-header-right__signup_link"
              >Регистрация</router-link
            >
            <a
              v-if="personIsAuth"
              class="main-header-right__signin_link_exit"
              href="#"
              @click="logoutPerson"
              >Выйти</a
            >
          </div>
        </div>
      </div>
      <div class="main-nav">
        <div class="main-mobile-nav">
          <a href="#" @click="isMobileNav = true">
            <div>
              <img src="@/assets/hamburger-nav.svg" alt="" />
            </div>
            <div class="main-mobile-nav__text">Меню</div>
          </a>
        </div>
        <div class="main-nav__left">
          <div class="main-nav__left_img">
            <img @click="goHome()" src="@/assets/logo.png" alt="" />
          </div>
        </div>
        <div class="main-nav__right">
          <ul class="main-nav__right_items">
            <li class="main-nav__right_link">
              <router-link to="/review">Отзывы</router-link>
            </li>
            <li class="main-nav__right_link">
              <router-link to="/rate">Тарифы</router-link>
            </li>
            <li class="main-nav__right_link">
              <router-link to="/partner">Партнерам</router-link>
            </li>
            <li class="main-nav__right_link">
              <router-link to="/contact">Контакты</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <router-view />
    <div class="main-links">
      <a href="#">
        <img src="@/assets/links-traf/buttonY1.png" alt="" />
      </a>
      <a href="#">
        <img src="@/assets/links-traf/bitsmedia.png" alt="" />
      </a>
      <a href="#">
        <img src="@/assets/links-traf/90x321.png" alt="" />
      </a>
      <a href="#">
        <img src="@/assets/links-traf/exchange.svg" alt="" />
      </a>
      <a href="#">
        <img
          src="https://cryptobrokers.ru/wp-content/plugins/exchangers-monitor/images/banners/88x31.png"
          alt=""
        />
      </a>
      <a href="#">
        <img src="@/assets/links-traf/glazok.png" alt="" />
      </a>
      <a href="#">
        <img src="@/assets/links-traf/super-obmen.gif" alt="" />
      </a>
    </div>
    <div class="main-footer">
      <div class="container">
        <div class="main-footer-content">
          <div class="main-footer-left">
            <div class="main-footer-left__title">
              365change.vip обмен крипто валют.
            </div>
            <div class="main-footer-left__links">
              <router-link to="/rule" class="main-footer-left__links_link"
                >Правила обмена</router-link
              >
              <router-link to="/rate" class="main-footer-left__links_link"
                >Тарифы</router-link
              >
              <router-link to="/faq" class="main-footer-left__links_link"
                >FAQ</router-link
              >
            </div>
          </div>
          <div class="main-footer-center">
            <div class="main-footer-center__img">
              <a href="#">
                <img src="@/assets/telegram2.png" alt="" />
              </a>
            </div>
          </div>
          <div class="main-footer-right">
            <div class="main-footer-right__top">
              <img src="@/assets/phone24.png" alt="" />
              <div>support@365change.org</div>
            </div>
            <div class="main-footer-right__bottom">
              <div class="main-footer-right__bottom_start">Пн-Пт 24/7</div>
              <div class="main-footer-right__bottom_end">
                Сб-Вс с 11:00-22:00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  async created() {
    const checkIsToken = localStorage.getItem("token");
    if (checkIsToken) {
      const resultCheckAuthorization = await this.$store.dispatch(
        "checkAuthorization"
      );
      this.personIsAuth = resultCheckAuthorization;
    }
  },
  data() {
    return {
      personIsAuth: false,
      isMobileNav: false,
    };
  },
  methods: {
    goHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    async logoutPerson() {
      const resultLogout = await this.$store.dispatch("logout");
      if (resultLogout === true) {
        this.$router.go(0);
      }
    },
  },
  watch: {
    $route() {
      if (this.isMobileNav === true) {
        this.isMobileNav = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
}

.container {
  max-width: 960px;
  margin: 0 auto;
}

.nav-menu-mobile {
  display: block;
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

.main-header-right {
  display: flex;
  align-items: center;
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

.main-header-right__signin_link_isauth {
  margin-top: 2px;
  color: #000;
  font-size: 13px;
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

.main-header-right__signin_link_exit {
  text-decoration: none;
  color: #000;
  font-size: 13px;
}

.main-header-right__signin_link_exit:hover {
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
  cursor: pointer;
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

  .main-nav__left_img > img {
    width: 80px;
    height: 18.39px;
  }

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

  .main-nav__left_img > img {
    width: 80px;
    height: 18.39px;
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
}

@media (max-width: 768px) {
  .container {
    max-width: 695px;
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

  .main-nav {
    margin-top: 12px;
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

  .main-header-right__signin_link_isauth {
    font-size: 12px;
  }

  .main-header-right__signin_link_exit {
    font-size: 12px;
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

  .main-header-right__signin_link {
    font-size: 11px;
  }

  .main-header-right__signin_link_isauth {
    font-size: 11px;
  }

  .main-header-right__signin_link_exit {
    font-size: 11px;
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

  .main-header-right__signin_link_isauth {
    font-size: 9px;
  }

  .main-header-right__signin_link_exit {
    font-size: 9px;
  }
}
</style>
