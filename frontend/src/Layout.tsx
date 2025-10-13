import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, Sidebar } from "react-admin";
import { Box } from "@mui/material";

// Sidebar personalizado con logo al final
const CustomSidebar = (props: any) => (
  <Sidebar {...props}>
    {props.children}
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"

        style={{
          width: '80%',
          backgroundColor: "#FFFFFF",
          padding: "10px",
          borderRadius: "10px",
          maxWidth: '180px',
          marginBottom: '20px',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </Box>
  </Sidebar>
);

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout sidebar={CustomSidebar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
