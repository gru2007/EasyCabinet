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
    <div class="relative flex min-h-full items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_45%),_radial-gradient(circle_at_bottom,_rgba(124,58,237,0.18),_transparent_40%)]"
      />

      <div class="relative mx-4 w-full max-w-md">
        <article class="space-y-6 rounded-3xl border border-neutral-700/70 bg-neutral-900/80 p-10 shadow-[0_0_55px_-25px_rgba(56,189,248,0.5)] backdrop-blur">
          <header class="space-y-4 text-center">
            <div class="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" aria-hidden="true" />
            <h1 class="text-3xl font-light text-neutral-100">Вход в аккаунт GupsShield</h1>
            <p class="text-sm leading-relaxed text-neutral-300">
              Добро пожаловать в лаунчер сообщества. Входя в систему, вы подтверждаете, что ознакомились с
              <a class="ml-1 text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline" href="/rules">
                правилами сервера
              </a>
              .
            </p>
          </header>

          <form class="space-y-4" onSubmit={submit}>
            <label class="block space-y-2 text-sm text-neutral-200">
              <span class="pl-1 text-neutral-300">Логин</span>
              <input
                type="text"
                name="login"
                placeholder="Введите логин"
                class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/30"
              />
            </label>
            <label class="block space-y-2 text-sm text-neutral-200">
              <span class="pl-1 text-neutral-300">Пароль</span>
              <input
                type="password"
                name="password"
                placeholder="Введите пароль"
                class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30"
              />
            </label>
            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-4 py-3 text-sm font-semibold text-neutral-50 transition hover:from-sky-400 hover:to-violet-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
            >
              Войти
            </button>
          </form>

          <div class="space-y-3 text-center text-sm text-neutral-300">
            <a class="inline-flex items-center justify-center text-sky-300 transition hover:text-sky-200" href="/forgot-password">
              Забыли пароль?
            </a>
            <p class="text-neutral-400">
              Нет аккаунта?
              <a class="ml-1 text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline" href="/register">
                Зарегистрируйтесь сейчас
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
