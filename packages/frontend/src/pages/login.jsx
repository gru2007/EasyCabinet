import { useNavigate } from "@solidjs/router";
import { failure } from "../services";
import { login } from "../api";

export default function Login() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const _login = formData.get("login");
    const password = formData.get("password");

    if (!_login || !password) {
      return failure("Заполните все поля");
    }

    if (await login(_login, password)) {
      navigate("/profile");
    }
  };

  return (
    <section class="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div class="glass-panel w-full space-y-6 p-8 shadow-xl md:p-10">
        <header class="space-y-2 text-center">
          <h1 class="text-3xl font-semibold">Вход в личный кабинет</h1>
          <p class="text-sm text-neutral-300">
            Используйте логин и пароль от вашего аккаунта GupsShield. Если
            забыли пароль, восстановите доступ через почту.
          </p>
        </header>
        <form class="space-y-4" onSubmit={submit}>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="login">
              Логин
            </label>
            <input
              id="login"
              type="text"
              name="login"
              autocomplete="username"
              placeholder="Введите никнейм"
              class="form-input"
              required
            />
          </div>
          <div class="space-y-1">
            <label
              class="text-sm font-medium text-neutral-200"
              for="password"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="Введите пароль"
              class="form-input"
              required
            />
          </div>
          <button type="submit" class="primary-button w-full">
            Войти
          </button>
        </form>
        <div class="flex flex-col gap-2 text-center text-sm text-neutral-300">
          <span>
            Нет аккаунта?{" "}
            <a class="text-sky-300 hover:text-sky-200" href="/register">
              Зарегистрируйтесь
            </a>
          </span>
          <a class="text-sky-300 hover:text-sky-200" href="/forgot-password">
            Забыли пароль?
          </a>
        </div>
      </div>
    </section>
  );
}
