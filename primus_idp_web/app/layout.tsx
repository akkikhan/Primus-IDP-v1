import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { I18nProvider } from "@/components/providers/I18nProvider";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100").replace(/\/$/, "");

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	display: "swap",
	variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	display: "swap",
	variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: "Primus IDP - Customizable AI Research & Knowledge Management Assistant",
	description:
		"Primus IDP is an AI-powered research assistant that integrates with tools like Notion, GitHub, Slack, and more to help you efficiently manage, search, and chat with your documents. Generate podcasts, perform hybrid search, and unlock insights from your knowledge base.",
	keywords: [
		"Primus IDP",
		"AI research assistant",
		"AI knowledge management",
		"AI document assistant",
		"customizable AI assistant",
		"notion integration",
		"slack integration",
		"github integration",
		"hybrid search",
		"vector search",
		"RAG",
		"LangChain",
		"FastAPI",
		"LLM apps",
		"AI document chat",
		"knowledge management AI",
		"AI-powered document search",
		"personal AI assistant",
		"AI research tools",
		"AI podcast generator",
		"AI knowledge base",
		"AI document assistant tools",
		"AI-powered search assistant",
	],
	icons: {
		icon: [
			{ url: "/logo.svg", type: "image/svg+xml" },
			"/favicon.ico",
		],
		apple: "/icon-128.png",
	},
	openGraph: {
		title: "Primus IDP - AI Research & Knowledge Management Assistant",
		description:
			"Connect your documents and tools like Notion, Slack, GitHub, and more to your private AI assistant. Primus IDP offers powerful search, document chat, podcast generation, and RAG APIs to enhance your workflow.",
		url: SITE_URL,
		siteName: "Primus IDP",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Primus IDP AI Research Assistant",
			},
		],
		locale: "en_US",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Client-side i18n still loads message bundles via LocaleProvider
	// Locale state is fixed to English after removal of the language switcher
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(dmSans.variable, jetbrainsMono.variable, "font-sans bg-[#FDFBF7] dark:bg-[#1A1614] antialiased h-full w-full")}>
				<LocaleProvider>
					<I18nProvider>
						<ThemeProvider
							attribute="class"
							enableSystem
							disableTransitionOnChange
							defaultTheme="light"
						>
							<RootProvider>
								{children}
								<Toaster />
							</RootProvider>
						</ThemeProvider>
					</I18nProvider>
				</LocaleProvider>
			</body>
		</html>
	);
}


