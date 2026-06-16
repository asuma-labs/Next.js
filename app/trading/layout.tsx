// app/trading/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Trading - Asuma Bot",
    description: "Trading aset virtual Asuma Bot secara real-time",
    openGraph: {
        title: "Trading - Asuma Bot",
        description: "Trading aset virtual Asuma Bot secara real-time",
        url: "https://asuma.my.id/trading",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function TradingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
