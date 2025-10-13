import { IdleAnimation, SkinViewer } from "skinview3d";
import { createEffect, createSignal } from "solid-js";
import { failure } from "../services";
import { authMiddleware, editProfile, profile } from "../api";

export default function Profile() {
  authMiddleware();
  const [skinType, setSkinType] = createSignal(false);

  let skinCanvas;
  let skinViewer;

  createEffect(() => {
    skinViewer = new SkinViewer({
      canvas: skinCanvas,
      width: 300,
      height: 400,
      skin: "data:image/png;base64,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",
    });

    skinViewer.animation = new IdleAnimation();

    skinViewer.camera.position.x = -10;
    skinViewer.camera.position.y = 10;
    skinViewer.camera.position.z = 40;
  });

  createEffect(() => {
    const _profile = profile();
    if (!_profile) return;

    if (_profile.skinUrl) {
      skinViewer.loadSkin(_profile.skinUrl, {
        model: _profile.isAlex ? "slim" : "default",
      });
    }

    setSkinType(_profile.isAlex);

    if (_profile.capeUrl) {
      skinViewer.loadCape(_profile.capeUrl);
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("isAlex", skinType());
    editProfile(formData);
  };

  const loadSkin = (e) => {
    loadImage(e, async (img) => {
      await skinViewer.loadSkin(img);
      setSkinType(skinViewer.playerObject.skin.modelType === "slim");
    });
  };

  const loadCape = (e) => {
    loadImage(e, (img) =>
      skinViewer.loadCape(img).catch((e) => failure(e.message)),
    );
  };

  const loadImage = (e, onload) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onload(reader.result);
    reader.readAsDataURL(file);
  };

  const changeSkinType = (e) => {
    skinViewer.playerObject.skin.modelType = e.target.checked
      ? "slim"
      : "default";
    setSkinType(e.target.checked);
  };

  const changeCapeElytra = (e) => {
    if (!skinViewer.playerObject.backEquipment) return;
    skinViewer.playerObject.backEquipment = e.target.checked
      ? "elytra"
      : "cape";
  };

  return (
    <section class="space-y-10">
      <header class="space-y-3">
        <h1 class="text-3xl font-light text-neutral-100">Профиль игрока</h1>
        <p class="max-w-2xl text-sm text-neutral-300">
          Управляйте внешним видом персонажа, загружайте свежий скин и плащ, а также переключайте подходящий тип модели. Все изменения вступают в силу после сохранения.
        </p>
      </header>

      <div class="grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
        <div class="rounded-3xl border border-neutral-800/70 bg-neutral-900/70 p-6 shadow-[0_0_55px_-35px_rgba(56,189,248,0.7)] backdrop-blur">
          <div class="rounded-2xl border border-neutral-800/60 bg-neutral-950/60 p-4">
            <canvas ref={skinCanvas} class="mx-auto block h-[360px] w-full rounded-2xl bg-neutral-900/40" />
          </div>

          <div class="mt-6 space-y-4">
            <p class="text-sm font-medium text-neutral-200">Плащ или элитры</p>
            <label class="relative inline-flex items-center">
              <input
                type="checkbox"
                name="isAlex"
                class="peer sr-only"
                onChange={changeCapeElytra}
              />
              <span class="block h-6 w-11 rounded-full bg-neutral-700 transition peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-violet-500" />
              <span class="absolute start-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
              <span class="ms-4 text-sm text-neutral-300">Переключить на элитры</span>
            </label>
            <p class="text-xs text-neutral-500">
              Используйте переключатель, чтобы выбрать отображение плаща или элитр в игре.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} class="rounded-3xl border border-neutral-800/70 bg-neutral-900/70 p-8 shadow-[0_0_55px_-35px_rgba(124,58,237,0.65)] backdrop-blur">
          <fieldset class="space-y-4">
            <legend class="text-lg font-medium text-neutral-100">Настройка модели</legend>
            <div class="flex flex-wrap items-center gap-4">
              <span class="text-sm text-neutral-300">Модель Steve</span>
              <label class="relative inline-flex items-center">
                <input
                  type="checkbox"
                  name="isAlex"
                  class="peer sr-only"
                  onChange={changeSkinType}
                  checked={skinType()}
                />
                <span class="block h-6 w-11 rounded-full bg-neutral-700 transition peer-checked:bg-gradient-to-r peer-checked:from-sky-500 peer-checked:to-violet-500" />
                <span class="absolute start-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                <span class="ms-4 text-sm text-neutral-300">Модель Alex</span>
              </label>
            </div>
            <p class="text-xs text-neutral-500">
              Тип определяется автоматически после загрузки скина. Переключите вручную, если модель выбрана некорректно.
            </p>
          </fieldset>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <div class="rounded-2xl border border-neutral-800/60 bg-neutral-950/50 p-5">
              <h2 class="text-base font-semibold text-neutral-100">Загрузка скина</h2>
              <p class="mt-2 text-sm text-neutral-400">Принимаются изображения в формате PNG. Разрешение 64×64 или 64×32.</p>
              <input
                type="file"
                name="skin"
                id="skin"
                hidden
                accept="image/png"
                onChange={loadSkin}
              />
              <label
                for="skin"
                class="mt-4 inline-flex items-center justify-center rounded-xl border border-sky-500/50 bg-neutral-900/70 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:border-sky-400 hover:text-sky-200"
              >
                Выбрать файл скина
              </label>
            </div>

            <div class="rounded-2xl border border-neutral-800/60 bg-neutral-950/50 p-5">
              <h2 class="text-base font-semibold text-neutral-100">Загрузка плаща</h2>
              <p class="mt-2 text-sm text-neutral-400">Дополнительный элемент оформления. Поддерживается PNG.</p>
              <input
                type="file"
                name="cape"
                id="cape"
                hidden
                accept="image/png"
                onChange={loadCape}
              />
              <label
                for="cape"
                class="mt-4 inline-flex items-center justify-center rounded-xl border border-violet-500/50 bg-neutral-900/70 px-4 py-2 text-sm font-medium text-neutral-100 transition hover:border-violet-400 hover:text-violet-200"
              >
                Выбрать файл плаща
              </label>
            </div>
          </div>

          <div class="mt-10 flex flex-wrap items-center gap-3">
            <button class="inline-flex items-center justify-center rounded-xl border border-sky-500/60 bg-gradient-to-r from-sky-500 to-violet-500 px-5 py-2 text-sm font-semibold text-neutral-50 transition hover:from-sky-400 hover:to-violet-400">
              Сохранить изменения
            </button>
            <span class="text-xs text-neutral-500">После сохранения перезапустите лаунчер для загрузки новых файлов.</span>
          </div>
        </form>
      </div>
    </section>
  );
}
