"use client";

import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { getAuthErrorDetails, isNetworkError, shouldRetry } from "@/lib/auth-errors";

export function LocalLoginForm() {
	const t = useTranslations("auth");
	const tCommon = useTranslations("common");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [errorTitle, setErrorTitle] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [authType, setAuthType] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		setAuthType(process.env.NEXT_PUBLIC_FASTAPI_BACKEND_AUTH_TYPE || "GOOGLE");
	}, []);

	const submit = async () => {
		setIsLoading(true);
		setError(null);
		setErrorTitle(null);

		const loadingToast = toast.loading(tCommon("loading"));

		try {
			const formData = new URLSearchParams();
			formData.append("username", username);
			formData.append("password", password);
			formData.append("grant_type", "password");

			const loginUrl = `${process.env.NEXT_PUBLIC_FASTAPI_BACKEND_URL}/auth/jwt/login`;

			const response = await fetch(loginUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formData.toString(),
			});

			const data = await response.json();
			if (!response.ok) throw new Error(data.detail || `HTTP ${response.status}`);

			toast.success(t("login_success"), {
				id: loadingToast,
				description: "Redirecting to dashboard...",
				duration: 2000,
			});

			setTimeout(() => {
				router.push(`/auth/callback?token=${data.access_token}`);
			}, 500);
		} catch (err) {
			console.error("Login request failed", err);

			let errorCode = "UNKNOWN_ERROR";
			if (err instanceof Error) errorCode = err.message;
			else if (isNetworkError(err)) errorCode = "NETWORK_ERROR";

			const errorDetails = getAuthErrorDetails(errorCode);
			setErrorTitle(errorDetails.title);
			setError(errorDetails.description);

			const toastOptions: any = {
				id: loadingToast,
				description: errorDetails.description,
				duration: 6000,
			};

			if (shouldRetry(errorCode)) {
				toastOptions.action = {
					label: "Retry",
					onClick: () => submit(),
				};
			}

			toast.error(errorDetails.title, toastOptions);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await submit();
	};

	return (
		<div className="w-full max-w-md">
			<div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-6 shadow-xl shadow-black/5 backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-950/50">
				<form onSubmit={handleSubmit} className="space-y-5">
					<AnimatePresence>
						{error && errorTitle && (
							<motion.div
								initial={{ opacity: 0, y: -10, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -10, scale: 0.98 }}
								transition={{ duration: 0.25 }}
								className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 shadow-sm dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-200"
							>
								<div className="flex items-start gap-3">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="mt-0.5 flex-shrink-0 text-red-500 dark:text-red-400"
									>
										<title>Error Icon</title>
										<circle cx="12" cy="12" r="10" />
										<line x1="15" y1="9" x2="9" y2="15" />
										<line x1="9" y1="9" x2="15" y2="15" />
									</svg>
									<div className="min-w-0 flex-1">
										<p className="mb-1 text-sm font-semibold">{errorTitle}</p>
										<p className="text-sm text-red-700 dark:text-red-300">{error}</p>
									</div>
									<button
										onClick={() => {
											setError(null);
											setErrorTitle(null);
										}}
										className="flex-shrink-0 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
										aria-label="Dismiss error"
										type="button"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<title>Close</title>
											<line x1="18" y1="6" x2="6" y2="18" />
											<line x1="6" y1="6" x2="18" y2="18" />
										</svg>
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					<div>
						<label
							htmlFor="email"
							className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
						>
							{t("email")}
						</label>
						<input
							id="email"
							type="email"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className={`block w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-zinc-900 placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 transition-all duration-300 ${
								error
									? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700"
									: "border-zinc-200 focus:border-violet-500 focus:ring-violet-500 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
							}`}
							disabled={isLoading}
							placeholder="you@example.com"
							autoComplete="email"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
						>
							{t("password")}
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className={`block w-full rounded-xl border px-4 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-zinc-900 placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 transition-all duration-300 ${
									error
										? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700"
										: "border-zinc-200 focus:border-violet-500 focus:ring-violet-500 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
								}`}
								disabled={isLoading}
								placeholder="********"
								autoComplete="current-password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 transition-colors hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
								aria-label={showPassword ? t("hide_password") : t("show_password")}
							>
								{showPassword ? (
									<EyeOff className="h-5 w-5" />
								) : (
									<Eye className="h-5 w-5" />
								)}
							</button>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-300 hover:from-violet-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? tCommon("loading") : t("sign_in")}
					</button>
				</form>
			</div>

			{authType === "LOCAL" && (
				<div className="mt-6 text-center text-sm">
					<p className="text-zinc-600 dark:text-zinc-400">
						{t("dont_have_account")}{" "}
						<Link
							href="/register"
							className="font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
						>
							{t("sign_up")}
						</Link>
					</p>
				</div>
			)}
		</div>
	);
}

