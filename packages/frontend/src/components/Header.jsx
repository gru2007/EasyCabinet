import { useNavigate } from "@solidjs/router";
import { Show } from "solid-js";
import { isAuthed, logout } from "../api";
import { profile } from "../api/user";

export function Header() {
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header class="sticky top-6 z-50 mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-neutral-950/70 px-5 py-4 shadow-[0_15px_60px_-30px_rgba(59,130,246,0.6)] backdrop-blur">
      <a href="/" class="flex items-center gap-4">
        <img src="/logo.png" class="w-10" alt="Логотип" />
        <div class="hidden sm:flex flex-col">
          <span class="text-xs uppercase tracking-[0.35em] text-neutral-400">
            GupsShield
          </span>
          <span class="text-lg font-semibold">Личный кабинет</span>
        </div>
      </a>
      <nav class="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        <a class="nav-link" href="/rules">
          Правила
        </a>
        <a class="nav-link" href="http://minecraft.r-artemev.ru:8100" target="_blank" rel="noreferrer">
          Карта
        </a>
        <Show when={isAuthed()} fallback={<GuestActions />}>
          <AuthedActions onLogout={doLogout} />
        </Show>
      </nav>
    </header>
  );
}

function GuestActions() {
  return (
    <>
      <a class="nav-link" href="/login">
        Вход
      </a>
      <a class="primary-button" href="/register">
        Регистрация
      </a>
    </>
  );
}

function AuthedActions(props) {
  const user = profile();

  return (
    <div class="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <a class="nav-link" href="/profile">
        Профиль
      </a>
      <Show when={user?.role === "admin"}>
        <a class="nav-link" href="/admin">
          Админка
        </a>
      </Show>
      <span class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
        {user?.login}
      </span>
      <button class="secondary-button" onClick={() => props.onLogout()}>
        Выход
      </button>
    </div>
  );
}
