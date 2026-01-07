"use client";

import { Footer } from "@/components/homepage/footer";
import { SideNavigation } from "@/components/homepage/side-navigation";

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
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


