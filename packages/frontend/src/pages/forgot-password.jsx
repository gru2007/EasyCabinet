import { failure, success } from "../services";
import { resetPassword } from "../api";

export default function ForgotPassword() {
  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email");

    if (!email) {
      return failure("Заполните все поля");
    }

    if (await resetPassword(email)) {
      success("Запрос на сброс пароля отправлен. Проверьте почту");
    }
  };

  return (
    <section class="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div class="glass-panel w-full space-y-6 p-8 shadow-xl md:p-10">
        <header class="space-y-2 text-center">
          <h1 class="text-3xl font-semibold">Восстановление доступа</h1>
          <p class="text-sm text-neutral-300">
            Укажите почту, привязанную к аккаунту. Мы отправим письмо со ссылкой
            для сброса пароля.
          </p>
        </header>
        <form class="space-y-4" onSubmit={submit}>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="reset-email">
              Электронная почта
            </label>
            <input
              id="reset-email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="example@mail.com"
              class="form-input"
              required
            />
          </div>
          <button type="submit" class="primary-button w-full">
            Отправить ссылку
          </button>
        </form>
        <p class="text-center text-sm text-neutral-300">
          Вспомнили пароль?{" "}
          <a class="text-sky-300 hover:text-sky-200" href="/login">
            Вернуться к входу
          </a>
        </p>
      </div>
    </section>
  );
}
