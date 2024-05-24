import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      COOKIE_NAME: string;
    }
  }
}