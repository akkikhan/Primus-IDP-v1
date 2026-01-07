"use client";

import { ArrowLeft, ArrowRight, Bot, CheckCircle, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "@/components/Logo";
import { AddProviderStep } from "@/components/onboard/add-provider-step";
import { AssignRolesStep } from "@/components/onboard/assign-roles-step";
import { CompletionStep } from "@/components/onboard/completion-step";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLLMConfigs, useLLMPreferences } from "@/hooks/use-llm-configs";

const TOTAL_STEPS = 3;

const OnboardPage = () => {
	const t = useTranslations('onboard');
	const router = useRouter();
	const params = useParams();
	const searchSpaceId = Number(params.search_space_id);

	const { llmConfigs, loading: configsLoading, refreshConfigs } = useLLMConfigs(searchSpaceId);
	const {
		preferences,
		loading: preferencesLoading,
		isOnboardingComplete,
		refreshPreferences,
	} = useLLMPreferences(searchSpaceId);
	const [currentStep, setCurrentStep] = useState(1);
	const [hasUserProgressed, setHasUserProgressed] = useState(false);

	// Check if user is authenticated
	useEffect(() => {
		const token = localStorage.getItem("primus_idp_bearer_token");
		if (!token) {
			router.push("/login");
			return;
		}
	}, [router]);

	// Track if user has progressed beyond step 1
	useEffect(() => {
		if (currentStep > 1) {
			setHasUserProgressed(true);
		}
	}, [currentStep]);

	// Redirect to dashboard if onboarding is already complete and user hasn't progressed (fresh page load)
	// But only check once to avoid redirect loops
	useEffect(() => {
		if (!preferencesLoading && !configsLoading && isOnboardingComplete() && !hasUserProgressed) {
			// Small delay to ensure the check is stable
			const timer = setTimeout(() => {
				router.push(`/dashboard/${searchSpaceId}`);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [
		preferencesLoading,
		configsLoading,
		isOnboardingComplete,
		hasUserProgressed,
		router,
		searchSpaceId,
	]);

	const progress = (currentStep / TOTAL_STEPS) * 100;

	const stepTitles = [t('add_llm_provider'), t('assign_llm_roles'), t('setup_complete')];

	const stepDescriptions = [
		t('configure_first_provider'),
		t('assign_specific_roles'),
		t('all_set'),
	];

	const canProceedToStep2 = !configsLoading && llmConfigs.length > 0;
	const canProceedToStep3 =
		!preferencesLoading &&
		preferences.long_context_llm_id &&
		preferences.fast_llm_id &&
		preferences.strategic_llm_id;

	const handleNext = () => {
		if (currentStep < TOTAL_STEPS) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleComplete = () => {
		router.push(`/dashboard/${searchSpaceId}/documents`);
	};

	if (configsLoading || preferencesLoading) {
		return (
			<div className="relative flex flex-col items-center justify-center min-h-screen">
				{/* Premium Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)]" />
				
				{/* Animated Orbs */}
				<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
				
				<Card className="relative z-10 w-[350px] bg-zinc-900/80 backdrop-blur-xl rounded-2xl border-zinc-800/50 shadow-2xl shadow-violet-500/5">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<div className="relative">
							<div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full blur-lg opacity-50 animate-pulse" />
							<Bot className="relative h-12 w-12 text-violet-400 animate-pulse mb-4" />
						</div>
						<p className="text-sm text-zinc-400">{t('loading_config')}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
			{/* Premium Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.1),transparent_50%)]" />
			
			{/* Animated Mesh Grid */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0" style={{
					backgroundImage: `linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)`,
					backgroundSize: '60px 60px'
				}} />
			</div>
			
			{/* Floating Orbs */}
			<div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
			<div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
			
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative z-10 w-full max-w-4xl"
			>
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center mb-4">
						<div className="relative mr-3">
							<div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-xl blur-lg opacity-50" />
							<Logo className="relative w-12 h-12 rounded-xl" />
						</div>
						<h1 className="text-3xl font-semibold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">{t('welcome_title')}</h1>
					</div>
					<p className="text-zinc-400 text-lg">
						{t('welcome_subtitle')}
					</p>
				</div>

				{/* Progress */}
				<Card className="mb-8 bg-zinc-900/60 backdrop-blur-xl rounded-2xl border-zinc-800/50 shadow-xl">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between mb-4">
							<div className="text-sm font-medium text-white">
								{t('step_of', { current: currentStep, total: TOTAL_STEPS })}
							</div>
							<div className="text-sm text-zinc-400">{t('percent_complete', { percent: Math.round(progress) })}</div>
						</div>
						<div className="relative mb-4">
							<div className="h-2 rounded-full bg-zinc-800/50 overflow-hidden">
								<div 
									className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full transition-all duration-500"
									style={{ width: `${progress}%` }}
								/>
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4">
							{Array.from({ length: TOTAL_STEPS }, (_, i) => {
								const stepNum = i + 1;
								const isCompleted = stepNum < currentStep;
								const isCurrent = stepNum === currentStep;

								return (
									<div key={stepNum} className="flex items-center space-x-2">
										<div
											className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
												isCompleted
													? "bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25"
													: isCurrent
														? "bg-violet-500/20 text-violet-400 border-2 border-violet-500"
														: "bg-zinc-800/50 text-zinc-500"
											}`}
										>
											{isCompleted ? <CheckCircle className="w-4 h-4" /> : stepNum}
										</div>
										<div className="flex-1 min-w-0">
											<p
												className={`text-sm font-medium truncate ${
													isCurrent ? "text-white" : "text-zinc-500"
												}`}
											>
												{stepTitles[i]}
											</p>
										</div>
									</div>
								);
							})}
						</div>
					</CardContent>
				</Card>

				{/* Step Content */}
				<Card className="min-h-[500px] bg-zinc-900/60 backdrop-blur-xl rounded-2xl border-zinc-800/50 shadow-xl">
					<CardHeader className="text-center">
						<CardTitle className="text-2xl flex items-center justify-center gap-2 font-semibold text-white">
							{currentStep === 1 && <Bot className="w-6 h-6 text-violet-400" />}
							{currentStep === 2 && <Sparkles className="w-6 h-6 text-cyan-400" />}
							{currentStep === 3 && <CheckCircle className="w-6 h-6 text-emerald-400" />}
							{stepTitles[currentStep - 1]}
						</CardTitle>
						<CardDescription className="text-base text-zinc-400">
							{stepDescriptions[currentStep - 1]}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<AnimatePresence mode="wait">
							<motion.div
								key={currentStep}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.3 }}
							>
								{currentStep === 1 && (
									<AddProviderStep
										searchSpaceId={searchSpaceId}
										onConfigCreated={refreshConfigs}
										onConfigDeleted={refreshConfigs}
									/>
								)}
								{currentStep === 2 && (
									<AssignRolesStep
										searchSpaceId={searchSpaceId}
										onPreferencesUpdated={refreshPreferences}
									/>
								)}
								{currentStep === 3 && <CompletionStep searchSpaceId={searchSpaceId} />}
							</motion.div>
						</AnimatePresence>
					</CardContent>
				</Card>

				{/* Navigation */}
				<div className="flex justify-between mt-8">
					<Button
						variant="outline"
						onClick={handlePrevious}
						disabled={currentStep === 1}
						className="flex items-center gap-2 rounded-xl bg-zinc-800/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-50"
					>
						<ArrowLeft className="w-4 h-4" />
						{t('previous')}
					</Button>

					<div className="flex gap-2">
						{currentStep < TOTAL_STEPS && (
							<Button
								onClick={handleNext}
								disabled={
									(currentStep === 1 && !canProceedToStep2) ||
									(currentStep === 2 && !canProceedToStep3)
								}
								className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/25 disabled:opacity-50 disabled:shadow-none"
							>
								{t('next')}
								<ArrowRight className="w-4 h-4" />
							</Button>
						)}

						{currentStep === TOTAL_STEPS && (
							<Button onClick={handleComplete} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-500/25">
								{t('complete_setup')}
								<CheckCircle className="w-4 h-4" />
							</Button>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default OnboardPage;

