import "../../styles/global.css";
import { Poppins } from "@next/font/google";
import { Toaster } from "react-hot-toast";
// config the ubuntu font and use it with deafult arguments.
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  style: ["normal"],
});

import GlassPane from "../../components/GlassPane";
import { PropsWithChildren } from "react";

type AuthRootLayoutProps = PropsWithChildren<{}>;
export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          <Toaster />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
