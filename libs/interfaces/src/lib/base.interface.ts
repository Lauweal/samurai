export enum PlatformEnum {
  "app" = "app",
  "h5" = "h5",
  "web" = "web",
}
export type Platform = keyof typeof PlatformEnum;

export interface Response<T> {
  code: number;
  data: T;
  message: string
}
