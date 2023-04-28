<template>
  <div class="container">
    <div class="main-home">
      <div class="main-home-crypto">
        <div class="main-home-left">
          <div class="main-home-left__title">Отдаете</div>
          <div class="main-home-left__select">
            <a
              @click="giveSort('')"
              href="#"
              class="main-home-left__select_link"
              :class="{
                'main-home-left__select_link_active':
                  this.currentGiveCategory === 'Все',
              }"
              >Все</a
            >
            <a
              @click="giveSort('RUB')"
              href="#"
              class="main-home-left__select_link"
              :class="{
                'main-home-left__select_link_active':
                  this.currentGiveCategory === 'RUB',
              }"
              >RUB</a
            >
            <a
              @click="giveSort('USD')"
              href="#"
              class="main-home-left__select_link"
              :class="{
                'main-home-left__select_link_active':
                  this.currentGiveCategory === 'USD',
              }"
              >USD</a
            >
            <a
              @click="giveSort('COIN')"
              href="#"
              class="main-home-left__select_link"
              :class="{
                'main-home-left__select_link_active':
                  this.currentGiveCategory === 'COIN',
              }"
              >COIN</a
            >
          </div>
          <div class="main-home-left__wallets">
            <div
              class="main-home-left__wallets_wal"
              v-for="crypto in cryptos"
              :key="crypto.id"
            >
              <div
                v-if="crypto.type_convert !== 'Get'"
                class="main-home-left__wallets_wall"
                @click="
                  clickToGiveCrypto(crypto.name_currency, crypto.quote_name)
                "
                :class="{
                  'main-home-left__wallets_wall_active':
                    crypto.name_currency === selectCurrency,
                }"
              >
                <div class="main-home-left__wallets_wall_left">
                  <div class="main-home-left__wallets_wall_img">
                    <img
                      :src="getImgUrl(crypto.img_logo)"
                      :alt="crypto.img_logo"
                    />
                  </div>
                  <div class="main-home-left__wallets_wall_text">
                    {{ crypto.name_currency }}
                  </div>
                </div>
                <div class="main-home-left__wallets_wall_right">
                  <div class="main-home-left__wallets_wall_count">
                    {{ crypto.count_currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-home-right">
          <div class="main-home-right__title">Получаете</div>
          <div class="main-home-right__select">
            <a
              @click="getSort('')"
              href="#"
              class="main-home-right__select_link"
              :class="{
                'main-home-right__select_link_active':
                  this.currentGetCategory === 'Все',
              }"
              >Все</a
            >
            <a
              @click="getSort('RUB')"
              href="#"
              class="main-home-right__select_link"
              :class="{
                'main-home-right__select_link_active':
                  this.currentGetCategory === 'RUB',
              }"
              >RUB</a
            >
            <a
              @click="getSort('USD')"
              href="#"
              class="main-home-right__select_link"
              :class="{
                'main-home-right__select_link_active':
                  this.currentGetCategory === 'USD',
              }"
              >USD</a
            >
            <a
              @click="getSort('COIN')"
              href="#"
              class="main-home-right__select_link"
              :class="{
                'main-home-right__select_link_active':
                  this.currentGetCategory === 'COIN',
              }"
              >COIN</a
            >
          </div>
          <div class="main-home-right__wallets">
            <div
              class="main-home-right__wallets_wal"
              v-for="crypto in cryptosGet"
              :key="crypto.id"
            >
              <div
                @click="goToExchange(crypto.name_currency)"
                class="main-home-right__wallets_wall"
              >
                <div class="main-home-right__wallets_wall_left">
                  <div class="main-home-right__wallets_wall_img">
                    <img
                      :src="getImgUrl(crypto.img_logo)"
                      :alt="crypto.img_logo"
                    />
                  </div>
                  <div class="main-home-right__wallets_wall_in">
                    <div class="main-home-right__wallets_wall_text">
                      {{ crypto.name_currency }}
                    </div>
                    <div class="main-home-right__wallets_wall_info">
                      курс: 1.00 {{ selectQuoteCurrency }} =
                      {{
                        crypto.quote_currency[selectQuoteCurrency][
                          crypto.quote_name
                        ]
                      }}
                      {{ crypto.quote_name }}
                    </div>
                  </div>
                </div>
                <div class="main-home-right__wallets_wall_right">
                  <div class="main-home-right__wallets_wall_count">
                    {{
                      crypto.quote_currency[selectQuoteCurrency][
                        crypto.quote_name
                      ]
                    }}
                  </div>
                  <div class="main-home-right__wallets_wall_price">
                    резерв
                    {{
                      getRandomInt(
                        crypto.reserve_range[0],
                        crypto.reserve_range[1],
                        crypto.range_fixed
                      )
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-home-cryptoinfo">
        <div class="main-home-cryptoinfo__title">
          Надежный обмен криптовалюты
        </div>
        <div>
          <div class="main-home-cryptoinfo__left">
            <img src="@/assets/text_img.png" alt="" />
          </div>
          <div class="main-home-cryptoinfo__right">
            <div class="main-home-cryptoinfo__right_text">
              Сервис 365change.vip предназначен для тех, кто хочет быстро и
              безопасно купить или продать такие виды криптовалют как Bitcoin
              (BTC), Tether (USDT), Litecoin (LTC), Etherium (ETH), Ripple (XRP)
              и другие. Работаем со следующими банками и платёжными системами:
              Сбербанк, Альфа-Банк, Тинькофф, Qiwi, Яндекс Деньги, ВТБ 24, ПСБ.
            </div>
            <div class="main-home-cryptoinfo__right_texttwo">
              Осуществляем операции с наличными в городах: Краснодар, Сочи,
              Ростов, Москва, Санкт-Петербург
            </div>
            <div class="main-home-cryptoinfo__right_textthree">
              Сервис обмена криптовалют 365change.vip использует современное
              программное обеспечение, позволяющее удобно осуществлять
              конвертационные операции с использованием разных устройств.
            </div>
          </div>
        </div>
      </div>
      <div class="main-home-reserves">
        <div class="main-home-reserves__title">Резервы</div>
        <div class="main-home-reserves__content">
          <div
            class="main-home-reserves__content_wall"
            v-for="reserve in cryptos"
            :key="reserve.id"
          >
            <div class="main-home-reserves__content_wall_img">
              <img :src="getImgUrl(reserve.img_logo)" :alt="reserve.img_logo" />
            </div>
            <div class="main-home-reserves__content_wall_info">
              <div class="main-home-reserves__content_wall_title">
                {{ reserve.name_reserve }}
              </div>
              <div class="main-home-reserves__content_wall_text">
                {{
                  getRandomInt(
                    reserve.reserve_range[0],
                    reserve.reserve_range[1],
                    reserve.range_fixed
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-home-reviews">
        <div class="main-home-reviews__title">Отзывы</div>
        <div class="main-home-reviews__content">
          <div class="main-home-reviews__content_rev">
            <div class="main-home-reviews__content__title">
              <div class="main-home-reviews__content__title_name">Алекс</div>
              <div class="main-home-reviews__content__title_time">
                21.05.2022
              </div>
            </div>
            <div class="main-home-reviews__content__text">
              Всё четко, без нареканий, оператор на связи, перевод одной суммой.
              Вся процедура заняла +- полчаса.…
            </div>
          </div>
          <div class="main-home-reviews__content_rev">
            <div class="main-home-reviews__content__title">
              <div class="main-home-reviews__content__title_name">Натали</div>
              <div class="main-home-reviews__content__title_time">
                16.05.2022
              </div>
            </div>
            <div class="main-home-reviews__content__text">
              все оперативно,ребята молодцы
            </div>
          </div>
          <div class="main-home-reviews__content_rev">
            <div class="main-home-reviews__content__title">
              <div class="main-home-reviews__content__title_name">Сергей</div>
              <div class="main-home-reviews__content__title_time">
                15.05.2022
              </div>
            </div>
            <div class="main-home-reviews__content__text">
              Лучший обменник, с лучшими условиями и поддержкой. Очень
              благодарен Юрию, за помощь с ошибкой в…
            </div>
          </div>
          <div class="main-home-reviews__content_rev">
            <div class="main-home-reviews__content__title">
              <div class="main-home-reviews__content__title_name">ЕВГЕНИЯ</div>
              <div class="main-home-reviews__content__title_time">
                03.05.2022
              </div>
            </div>
            <div class="main-home-reviews__content__text">
              Очень быстро пришел перевод. Рекомендую.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home-view",
  async created() {
    if (Object.keys(this.$route.query).length > 0) {
      if (typeof this.$route.query["activeLink"] !== "undefined") {
        this.$notify({
          title: "Успех",
          message: "Ваш аккаунт успешно подтверждён.",
          type: "success",
        });
      }
    }
    let resGetCryptoCurrencies = await this.$store.dispatch(
      "getCryptoCurrencies"
    );
    this.cryptos = resGetCryptoCurrencies;
    localStorage.setItem("cryptos", JSON.stringify(this.cryptos));
    localStorage.setItem("selectCurrency", JSON.stringify(this.selectCurrency));
    localStorage.setItem(
      "selectQuoteCurrency",
      JSON.stringify(this.selectQuoteCurrency)
    );
    this.filterArrayBySelectCurrency();
  },
  data() {
    return {
      cryptos: [],
      cryptosGet: [],
      selectCurrency: "Bitcoin BTC",
      selectQuoteCurrency: "BTC",
      currentGiveCategory: "Все",
      currentGetCategory: "Все",
      cryptoCurrenciesValues: this.$store.state.cryptoValues,
    };
  },
  methods: {
    getImgUrl(pic) {
      return require("@/assets/" + pic);
    },
    getFullCryptosGet() {
      const arr = localStorage.getItem("cryptosGet");
      this.cryptosGet = JSON.parse(arr);
    },
    getFullCryptosGive() {
      const arr = localStorage.getItem("cryptos");
      this.cryptos = JSON.parse(arr);
    },
    giveSort(needSort) {
      if (needSort === "") {
        this.getFullCryptosGive();
        this.currentGiveCategory = "Все";
      } else {
        if (this.cryptos.length !== 14) {
          this.getFullCryptosGive();
        }

        this.cryptos = this.cryptos.filter((e) => {
          this.currentGiveCategory = needSort;
          return e.type_currency === needSort;
        });
      }
    },
    getSort(needSort) {
      if (needSort === "") {
        this.getFullCryptosGet();
        this.currentGetCategory = "Все";
      } else {
        this.getFullCryptosGet();

        this.cryptosGet = this.cryptosGet.filter((e) => {
          this.currentGetCategory = needSort;
          return e.type_currency === needSort;
        });
      }
    },
    clickToGiveCrypto(name, quoteName) {
      this.currentGiveCategory = "Все";
      this.currentGetCategory = "Все";
      this.getFullCryptosGive();
      this.selectCurrency = name;
      this.selectQuoteCurrency = quoteName;
    },
    filterArrayBySelectCurrency() {
      const currentSelectCurrency = localStorage.getItem("selectCurrency");
      let arrNeedCurrency = [];

      this.cryptos.find((e) => {
        if (
          e.name_currency === currentSelectCurrency.replace(/^"(.*)"$/, "$1")
        ) {
          for (let i = 0; i < e.can_convert.length; i++) {
            arrNeedCurrency.push(e.can_convert[i]);
          }
        }
      });

      let arrTwo = [];

      this.cryptos.filter((e) => {
        for (let i = 0; i < arrNeedCurrency.length; i++) {
          if (e.name_currency === arrNeedCurrency[i]) {
            arrTwo.push(e);
          }
        }
      });

      localStorage.setItem("cryptosGet", JSON.stringify(arrTwo));

      this.cryptosGet = arrTwo;
    },
    getRandomInt(min, max, needFixed) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let readyNum = Math.random() * (max - min) + min;
      return Number(readyNum.toFixed(needFixed));
    },
    toFixedBigNumber(x, isToFixed = false) {
      if (Math.abs(x) < 1.0) {
        let e = parseInt(x.toString().split("e-")[1]);
        if (e) {
          x *= Math.pow(10, e - 1);
          x = "0." + new Array(e).join("0") + x.toString().substring(2);
        }
      } else {
        let e = parseInt(x.toString().split("+")[1]);
        if (e > 20) {
          e -= 20;
          x /= Math.pow(10, e);
          x += new Array(e + 1).join("0");
        }
      }
      if (isToFixed === true) {
        return x.toFixed(6);
      } else {
        return x;
      }
    },
    goToExchange(nameCurrency) {
      localStorage.setItem(
        "giveCurrency",
        JSON.parse(localStorage.getItem("selectCurrency"))
      );
      localStorage.setItem("getCurrency", nameCurrency);
      this.$router.push("/exchange");
    },
  },
  watch: {
    selectCurrency(newValue) {
      localStorage.setItem("selectCurrency", JSON.stringify(newValue));
      this.filterArrayBySelectCurrency();
    },
    selectQuoteCurrency(newValue) {
      localStorage.setItem("selectQuoteCurrency", JSON.stringify(newValue));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
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

.main-home-left__wallets_wal:not(:first-child) {
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

.main-home-right__wallets_wal:not(:first-child) {
  margin-top: 10px;
}

.main-home-right__wallets_wal:hover {
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

@media (max-width: 926px) {
  .container {
    max-width: 838px;
  }

  .main-home-left {
    width: 362px;
  }

  .main-home-right {
    width: 362px;
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

  .main-home-left__wallets_wal:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-right__wallets_wal:not(:first-child) {
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

  .main-home-left {
    width: 362px;
  }

  .main-home-right {
    width: 362px;
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

  .main-home-left__wallets_wal:not(:first-child) {
    margin-top: 20px;
  }

  .main-home-right__wallets_wal:not(:first-child) {
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
}

@media (max-width: 428px) {
  .container {
    max-width: 390px;
  }

  .main-home-crypto {
    padding: 10px 0 0;
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

  .main-home-left__wallets_wal:not(:first-child) {
    margin-top: 13px;
  }

  .main-home-right__wallets_wal:not(:first-child) {
    margin-top: 13px;
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
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
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
}
</style>