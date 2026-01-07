"use client";

import { AlertCircle, Bot, Brain, CheckCircle, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLLMConfigs, useLLMPreferences } from "@/hooks/use-llm-configs";

interface AssignRolesStepProps {
	searchSpaceId: number;
	onPreferencesUpdated?: () => Promise<void>;
}

export function AssignRolesStep({ searchSpaceId, onPreferencesUpdated }: AssignRolesStepProps) {
	const t = useTranslations('onboard');
	const { llmConfigs } = useLLMConfigs(searchSpaceId);
	const { preferences, updatePreferences } = useLLMPreferences(searchSpaceId);

	const ROLE_DESCRIPTIONS = {
		long_context: {
			icon: Brain,
			title: t('long_context_llm_title'),
			description: t('long_context_llm_desc'),
			color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
			examples: t('long_context_llm_examples'),
		},
		fast: {
			icon: Zap,
			title: t('fast_llm_title'),
			description: t('fast_llm_desc'),
			color: "bg-violet-500/20 text-violet-300 border-violet-500/30",
			examples: t('fast_llm_examples'),
		},
		strategic: {
			icon: Bot,
			title: t('strategic_llm_title'),
			description: t('strategic_llm_desc'),
			color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
			examples: t('strategic_llm_examples'),
		},
	};

	const [assignments, setAssignments] = useState({
		long_context_llm_id: preferences.long_context_llm_id || "",
		fast_llm_id: preferences.fast_llm_id || "",
		strategic_llm_id: preferences.strategic_llm_id || "",
	});

	useEffect(() => {
		setAssignments({
			long_context_llm_id: preferences.long_context_llm_id || "",
			fast_llm_id: preferences.fast_llm_id || "",
			strategic_llm_id: preferences.strategic_llm_id || "",
		});
	}, [preferences]);

	const handleRoleAssignment = async (role: string, configId: string) => {
		const newAssignments = {
			...assignments,
			[role]: configId === "" ? "" : parseInt(configId),
		};

		setAssignments(newAssignments);

		// Auto-save if this assignment completes all roles
		const hasAllAssignments =
			newAssignments.long_context_llm_id &&
			newAssignments.fast_llm_id &&
			newAssignments.strategic_llm_id;

		if (hasAllAssignments) {
			const numericAssignments = {
				long_context_llm_id:
					typeof newAssignments.long_context_llm_id === "string"
						? parseInt(newAssignments.long_context_llm_id)
						: newAssignments.long_context_llm_id,
				fast_llm_id:
					typeof newAssignments.fast_llm_id === "string"
						? parseInt(newAssignments.fast_llm_id)
						: newAssignments.fast_llm_id,
				strategic_llm_id:
					typeof newAssignments.strategic_llm_id === "string"
						? parseInt(newAssignments.strategic_llm_id)
						: newAssignments.strategic_llm_id,
			};

			const success = await updatePreferences(numericAssignments);

			// Refresh parent preferences state
			if (success && onPreferencesUpdated) {
				await onPreferencesUpdated();
			}
		}
	};

	const isAssignmentComplete =
		assignments.long_context_llm_id && assignments.fast_llm_id && assignments.strategic_llm_id;

	if (llmConfigs.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12">
				<div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4">
					<AlertCircle className="w-8 h-8 text-zinc-500" />
				</div>
				<h3 className="text-lg font-semibold mb-2 text-white">{t('no_llm_configs_found')}</h3>
				<p className="text-zinc-400 text-center">
					{t('add_provider_before_roles')}
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Info Alert */}
			<Alert className="bg-violet-500/10 border-violet-500/30 text-violet-200">
				<AlertCircle className="h-4 w-4 text-violet-400" />
				<AlertDescription className="text-zinc-300">
					{t('assign_roles_instruction')}
				</AlertDescription>
			</Alert>

			{/* Role Assignment Cards */}
			<div className="grid gap-6">
				{Object.entries(ROLE_DESCRIPTIONS).map(([key, role]) => {
					const IconComponent = role.icon;
					const currentAssignment = assignments[`${key}_llm_id` as keyof typeof assignments];
					const assignedConfig = llmConfigs.find((config) => config.id === currentAssignment);

					return (
						<motion.div
							key={key}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: Object.keys(ROLE_DESCRIPTIONS).indexOf(key) * 0.1 }}
						>
							<Card
								className={`border-l-4 bg-zinc-800/50 border-zinc-700/50 ${currentAssignment ? "border-l-violet-500" : "border-l-zinc-700"}`}
							>
								<CardHeader className="pb-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className={`p-2 rounded-lg ${role.color}`}>
												<IconComponent className="w-5 h-5" />
											</div>
											<div>
												<CardTitle className="text-lg text-white">{role.title}</CardTitle>
												<CardDescription className="mt-1 text-zinc-400">{role.description}</CardDescription>
											</div>
										</div>
										{currentAssignment && <CheckCircle className="w-5 h-5 text-emerald-400" />}
									</div>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="text-sm text-zinc-400">
										<strong className="text-zinc-300">{t('use_cases')}:</strong> {role.examples}
									</div>

									<div className="space-y-2">
										<Label className="text-sm font-medium text-zinc-300">{t('assign_llm_config')}:</Label>
										<Select
											value={currentAssignment?.toString() || ""}
											onValueChange={(value) => handleRoleAssignment(`${key}_llm_id`, value)}
										>
											<SelectTrigger>
												<SelectValue placeholder={t('select_llm_config')} />
											</SelectTrigger>
											<SelectContent>
												{llmConfigs
													.filter((config) => config.id && config.id.toString().trim() !== "")
													.map((config) => (
														<SelectItem key={config.id} value={config.id.toString()}>
															<div className="flex items-center gap-2">
																<Badge variant="outline" className="text-xs bg-violet-500/20 text-violet-300 border-violet-500/30">
																	{config.provider}
																</Badge>
																<span className="text-zinc-200">{config.name}</span>
																<span className="text-zinc-500">({config.model_name})</span>
															</div>
														</SelectItem>
													))}
											</SelectContent>
										</Select>
									</div>

									{assignedConfig && (
										<div className="mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
											<div className="flex items-center gap-2 text-sm">
												<Bot className="w-4 h-4 text-violet-400" />
												<span className="font-medium text-zinc-200">{t('assigned')}:</span>
												<Badge variant="secondary" className="bg-violet-500/20 text-violet-300 border-violet-500/30">{assignedConfig.provider}</Badge>
												<span className="text-zinc-300">{assignedConfig.name}</span>
											</div>
											<div className="text-xs text-zinc-500 mt-1">
												{t('model')}: {assignedConfig.model_name}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Status Indicator */}
			{isAssignmentComplete && (
				<div className="flex justify-center pt-4">
					<div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
						<CheckCircle className="w-4 h-4" />
						<span className="text-sm font-medium">{t('all_roles_assigned_saved')}</span>
					</div>
				</div>
			)}

			{/* Progress Indicator */}
			<div className="flex justify-center">
				<div className="flex items-center gap-2 text-sm text-zinc-400">
					<span>{t('progress')}:</span>
					<div className="flex gap-1">
						{Object.keys(ROLE_DESCRIPTIONS).map((key, _index) => (
							<div
								key={key}
								className={`w-2 h-2 rounded-full ${
									assignments[`${key}_llm_id` as keyof typeof assignments]
										? "bg-violet-500"
										: "bg-zinc-700"
								}`}
							/>
						))}
					</div>
					<span className="text-zinc-300">
						{t('roles_assigned', {
							assigned: Object.values(assignments).filter(Boolean).length,
							total: Object.keys(ROLE_DESCRIPTIONS).length
						})}
					</span>
				</div>
			</div>
		</div>
	);
}


