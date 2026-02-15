"use client";

import { Footer } from "@/components/homepage/footer";
import { SideNavigation } from "@/components/homepage/side-navigation";
import { usePathname } from "next/navigation";

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	// Auth pages provide their own full-bleed layout (ambient background, centered card).
	// The marketing nav/footer and forced `text-white` cause the login inputs to inherit
	// white text on a light background, which looks like "missing" UI.
	const isAuthPage =
		pathname === "/login" ||
		pathname === "/register" ||
		pathname?.startsWith("/auth/");

	if (isAuthPage) {
		return <div className="min-h-screen">{children}</div>;
	}

	return (
		<div className="relative min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white overflow-x-hidden">
			{/* Side Navigation with Hamburger Menu */}
			<SideNavigation />
			
			{/* Main Content */}
			<main className="relative">
				{children}
				<Footer />
			</main>
		</div>
	);
}


