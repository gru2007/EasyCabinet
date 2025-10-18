import { useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";
import { isAuthed, logout } from "../api";

export function Header() {
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate("/");
  };

  const commonLinks = [
    { href: "/rules", label: "Правила" },
    { href: "http://minecraft.r-artemev.ru:8100", label: "Карта", external: true },
  ];

  const authedLinks = [
    ...commonLinks,
    { href: "/profile", label: "Профиль" },
  ];

  const guestLinks = [
    ...commonLinks,
    { href: "/login", label: "Вход" },
    { href: "/register", label: "Регистрация" },
  ];

  return (
    <header class="relative z-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="/"
          class="group inline-flex items-center gap-4 rounded-2xl border border-neutral-800/70 bg-neutral-900/70 px-5 py-3 shadow-[0_20px_45px_-35px_rgba(56,189,248,0.65)] transition hover:border-sky-400/60"
        >
          <img src="/logo.png" class="h-10 w-10" alt="Логотип" />
          <span class="text-lg font-semibold tracking-wide text-neutral-100 group-hover:text-sky-200">
            Easy Cabinet
          </span>
        </a>

        <nav class="flex flex-wrap items-center justify-end gap-2">
          <For each={isAuthed() ? authedLinks : guestLinks}>
            {({ href, label, external }) => (
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                class="inline-flex items-center rounded-full border border-transparent bg-neutral-800/60 px-4 py-2 text-sm font-medium text-neutral-200 transition hover:border-sky-400/60 hover:text-sky-200"
              >
                {label}
              </a>
            )}
          </For>

          <Show when={isAuthed()}>
            <button
              type="button"
              onClick={doLogout}
              class="inline-flex items-center rounded-full border border-sky-500/60 bg-gradient-to-r from-sky-500/90 to-violet-500/80 px-4 py-2 text-sm font-semibold text-neutral-50 transition hover:from-sky-400 hover:to-violet-400"
            >
              Выйти
            </button>
          </Show>
        </nav>
      </div>
    </header>
  );
}
