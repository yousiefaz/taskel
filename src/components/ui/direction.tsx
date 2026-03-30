"use client";

import * as React from "react";
import { Direction } from "radix-ui";

interface DirectionProviderProps {
  children: React.ReactNode;
  direction: "rtl" | "ltr";
}

function DirectionProvider({ direction, children }: DirectionProviderProps) {
  return (
    <Direction.DirectionProvider dir={direction}>
      {children}
    </Direction.DirectionProvider>
  );
}

const useDirection = Direction.useDirection;

export { DirectionProvider, useDirection };
