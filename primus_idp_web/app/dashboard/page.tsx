"use client";

import { AlertCircle, Loader2, Plus, Search, Trash2 } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { ThemeTogglerComponent } from "@/components/theme/theme-toggle";
import { UserDropdown } from "@/components/UserDropdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Tilt } from "@/components/ui/tilt";
import { useSearchSpaces } from "@/hooks/use-search-spaces";
import { apiClient } from "@/lib/api";

interface User {
	id: string;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
}

/**
 * Formats a date string into a readable format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "Jan 1, 2023")
 */
const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

/**
 * Loading screen component with premium animation
 */
const LoadingScreen = () => {
	const t = useTranslations('dashboard');
	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="w-[380px] bg-zinc-900/80 backdrop-blur-xl border-zinc-800/50 shadow-2xl shadow-black/20">
					<CardHeader className="pb-2 text-center">
						<div className="mx-auto mb-3 p-3 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 w-fit">
							<motion.div
								animate={{ rotate: 360 }}
								transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
							>
								<Loader2 className="h-8 w-8 text-violet-400" />
							</motion.div>
						</div>
						<CardTitle className="text-xl font-semibold text-white">{t('loading')}</CardTitle>
						<CardDescription className="text-zinc-400">{t('fetching_spaces')}</CardDescription>
					</CardHeader>
					<CardContent className="flex justify-center py-4">
						<div className="flex gap-1">
							<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
							<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
							<span className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
						</div>
					</CardContent>
					<CardFooter className="border-t border-zinc-800/50 pt-4 text-sm text-zinc-500 justify-center">
						{t('may_take_moment')}
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

/**
 * Error screen component with premium animation
 */
const ErrorScreen = ({ message }: { message: string }) => {
	const t = useTranslations('dashboard');
	const router = useRouter();

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Card className="w-[420px] bg-zinc-900/80 backdrop-blur-xl border-red-900/30 shadow-2xl shadow-black/20">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
								<AlertCircle className="h-5 w-5 text-red-400" />
							</div>
							<CardTitle className="text-xl font-semibold text-white">{t('error')}</CardTitle>
						</div>
						<CardDescription className="text-zinc-400 mt-2">{t('something_wrong')}</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert className="bg-red-500/10 border-red-500/30 text-red-300">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle className="text-red-200">{t('error_details')}</AlertTitle>
							<AlertDescription className="mt-2 text-red-300/80">{message}</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter className="flex justify-end gap-2 border-t border-zinc-800/50 pt-4">
						<Button variant="outline" onClick={() => router.refresh()} className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
							{t('try_again')}
						</Button>
						<Button onClick={() => router.push("/")} className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500">
							{t('go_home')}
						</Button>
					</CardFooter>
				</Card>
			</motion.div>
		</div>
	);
};

