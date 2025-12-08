"use client";

import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import { AppSidebarProvider } from "@/components/sidebar/AppSidebarProvider";
import { ThemeTogglerComponent } from "@/components/theme/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useLLMPreferences } from "@/hooks/use-llm-configs";

export function DashboardClientLayout({
	children,
	searchSpaceId,
	navSecondary,
	navMain,
}: {
	children: React.ReactNode;
	searchSpaceId: string;
	navSecondary: any[];
	navMain: any[];
}) {
	const t = useTranslations('dashboard');
	const router = useRouter();
	const pathname = usePathname();
	const searchSpaceIdNum = Number(searchSpaceId);

	const { loading, error, isOnboardingComplete } = useLLMPreferences(searchSpaceIdNum);
	const [hasCheckedOnboarding, setHasCheckedOnboarding] = useState(false);

	// Skip onboarding check if we're already on the onboarding page
	const isOnboardingPage = pathname?.includes("/onboard");

	// Translate navigation items
	const tNavMenu = useTranslations('nav_menu');
	const translatedNavMain = useMemo(() => {
		return navMain.map((item) => ({
			...item,
			title: tNavMenu(item.title.toLowerCase().replace(/ /g, '_')),
			items: item.items?.map((subItem: any) => ({
				...subItem,
				title: tNavMenu(subItem.title.toLowerCase().replace(/ /g, '_')),
			})),
		}));
	}, [navMain, tNavMenu]);

	const translatedNavSecondary = useMemo(() => {
		return navSecondary.map((item) => ({
			...item,
			title: item.title === 'All Search Spaces' ? tNavMenu('all_search_spaces') : item.title,
		}));
	}, [navSecondary, tNavMenu]);

	const [open, setOpen] = useState<boolean>(() => {
		try {
			const match = document.cookie.match(/(?:^|; )sidebar_state=([^;]+)/);
			if (match) return match[1] === "true";
		} catch {
			// ignore
		}
		return true;
	});

	useEffect(() => {
		// Skip check if already on onboarding page
		if (isOnboardingPage) {
			setHasCheckedOnboarding(true);
			return;
		}

		// Only check once after preferences have loaded
		if (!loading && !hasCheckedOnboarding) {
			const onboardingComplete = isOnboardingComplete();

			if (!onboardingComplete) {
				router.push(`/dashboard/${searchSpaceId}/onboard`);
			}

			setHasCheckedOnboarding(true);
		}
	}, [
		loading,
		isOnboardingComplete,
		isOnboardingPage,
		router,
		searchSpaceId,
		hasCheckedOnboarding,
	]);

	// Show loading screen while checking onboarding status (only on first load)
	if (!hasCheckedOnboarding && loading && !isOnboardingPage) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen space-y-4">
				<Card className="w-[350px] bg-background/60 backdrop-blur-md rounded-2xl border-border/40 shadow-lg">
					<CardHeader className="pb-2">
						<CardTitle className="text-xl font-semibold">{t('loading_config')}</CardTitle>
						<CardDescription className="text-muted-foreground">{t('checking_llm_prefs')}</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center py-6">
						<Loader2 className="h-10 w-10 text-primary animate-spin" />
					</CardContent>
				</Card>
			</div>
		);
	}

	// Show error screen if there's an error loading preferences (but not on onboarding page)
	if (error && !hasCheckedOnboarding && !isOnboardingPage) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen space-y-4">
				<Card className="w-[400px] bg-background/60 backdrop-blur-md rounded-2xl border-destructive/30 shadow-lg">
					<CardHeader className="pb-2">
						<CardTitle className="text-xl font-semibold text-destructive">
							{t('config_error')}
						</CardTitle>
						<CardDescription className="text-muted-foreground">{t('failed_load_llm_config')}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">{error}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<SidebarProvider open={open} onOpenChange={setOpen}>
			{/* Use AppSidebarProvider which fetches user, search space, and recent chats */}
			<AppSidebarProvider
				searchSpaceId={searchSpaceId}
				navSecondary={translatedNavSecondary}
				navMain={translatedNavMain}
			/>
			<SidebarInset>
				<header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
					<div className="flex items-center justify-between w-full gap-3 px-4">
						<div className="flex items-center gap-3">
							<SidebarTrigger className="-ml-1 rounded-lg hover:bg-muted/80 transition-colors" />
							<Separator orientation="vertical" className="h-5 bg-border/50" />
							<DashboardBreadcrumb />
						</div>
						<div className="flex items-center gap-2">
							<ThemeTogglerComponent />
						</div>
					</div>
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
