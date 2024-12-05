import AppFooter from "@/components/footer/app.footer";
import AppHeader from "@/components/header/app.header";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthWrapper from "@/lib/next.auth.wrapper";
import { SessionProvider } from "next-auth/react"
import { ToastProvider } from '@/utils/toast';
import { TrackContextProvider } from "@/lib/track.wrapper";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>
                    <NextAuthWrapper>
                        <ToastProvider>
                            <TrackContextProvider>
                                {children}
                            </TrackContextProvider>
                        </ToastProvider>
                    </NextAuthWrapper>
                </ThemeRegistry>
            </body>
        </html>
    );
}
