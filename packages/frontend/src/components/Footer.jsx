export function Footer() {
  return (
    <footer class="mt-16 flex flex-col gap-2 text-xs text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} GupsShield. Все права защищены.
      </p>
      <p>
        По вопросам поддержки:
        {" "}
        <a
          class="text-sky-300 hover:text-sky-200"
          href="mailto:contact@r-artemev.ru"
        >
          contact@r-artemev.ru
        </a>
      </p>
    </footer>
  );
}
