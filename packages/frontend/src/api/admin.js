import { axios, failure, success } from "../services";

export async function fetchAdminDashboard() {
  try {
    const { data } = await axios.get("admin/dashboard");
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function fetchAdminUsers(search) {
  try {
    const { data } = await axios.get("admin/users", {
      params: search ? { search } : undefined,
    });
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

export async function changeUserRole(uuid, role) {
  try {
    const { data } = await axios.patch(`admin/users/${uuid}`, { role });
    success("Роль пользователя обновлена");
    return data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

function handleError(error) {
  const message = error.response?.data?.message;
  if (message) {
    failure(message);
  } else {
    failure("Не удалось выполнить запрос администратора");
  }
}
