"use client";
import * as React from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import MenuItems from "./MenuItems";
import { useRouter, usePathname } from "next/navigation";
import type { Session } from "@toolpad/core";
import { Toolbar } from "@mui/material";
const demoTheme: Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

interface DemoProps {
  window?: () => Window;
  children: React.ReactNode;
}

const MainLayout: React.FC<DemoProps> = ({ window, children }) => {
  const Router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = React.useState<Session | null>({
    user: {
      name: "Bharat Kashyap",
      email: "bharatkashyap@outlook.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "Bharat Kashyap",
            email: "bharatkashyap@outlook.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={MenuItems}
      session={session}
      authentication={authentication}
      router={{
        pathname: pathname as string,
        searchParams: new URLSearchParams(),
        navigate: (path) => Router.replace(path as string),
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <div className="">
        <DashboardLayout>{children}</DashboardLayout>
      </div>
    </AppProvider>
    // preview-end
  );
};

export default MainLayout;
