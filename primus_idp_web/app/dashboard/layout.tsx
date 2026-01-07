"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const router = useRouter();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);

	useEffect(() => {
		// Check if user is authenticated
		const token = localStorage.getItem("primus_idp_bearer_token");
		if (!token) {
			router.push("/login");
			return;
		}
		setIsCheckingAuth(false);
	}, [router]);

	// Show premium loading screen while checking authentication
	if (isCheckingAuth) {
		return (
			<div className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950">
				{/* Animated background */}
				<div className="pointer-events-none fixed inset-0 z-0">
					<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
					<div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
				</div>
				
				<div className="relative z-10 space-y-4">
					<Card className="w-[380px] bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50 shadow-2xl shadow-black/20">
						<CardHeader className="pb-2 text-center">
							<div className="mx-auto mb-4 p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 w-fit">
								<Loader2 className="h-8 w-8 text-violet-400 animate-spin" />
							</div>
							<CardTitle className="text-xl font-semibold text-white">Loading Dashboard</CardTitle>
							<CardDescription className="text-zinc-400">Checking authentication...</CardDescription>
						</CardHeader>
						<CardContent className="flex justify-center py-4">
							<div className="flex gap-1">
								<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
								<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
								<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}



