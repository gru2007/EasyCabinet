import { For } from "solid-js";
import { FaBrandsWindows, FaBrandsLinux, FaBrandsApple } from "solid-icons/fa";

export default function Index() {
  const links = [
    {
      title: "Windows (x64)",
      description: "Рекомендуемая версия лаунчера для современных систем.",
      icon: <FaBrandsWindows class="h-12 w-12" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x64-Gml.Launcher.exe",
    },
    {
      title: "Windows (x86)",
      description: "Подходит для старых конфигураций и совместимости.",
      icon: <FaBrandsWindows class="h-12 w-12" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x86-Gml.Launcher.exe",
    },
    {
      title: "Linux (amd64)",
      description: "Стабильная сборка для популярных дистрибутивов.",
      icon: <FaBrandsLinux class="h-12 w-12" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/linux-x64-Gml.Launcher",
    },
    {
      title: "macOS (Intel)",
      description: "Архив с установщиком для устройств Apple Intel.",
      icon: <FaBrandsApple class="h-12 w-12" />,
      link: "https://github.com/FETSU-Council/Gml.Launcher/releases/latest/download/GupsShield.zip",
    },
  ];

  const highlights = [
    {
      title: "Уютное сообщество",
      description: "Игроки, объединённые любовью к честному Minecraft, дружелюбному общению и совместным проектам.",
    },
    {
      title: "Надёжная защита",
      description: "Система модерации и актуальные правила поддерживают комфортную атмосферу без читеров и токсичности.",
    },
    {
      title: "Сезоны и события",
      description: "Регулярные ивенты, тематические сезоны и уникальные награды, подготовленные администрацией.",
    },
  ];

  const steps = [
    "Скачайте лаунчер для своей платформы и установите его.",
    "Создайте аккаунт или войдите, используя ваши данные.",
    "Ознакомьтесь с правилами сервера и присоединяйтесь к игре!",
  ];

  return (
    <div class="relative min-h-full overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_45%),_radial-gradient(circle_at_bottom,_rgba(124,58,237,0.18),_transparent_40%)]"
      />

      <main class="relative mx-auto flex min-h-full max-w-6xl flex-col gap-20 px-6 py-20 lg:px-10">
        <section class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div class="space-y-8">
            <div class="h-1 w-28 rounded-full bg-gradient-to-r from-sky-500 to-violet-500" aria-hidden="true" />
            <div class="space-y-6">
              <h1 class="text-4xl font-light leading-tight sm:text-5xl">
                Добро пожаловать на <span class="text-transparent bg-gradient-to-r from-sky-400 via-violet-400 to-sky-400 bg-clip-text">GupsShield</span>
              </h1>
              <p class="text-lg leading-relaxed text-neutral-300">
                Частный Minecraft-сервер с акцентом на атмосферу, безопасность и совместное творчество. Присоединяйтесь к игрокам, которые ценят честную игру и уважительное общение.
              </p>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-neutral-300">
              <a
                class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-3 font-semibold text-neutral-50 transition hover:from-sky-400 hover:to-violet-400 focus:outline-none focus:ring-2 focus:ring-sky-400/70"
                href="#downloads"
              >
                Скачать лаунчер
              </a>
              <a
                class="inline-flex items-center gap-2 rounded-xl border border-neutral-700/70 px-5 py-3 text-neutral-200 transition hover:border-sky-400/60 hover:text-sky-200"
                href="/rules"
              >
                Прочитать правила
              </a>
            </div>
          </div>

          <div class="rounded-3xl border border-neutral-700/70 bg-neutral-900/70 p-8 shadow-[0_0_60px_-25px_rgba(56,189,248,0.45)] backdrop-blur">
            <h2 class="text-xl font-semibold text-sky-200">Почему выбирают нас</h2>
            <ul class="mt-6 space-y-5 text-sm leading-relaxed text-neutral-200">
              <For each={highlights}>{({ title, description }) => (
                <li class="rounded-2xl border border-neutral-700/60 bg-neutral-800/60 p-4">
                  <p class="text-base font-semibold text-neutral-100">{title}</p>
                  <p class="mt-2 text-sm text-neutral-300">{description}</p>
                </li>
              )}</For>
            </ul>
          </div>
        </section>

        <section class="space-y-10" id="downloads">
          <header class="space-y-4 text-center">
            <div class="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-sky-500" aria-hidden="true" />
            <h2 class="text-3xl font-light">Выберите лаунчер для своей платформы</h2>
            <p class="text-sm text-neutral-300">
              Каждая сборка содержит встроенную защиту и автоматические обновления. Файлы подписаны и проверены администрацией.
            </p>
          </header>

          <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <For each={links}>{({ link, title, description, icon }) => (
              <a
                class="group flex flex-col justify-between rounded-2xl border border-neutral-700/70 bg-neutral-900/70 p-6 text-left shadow-[0_0_45px_-30px_rgba(124,58,237,0.6)] transition hover:-translate-y-1 hover:border-sky-400/60 hover:shadow-[0_15px_45px_-25px_rgba(56,189,248,0.55)]"
                href={link}
                download
              >
                <div class="flex items-center justify-between">
                  <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/30 to-violet-500/30 text-sky-200">
                    {icon}
                  </div>
                  <span class="text-xs uppercase tracking-[0.2em] text-neutral-500">Файл .exe / .zip</span>
                </div>
                <div class="mt-6 space-y-3">
                  <h3 class="text-lg font-semibold text-neutral-100 group-hover:text-sky-200">{title}</h3>
                  <p class="text-sm text-neutral-300">{description}</p>
                </div>
                <span class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-300 group-hover:text-sky-200">
                  Скачать сейчас
                  <span aria-hidden="true">→</span>
                </span>
              </a>
            )}</For>
          </div>
        </section>

        <section class="rounded-3xl border border-neutral-700/70 bg-neutral-900/70 p-10 shadow-[0_0_60px_-25px_rgba(56,189,248,0.5)] backdrop-blur">
          <h2 class="text-2xl font-light text-sky-200">Как начать играть</h2>
          <ol class="mt-6 grid gap-6 text-sm text-neutral-300 md:grid-cols-3">
            <For each={steps}>{(step, index) => (
              <li class="space-y-3 rounded-2xl border border-neutral-700/60 bg-neutral-800/60 p-6">
                <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-violet-500 text-base font-semibold text-neutral-50">
                  {index() + 1}
                </span>
                <p class="leading-relaxed text-neutral-200">{step}</p>
              </li>
            )}</For>
          </ol>
        </section>
      </main>
    </div>
  );
}
