"use client";

import { Header } from "@components/header";
import { ThemedLayoutV2} from "@refinedev/mui";
import React from "react";
import { yariga, logo } from "@assets";
import Image from "next/image";


export const ThemedLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2 
    Title={({collapsed}) => (
      collapsed ? (
        <Image src={logo} alt="Yariga" width="28" />
      ) : (
     
        <Image src={yariga} alt="Refine" width="140" />  
      )
    )}
 
  
    Header={() => <Header sticky/>}>{children}
    </ThemedLayoutV2>

  );
};
