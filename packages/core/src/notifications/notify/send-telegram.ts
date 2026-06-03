export const sendTelegram = async (text: string, env: NodeJS.ProcessEnv = process.env): Promise<void> => {
  const BOT_TOKEN = env.TELEGRAM_BOT_TOKEN ?? "";
  const CHAT_ID = env.TELEGRAM_CHAT_ID || "@agents_radar";
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Telegram API ${res.status}: ${body}`);
  }
};