const DashboardPage = () => {
	const t = useTranslations('dashboard');
	const tCommon = useTranslations('common');
	
	// Animation variants
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 24,
			},
		},
	};

	const { searchSpaces, loading, error, refreshSearchSpaces } = useSearchSpaces();

	// User state management
	const [user, setUser] = useState<User | null>(null);
	const [isLoadingUser, setIsLoadingUser] = useState(true);
	const [userError, setUserError] = useState<string | null>(null);

	// Fetch user details
	useEffect(() => {
		const fetchUser = async () => {
			try {
				if (typeof window === "undefined") return;

				try {
					const userData = await apiClient.get<User>("users/me");
					setUser(userData);
					setUserError(null);
				} catch (error) {
					console.error("Error fetching user:", error);
					setUserError(error instanceof Error ? error.message : "Unknown error occurred");
				} finally {
					setIsLoadingUser(false);
				}
			} catch (error) {
				console.error("Error in fetchUser:", error);
				setIsLoadingUser(false);
			}
		};

		fetchUser();
	}, []);

	// Create user object for UserDropdown
	const customUser = {
		name: user?.email ? user.email.split("@")[0] : "User",
		email:
			user?.email ||
			(isLoadingUser ? "Loading..." : userError ? "Error loading user" : "Unknown User"),
		avatar: "/logo.svg", // Default avatar
	};

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen message={error} />;

	const handleDeleteSearchSpace = async (id: number) => {
		// Send DELETE request to the API
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/api/v1/searchspaces/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("primus_idp_bearer_token")}`,
					},
				}
			);

			if (!response.ok) {
				toast.error("Failed to delete search space");
				throw new Error("Failed to delete search space");
			}

			// Refresh the search spaces list after successful deletion
			refreshSearchSpaces();
		} catch (error) {
			console.error("Error deleting search space:", error);
			toast.error("An error occurred while deleting the search space");
			return;
		}
		toast.success("Search space deleted successfully");
	};

	return (
		<motion.div
			className="relative min-h-screen bg-zinc-950"
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			{/* Premium Background */}
			<div className="pointer-events-none fixed inset-0 z-0">
				<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
				<div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />
				<div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
			</div>

			<div className="relative z-10 container mx-auto py-10">
				<motion.div className="flex flex-col space-y-6" variants={itemVariants}>
					<div className="flex flex-row space-x-4 justify-between">
						<div className="flex flex-row space-x-4">
							<div className="p-2 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20">
								<Logo className="w-10 h-10 rounded-md" />
							</div>
							<div className="flex flex-col space-y-1">
								<h1 className="text-3xl font-bold text-white">{t('Primus IDP_dashboard')}</h1>
								<p className="text-zinc-400">{t('welcome_message')}</p>
							</div>
						</div>
						<div className="flex items-center space-x-3">
							<UserDropdown user={customUser} />
							<ThemeTogglerComponent />
						</div>
					</div>

					<div className="flex flex-col space-y-6 mt-6">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-semibold text-white">{t('your_search_spaces')}</h2>
							<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
								<Link href="/dashboard/searchspaces">
									<Button className="h-10 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
										<Plus className="mr-2 h-4 w-4" />
										{t('create_search_space')}
									</Button>
								</Link>
							</motion.div>
						</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{searchSpaces &&
							searchSpaces.length > 0 &&
							searchSpaces.map((space) => (
								<motion.div key={space.id} variants={itemVariants} className="aspect-[4/3]">
									<Tilt
										rotationFactor={6}
										isRevese
										springOptions={{
											stiffness: 26.7,
											damping: 4.1,
											mass: 0.2,
										}}
										className="group relative rounded-lg h-full"
									>
										<Spotlight
											className="z-10 from-indigo-500/20 via-violet-500/10 to-indigo-400/5 blur-2xl"
											size={248}
											springOptions={{
												stiffness: 26.7,
												damping: 4.1,
												mass: 0.2,
											}}
										/>
										<div className="flex flex-col h-full overflow-hidden rounded-xl border bg-muted/30 backdrop-blur-sm transition-all hover:border-primary/50">
											<div className="relative h-32 w-full overflow-hidden">
												<Link href={`/dashboard/${space.id}/documents`} key={space.id}>
													<Image
														src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
														alt={space.name}
														className="h-full w-full object-cover grayscale duration-700 group-hover:grayscale-0"
														width={248}
														height={248}
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
												</Link>
												<div className="absolute top-2 right-2">
													<div>
														<AlertDialog>
															<AlertDialogTrigger asChild>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-destructive/90 cursor-pointer"
																>
																	<Trash2 className="h-4 w-4" />
																</Button>
															</AlertDialogTrigger>
															<AlertDialogContent>
																<AlertDialogHeader>
																	<AlertDialogTitle>{t('delete_search_space')}</AlertDialogTitle>
																	<AlertDialogDescription>
																		{t('delete_space_confirm', { name: space.name })}
																	</AlertDialogDescription>
																</AlertDialogHeader>
																<AlertDialogFooter>
																	<AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
																	<AlertDialogAction
																		onClick={() => handleDeleteSearchSpace(space.id)}
																		className="bg-destructive hover:bg-destructive/90"
																	>
																		{tCommon('delete')}
																	</AlertDialogAction>
																</AlertDialogFooter>
															</AlertDialogContent>
														</AlertDialog>
													</div>
												</div>
											</div>
											<Link href={`/dashboard/${space.id}/documents`} key={space.id}>
												<div className="flex flex-1 flex-col justify-between p-4">
													<div>
														<h3 className="font-semibold text-lg text-white">{space.name}</h3>
														<p className="mt-1 text-sm text-zinc-400">
															{space.description}
														</p>
													</div>
													<div className="mt-4 flex justify-between text-xs text-zinc-500">
														{/* <span>{space.title}</span> */}
														<span>{t('created')} {formatDate(space.created_at)}</span>
													</div>
												</div>
											</Link>
										</div>
									</Tilt>
								</motion.div>
							))}

								{searchSpaces.length === 0 && (
									<motion.div
										variants={itemVariants}
										className="col-span-full flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-sm"
									>
										<div className="rounded-full bg-violet-500/10 p-4 mb-4 border border-violet-500/20">
											<Search className="h-8 w-8 text-violet-400" />
										</div>
										<h3 className="text-lg font-semibold mb-2 text-white">{t('no_spaces_found')}</h3>
										<p className="text-zinc-400 mb-6">
											{t('create_first_space')}
										</p>
										<Link href="/dashboard/searchspaces">
											<Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-500/25">
												<Plus className="mr-2 h-4 w-4" />
												{t('create_search_space')}
											</Button>
										</Link>
									</motion.div>
								)}								{searchSpaces.length > 0 && (
									<motion.div variants={itemVariants} className="aspect-[4/3]">
										<Tilt
											rotationFactor={6}
											isRevese
											springOptions={{
												stiffness: 26.7,
												damping: 4.1,
												mass: 0.2,
											}}
											className="group relative rounded-lg h-full"
										>
											<Link href="/dashboard/searchspaces" className="flex h-full">
												<div className="flex flex-col items-center justify-center h-full w-full rounded-xl border border-dashed border-zinc-700/50 bg-zinc-900/30 hover:border-violet-500/50 hover:bg-zinc-900/50 transition-all duration-300">
													<div className="p-3 rounded-full bg-violet-500/10 border border-violet-500/20 mb-3">
														<Plus className="h-8 w-8 text-violet-400" />
													</div>
													<span className="text-sm font-medium text-zinc-400">{t('add_new_search_space')}</span>
												</div>
											</Link>
										</Tilt>
									</motion.div>
								)}
							</div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		);
	};

export default DashboardPage;



