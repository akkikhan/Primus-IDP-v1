"use client";

import { type ChatHandler, ChatSection as LlamaIndexChatSection } from "@llamaindex/chat-ui";
import type { ResearchMode } from "@/components/chat";
import { ChatInputUI } from "@/components/chat/ChatInputGroup";
import { ChatMessagesUI } from "@/components/chat/ChatMessages";
import type { Document } from "@/hooks/use-documents";

interface ChatInterfaceProps {
	handler: ChatHandler;
	onDocumentSelectionChange?: (documents: Document[]) => void;
	selectedDocuments?: Document[];
	onConnectorSelectionChange?: (connectorTypes: string[]) => void;
	selectedConnectors?: string[];
	searchMode?: "DOCUMENTS" | "CHUNKS";
	onSearchModeChange?: (mode: "DOCUMENTS" | "CHUNKS") => void;
	researchMode?: ResearchMode;
	onResearchModeChange?: (mode: ResearchMode) => void;
}

export default function ChatInterface({
	handler,
	onDocumentSelectionChange,
	selectedDocuments = [],
	onConnectorSelectionChange,
	selectedConnectors = [],
	searchMode,
	onSearchModeChange,
	researchMode,
	onResearchModeChange,
}: ChatInterfaceProps) {
	return (
		<LlamaIndexChatSection handler={handler} className="flex h-full">
			<div className="flex flex-1 flex-col">
				<ChatMessagesUI />
				<div className="border-t border-border/40 bg-background/50 backdrop-blur-sm p-4 md:p-6">
					<div className="max-w-4xl mx-auto">
						<ChatInputUI
							onDocumentSelectionChange={onDocumentSelectionChange}
							selectedDocuments={selectedDocuments}
							onConnectorSelectionChange={onConnectorSelectionChange}
							selectedConnectors={selectedConnectors}
							searchMode={searchMode}
							onSearchModeChange={onSearchModeChange}
							researchMode={researchMode}
							onResearchModeChange={onResearchModeChange}
						/>
					</div>
				</div>
			</div>
		</LlamaIndexChatSection>
	);
}


