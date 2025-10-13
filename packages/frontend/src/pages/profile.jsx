import { IdleAnimation, SkinViewer } from "skinview3d";
import { createEffect, createSignal } from "solid-js";
import { failure } from "../services";
import { authMiddleware, editProfile, profile } from "../api";

const ROLE_LABELS = {
  user: "Игрок",
  moderator: "Модератор",
  admin: "Администратор",
};

export default function Profile() {
  authMiddleware();
  const [skinType, setSkinType] = createSignal(false);

  let skinCanvas;
  let skinViewer;

  createEffect(() => {
    skinViewer = new SkinViewer({
      canvas: skinCanvas,
      width: 320,
      height: 420,
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
      skinViewer.loadCape(img).catch((error) => failure(error.message)),
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

  const user = () => profile();

  return (
    <section class="space-y-8">
      <div class="glass-panel space-y-6 p-6 shadow-xl md:p-10">
        <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-xs uppercase tracking-[0.35em] text-neutral-300/70">
              Профиль игрока
            </p>
            <h1 class="mt-1 text-3xl font-semibold">Управление внешним видом</h1>
            <p class="mt-2 max-w-2xl text-sm text-neutral-300">
              Настройте скин, плащ и модель персонажа. Изменения применяются в
              течение нескольких минут после сохранения.
            </p>
          </div>
          <div class="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-neutral-200 sm:grid-cols-2">
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Ник
              </p>
              <p class="mt-1 text-base font-semibold text-white">
                {user()?.login}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Роль
              </p>
              <p class="mt-1 text-base font-semibold text-white">
                {ROLE_LABELS[user()?.role] || "Игрок"}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Почта
              </p>
              <p class="mt-1 break-all text-base font-semibold text-white">
                {user()?.email}
              </p>
            </div>
            <div>
              <p class="text-xs uppercase tracking-[0.2em] text-neutral-400">
                UUID
              </p>
              <p class="mt-1 break-all text-base font-semibold text-white">
                {user()?.uuid || "—"}
              </p>
            </div>
          </div>
        </header>

        <div class="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div class="glass-panel flex flex-col items-center gap-4 p-6">
            <canvas ref={skinCanvas} class="w-full rounded-3xl bg-neutral-900/30" />
            <label class="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200">
              <span>Режим плаща</span>
              <input
                type="checkbox"
                name="elytra"
                class="h-5 w-5 accent-sky-500"
                onChange={changeCapeElytra}
              />
            </label>
          </div>

          <form onSubmit={onSubmit} class="glass-panel space-y-6 p-6">
            <div class="space-y-3">
              <h2 class="text-xl font-semibold text-white">Настройки скина</h2>
              <p class="text-sm text-neutral-300">
                Скин и плащ должны быть в формате PNG размером 64×64 или 64×32.
                Тип модели определяется автоматически, но вы можете изменить его
                вручную.
              </p>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <span class="text-sm text-neutral-300">Модель Steve</span>
              <label class="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-200">
                <input
                  type="checkbox"
                  name="isAlex"
                  class="h-4 w-4 accent-sky-500"
                  onChange={changeSkinType}
                  checked={skinType()}
                />
                Модель Alex
              </label>
            </div>

            <div class="flex flex-wrap gap-4">
              <input
                type="file"
                name="skin"
                id="skin"
                hidden
                accept="image/png"
                onChange={loadSkin}
              />
              <label for="skin" class="secondary-button cursor-pointer">
                Загрузить скин
              </label>

              <input
                type="file"
                name="cape"
                id="cape"
                hidden
                accept="image/png"
                onChange={loadCape}
              />
              <label for="cape" class="secondary-button cursor-pointer">
                Загрузить плащ
              </label>
            </div>

            <button type="submit" class="primary-button">
              Сохранить изменения
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
