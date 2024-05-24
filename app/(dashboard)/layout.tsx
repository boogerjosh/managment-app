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
import Sidebar from "../../components/Sidebar";
import { PropsWithChildren } from "react";
import DndReactProvider from "providers/DndProvider";

type DashboardRootLayoutProps = PropsWithChildren<{}>; // Define PropsWithChildren type
export default function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center box-border p-5">
          <Toaster />
          <Sidebar />
          <DndReactProvider>
            {children}
          </DndReactProvider>
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
