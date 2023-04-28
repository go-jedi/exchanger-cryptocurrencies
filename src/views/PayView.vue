<template>
  <div class="container">
    <div class="main-pay">
      <div class="main-pay-info">
        <div class="main-pay-info__title">Номер заявки №{{ numberOrder }}</div>
        <div class="main-pay-info__warning">Внимание!</div>
        <div class="main-pay-info__textone">
          Оплачиваем с {{ currentAddressGive }} <br />
          Оплата осуществляется после 3-х подтверждений в сети
          {{ giveCurrency }}. <br />
          Обычно операция занимает от 30 минут до 24 часов в рабочее время(с
          08:00 до 02:00 по МСК), иногда возможны задержки из за очереди или
          технических моментов. <br />
          В период высоких нагрузок на сеть возможны задержки.
        </div>
        <div class="main-pay-info__texttwo">
          Если в течении 15 минут после оформления заявки ваш BTC перевод не
          получил подтверждений по данным blockchain.info, а так же при резком
          колебании курса (более 1%), администрация обменника оставляет за собой
          право вернуть перевод обратно отправителю.
        </div>
        <div class="main-pay-info__textthree">
          Уважаемые пользователи, будьте внимательны при создании заявки, обмен
          который содержит некорректные данные, (создана заявка на 0.987
          {{ giveCurrency }}, А отправлено 0.0987), расцениваются как
          мошеннические действия и для решения этого вопроса потребуется полная
          верификация на видео. <br />
          После верификации возможен возврат криптовалюты за вычетом комиссии за
          отправку либо обмен с вычетом комиссии 5% из суммы обмена. <br />
          Цените ваше время.
        </div>
        <div class="main-pay-info__textfour">
          В целях противодействия легализации доходов, полученных преступным
          путем, и финансированию терроризма обменные пункты проводят
          AML-проверки поступающих от клиентов транзакций. <br />
          В случае, если транзакция будет идентифицирована как
          высокорискованная, обменный пункт может приостановить обменную
          операцию до проведения проверки в соответствии со стандартами FATF.
          <br />
          В некоторых исполнение заявки может быть приостановлено для проведения
          верификации личности или изьяти по запросу правоохранительных органов.
        </div>
        <div class="main-pay-info__textfive">
          Курс фиксируется по заявке на момент подтверждения
          {{ giveCurrency }} в сети blockchain.info если за это время курс не
          стал ниже 1% от созданного в заявке. <br />
          Комиссия обменов считается от биржи Binance.
        </div>
        <div class="main-pay-info__textsix">
          Что бы ссылка была всегда под рукой добавляйте эту страницу в
          закладки.
        </div>
        <div class="main-pay-info__textseven">
          Наш телеграмм: <a href="#">Telegram</a> переходите только по этой
          ссылке, ни в коем случае не ищите по ник нейму через телеграм.
          Опасайтесь мошенников, используйте только эту ссылку
          <a href="#">Telegram</a>. <br />
          Все обмены только через заявки в обменнике.
        </div>
      </div>
      <div class="main-pay-content">
        <div class="main-pay-content__title">Как оплатить:</div>
        <div class="main-pay-content__info">
          Отправьте сумму обмена на адрес. <br />
          После подтверждения транзакции стратус заявки обновится.
        </div>
        <div class="main-pay-content__window">
          <div class="main-pay-content__window_sum">Сумма:</div>
          <div class="main-pay-content__window_sumcount">
            <b>{{ currentSumGive }}</b> {{ giveCurrency }}
          </div>
          <div class="main-pay-content__window_where">Отправить на Адрес:</div>
          <div class="main-pay-content__window_address">
            {{ walletCurrent }}
          </div>
          <div class="main-pay-content__window_btn">
            <button @click="checkPayment">Проверить оплату</button>
          </div>
        </div>
        <div class="main-pay-content__infopay">
          <div class="main-pay-content__infopay_one">
            Сумма платежа: {{ currentSumGive }} {{ giveCurrency }} к получению:
            {{ currentSumGet }}
            {{ getCurrency }}
            <br />
            Пожалуйста, будьте внимательны! Все поля должны быть заполнены в
            точном соответствии с инструкцией, в противном случае, платеж может
            не пройти.
          </div>
          <div class="main-pay-content__infopay_two">
            Время оформиения: {{ generateCurrentTime() }} <br />
            Статус заявки: принята, ожидает оплаты клиентом
          </div>
          <div class="main-pay-content__infopay_three">
            Внимание! Нажмите кнопку "Проверить оплату", если вы оплатили
            заявку. <br />
            Каждые 30 секунд мы проверяем оплату.
          </div>
          <div class="main-pay-content__infopay__btncancel">
            <button @click="cancelOrder">Отменить заявку</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <LoadingComponent />
    </div>
  </div>
