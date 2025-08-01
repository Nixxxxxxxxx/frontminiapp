// js/check-subscription.js
// Получаем данные пользователя из Telegram WebApp
const tg = window.Telegram.WebApp;
const user = tg.initDataUnsafe.user;

async function checkSubscription() {
  if (!user || !user.id) {
    alert("Не удалось получить данные пользователя");
    return;
  }

  try {
    const response = await fetch("https://backminiapp.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id }),
    });

    const data = await response.json();

    if (data.status === "subscribed") {
      alert("✅ Подписка подтверждена!");
      window.location.href = "categories.html";
    } else {
      alert("❌ Вы не подписаны на канал.");
    }
  } catch (error) {
    console.error("Ошибка при проверке подписки:", error);
    alert("Произошла ошибка при проверке. Попробуйте позже.");
  }
}
