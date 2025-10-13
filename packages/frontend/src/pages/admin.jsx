import { useNavigate } from "@solidjs/router";
import {
  Show,
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
} from "solid-js";

import { authMiddleware, profile } from "../api";
import {
  changeUserRole,
  fetchAdminDashboard,
  fetchAdminUsers,
} from "../api/admin";

const ROLE_OPTIONS = [
  { value: "user", label: "Игрок" },
  { value: "moderator", label: "Модератор" },
  { value: "admin", label: "Администратор" },
];

export default function Admin() {
  authMiddleware();
  const navigate = useNavigate();

  createEffect(() => {
    const info = profile();
    if (info && info.role !== "admin") {
      navigate("/", { replace: true });
    }
  });

  const [search, setSearch] = createSignal("");
  const [dashboard] = createResource(fetchAdminDashboard);
  const [users, { refetch }] = createResource(search, fetchAdminUsers);

  const stats = createMemo(() => {
    const data = dashboard();
    if (!data) return [];
    return [
      {
        title: "Всего пользователей",
        value: data.totalUsers,
        accent: "from-sky-400 to-blue-500",
      },
      {
        title: "Моделей Alex",
        value: data.alexUsers,
        accent: "from-emerald-400 to-teal-500",
      },
      {
        title: "Моделей Steve",
        value: data.steveUsers,
        accent: "from-violet-400 to-indigo-500",
      },
      {
        title: "Игроков с плащами",
        value: data.capeOwners,
        accent: "from-amber-400 to-orange-500",
      },
    ];
  });

  const handleRoleChange = async (uuid, role) => {
    await changeUserRole(uuid, role);
    await refetch();
  };

  return (
    <div class="space-y-8">
      <section class="glass-panel space-y-6 p-6 shadow-xl md:p-8">
        <header class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.35em] text-neutral-300/70">
              Панель администратора
            </p>
            <h1 class="mt-1 text-3xl font-semibold">
              Управление сообществом GupsShield
            </h1>
            <p class="mt-2 max-w-2xl text-sm text-neutral-300">
              Здесь собраны ключевые метрики и инструменты для работы с
              игроками. Используйте поиск, чтобы быстро найти нужного
              пользователя и изменить его роль.
            </p>
          </div>
        </header>

        <Show
          when={!dashboard.loading}
          fallback={
            <div class="animate-pulse rounded-3xl bg-white/5 p-10 text-center text-sm text-neutral-200/80">
              Загрузка статистики...
            </div>
          }
        >
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <For each={stats()}>
              {(item) => (
                <div class="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-[1px]">
                  <div class="h-full rounded-3xl bg-neutral-950/60 p-6">
                    <p class="text-sm text-neutral-300/80">{item.title}</p>
                    <p class="mt-4 text-4xl font-semibold">
                      <span
                        class={`bg-gradient-to-r ${item.accent} bg-clip-text text-transparent`}
                      >
                        {item.value}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </section>

      <section class="glass-panel space-y-6 p-6 shadow-xl md:p-8">
        <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-semibold">Список игроков</h2>
            <p class="mt-1 text-sm text-neutral-300">
              Отфильтруйте пользователей по нику или почте и обновите их
              права доступа.
            </p>
          </div>
          <label class="relative block w-full md:w-72">
            <span class="sr-only">Поиск пользователя</span>
            <input
              type="search"
              value={search()}
              onInput={(event) => setSearch(event.currentTarget.value.trim())}
              placeholder="Поиск по нику или почте"
              class="form-input pl-11"
            />
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
              🔍
            </span>
          </label>
        </header>

        <Show
          when={!users.loading}
          fallback={
            <div class="animate-pulse rounded-3xl bg-white/5 p-8 text-center text-sm text-neutral-200/80">
              Загружаем список пользователей...
            </div>
          }
        >
          <Show
            when={users()?.length}
            fallback={
              <div class="rounded-3xl border border-dashed border-white/10 p-10 text-center text-sm text-neutral-200/80">
                Пользователи не найдены. Попробуйте изменить критерии поиска.
              </div>
            }
          >
            <div class="overflow-hidden rounded-3xl border border-white/10">
              <div class="hidden bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-neutral-200/70 md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr]">
                <span>Ник</span>
                <span>Почта</span>
                <span>Текущая роль</span>
                <span class="text-right">Действие</span>
              </div>
              <ul class="divide-y divide-white/10">
                <For each={users()}>
                  {(user) => (
                    <li class="flex flex-col gap-4 bg-neutral-950/60 px-6 py-5 md:grid md:grid-cols-[2fr_2fr_1.5fr_1fr] md:items-center md:gap-6">
                      <div>
                        <p class="font-medium text-white">{user.login}</p>
                        <p class="text-xs text-neutral-400">UUID: {user.uuid}</p>
                      </div>
                      <p class="text-sm text-neutral-200">{user.email}</p>
                      <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-200">
                        <span class="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wider">
                          {ROLE_OPTIONS.find((role) => role.value === user.role)?.label || user.role}
                        </span>
                        <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300/80">
                          Модель: {user.isAlex ? "Alex" : "Steve"}
                        </span>
                        <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300/80">
                          Скин: {user.skinUrl ? "есть" : "нет"}
                        </span>
                        <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-neutral-300/80">
                          Плащ: {user.capeUrl ? "есть" : "нет"}
                        </span>
                      </div>
                      <div class="md:text-right">
                        <select
                          class="form-input w-full text-sm md:text-right"
                          value={user.role}
                          onChange={(event) =>
                            handleRoleChange(user.uuid, event.currentTarget.value)
                          }
                        >
                          <For each={ROLE_OPTIONS}>
                            {(role) => (
                              <option value={role.value}>{role.label}</option>
                            )}
                          </For>
                        </select>
                      </div>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </Show>
        </Show>
      </section>
    </div>
  );
}
