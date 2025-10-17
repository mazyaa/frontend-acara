import Toast from "@/components/ui/Toast";
import cn from "@/utils/cn";
import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface PropTypes {
    children: ReactNode;
}

const AppShell = (props: PropTypes) => {
    const { children } = props;
    return (
         <main className={cn(inter.className)}>
            {children}
            <Toast />
          </main>
    )
}

export default AppShell;