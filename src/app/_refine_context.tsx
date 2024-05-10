"use client";

import {  AuthProvider, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, useNotificationProvider } from "@refinedev/mui";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";
import dataProvider from "@refinedev/simple-rest";
import {
  AccountCircleOutlined,
  DashboardOutlined,
  PeopleAltOutlined,
  VillaOutlined,
} from '@mui/icons-material'

import routerProvider from "@refinedev/nextjs-router";

import { ColorModeContextProvider } from "@contexts/color-mode";


type RefineContextProps = {
  defaultMode?: string;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  return (
    <SessionProvider>
      <App {...props} />
    </SessionProvider>
  );
};

type AppProps = {
  defaultMode?: string;
};

const App = (props: React.PropsWithChildren<AppProps>) => {
  const { data, status } = useSession();
  const to = usePathname();
 // const BASE_URL = "https://next-js-dashboard-refine.vercel.app/api";
  const BASE_URL = "http://localhost:3000/api";

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider:  AuthProvider= {
    login: async () => {
      signIn("google",
       {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      }
      );

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
         const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
          email: user.email,
          id: user.id,
          
        
        };
      }

      return null;
    },
  };

  const defaultMode = props?.defaultMode;

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider defaultMode={defaultMode}>
    
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(BASE_URL)}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              resources={[
                {
                  name: "dashboard",
                  options: {label: "Dashboard"},
                  list: "/home",
                  meta: {
                    icon: <DashboardOutlined/>
                  }
                },
                {
                  name: "properties",
                  list: "/properties",
                  create: "/properties/create",
                  edit: "/properties/edit/:id",
                  show: "/properties/show/:id",
                  meta: {
                    icon: <VillaOutlined />
                  }
                },
                {
                  name: "agents",
                  list: "/agents",
                  show: "/agents/show/:id",
                  meta: {
                    icon: <PeopleAltOutlined />
                  }

                },
                {
                  name: "my-profile",
                  options: {label: "My Profile"},
                  list: "/my-profile",
                  meta:{
                    icon: <AccountCircleOutlined />
                  }
                },
           
          
            
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {props.children}
              <RefineKbar />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};
