export default function Page404() {
  return (
    <section class="flex flex-col items-center justify-center gap-6 py-20 text-center">
      <div class="glass-panel w-full max-w-xl space-y-6 p-10 shadow-xl">
        <p class="text-sm uppercase tracking-[0.4em] text-neutral-300/80">
          Ошибка 404
        </p>
        <h1 class="text-4xl font-semibold">Страница не найдена</h1>
        <p class="text-sm text-neutral-300">
          Возможно, ссылка устарела или страница была перемещена. Проверьте
          адрес или вернитесь на главную, чтобы продолжить путешествие по
          GupsShield.
        </p>
        <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a class="primary-button" href="/">
            На главную
          </a>
          <a class="secondary-button" href="/profile">
            В личный кабинет
          </a>
        </div>
      </div>
    </section>
  );
}
