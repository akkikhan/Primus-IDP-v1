"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";

interface NavItem {
	title: string;
	url: string;
	icon: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}

export function NavMain({ items }: { items: NavItem[] }) {
	const t = useTranslations('nav_menu');
	
	// Translation function that handles both exact matches and fallback to original
	const translateTitle = (title: string): string => {
		const titleMap: Record<string, string> = {
			'Researcher': 'researcher',
			'Chat': 'researcher',
			'Manage LLMs': 'manage_llms',
			'LLMs': 'manage_llms',
			'Documents': 'documents',
			'Upload Documents': 'upload_documents',
			'Add Webpages': 'add_webpages',
			'Add Youtube Videos': 'add_youtube',
			'Manage Documents': 'manage_documents',
			'Connectors': 'connectors',
			'Add Connector': 'add_connector',
			'Manage Connectors': 'manage_connectors',
			'Logs': 'logs',
			'Platform': 'platform',
		};
		
		const key = titleMap[title];
		return key ? t(key) : title;
	};
	
	// Memoize items to prevent unnecessary re-renders
	const memoizedItems = useMemo(() => items, [items]);

	return (
		<SidebarGroup>
			<SidebarGroupLabel className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{translateTitle('Platform')}</SidebarGroupLabel>
			<SidebarMenu>
				{memoizedItems.map((item, index) => {
					const translatedTitle = translateTitle(item.title);
					return (
						<Collapsible key={`${item.title}-${index}`} asChild defaultOpen={item.isActive}>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									tooltip={translatedTitle}
									isActive={item.isActive}
									aria-label={`${translatedTitle}${item.items?.length ? " with submenu" : ""}`}
									className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 data-[active=true]:bg-violet-500/10 data-[active=true]:text-violet-400 data-[active=true]:border-l-2 data-[active=true]:border-violet-500 transition-all duration-200"
								>
									<a href={item.url}>
										<item.icon className="h-4 w-4" />
										<span>{translatedTitle}</span>
									</a>
								</SidebarMenuButton>

								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction
												className="data-[state=open]:rotate-90 transition-transform duration-200 text-zinc-500 hover:text-zinc-300"
												aria-label={`Toggle ${translatedTitle} submenu`}
											>
												<ChevronRight className="h-4 w-4" />
												<span className="sr-only">Toggle submenu</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 duration-200">
											<SidebarMenuSub className="border-l border-zinc-800/50 ml-3">
												{item.items?.map((subItem, subIndex) => {
													const translatedSubTitle = translateTitle(subItem.title);
													return (
														<SidebarMenuSubItem key={`${subItem.title}-${subIndex}`}>
															<SidebarMenuSubButton asChild aria-label={translatedSubTitle} className="text-zinc-500 hover:text-white hover:bg-zinc-800/30 transition-colors">
																<a href={subItem.url}>
																	<span>{translatedSubTitle}</span>
																</a>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													);
												})}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}


