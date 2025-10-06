import { useNavigate } from "@solidjs/router";
import { isAuthed, logout } from "../api";

export function Header() {
  const navigate = useNavigate();

  const doLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header class="flex items-center justify-between py-3">
      <a href="/" class="flex items-center gap-4">
        <img src="/logo.png" class="w-10" alt="Logo" />
        <span class="hidden sm:inline text-xl font-extralight">
          Easy Cabinet
        </span>
      </a>
      {isAuthed() ? (
        <nav class="flex items-center gap-4 p-4">
	      <a href="http://minecraft.r-artemev.ru:8100">Карта</a>
          <a href="/profile">Профиль</a>
          <a href="#" onClick={doLogout}>
            Выход
          </a>
        </nav>
      ) : (
        <nav class="flex items-center gap-4 p-4">
	      <a href="http://minecraft.r-artemev.ru:8100">Карта</a>
          <a href="/login">Вход</a>
          <a href="/register">Регистрация</a>
        </nav>
      )}
    </header>
  );
}
