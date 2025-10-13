import { createEffect, createSignal } from "solid-js";
import { axios, failure, success } from "../services";
import { isAuthed, isLoaded } from "./auth";

const [profile, setProfile] = createSignal();
export { profile };

export function reloadProfile() {
  return axios
    .get("users")
    .then(({ data }) => setProfile(data))
    .catch(() => {});
}

export function clearProfile() {
  setProfile(undefined);
}

createEffect(() => isLoaded() && isAuthed() && reloadProfile());

export async function editProfile(formData) {
  try {
    await axios.put("users", formData);
    success("Профиль успешно обновлен");
  } catch (error) {
    if (error.response?.data.message) {
      failure(error.response.data.message);
    } else {
      failure("Неизвестная ошибка");
    }
  }
}
