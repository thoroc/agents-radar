export type FsDeps = {
  readdirSync: (path: string) => string[];
  readFileSync: (path: string, encoding: "utf-8") => string;
  writeFileSync: (path: string, content: string, encoding: "utf-8") => void;
  mkdirSync: (path: string, options: { recursive: boolean }) => void;
  existsSync: (path: string) => boolean;
};

export type Platform = "xiaohongshu" | "wechat" | "wechat:monthly";
