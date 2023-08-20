"use client";

import "../../styles/global.css";
import { Poppins } from "@next/font/google";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";
// config the ubuntu font and use it with deafult arguments.
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
  style: ["normal"],
});

import GlassPane from "../../components/GlassPane";
import Sidebar from "../../components/Sidebar";

export default function DashboardRootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full flex items-center box-border p-5">
          <Toaster />
          <Sidebar />
          <DndProvider backend={HTML5Backend}>{children}</DndProvider>
        </GlassPane>
        <div id="modal"></div>
      </body>
    </html>
  );
}
