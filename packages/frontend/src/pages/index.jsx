import { For } from "solid-js";
import { FaBrandsWindows, FaBrandsLinux, FaBrandsApple } from "solid-icons/fa";

const DOWNLOADS = [
  {
    title: "Windows (x64)",
    icon: <FaBrandsWindows class="h-12 w-12" />,
    link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x64-Gml.Launcher.exe",
    hint: "Рекомендуемый вариант для современных систем",
  },
  {
    title: "Windows (x86)",
    icon: <FaBrandsWindows class="h-12 w-12" />,
    link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x86-Gml.Launcher.exe",
    hint: "Поддержка старых 32-битных устройств",
  },
  {
    title: "Linux (amd64)",
    icon: <FaBrandsLinux class="h-12 w-12" />,
    link: "https://mc-launcher.r-artemev.ru/api/v1/file/linux-x64-Gml.Launcher",
    hint: "Запуск через терминал и chmod +x",
  },
  {
    title: "macOS (Intel)",
    icon: <FaBrandsApple class="h-12 w-12" />,
    link: "https://github.com/FETSU-Council/Gml.Launcher/releases/latest/download/GupsShield.zip",
    hint: "Распакуйте и перенесите приложение в Applications",
  },
];

const FEATURES = [
  {
    title: "Защита и стабильность",
    description:
      "Лаунчер автоматически проверяет файлы на целостность и защищает от нежелательных модификаций.",
  },
  {
    title: "Удобный профиль",
    description:
      "Загружайте скины и плащи в пару кликов, переключайте модель Alex/Steve и управляйте аккаунтом.",
  },
  {
    title: "Единая экосистема",
    description:
      "Новости, правила и карта сервера всегда под рукой — вся информация доступна в одном месте.",
  },
];

export default function Index() {
  return (
    <div class="space-y-14">
      <section class="glass-panel relative overflow-hidden p-8 md:p-12">
        <div class="absolute -top-20 right-0 h-56 w-56 rounded-full bg-sky-500/30 blur-3xl" aria-hidden="true" />
        <div class="absolute -bottom-24 left-12 h-44 w-44 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />
        <div class="relative flex flex-col gap-8 lg:flex-row lg:items-center">
          <div class="flex-1 space-y-6">
            <span class="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-sky-200">
              GupsShield
            </span>
            <h1 class="text-4xl font-semibold leading-tight md:text-5xl">
              Добро пожаловать в защищенную экосистему вашего сервера
            </h1>
            <p class="max-w-2xl text-base text-neutral-200 md:text-lg">
              Установите официальный лаунчер, чтобы получить доступ к защищенному серверу, кастомным скинам и удобному личному кабинету. Все обновления доставляются автоматически.
            </p>
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a class="primary-button" href="#downloads">
                Скачать лаунчер
              </a>
              <a class="secondary-button" href="/rules">
                Прочитать правила сервера
              </a>
            </div>
          </div>
          <div class="flex-1">
            <div class="glass-panel relative h-full overflow-hidden rounded-3xl border-white/20 bg-gradient-to-br from-sky-500/20 via-transparent to-indigo-500/20 p-6">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.35),transparent_60%)]" aria-hidden="true" />
              <div class="relative space-y-4 text-sm text-neutral-100">
                <p class="text-lg font-semibold">Что внутри лаунчера:</p>
                <ul class="space-y-2 text-sm leading-relaxed text-neutral-200">
                  <li>• Автоматическая установка актуальной сборки</li>
                  <li>• Проверка модификаций на соответствие правилам</li>
                  <li>• Поддержка плащей и HD-скинов</li>
                  <li>• Быстрый доступ к карте и новостям сервера</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 md:grid-cols-3" aria-label="Преимущества лаунчера">
        <For each={FEATURES}>
          {(feature) => (
            <article class="glass-panel h-full space-y-3 p-6">
              <h2 class="text-xl font-semibold text-white">{feature.title}</h2>
              <p class="text-sm leading-relaxed text-neutral-300">
                {feature.description}
              </p>
            </article>
          )}
        </For>
      </section>

      <section id="downloads" class="space-y-6">
        <header class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 class="text-3xl font-semibold">Выберите версию для своей системы</h2>
            <p class="text-sm text-neutral-300">
              Установочный файл содержит все необходимые ресурсы. После загрузки войдите под своим аккаунтом GupsShield.
            </p>
          </div>
          <p class="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-neutral-200">
            Обновлено автоматически
          </p>
        </header>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <For each={DOWNLOADS}>
            {(item) => (
              <a
                class="glass-panel group flex h-full flex-col justify-between rounded-3xl border-white/15 bg-neutral-950/60 p-6 transition hover:border-sky-400/60 hover:shadow-lg hover:shadow-sky-500/20"
                href={item.link}
                download
              >
                <div class="flex items-center justify-between">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl text-white/90">
                    {item.icon}
                  </div>
                  <span class="text-xs uppercase tracking-[0.3em] text-sky-200">
                    Скачать
                  </span>
                </div>
                <div class="mt-6 space-y-2">
                  <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                  <p class="text-xs text-neutral-300">{item.hint}</p>
                </div>
                <span class="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-300">
                  Начать загрузку
                  <span class="transition-transform duration-150 group-hover:translate-x-1">→</span>
                </span>
              </a>
            )}
          </For>
        </div>
      </section>
    </div>
  );
}
