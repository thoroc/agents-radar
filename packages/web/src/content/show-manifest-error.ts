import { setContent } from "./set-content";

export const showManifestError = (message: string): void => {
  const nav = document.getElementById("nav");
  if (nav) {
    const navError = document.createElement("div");
    navError.className = "msg";
    navError.setAttribute("style", "height:80px;font-size:10px");
    navError.textContent = `⚠️ ${message}`;
    nav.replaceChildren(navError);
  }
  setContent('<div class="msg"><div class="msg-icon">📡</div><div>无法加载 manifest.json</div></div>');
};
