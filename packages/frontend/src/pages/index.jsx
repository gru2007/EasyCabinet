import { For } from "solid-js";
import { FaBrandsWindows, FaBrandsLinux, FaBrandsApple } from "solid-icons/fa";

export default function Index() {
  const links = [
    {
      title: "Windows (x64)",
      icon: <FaBrandsWindows class="w-24 h-24 p-4" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x64-Gml.Launcher.exe",
    },
    {
      title: "Windows (x86)",
      icon: <FaBrandsWindows class="w-24 h-24 p-4" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/win-x86-Gml.Launcher.exe",
    },
    {
      title: "Linux (amd64)",
      icon: <FaBrandsLinux class="w-24 h-24 p-4" />,
      link: "https://mc-launcher.r-artemev.ru/api/v1/file/linux-x64-Gml.Launcher",
    },
    {
      title: "MacOS (скоро, просите у @artemevkhv)",
      icon: <FaBrandsApple class="w-24 h-24 p-4" />,
      link: "#",
    },
  ];

  return (
    <div class="h-full flex flex-col items-center justify-center font-extralight">
      <h1 class="text-4xl text-center">Добро пожаловать на GupsShield</h1>

      <h2 class="mt-4 text-2xl text-center">Скачать лаунчер:</h2>
      <div class="mt-4 flex flex-wrap gap-4 items-center justify-center text-center">
        <For each={links}>{({ link, title, icon }) => (
          <a
            
            class="bg-neutral-800 hover:bg-neutral-700 rounded-md px-4 py-2"
            href={link}
            download
          >
            {icon}
            {title}
          </a>
        )}</For>
      </div>
    </div>
  );
}
