<template>
  <form class="main-reviews-left__form" @submit.prevent="reviewSubmitForm">
    <div class="main-reviews-left__form_name">
      <label class="main-reviews-left__form_name_label" for="review-name"
        >Ваше имя <span>*</span>:</label
      >
      <div class="main-reviews-left__form_name_input">
        <input
          type="text"
          id="review-name"
          @blur="$v.formReview.name.$touch()"
          :class="status($v.formReview.name)"
          v-model.trim="formReview.name"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formReview.name.$error ||
            ($v.formReview.name.$dirty && !$v.formReview.name.required)
          "
        >
          Необходимо указать Имя Пользователя
        </div>
      </div>
    </div>
    <div class="main-reviews-left__form_email">
      <label class="main-reviews-left__form_email_label" for="review-email"
        >Ваш e-mail <span>*</span>:</label
      >
      <div class="main-reviews-left__form_email_input">
        <input
          type="text"
          id="review-email"
          @blur="$v.formReview.email.$touch()"
          :class="status($v.formReview.email)"
          v-model.trim="formReview.email"
        />
        <div
          class="invalid-feed"
          v-if="
            $v.formReview.email.$error ||
            ($v.formReview.email.$dirty && !$v.formReview.email.required)
          "
        >
          Необходимо указать email
        </div>
        <div class="invalid-feed" v-if="!$v.formReview.email.email">
          Пожалуйста введите Email адрес
        </div>
      </div>
    </div>
    <div class="main-reviews-left__form_message">
      <label class="main-reviews-left__form_message_label" for="review-message"
        >Текст отзыва <span>*</span>:</label
      >
      <div class="main-reviews-left__form_message_textarea">
        <textarea
          id="review-message"
          @blur="$v.formReview.message.$touch()"
          :class="status($v.formReview.message)"
          v-model.trim="formReview.message"
        ></textarea>
        <div
          class="invalid-feed"
          v-if="
            $v.formReview.message.$error ||
            ($v.formReview.message.$dirty && !$v.formReview.message.required)
          "
        >
          Необходимо указать текст отзыва
        </div>
      </div>
    </div>
    <div class="main-reviews-left__form_btn">
      <button
        type="submit"
        :disabled="isDisabledBtnSubmit"
        @click.prevent="reviewSubmitForm"
      >
        Оставить отзыв
      </button>
    </div>
  </form>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";

export default {
  name: "review-component",
  data() {
    return {
      formReview: {
        name: "",
        email: "",
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
    async reviewSubmitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("Error");
      } else {
        console.log("Success");
        try {
          this.$emit("isLoadingBehavior", true);
          this.isDisabledBtnSubmit = true;
          const formData = {
            name: this.formReview.name,
            email: this.formReview.email,
            message: this.formReview.message,
          };

          const resCreateReview = await this.$store.dispatch(
            "createReview",
            formData
          );
          if (resCreateReview.result === true) {
            this.$emit("isLoadingBehavior", false);
            this.$notify({
              title: "Успех отправки отзыва",
              message: `${resCreateReview.message}`,
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
            "Error in reviewSubmitForm in ReviewComponent func -->",
            error
          );
        }
      }
    },
  },
  validations: {
    formReview: {
      name: {
        required,
      },
      email: {
        email,
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
.main-reviews-left__form_name {
  padding: 8px 0;
}

.main-reviews-left__form_name_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-reviews-left__form_name_label > span {
  color: #ff0000;
}

.main-reviews-left__form_name_input > input {
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

.main-reviews-left__form_name_input > input:focus {
  border: 1px solid #00cccb;
}

.main-reviews-left__form_email {
  padding: 8px 0;
}

.main-reviews-left__form_email_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-reviews-left__form_email_label > span {
  color: #ff0000;
}

.main-reviews-left__form_email_input > input {
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

.main-reviews-left__form_email_input > input:focus {
  border: 1px solid #00cccb;
}

//
.main-reviews-left__form_message {
  padding: 8px 0;
}

.main-reviews-left__form_message_label {
  padding: 0 0 3px;
  font: 600 13px "Segoe UI", sans-serif;
  color: #252927;
}

.main-reviews-left__form_message_label > span {
  color: #ff0000;
}

.main-reviews-left__form_message_textarea > textarea {
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

.main-reviews-left__form_message_textarea > textarea:focus {
  border: 1px solid #00cccb;
}

.main-reviews-left__form_btn {
  padding: 8px 0;
}

.main-reviews-left__form_btn > button {
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

.main-reviews-left__form_btn > button:hover {
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

@media (max-width: 926px) {
  .main-reviews-left__form_name_input > input {
    width: 100%;
  }

  .main-reviews-left__form_email_input > input {
    width: 100%;
  }
}

@media (max-width: 428px) {
  .main-reviews-left__form_name_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_email_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_message_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_btn > button {
    padding: 0 20px;
    font: 100 11px/40px "Segoe UI", serif;
  }
}

@media (max-width: 375px) {
  .main-reviews-left__form_name_input > input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_email_input > input {
    font: 11px/40px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_message_textarea > textarea {
    font: 11px/40px "Segoe UI", sans-serif;
  }
}

@media (max-width: 360px) {
  .main-reviews-left__form_name_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_email_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_message_label {
    font: 600 11px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_btn > button {
    padding: 0 20px;
    font: 100 11px/40px "Segoe UI", serif;
  }
}

@media (max-width: 320px) {
  .main-reviews-left__form_name_label {
    font: 600 10px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_email_label {
    font: 600 10px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_message_label {
    font: 600 10px "Segoe UI", sans-serif;
  }

  .main-reviews-left__form_btn > button {
    padding: 0 20px;
    font: 100 10px/40px "Segoe UI", serif;
  }
}
</style>