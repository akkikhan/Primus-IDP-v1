"use client";

import { CTAHomepage } from "@/components/homepage/cta";
import { FeaturesBentoGrid } from "@/components/homepage/features-bento-grid";
import { FeaturesCards } from "@/components/homepage/features-card";
import { Footer } from "@/components/homepage/footer";
import { HeroSection } from "@/components/homepage/hero-section";
import ExternalIntegrations from "@/components/homepage/integrations";

export default function HomePage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
			{/* Premium Mesh Gradient Background */}
			<div className="pointer-events-none fixed inset-0 z-0">
				{/* Main gradient mesh */}
				<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
				
				{/* Animated gradient orbs */}
				<div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[150px] animate-pulse" />
				<div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
				
				{/* Subtle grid pattern overlay */}
				<div 
					className="absolute inset-0 opacity-[0.02]"
					style={{
						backgroundImage: `
							linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
							linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
						`,
						backgroundSize: '50px 50px'
					}}
				/>
				
				{/* Top gradient fade */}
				<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent" />
			</div>

			{/* Content */}
			<div className="relative z-10">
				<HeroSection />
				<FeaturesCards />
				<FeaturesBentoGrid />
				<ExternalIntegrations />
				<CTAHomepage />
			</div>
		</main>
	);
}


