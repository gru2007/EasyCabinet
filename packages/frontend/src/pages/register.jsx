import { useNavigate } from "@solidjs/router";
import { failure, success } from "../services";
import { register } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const login = formData.get("login");
    const email = formData.get("email");
    const password = formData.get("password");
    const password2 = formData.get("password2");

    if (!login || !email || !password || !password2) {
      return failure("Заполните все поля");
    }

    if (password !== password2) {
      return failure("Пароли не совпадают");
    }

    if (await register(email, login, password)) {
      success("Регистрация прошла успешно");
      navigate("/login");
    }
  };

  return (
    <section class="mx-auto flex w-full max-w-3xl flex-col items-center justify-center">
      <div class="glass-panel w-full space-y-6 p-8 shadow-xl md:p-10">
        <header class="space-y-2 text-center">
          <h1 class="text-3xl font-semibold">Создание аккаунта</h1>
          <p class="text-sm text-neutral-300">
            Заполните форму, чтобы присоединиться к сообществу GupsShield.
            После регистрации вы сможете войти в лаунчер и загрузить свой скин.
          </p>
        </header>
        <form class="grid gap-4" onSubmit={submit}>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="register-login">
              Логин
            </label>
            <input
              id="register-login"
              type="text"
              name="login"
              autocomplete="username"
              placeholder="Придумайте никнейм"
              class="form-input"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="register-email">
              Электронная почта
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              autocomplete="email"
              placeholder="example@mail.com"
              class="form-input"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="register-password">
              Пароль
            </label>
            <input
              id="register-password"
              type="password"
              name="password"
              autocomplete="new-password"
              placeholder="Придумайте надежный пароль"
              class="form-input"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium text-neutral-200" for="register-password2">
              Повторите пароль
            </label>
            <input
              id="register-password2"
              type="password"
              name="password2"
              autocomplete="new-password"
              placeholder="Введите пароль повторно"
              class="form-input"
              required
            />
          </div>
          <button type="submit" class="primary-button w-full">
            Создать аккаунт
          </button>
        </form>
        <p class="text-center text-sm text-neutral-300">
          Уже есть аккаунт?{" "}
          <a class="text-sky-300 hover:text-sky-200" href="/login">
            Войти
          </a>
        </p>
      </div>
    </section>
  );
}
