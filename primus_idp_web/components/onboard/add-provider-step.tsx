"use client";

import { AlertCircle, Bot, Plus, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/contracts/enums/languages";
import { LLM_PROVIDERS } from "@/contracts/enums/llm-providers";
import { type CreateLLMConfig, useLLMConfigs } from "@/hooks/use-llm-configs";

import InferenceParamsEditor from "../inference-params-editor";

interface AddProviderStepProps {
	searchSpaceId: number;
	onConfigCreated?: () => void;
	onConfigDeleted?: () => void;
}

export function AddProviderStep({
	searchSpaceId,
	onConfigCreated,
	onConfigDeleted,
}: AddProviderStepProps) {
	const t = useTranslations('onboard');
	const { llmConfigs, createLLMConfig, deleteLLMConfig } = useLLMConfigs(searchSpaceId);
	const [isAddingNew, setIsAddingNew] = useState(false);
	
	// Default to Ollama configuration from environment
	const defaultProvider = process.env.NEXT_PUBLIC_DEFAULT_LLM_PROVIDER || "OLLAMA";
	const defaultModel = process.env.NEXT_PUBLIC_DEFAULT_LLM_MODEL || "mistral:7b-instruct";
	const defaultApiBase = process.env.NEXT_PUBLIC_OLLAMA_API_BASE || "http://74.235.185.195:11434";
	
	const [formData, setFormData] = useState<CreateLLMConfig>({
		name: "Default Ollama",
		provider: defaultProvider,
		custom_provider: "",
		model_name: defaultModel,
		api_key: "ollama", // Ollama doesn't need a real API key
		api_base: defaultApiBase,
		language: "English",
		litellm_params: {},
		search_space_id: searchSpaceId,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleInputChange = (field: keyof CreateLLMConfig, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// Ollama doesn't require API key, so skip that validation for Ollama provider
		const isOllama = formData.provider === "OLLAMA";
		if (!formData.name || !formData.provider || !formData.model_name || (!isOllama && !formData.api_key)) {
			toast.error("Please fill in all required fields");
			return;
		}
		
		// For Ollama, ensure api_key has a placeholder value
		const submitData = {
			...formData,
			api_key: isOllama && !formData.api_key ? "ollama" : formData.api_key,
		};

		setIsSubmitting(true);
		const result = await createLLMConfig(submitData);
		setIsSubmitting(false);

		if (result) {
			setFormData({
				name: "Default Ollama",
				provider: defaultProvider,
				custom_provider: "",
				model_name: defaultModel,
				api_key: "ollama",
				api_base: defaultApiBase,
				language: "English",
				litellm_params: {},
				search_space_id: searchSpaceId,
			});
			setIsAddingNew(false);
			// Notify parent component that a config was created
			onConfigCreated?.();
		}
	};

	const selectedProvider = LLM_PROVIDERS.find((p) => p.value === formData.provider);

	// Handle provider change with auto-fill API Base URL
	const handleProviderChange = (providerValue: string) => {
		const provider = LLM_PROVIDERS.find((p) => p.value === providerValue);
		setFormData((prev) => ({
			...prev,
			provider: providerValue,
			// Auto-fill API Base URL if provider has a default
			api_base: provider?.apiBase || prev.api_base,
			// For Ollama, set a placeholder API key
			api_key: providerValue === "OLLAMA" ? "ollama" : prev.api_key,
		}));
	};

	const handleParamsChange = (newParams: Record<string, number | string>) => {
		setFormData((prev) => ({ ...prev, litellm_params: newParams }));
	};

	return (
		<div className="space-y-6">
			{/* Info Alert */}
			<Alert className="bg-violet-500/10 border-violet-500/30 text-violet-200">
				<AlertCircle className="h-4 w-4 text-violet-400" />
				<AlertDescription className="text-zinc-300">
					{t('add_provider_instruction')}
				</AlertDescription>
			</Alert>

			{/* Existing Configurations */}
			{llmConfigs.length > 0 && (
				<div className="space-y-4">
					<h3 className="text-lg font-semibold text-white">{t('your_llm_configs')}</h3>
					<div className="grid gap-4">
						{llmConfigs.map((config) => (
							<motion.div
								key={config.id}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
							>
								<Card className="border-l-4 border-l-violet-500 bg-zinc-800/50 border-zinc-700/50">
									<CardContent className="pt-4">
										<div className="flex items-center justify-between">
											<div className="flex-1">
												<div className="flex items-center gap-2 mb-2">
													<Bot className="w-4 h-4 text-violet-400" />
													<h4 className="font-medium text-white">{config.name}</h4>
													<Badge variant="secondary" className="bg-violet-500/20 text-violet-300 border-violet-500/30">{config.provider}</Badge>
												</div>
												<p className="text-sm text-zinc-400">
													{t('model')}: {config.model_name}
													{config.language && ` • ${t('language')}: ${config.language}`}
													{config.api_base && ` • ${t('base')}: ${config.api_base}`}
												</p>
											</div>
											<Button
												variant="ghost"
												size="sm"
												onClick={async () => {
													const success = await deleteLLMConfig(config.id);
													if (success) {
														onConfigDeleted?.();
													}
												}}
												className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
											>
												<Trash2 className="w-4 h-4" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			)}

			{/* Add New Provider */}
			{!isAddingNew ? (
				<Card className="border-dashed border-2 border-zinc-700 hover:border-violet-500/50 transition-colors bg-zinc-800/30">
					<CardContent className="flex flex-col items-center justify-center py-12">
						<div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4">
							<Plus className="w-8 h-8 text-violet-400" />
						</div>
						<h3 className="text-lg font-semibold mb-2 text-white">{t('add_provider_title')}</h3>
						<p className="text-zinc-400 text-center mb-4">
							{t('add_provider_subtitle')}
						</p>
						<Button onClick={() => setIsAddingNew(true)} className="bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/25">
							<Plus className="w-4 h-4 mr-2" />
							{t('add_provider_button')}
						</Button>
					</CardContent>
				</Card>
			) : (
				<Card className="bg-zinc-800/50 border-zinc-700/50">
					<CardHeader>
						<CardTitle className="text-white">{t('add_new_llm_provider')}</CardTitle>
						<CardDescription className="text-zinc-400">
							{t('configure_new_provider')}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name">{t('config_name_required')}</Label>
									<Input
										id="name"
										placeholder={t('config_name_placeholder')}
										value={formData.name}
										onChange={(e) => handleInputChange("name", e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="provider">{t('provider_required')}</Label>
									<Select
										value={formData.provider}
										onValueChange={handleProviderChange}
									>
										<SelectTrigger>
											<SelectValue placeholder={t('provider_placeholder')} />
										</SelectTrigger>
										<SelectContent>
											{LLM_PROVIDERS.map((provider) => (
												<SelectItem key={provider.value} value={provider.value}>
													{provider.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* language */}
								<div className="space-y-2">
									<Label htmlFor="language">{t('language_optional')}</Label>
									<Select
										value={formData.language || "English"}
										onValueChange={(value) => handleInputChange("language", value)}
									>
										<SelectTrigger>
											<SelectValue placeholder={t('language_placeholder')} />
										</SelectTrigger>
										<SelectContent>
											{LANGUAGES.map((language) => (
												<SelectItem key={language.value} value={language.value}>
													{language.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>

							{formData.provider === "CUSTOM" && (
								<div className="space-y-2">
									<Label htmlFor="custom_provider">{t('custom_provider_name')}</Label>
									<Input
										id="custom_provider"
										placeholder={t('custom_provider_placeholder')}
										value={formData.custom_provider}
										onChange={(e) => handleInputChange("custom_provider", e.target.value)}
										required
									/>
								</div>
							)}

							<div className="space-y-2">
								<Label htmlFor="model_name">{t('model_name_required')}</Label>
								<Input
									id="model_name"
									placeholder={selectedProvider?.example || t('model_name_placeholder')}
									value={formData.model_name}
									onChange={(e) => handleInputChange("model_name", e.target.value)}
									required
								/>
								{selectedProvider && (
									<p className="text-xs text-zinc-500">
										{t('examples')}: {selectedProvider.example}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="api_key" className="text-zinc-300">
									{formData.provider === "OLLAMA" ? t('api_key_optional') || "API Key (Optional)" : t('api_key_required')}
								</Label>
								<Input
									id="api_key"
									type="password"
									placeholder={formData.provider === "OLLAMA" ? "Leave empty for Ollama" : t('api_key_placeholder')}
									value={formData.api_key}
									onChange={(e) => handleInputChange("api_key", e.target.value)}
									required={formData.provider !== "OLLAMA"}
									className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
								/>
								{formData.provider === "OLLAMA" && (
									<p className="text-xs text-zinc-500">
										Ollama does not require an API key
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="api_base" className="text-zinc-300">{t('api_base_optional')}</Label>
								<Input
									id="api_base"
									placeholder={t('api_base_placeholder')}
									value={formData.api_base}
									onChange={(e) => handleInputChange("api_base", e.target.value)}
									className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-violet-500 focus:ring-violet-500/20"
								/>
							</div>

							{/* Optional Inference Parameters */}
							<div className="pt-4">
								<InferenceParamsEditor
									params={formData.litellm_params || {}}
									setParams={handleParamsChange}
								/>
							</div>

							<div className="flex gap-2 pt-4">
								<Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-violet-600 to-violet-500 text-white hover:from-violet-500 hover:to-violet-400 shadow-lg shadow-violet-500/25">
									{isSubmitting ? t('adding') : t('add_provider')}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setIsAddingNew(false)}
									disabled={isSubmitting}
									className="bg-zinc-800/50 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
								>
									{t('cancel')}
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			)}
		</div>
	);
}


