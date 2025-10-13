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
    <div class="relative flex min-h-full items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 py-16">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_45%),_radial-gradient(circle_at_bottom,_rgba(56,189,248,0.22),_transparent_42%)]"
      />

      <div class="relative mx-4 w-full max-w-2xl">
        <article class="grid gap-10 rounded-3xl border border-neutral-700/70 bg-neutral-900/80 p-10 shadow-[0_0_60px_-25px_rgba(124,58,237,0.55)] backdrop-blur md:grid-cols-5">
          <header class="md:col-span-2 space-y-4">
            <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-sky-500 md:mx-0" aria-hidden="true" />
            <h1 class="text-3xl font-light text-neutral-100">Создание аккаунта</h1>
            <p class="text-sm leading-relaxed text-neutral-300">
              Присоединяйтесь к сообществу GupsShield и получайте доступ к лаунчеру и игровым сервисам. Заполняя форму, вы подтверждаете согласие с
              <a class="ml-1 text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline" href="/rules">
                правилами сервера
              </a>
              .
            </p>
            <ul class="space-y-2 text-xs text-neutral-400">
              <li>• Минимальная длина пароля — 8 символов.</li>
              <li>• Используйте рабочую почту для получения уведомлений.</li>
            </ul>
          </header>

          <form class="md:col-span-3 space-y-4" onSubmit={submit}>
            <div class="grid gap-4 md:grid-cols-2">
              <label class="space-y-2 text-sm text-neutral-200">
                <span class="pl-1 text-neutral-300">Логин</span>
                <input
                  type="text"
                  name="login"
                  placeholder="Введите логин"
                  class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30"
                />
              </label>
              <label class="space-y-2 text-sm text-neutral-200">
                <span class="pl-1 text-neutral-300">Электронная почта</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Укажите почту"
                  class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label class="space-y-2 text-sm text-neutral-200">
                <span class="pl-1 text-neutral-300">Пароль</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Придумайте пароль"
                  class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30"
                />
              </label>
              <label class="space-y-2 text-sm text-neutral-200">
                <span class="pl-1 text-neutral-300">Повторите пароль</span>
                <input
                  type="password"
                  name="password2"
                  placeholder="Введите пароль ещё раз"
                  class="w-full rounded-xl border border-neutral-700/70 bg-neutral-800/80 px-4 py-3 text-neutral-100 outline-none transition focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/30"
                />
              </label>
            </div>

            <button
              type="submit"
              class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 text-sm font-semibold text-neutral-50 transition hover:from-violet-400 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-violet-400/70"
            >
              Зарегистрироваться
            </button>

            <p class="text-center text-sm text-neutral-400">
              Уже есть аккаунт?
              <a class="ml-1 text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline" href="/login">
                Войдите в систему
              </a>
              .
            </p>
          </form>
        </article>
      </div>
    </div>
  );
}
