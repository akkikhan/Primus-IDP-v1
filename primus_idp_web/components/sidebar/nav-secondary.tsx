"use client";

import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavSecondaryItem {
	title: string;
	url: string;
	icon: LucideIcon;
}

export function NavSecondary({
	items,
	...props
}: {
	items: NavSecondaryItem[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	const t = useTranslations('sidebar');
	
	// Memoize items to prevent unnecessary re-renders
	const memoizedItems = useMemo(() => items, [items]);

	return (
		<SidebarGroup {...props}>
			<SidebarGroupLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{t('search_space')}</SidebarGroupLabel>
			<SidebarMenu>
				{memoizedItems.map((item, index) => (
					<SidebarMenuItem key={`${item.title}-${index}`}>
						<SidebarMenuButton asChild size="sm" aria-label={item.title} className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
							<a href={item.url}>
								<item.icon className="h-4 w-4" />
								<span>{item.title}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}


