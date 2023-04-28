<template>
  <div class="container">
    <div class="main-exchange">
      <div class="main-exchange-info">
        <div class="main-exchange-info__header">
          Обмен {{ giveCurrency }} на {{ getCurrency }}
        </div>
        <div class="main-exchange-info__content">
          <div class="main-exchange-info__content_title">Внимание!</div>
          <div class="main-exchange-info__content_textone">
            Оплачиваем. Оплата осуществляется после 3-х подтверждений в сети
            {{ giveCurrency }}. Обычно операция занимает 30мин — 2 часа в
            рабочее время (с 08:00 до 02:00 по МСК), иногда возможны задержки из
            за очереди или технических моментов. В период высоких нагрузок на
            сеть Bitcoin возможны задержки.
          </div>
          <div class="main-exchange-info__content_texttwo">
            Если в течении 15 минут после оформления заявки ваш Bitcoin перевод
            не получил подтверждения по данным blockchain.info, а так же при
            резком колебании курса (более 1%), администрация обменника оставляет
            за собой право вернуть перевод {{ giveCurrency }} обратно
            отправителю.
          </div>
          <div class="main-exchange-info__content_textthree">
            Уважаемые пользователи, будьте внимательны при создании заявки,
            обмен который содержит некорректные данные, (создана заявка на 0.987
            {{ giveCurrency }}, а отправлено 0.0987 {{ giveCurrency }}),
            расцениваются как мошеннические действия и для решения этого вопроса
            потребуется полная верификация на видео. После верификации возможен
            возврат криптовалюты за вычетом комиссии за отправку либо обмен с
            вычетом комиссии 5% из суммы обмена. Цените ваше время.
          </div>
          <div class="main-exchange-info__content_textfour">
            В целях противодействия легализации доходов, полученных преступным
            путем, и финансированию терроризма обменные пункты проводят
            AML-проверки поступающих от клиентов транзакций. В случае, если
            транзакция будет идентифицирована как высокорискованная, обменный
            пункт может приостановить обменную операцию до проведения проверки в
            соответствии со стандартами FATF. В некоторых исполнение заявки
            может быть приостановлено для проведения верификации личности или
            изъяты по запросу правоохранительных органов.
          </div>
          <div class="main-exchange-info__content_textfive">
            Курс фиксируется по заявке на момент подтверждения
            {{ giveCurrency }} в сети blockchain если за это время курс не стал
            ниже 1% от созданного в заявке. Комиссия обменов считается от биржи
            Binance.
          </div>
          <div class="main-exchange-info__content_textsix">
            Что бы ссылка была всегда под рукой добавляйте эту страницу в
            закладки
          </div>
          <div class="main-exchange-info__content_textseven">
            Наш телеграмм: <a href="#">Telegram</a> переходите только по этой
            ссылке, ни в коем случае не ищите по ник нейму через телеграм.
            Опасайтесь мошенников, используйте только эту ссылку
            <a href="#">Telegram</a>. Все обмены только через заявки в
            обменнике.
          </div>
        </div>
      </div>
      <div class="main-exchange-exc">
        <div class="main-exchange-give">
          <div class="main-exchange-give__title">Отдаете →</div>
          <div class="main-exchange-give__content">
            <div class="main-exchange-give__choice">
              <div v-for="item in currentGive" :key="item.id">
                <button
                  class="main-exchange-give__choice_btn"
                  @click="clickSelectGive"
                >
                  <img :src="getImgUrl(item.img_logo)" alt="" />
                  <div>{{ item.name_currency }}</div>
                </button>
              </div>
              <div v-if="isSelectGive" class="main-exchange-give__cryptos">
                <div
                  v-for="cryptoExchange in limitArrayGive()"
                  :key="cryptoExchange.id"
                >
                  <div
                    v-if="cryptoExchange.type_convert !== 'Get'"
                    href="#"
                    class="main-exchange-give__cryptos_cryptact"
                    @click="isChangeGive(cryptoExchange.name_currency)"
                  >
                    <img
                      :src="getImgUrl(cryptoExchange.img_logo)"
                      :alt="cryptoExchange.img_logo"
                    />
                    <div>{{ cryptoExchange.name_currency }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-exchange-give__sum">
              <div class="main-exchange-give__sum_title">Сумма:</div>
              <div class="main-exchange-give__sum_input">
                <input
                  type="text"
                  v-model="exchangeInput"
                  @change="giveExchangeInputChange"
                />
                <div>Внимание текущий курс: {{ formatPrice(currentSum) }}</div>
                <div>Минимальная сумма обмена: 20$</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-exchange-get">
          <div class="main-exchange-get__title">Получаете ←</div>
          <div class="main-exchange-get__content">
            <div class="main-exchange-get__choice">
              <div v-for="item in currentGet" :key="item.id">
                <button
                  class="main-exchange-get__choice_btn"
                  @click="clickSelectGet"
                >
                  <img :src="getImgUrl(item.img_logo)" alt="" />
                  <div>{{ item.name_currency }}</div>
                </button>
              </div>
              <div v-if="isSelectGet" class="main-exchange-get__cryptos">
                <div
                  v-for="cryptoExchange in limitArrayGet()"
                  :key="cryptoExchange.id"
                >
                  <div
                    v-if="cryptoExchange.type_convert !== 'Give'"
                    href="#"
                    class="main-exchange-get__cryptos_crypt"
                    @click="isChangeGet(cryptoExchange.name_currency)"
                  >
                    <img
                      :src="getImgUrl(cryptoExchange.img_logo)"
                      :alt="cryptoExchange.img_logo"
                    />
                    <div>{{ cryptoExchange.name_currency }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-exchange-get__sum">
              <div class="main-exchange-get__sum_title">Сумма:</div>
              <div class="main-exchange-get__sum_input">
                <input disabled :value="formatPrice(currentSum)" type="text" />
              </div>
            </div>
          </div>
          <div class="main-exchange-get__address">
            <label class="main-exchange-get__address_label">
              На {{ currentAddress }}::
            </label>
            <div
              class="main-exchange-get__address_input"
              :class="{
                'main-exchange-get__address_input_red':
                  formExchange.addressInputMistake === true,
              }"
            >
              <input type="text" v-model="formExchange.addressInput" />
            </div>
          </div>
        </div>
      </div>
      <div class="main-exchange-data">
        <div class="main-exchange-data__content">
          <div class="main-exchange-data__content_email">
            <label class="main-exchange-data__content_email_label"
              >E-mail:</label
            >
            <div
              class="main-exchange-data__content_email_input"
              :class="{
                'main-exchange-data__content_email_input_red':
                  formExchange.emailInputMistake,
              }"
            >
              <input type="text" v-model="formExchange.emailInput" />
              <div class="main-exchange-data__content_email_input_help">
                Пожалуйста, укажите действующий адрес электронный почты.
              </div>
            </div>
          </div>
          <div class="main-exchange-data__content_telegram">
            <label class="main-exchange-data__content_telegram_label"
              >Telegram:</label
            >
            <div
              class="main-exchange-data__content_telegram_input"
              :class="{
                'main-exchange-data__content_telegram_input_red':
                  formExchange.telegramInputMistake,
              }"
            >
              <input type="text" v-model="formExchange.telegramInput" />
              <div class="main-exchange-data__content_telegram_input_help">
                Введите Telegram/WhatsApp для связи с вами.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-exchange-btn">
        <button @click="formExchangeSubmit">Продолжить</button>
      </div>
      <div class="main-exchange-finishinfo">
        <div class="main-exchange-finishinfo__title">
          Обмен {{ giveCurrency }} на {{ getCurrency }}
        </div>
        <div class="main-exchange-finishinfo__textone">
          Для завершения обмена Вам необходимо выполнить следующие:
        </div>
        <div class="main-exchange-finishinfo__punkts">
          <div class="main-exchange-finishinfo__punkts_text">
            Корректно заполните все поля представленной формы. Укажите
            действительный адрес электронной почты. Нажмите кнопку «Продолжить».
          </div>
          <div class="main-exchange-finishinfo__punkts_text">
            Ознакомьтесь с условиями договора на оказание услуг обмена, если вы
            принимаете их, поставьте галочку в соответствующем поле/нажмите
            кнопку «Принимаю» («Согласен»). Еще раз проверьте данные заявки.
          </div>
          <div class="main-exchange-finishinfo__punkts_text">
            Оплатите заявку. Переводите точную сумму, указанною в системе, в
            противном случае обмен может затянуться, т.к. потребуются
            дополнительные уточнения.
          </div>
          <div class="main-exchange-finishinfo__punkts_text">
            После перевода {{ giveCurrency }} нажмите "Я оплатил". С этого
            момента заявка начнет обрабатываться.
          </div>
          <div class="main-exchange-finishinfo__punkts_text">
            После выполнения указанных действий, система переместит Вас на
            страницу «Состояние заявки», где будет указан статус вашего
            перевода. Сразу после 3-х подтверждений сети
            {{ giveCurrency }} Вы получите перевод в рублях на свой счет.
          </div>
        </div>
        <div class="main-exchange-finishinfo__texttwo">
          <b>Внимание:</b> для выполнения данной операции потребуется участие
          оператора.
        </div>
        <div class="main-exchange-finishinfo__textthree">
          Если в течении 15 минут после оформления заявки ваш
          {{ giveCurrency }} перевод не получил подтверждения по данным
          blockchain.info, а так же при резком колебании курса (более 1%),
          администрация обменника оставляет за собой право вернуть перевод
          Bitcoin обратно отправителю.
        </div>
        <div class="main-exchange-finishinfo__textfour">
          Уважаемые пользователи, будьте внимательны при создании заявки, обмен
          который содержит некорректные данные, (создана заявка на 0.987
          {{ giveCurrency }}, а отправлено 0.0987 {{ giveCurrency }}),
          расцениваются как мошеннические действия и для решения этого вопроса
          потребуется полная верификация на видео. Комиссия за отправку
          криптовалюты вычитается из полученной суммы. Цените ваше время.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exchange-view",
  async created() {
    const resGetCryptoCurrenciesExchange = await this.$store.dispatch(
      "getCryptoCurrenciesExchange"
    );
    this.cryptosExchange = resGetCryptoCurrenciesExchange;
    this.giveCurrency = localStorage
      .getItem("giveCurrency")
      .replace(/['"«»]/g, "");
    this.getCurrency = localStorage.getItem("getCurrency");
    this.giveCurrentPrice();
  },
  data() {
    return {
      giveCurrency: "",
      getCurrency: "",
      isSelectGive: false,
      isSelectGet: false,
      cryptosExchange: [],
      exchangeRate: "",
      exchangeInput: 1,
      currentSum: "",
      currentAddress: "",
      currentGive: [],
      currentGet: [],
      formExchange: {
        addressInput: "",
        emailInput: "",
        telegramInput: "",
        addressInputMistake: false,
        emailInputMistake: false,
        telegramInputMistake: false,
      },
    };
  },
  methods: {
    clickSelectGive() {
      if (this.isSelectGet === true) {
        this.isSelectGet = !this.isSelectGet;
      }
      this.isSelectGive = !this.isSelectGive;
    },
    clickSelectGet() {
      if (this.isSelectGive === true) {
        this.isSelectGive = !this.isSelectGive;
      }
      this.isSelectGet = !this.isSelectGet;
    },
    getImgUrl(pic) {
      return require("@/assets/" + pic);
    },
    limitArrayGive() {
      return this.cryptosExchange.filter((e) => {
        return e.name_currency !== this.giveCurrency;
      });
    },
    limitArrayGet() {
      let canCovertGive = [];
      this.cryptosExchange.find((e) => {
        if (e.name_currency === this.giveCurrency) {
          canCovertGive = e.can_convert;
        }
      });
      return this.cryptosExchange.filter((e) => {
        for (let i = 0; i < canCovertGive.length; i++) {
          if (e.name_currency === canCovertGive[i]) {
            return e;
          }
        }
      });
    },
    giveCurrentPrice() {
      const giveCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === this.giveCurrency) {
          return e;
        }
      });
      const getCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === this.getCurrency) {
          return e;
        }
      });
      this.currentGive.push(giveCurrency);
      this.currentGet.push(getCurrency);
      this.exchangeRate =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentSum =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentAddress =
        getCurrency.type_currency === "RUB"
          ? `карту ${this.getCurrency}`
          : getCurrency.type_currency === "COIN"
          ? `адрес ${this.getCurrency}`
          : getCurrency.type_currency === "USD"
          ? `адрес ${this.getCurrency}`
          : "";
    },
    giveExchangeInputChange() {
      this.currentSum = this.exchangeInput * this.exchangeRate;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(3).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isChangeGive(name_currency) {
      localStorage.setItem("giveCurrency", name_currency);
      this.giveCurrency = name_currency;
      this.isSelectGive = !this.isSelectGive;
      const giveCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === name_currency) {
          return e;
        }
      });
      const getCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === this.getCurrency) {
          return e;
        }
      });
      this.exchangeInput = 1;
      this.currentGive = [giveCurrency];
      this.exchangeRate =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentSum =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentAddress =
        getCurrency.type_currency === "RUB"
          ? `карту ${this.getCurrency}`
          : getCurrency.type_currency === "COIN"
          ? `адрес ${this.getCurrency}`
          : getCurrency.type_currency === "USD"
          ? `адрес ${this.getCurrency}`
          : "";
    },
    isChangeGet(name_currency) {
      localStorage.setItem("getCurrency", name_currency);
      this.getCurrency = name_currency;
      this.isSelectGet = !this.isSelectGet;
      const giveCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === this.giveCurrency) {
          return e;
        }
      });
      const getCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === name_currency) {
          return e;
        }
      });
      this.exchangeInput = 1;
      this.currentGet = [getCurrency];
      this.exchangeRate =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentSum =
        giveCurrency.quote_currency[giveCurrency.quote_name][
          getCurrency.quote_name
        ];
      this.currentAddress =
        getCurrency.type_currency === "RUB"
          ? `карту ${this.getCurrency}`
          : getCurrency.type_currency === "COIN"
          ? `адрес ${this.getCurrency}`
          : getCurrency.type_currency === "USD"
          ? `адрес ${this.getCurrency}`
          : "";
    },
    getRandomInt(min, max, needFixed) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let readyNum = Math.random() * (max - min) + min;
      return Number(readyNum.toFixed(needFixed));
    },
    async formExchangeSubmit() {
      if (this.formExchange.addressInput.length === 0) {
        this.formExchange.addressInputMistake = true;
      } else {
        this.formExchange.addressInputMistake = false;
        if (this.formExchange.emailInput.length === 0) {
          this.formExchange.emailInputMistake = true;
        } else {
          this.formExchange.emailInputMistake = false;
          if (this.formExchange.telegramInput.length === 0) {
            this.formExchange.telegramInputMistake = true;
          } else {
            this.formExchange.telegramInputMistake = false;
            localStorage.setItem("currentSumGiveFinish", this.exchangeInput);
            localStorage.setItem("currentSumGetFinish", this.currentSum);
            localStorage.setItem(
              "numberOrder",
              this.getRandomInt(107299, 6237299)
            );
            this.$router.push("/pay");
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}

// Страница Exchange
.main-exchange {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 960px;
  margin: 0 0 30px;
  padding: 40px 0 25px;
}

.main-exchange-info {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 10px 50px -15px RGB(0 0 0 / 22%);
}

.main-exchange-info__header {
  display: flex;
  justify-content: center;
  font: 300 24px/26px "Segoe UI";
  color: #000;
  padding: 20px 30px;
  background: #f5f5f5;
}

.main-exchange-info__content {
  background: #fff url("@/assets/vopr.png") no-repeat 100px 18px;
  padding: 15px 50px 15px 140px;
}

.main-exchange-info__content_title {
  font: 100 18px "Segoe UI";
  margin: 0 0 5px 0;
}

.main-exchange-info__content_textone {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_texttwo {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_textthree {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_textfour {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_textfive {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_textsix {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  font-weight: bold;
}

.main-exchange-info__content_textseven {
  padding: 5px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-info__content_textseven > a {
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #ffc512;
  text-decoration: none;
}

.main-exchange-info__content_textseven > a:hover {
  text-decoration: underline;
  color: #000;
}

.main-exchange-exc {
  width: 670px;
  margin: 20px auto;
}

.main-exchange-give__title {
  color: #929292;
  font: 600 18px "Segoe UI";
}

.main-exchange-give__content {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.main-exchange-give__choice {
  position: relative;
}

.main-exchange-give__choice_btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 330px;
  height: 40px;
  background: url("@/assets/rselect.png") no-repeat right center;
  border: 1px solid #5454542e;
  background-color: #fff;
}

.main-exchange-give__choice_btn:hover {
  background-color: #54545400;
}

.main-exchange-give__choice_btn > img {
  width: 40px;
  height: 40px;
}

.main-exchange-give__choice_btn > div {
  margin-left: 5px;
  font: 100 16px/40px "Segoe UI";
  color: #545454;
}

.main-exchange-give__cryptos {
  position: absolute;
  display: block;
  z-index: 5;
  float: none;
  top: 40px;
  left: 0;
  width: 330px;
  border-radius: 4px;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 180px;
  max-width: 330px;
  border: 1px solid #d2d2d2;
}

.main-exchange-give__cryptos_cryptact {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 330px;
  height: 40px;
  background-color: #fff;
  border-right: 1px solid #d2d2d2;
  text-decoration: none;
}

.main-exchange-give__cryptos_cryptact > img {
  margin: 0 5px;
  width: 40px;
  height: 40px;
}

.main-exchange-give__cryptos_cryptact > div {
  font: 100 16px/40px "Segoe UI";
  color: #ff7f66;
}

.main-exchange-give__cryptos_crypt {
  display: flex;
  align-items: center;
  width: 330px;
  height: 40px;
  background-color: #fff;
  border-right: 1px solid #d2d2d2;
  text-decoration: none;
}

.main-exchange-give__cryptos_crypt:hover {
  div {
    color: #ff7f66;
  }
}

.main-exchange-give__cryptos_crypt > img {
  margin: 0 5px;
  width: 40px;
  height: 40px;
}

.main-exchange-give__cryptos_crypt > div {
  font: 100 16px/40px "Segoe UI";
  color: #545454;
}

.main-exchange-give__sum {
  display: flex;
}

.main-exchange-give__sum_title {
  font: 12px/1.5em "Segoe UI", sans-serif;
  padding: 12px 10px 0 15px;
  vertical-align: top;
  color: #545454;
}

.main-exchange-give__sum_input {
  margin-left: 30px;
}

.main-exchange-give__sum_input > input {
  margin-bottom: 10px;
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

.main-exchange-give__sum_input > input:focus {
  border: 1px solid #00cccb;
}

.main-exchange-give__sum_input > div {
  font: 12px/1.5em "Segoe UI", sans-serif;
  text-align: right;
  color: red;
}

.main-exchange-get__title {
  color: #929292;
  font: 600 18px "Segoe UI";
}

.main-exchange-get__content {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.main-exchange-get__choice {
  position: relative;
}

.main-exchange-get__choice_btn {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 330px;
  height: 40px;
  background: url("@/assets/rselect.png") no-repeat right center;
  border: 1px solid #5454542e;
  background-color: #fff;
}

.main-exchange-get__choice_btn:hover {
  background-color: #54545400;
}

.main-exchange-get__choice_btn > img {
  width: 40px;
  height: 40px;
}

.main-exchange-get__choice_btn > div {
  margin-left: 5px;
  font: 100 16px/40px "Segoe UI";
  color: #545454;
}

.main-exchange-get__cryptos {
  position: absolute;
  display: block;
  z-index: 5;
  float: none;
  top: 40px;
  left: 0;
  width: 330px;
  border-radius: 4px;
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 180px;
  max-width: 330px;
  border: 1px solid #d2d2d2;
}

.main-exchange-get__cryptos_cryptact {
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 330px;
  height: 40px;
  background-color: #fff;
  border-right: 1px solid #d2d2d2;
  text-decoration: none;
}

.main-exchange-get__cryptos_cryptact > img {
  margin: 0 5px;
  width: 40px;
  height: 40px;
}

.main-exchange-get__cryptos_cryptact > div {
  font: 100 16px/40px "Segoe UI";
  color: #ff7f66;
}

.main-exchange-get__cryptos_crypt {
  display: flex;
  align-items: center;
  width: 330px;
  height: 40px;
  background-color: #fff;
  border-right: 1px solid #d2d2d2;
  text-decoration: none;
}

.main-exchange-get__cryptos_crypt:hover {
  div {
    color: #ff7f66;
  }
}

.main-exchange-get__cryptos_crypt > img {
  margin: 0 5px;
  width: 40px;
  height: 40px;
}

.main-exchange-get__cryptos_crypt > div {
  font: 100 16px/40px "Segoe UI";
  color: #545454;
}

.main-exchange-get__sum {
  display: flex;
}

.main-exchange-get__sum_title {
  font: 12px/1.5em "Segoe UI", sans-serif;
  padding: 12px 10px 0 15px;
  vertical-align: top;
  color: #545454;
}

.main-exchange-get__sum_input {
  margin-left: 30px;
}

.main-exchange-get__sum_input > input {
  margin-bottom: 10px;
  outline: none;
  border: 1px solid #e2e2e2;
  background: #eaeaea;
  opacity: 0.75;
  height: 40px;
  width: 200px;
  padding: 0 10px;
  transition: all 0.3s linear;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-exchange-get__sum_input > input:focus {
  border: 1px solid #00cccb;
}

.main-exchange-get__sum_input > div {
  font: 12px/1.5em "Segoe UI", sans-serif;
  text-align: right;
  color: red;
}

.main-exchange-get__address_label {
  font: 13px "Segoe UI";
  padding: 0 0 2px 2px;
  color: #545454;
}

.main-exchange-get__address_input > input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 330px;
  padding: 0 10px;
  transition: all 0.3s linear;
  box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-exchange-get__address_input_red > input {
  border: 1px solid red;
}

.main-exchange-get__address_input > input:focus {
  border: 1px solid #00cccb;
}

.main-exchange-data {
  margin-top: 20px;
}

.main-exchange-data__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #e7e8eb;
  border-top: 1px solid #e7e8eb;
  max-width: 100%;
  padding: 20px 30px;
  background: #f5f5f5;
}

.main-exchange-data__content_email {
  display: flex;
  align-items: center;
}

.main-exchange-data__content_email_label {
  width: 100px;
  font: 100 13px "Segoe UI";
  vertical-align: top;
}

.main-exchange-data__content_email_input {
  position: relative;
}

.main-exchange-data__content_email_input > input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 310px;
  padding: 0 10px;
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-exchange-data__content_email_input_red > input {
  border: 1px solid red;
}

.main-exchange-data__content_email_input > input:focus {
  border: 1px solid #00cccb;
}

.main-exchange-data__content_email_input_help {
  position: absolute;
  z-index: 2;
  float: none;
  top: 50px;
  left: 0;
  width: 100%;
  display: none;
  padding: 10px 15px;
  overflow: hidden;
  border-radius: 4px;
  color: #fff;
  font: 300 11px "Segoe UI";
  background: #ffc512;
}

.main-exchange-data__content_telegram {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.main-exchange-data__content_telegram_label {
  width: 100px;
  font: 100 13px "Segoe UI";
  vertical-align: top;
}

.main-exchange-data__content_telegram_input {
  position: relative;
}

.main-exchange-data__content_telegram_input > input {
  outline: none;
  border: 1px solid #e2e2e2;
  background: #fff;
  opacity: 0.75;
  height: 40px;
  width: 310px;
  padding: 0 10px;
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #545454;
  font: 13px/40px "Segoe UI", sans-serif;
}

.main-exchange-data__content_telegram_input_red > input {
  border: 1px solid red;
}

.main-exchange-data__content_telegram_input > input:focus {
  border: 1px solid #00cccb;
}

.main-exchange-data__content_telegram_input_help {
  position: absolute;
  z-index: 2;
  float: none;
  top: 50px;
  left: 0;
  width: 100%;
  display: none;
  padding: 10px 15px;
  overflow: hidden;
  border-radius: 4px;
  color: #fff;
  font: 300 11px "Segoe UI";
  background: #ffc512;
}

.main-exchange-btn {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.main-exchange-btn > button {
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

.main-exchange-btn > button:hover {
  background-color: #ffc512;
}

.main-exchange-finishinfo {
  margin-top: 50px;
  max-width: 960px;
  background: #fff;
  border-radius: 4px;
  padding: 25px 30px 25px;
  -webkit-box-shadow: 0 2px 4px #c4c2c2;
  box-shadow: 0 2px 4px #c4c2c2;
}

.main-exchange-finishinfo__title {
  font: 600 22px/26px "Segoe UI";
  color: #929292;
}

.main-exchange-finishinfo__textone {
  margin-top: 20px;
  padding: 0 0 10px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-finishinfo__punkts {
  margin: 0 0 10px 20px;
  padding: 10px 0 0 0;
}

.main-exchange-finishinfo__punkts_text {
  display: block;
  background: url(@/assets/wliarr.png) no-repeat 0 3px;
  padding: 0 0 5px 15px;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-finishinfo__texttwo {
  margin-top: 10px;
  padding: 0 0 10px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-finishinfo__textthree {
  padding: 0 0 10px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-exchange-finishinfo__textfour {
  padding: 0 0 10px 0;
  font: 12px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

@media (max-width: 926px) {
  .container {
    max-width: 838px;
  }

  //   Страница обмена
  .main-exchange-info__content {
    background: #fff url(@/assets/vopr.png) no-repeat 110px 18px;
    padding: 15px;
  }

  .main-exchange-give__content {
    flex-wrap: wrap;
  }

  .main-exchange-get__content {
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

@media (max-width: 820px) {
  .main-exchange-give__sum_input > div {
    font: 11px/1.5em "Segoe UI", sans-serif;
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

@media (max-width: 736px) {
  // Страница обмена
  .main-exchange-exc {
    width: 600px;
  }

  .main-exchange-give__choice_btn {
    width: 600px;
  }

  .main-exchange-give__sum {
    justify-content: end;
    margin-top: 20px;
    width: 100%;
  }

  .main-exchange-get__choice_btn {
    width: 600px;
  }

  .main-exchange-get__sum {
    justify-content: end;
    margin-top: 20px;
    width: 100%;
  }

  .main-exchange-get__address_input > input {
    width: 100%;
  }
}

@media (max-width: 667px) {
  .container {
    max-width: 603px;
  }

  .main-exchange-exc {
    width: 100%;
  }

  .main-exchange-give__choice_btn {
    width: 540px;
  }

  .main-exchange-get__choice_btn {
    width: 540px;
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

  //   Страница обмена
  .main-exchange-exc {
    max-width: 360px;
  }

  .main-exchange-info__header {
    font: 300 17px/26px "Segoe UI";
  }

  .main-exchange-info__content_textone {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_texttwo {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textthree {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textfour {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textfive {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textsix {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textseven {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textseven > a {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-give__choice_btn {
    width: 360px;
  }

  .main-exchange-give__sum {
    margin-top: 20px;
    width: 100%;
    justify-content: end;
  }

  .main-exchange-give__sum_input {
    margin-left: 10px;
  }

  .main-exchange-get__choice_btn {
    width: 360px;
  }

  .main-exchange-get__sum {
    margin-top: 20px;
    width: 100%;
    justify-content: end;
  }

  .main-exchange-get__sum_input {
    margin-left: 10px;
  }

  .main-exchange-get__address {
    margin-top: 15px;
  }

  .main-exchange-get__address_label {
    font: 12px "Segoe UI";
  }

  .main-exchange-get__address_input > input {
    width: 100%;
  }

  .main-exchange-data__content_email_input > input {
    width: 210px;
  }

  .main-exchange-data__content_telegram_input > input {
    width: 210px;
  }

  .main-exchange-btn > button {
    margin-top: 15px;
    width: 100%;
  }

  .main-exchange-finishinfo__title {
    font: 600 17px/26px "Segoe UI";
  }

  .main-exchange-finishinfo__textone {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__punkts_text {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__texttwo {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__textthree {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__textfour {
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

  //   Страница обмена
  .main-exchange-info__header {
    font: 300 15px/26px "Segoe UI";
  }

  .main-exchange-info__content_textone {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_texttwo {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textthree {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textfour {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textfive {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textseven {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-info__content_textseven > a {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-exc {
    max-width: 340px;
  }

  .main-exchange-give__choice_btn {
    width: 340px;
  }

  .main-exchange-give__choice_btn > div {
    font: 100 14px/40px "Segoe UI";
  }

  .main-exchange-give__sum_input > input {
    width: 170px;
    height: 35px;
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-exchange-give__sum_input > div {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-get__choice_btn {
    width: 340px;
  }

  .main-exchange-get__sum_input > input {
    width: 170px;
    height: 35px;
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-exchange-get__choice_btn > div {
    font: 100 14px/40px "Segoe UI";
  }

  .main-exchange-data__content_email_label {
    font: 100 11px "Segoe UI";
  }

  .main-exchange-data__content_email_input > input {
    width: 210px;
    height: 35px;
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-exchange-data__content_telegram_label {
    font: 100 11px "Segoe UI";
  }

  .main-exchange-data__content_telegram_input > input {
    width: 210px;
    height: 35px;
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-exchange-btn > button {
    font: 100 12px/40px "Segoe UI", serif;
  }

  .main-exchange-finishinfo__title {
    font: 600 15px/26px "Segoe UI";
  }

  .main-exchange-finishinfo__textone {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__punkts_text {
    font: 9px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__texttwo {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__textthree {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-exchange-finishinfo__textfour {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }
}

@media (max-width: 360px) {
  .container {
    max-width: 333px;
  }

  //   Страница обмена
  .main-exchange-exc {
    max-width: 300px;
  }

  .main-exchange-give__title {
    font: 600 15px "Segoe UI";
  }

  .main-exchange-give__choice_btn {
    width: 300px;
  }

  .main-exchange-give__choice_btn > div {
    font: 100 13px/40px "Segoe UI";
  }

  .main-exchange-get__title {
    font: 600 15px "Segoe UI";
  }

  .main-exchange-get__choice_btn > div {
    font: 100 13px/40px "Segoe UI";
  }

  .main-exchange-get__choice_btn {
    width: 300px;
  }

  .main-exchange-data__content_email_label {
    width: 70px;
  }

  .main-exchange-data__content_email_input > input {
    width: 180px;
  }

  .main-exchange-data__content_telegram_label {
    width: 70px;
  }

  .main-exchange-data__content_telegram_input > input {
    width: 180px;
  }

  .main-exchange-finishinfo__title {
    font: 600 14px/26px "Segoe UI";
  }
}

@media (max-width: 320px) {
  .container {
    max-width: 300px;
  }

  //   Страница обмена
  .main-exchange-exc {
    max-width: 290px;
  }

  .main-exchange-give__choice_btn {
    width: 290px;
  }

  .main-exchange-give__choice_btn {
    width: 290px;
  }
}
</style>