</template>

<script>
import LoadingComponent from "@/components/LoadingComponent.vue";
export default {
  name: "pay-view",
  async created() {
    this.numberOrder = localStorage.getItem("numberOrder");
    const resGetCryptoCurrenciesExchange = await this.$store.dispatch(
      "getCryptoCurrenciesExchange"
    );
    const addressWallet = await this.$store.dispatch("getWallets");
    console.log("addressWallet -->", addressWallet[0]);
    this.walletCurrent = addressWallet[0].address_wallet;
    this.cryptosExchange = resGetCryptoCurrenciesExchange;
    this.giveCurrency = localStorage
      .getItem("giveCurrency")
      .replace(/['"«»]/g, "");
    this.getCurrency = localStorage.getItem("getCurrency");
    this.currentSumGive = localStorage.getItem("currentSumGiveFinish");
    this.currentSumGet = localStorage.getItem("currentSumGetFinish");
    this.giveCurrentData();
  },
  data() {
    return {
      giveCurrency: "",
      getCurrency: "",
      numberOrder: 0,
      currentAddressGive: "",
      currentSumGive: 0,
      currentSumGet: 0,
      cryptosExchange: [],
      currentTime: "",
      walletCurrent: "",
      isLoading: false,
    };
  },
  methods: {
    getRandomInt(min, max, needFixed) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let readyNum = Math.random() * (max - min) + min;
      return Number(readyNum.toFixed(needFixed));
    },
    generateCurrentTime() {
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); // текущий месяц
      let year = date_ob.getFullYear(); // текущий год
      let hours = date_ob.getHours(); // текущие часы
      let minutes = date_ob.getMinutes(); // текущие минуты

      return (
        (year + "-" + month + "-" + date).split("-").reverse().join("-") +
        ", " +
        hours +
        ":" +
        minutes
      );
    },
    giveCurrentData() {
      const giveCurrency = this.cryptosExchange.find((e) => {
        if (e.name_currency === this.giveCurrency) {
          return e;
        }
      });
      this.currentAddressGive =
        giveCurrency.type_currency === "RUB"
          ? `карты ${this.giveCurrency}`
          : giveCurrency.type_currency === "COIN"
          ? `адреса ${this.giveCurrency}`
          : giveCurrency.type_currency === "USD"
          ? `адреса ${this.giveCurrency}`
          : "";
    },
    checkPayment() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$alert(
          "В данный момент транзакция находится в обработке",
          "Статус оплаты",
          {
            confirmButtonText: "Продолжить",
            callback: () => {
              return;
            },
          }
        );
      }, 5000);
    },
    cancelOrder() {
      localStorage.removeItem("giveCurrency");
      localStorage.removeItem("getCurrency");
      localStorage.removeItem("currentSumGiveFinish");
      localStorage.removeItem("currentSumGetFinish");
      localStorage.removeItem("numberOrder");
      this.$router.push("/");
    },
  },
  components: {
    LoadingComponent,
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
}

// Страница оплаты
.main-pay {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-width: 950px;
  margin: 0 0 30px;
  padding: 40px 0 25px;
}

.main-pay-info {
  background: #fff;
  padding: 40px 70px;
  text-align: justify;
  box-shadow: 0 0 15px RGB(207 207 207);
}

.main-pay-info__title {
  text-align: center;
  font: 19px/1.5em "Segoe UI", sans-serif;
  font-weight: 400;
  color: #545454;
}

