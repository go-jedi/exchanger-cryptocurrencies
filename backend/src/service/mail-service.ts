import nodemailer from "nodemailer";

import { IUserData } from "../types/service/mail-service";

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "jvladosyans@gmail.com",
        pass: "", // Пароль от smtp gmail аккаунта
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    // метод для отправки пользователю на почту активационного письма, для активации аккаунта
    await this.transporter.sendMail({
      from: "jvladosyans@gmail.com",
      to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: "",
      html: `
				<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${link}">${link}</a>
				</div>
			`,
    });
  }

  async sendRecoveryMail(to: string, newPassword: string) {
    // метод для отправки пользователю на почту нового пароля
    await this.transporter.sendMail({
      from: "jvladosyans@gmail.com",
      to,
      subject: `Восстановление пароля для ${to}`,
      text: "",
      html: `
				<div>
					<h1>Ваш новый пароль:</h1>
					<b>Новый пароль: ${newPassword}</b>
				</div>
			`,
    });
  }

  async sendContactMail(to: string, userData: IUserData) {
    await this.transporter.sendMail({
      from: "jvladosyans@gmail.com",
      to,
      subject: `Вкладка Контакты от ${userData.email}`,
      text: "",
      html: `
				<div>
					<h1>Информация отправленная пользователем ${userData.email}:</h1>
					<div>
					    Имя пользователя: <b>${userData.name}</b> <br/>
					    Почта пользователя: <b>${userData.email}</b> <br/>
					    Id обмена: <b>${userData.id_exchange}</b> <br/>
					    Сообщение: <b>${userData.message}</b>
                    </div>
				</div>
			`,
    });
  }
}

export default new MailService();
