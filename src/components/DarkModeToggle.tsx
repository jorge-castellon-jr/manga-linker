"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function DarkModeToggle() {
  const { setTheme, theme, systemTheme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else if (theme === "system") {
      if (systemTheme === "dark") setTheme("light");
      else if (systemTheme === "light") setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="shrink-0"
      onClick={handleToggleTheme}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
