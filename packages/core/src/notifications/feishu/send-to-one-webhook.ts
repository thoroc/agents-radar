export const sendToOneWebhook = async (webhookUrl: string, title: string, content: string): Promise<void> => {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "interactive",
      card: {
        header: {
          title: { tag: "plain_text", content: title },
          template: "blue",
        },
        elements: [{ tag: "markdown", content }],
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Feishu API ${res.status}: ${body}`);
  }
};
