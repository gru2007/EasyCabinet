import { failure, success } from "../services";
import { changePassword } from "../api";
import { useNavigate } from "@solidjs/router";

export default function ChangePassword() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);
    const resetToken = searchParams.get("resetToken");

    if (!resetToken) {
      return failure("Отсутствует токен сброса пароля");
    }

    const formData = new FormData(event.target);

    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!password || !password2) {
      return failure("Заполните все поля");
    }

    if (password !== password2) {
      return failure("Пароли не совпадают");
    }

    if (await changePassword(resetToken, password)) {
      success("Пароль успешно изменен");
      navigate("/login");
    }
  };

  return (
    <section class="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div class="glass-panel w-full space-y-6 p-8 shadow-xl md:p-10">
        <header class="space-y-2 text-center">
          <h1 class="text-3xl font-semibold">Придумайте новый пароль</h1>
          <p class="text-sm text-neutral-300">
            Старайтесь использовать уникальную комбинацию символов. После
            сохранения вы сможете войти с новым паролем.
          </p>
        </header>
        <form class="space-y-4" onSubmit={submit}>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="new-password">
              Новый пароль
            </label>
            <input
              id="new-password"
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Введите новый пароль"
              class="form-input"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="repeat-password">
              Повторите пароль
            </label>
            <input
              id="repeat-password"
              type="password"
              name="password2"
              autocomplete="new-password"
              placeholder="Подтвердите новый пароль"
              class="form-input"
              required
            />
          </div>
          <button type="submit" class="primary-button w-full">
            Сохранить пароль
          </button>
        </form>
        <p class="text-center text-sm text-neutral-300">
          Отмена вернет вас к странице входа. Для повторного запроса откройте
          письмо со ссылкой.
        </p>
      </div>
    </section>
  );
}