.main-pay-info__warning {
  font-size: 18px;
  letter-spacing: 1px;
  font-weight: 400;
  font: 17px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textone {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__texttwo {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textthree {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textfour {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textfive {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textsix {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  font-weight: 700;
}

.main-pay-info__textseven {
  margin: 8px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-info__textseven > a {
  color: #ffc512;
  text-decoration: none;
}

.main-pay-info__textseven > a:hover {
  color: #545454;
  text-decoration: underline;
}

.main-pay-content {
  padding: 15px 20px;
}

.main-pay-content__title {
  font: 18px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  font-weight: 700;
}

.main-pay-content__info {
  margin: 15px 0;
  font: 14px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__window {
  background: #ffffff90;
  text-align: right;
  padding: 10px 20px;
  font-size: 15px;
  letter-spacing: 0.5px;
}

.main-pay-content__window_sum {
  font: 15px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__window_sumcount {
  font: 15px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__window_where {
  font: 15px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__window_address {
  font: 15px/1.5em "Segoe UI", sans-serif;
  color: #545454;
  font-weight: 700;
}

.main-pay-content__window_btn {
  margin-top: 20px;
  text-align: center;
}

.main-pay-content__window_btn > button {
  height: 40px;
  width: 200px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 0;
  background: #e4e4e4;
  cursor: pointer;
  color: #585858;
  font-size: 13px;
  text-align: center;
  transition: 0.5s;
  position: relative;
}

.main-pay-content__window_btn > button:hover {
  background: #ffc512;
}

.main-pay-content__infopay_one {
  margin: 15px 0;
  font: 13px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__infopay_two {
  margin: 15px 0;
  font: 13px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__infopay_three {
  margin: 15px 0;
  font: 13px/1.5em "Segoe UI", sans-serif;
  color: #545454;
}

.main-pay-content__infopay__btncancel {
  display: flex;
  justify-content: end;
  margin-top: 15px;
}

.main-pay-content__infopay__btncancel > button {
  width: 180px;
  height: 35px;
  margin-right: 0;
  border: none;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: RGB(255, 130, 130);
  cursor: pointer;
  transition: 0.5s;
}

.main-pay-content__infopay__btncancel > button:hover {
  background: RGB(255 85 85);
}

@media (max-width: 926px) {
  .container {
    max-width: 838px;
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

  .main-pay-info {
    padding: 30px 20px;
  }

  .main-pay-info__title {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__warning {
    font: 14px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textone {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__texttwo {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textthree {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textfour {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textfive {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textsix {
    font: 11px/1.5em "Segoe UI", sans-serif;
    font-weight: 700;
  }

  .main-pay-info__textseven {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__title {
    font: 16px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__info {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_sum {
    font: 13px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_sumcount {
    font: 13px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_where {
    font: 13px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_address {
    font: 11px/1.5em "Segoe UI", sans-serif;
    font-weight: 700;
  }

  .main-pay-content__window_btn > button {
    height: 35px;
    width: 170px;
    font-size: 11px;
  }

  .main-pay-content__infopay_one {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay_two {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay_three {
    font: 11px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay__btncancel > button {
    width: 160px;
    height: 30px;
    font-size: 10px;
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

  .main-pay-info__title {
    font: 15px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__warning {
    font: 13px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textone {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__texttwo {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textthree {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textfour {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textfive {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-info__textsix {
    font: 10px/1.5em "Segoe UI", sans-serif;
    font-weight: 700;
  }

  .main-pay-info__textseven {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__title {
    font: 15px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__info {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_sum {
    font: 12px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_sumcount {
    font: 12px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_where {
    font: 12px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__window_address {
    font: 10px/1.5em "Segoe UI", sans-serif;
    font-weight: 700;
  }

  .main-pay-content__window_btn > button {
    height: 35px;
    width: 170px;
    font-size: 10px;
  }

  .main-pay-content__infopay_one {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay_two {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay_three {
    font: 10px/1.5em "Segoe UI", sans-serif;
  }

  .main-pay-content__infopay__btncancel > button {
    width: 160px;
    height: 30px;
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

  .main-pay-content__window_address {
    font: 9px/1.5em "Segoe UI", sans-serif;
    font-weight: 700;
  }
}
</style>