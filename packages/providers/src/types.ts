export interface LlmProvider {
  readonly name: string;
  call(prompt: string, maxTokens: number): Promise<string>;
}

export interface ProviderOpts {
  apiKey?: string;
  baseURL?: string;
  model?: string;
}
