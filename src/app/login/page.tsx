"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLogin } from "@refinedev/core";
import { yariga} from "@assets";
import Image from 'next/image';


export default function Login() {
  const { mutate: login } = useLogin();
  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="30px"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Image src={yariga} alt="Yariga"  />
    <Button
      style={{ width: "240px" }}
      variant="contained"
      size="large"
      onClick={() => login({})}
    >
      Sign in
    </Button>
    <Typography align="center" color={"text.secondary"} fontSize="12px">
      Powered by
      <img
        style={{ padding: "0 5px" }}
        alt="Google"
        src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
      />
      Google
    </Typography>
    </Box>
    </Container>
    );
}
// import { useEffect, useRef } from "react";
// import { useLogin } from "@refinedev/core";
// import { Container, Box } from "@mui/material";

// import { yariga } from '@assets';
// import Image from "next/image";

// import { CredentialResponse } from "@interfaces/google";

// export default function Login() {
//   const { mutate: login } = useLogin<CredentialResponse>();

//   const GoogleButton = (): JSX.Element => {
//     const divRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//       if (typeof window === "undefined" || !window.google || !divRef.current) {
//         return;
//       }
     
//       try {
//         window.google.accounts.id.initialize({
//           ux_mode: "popup",
//           client_id: process.env.GOOGLE_ID,
//           callback: async (res: CredentialResponse) => {
//             if (res.credential) {
//               login(res);
//             }
//           },
//         });
//         window.google.accounts.id.renderButton(divRef.current, {
//           theme: "filled_blue",
//           size: "medium",
//           type: "standard",
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     }, []); // you can also add your client id as dependency here

//     return <div ref={divRef} />;
//   };

//   return (
//     <Box
//       component="div"
//       sx={{ backgroundColor: '#FCFCFC' }}
//     >
//       <Container
//         component="main"
//         maxWidth="xs"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           height: "100vh",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <div>
//             <Image src={yariga} alt="Yariga Logo" />
//           </div>
//           <Box mt={4}>
//             <GoogleButton />
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };
