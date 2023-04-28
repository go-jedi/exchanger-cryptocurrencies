<template>
  <form class="main-contacts-left__form" @submit.prevent="contactSubmitForm">
    <div class="main-contacts-left__form_name">
      <label class="main-contacts-left__form_name_label" for="contact-name"
        >Ваше имя <span>*</span>:</label
      >
      <div class="main-contacts-left__form_name_input">
        <input
          type="text"
          id="contact-name"
          @blur="$v.formContact.name.$touch()"
          v-model.trim="formContact.name"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formContact.name.$error ||
            ($v.formContact.name.$dirty && !$v.formContact.name.required)
          "
        >
          Необходимо указать Имя
        </div>
      </div>
    </div>
    <div class="main-contacts-left__form_email">
      <label class="main-contacts-left__form_email_label" for="contact-email"
        >Ваш e-mail <span>*</span>:</label
      >
      <div class="main-contacts-left__form_email_input">
        <input
          type="text"
          id="contact-email"
          @blur="$v.formContact.email.$touch()"
          :class="status($v.formContact.email)"
          v-model.trim="formContact.email"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formContact.email.$error ||
            ($v.formContact.email.$dirty && !$v.formContact.email.required)
          "
        >
          Необходимо указать email
        </div>
        <div class="invalid-feed" v-if="!$v.formContact.email.email">
          Пожалуйста введите Email адрес
        </div>
      </div>
    </div>
    <div class="main-contacts-left__form_id">
      <label class="main-contacts-left__form_id_label" for="contact-id"
        >ID обмена:</label
      >
      <div class="main-contacts-left__form_id_input">
        <input
          id="contact-id"
          type="text"
          @blur="$v.formContact.id_exchange.$touch()"
          v-model.trim="formContact.id_exchange"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formContact.id_exchange.$error ||
            ($v.formContact.id_exchange.$dirty &&
              !$v.formContact.id_exchange.required)
          "
        >
          Необходимо указать ID обмена
        </div>
      </div>
    </div>
    <div class="main-contacts-left__form_message">
      <label
        class="main-contacts-left__form_message_label"
        for="contact-message"
        >Текст отзыва <span>*</span>:</label
      >
      <div class="main-contacts-left__form_message_textarea">
        <textarea
          id="contact-message"
          @blur="$v.formContact.message.$touch()"
          v-model.trim="formContact.message"
        ></textarea>
        <div
          class="invalid-feed"
          v-if="
            $v.formContact.message.$error ||
            ($v.formContact.message.$dirty && !$v.formContact.message.required)
          "
        >
          Необходимо указать текст отзыва
        </div>
      </div>
    </div>
    <div class="main-contacts-left__form_btn">
      <button
        type="submit"
        :disabled="isDisabledBtnSubmit"
        @click.prevent="contactSubmitForm"
      >
        Отправить сообщение
      </button>
    </div>
  </form>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  name: "contact-component",
  data() {
    return {
      formContact: {
        name: "",
        email: "",
        id_exchange: "",
        message: "",
      },
      isDisabledBtnSubmit: false,
    };
  },
  methods: {
    status(validation) {
      return {
        "is-invalid": validation.$error,
      };
    },
    async contactSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        console.log("Success");
        try {
          this.$emit("isLoadingBehavior", true);
          const formData = {
            name: this.formContact.name,
            email: this.formContact.email,
            id_exchange: this.formContact.id_exchange,
            message: this.formContact.message,
          };

          const resCreateContact = await this.$store.dispatch(
            "createContact",
            formData
          );
          if (resCreateContact.result === true) {
            this.$emit("isLoadingBehavior", false);
            this.$notify({
              title: "Успех отправки отзыва",
              message: `${resCreateContact.message}`,
              type: "success",
            });
            setTimeout(() => {
              this.isDisabledBtnSubmit = false;
              this.$router.go(0);
            }, 2000);
          }
        } catch (error) {
          this.$emit("isLoadingBehavior", false);
          this.isDisabledBtnSubmit = false;
          console.log(
            "Error in contactSubmitForm in ContactComponent func -->",
            error
          );
        }
      }
    },
  },
  validations: {
    formContact: {
      name: {
        required,
      },
      email: {
        email,
        required,
      },
      id_exchange: {
        required,
      },
      message: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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

.is-invalid {
  font-size: 12px;
  border: 1px solid #dc3545;
}

.invalid-feed {
  margin-top: 3px;
  font-size: 12px;
  color: #dc3545;
}

@media (max-width: 428px) {
  .main-contacts-left__form_btn > button {
    font: 100 12px/40px "Segoe UI", serif;
  }
}

@media (max-width: 390px) {
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
}
</style>