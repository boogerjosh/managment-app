"use client"

import React, { ReactNode } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DndReactProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      {children}
    </DndProvider>
  )
}

export default DndReactProvider