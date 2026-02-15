import os
import shutil
from pathlib import Path
from typing import Any

from dotenv import load_dotenv

# Get the base directory of the project
BASE_DIR = Path(__file__).resolve().parent.parent.parent

env_file = BASE_DIR / ".env"
load_dotenv(env_file)


def is_ffmpeg_installed():
    """
    Check if ffmpeg is installed on the current system.

    Returns:
        bool: True if ffmpeg is installed, False otherwise.
    """
    return shutil.which("ffmpeg") is not None


class Config:
    # Check if ffmpeg is installed
    if not is_ffmpeg_installed():
        import static_ffmpeg

        # ffmpeg installed on first call to add_paths(), threadsafe.
        static_ffmpeg.add_paths()
        # check if ffmpeg is installed again
        if not is_ffmpeg_installed():
            raise ValueError(
                "FFmpeg is not installed on the system. Please install it to use the Primus IDP Podcaster."
            )

    # Database
    DATABASE_URL = os.getenv("DATABASE_URL")

    NEXT_FRONTEND_URL = os.getenv("NEXT_FRONTEND_URL")

    # Auth
    AUTH_TYPE = os.getenv("AUTH_TYPE")
    REGISTRATION_ENABLED = os.getenv("REGISTRATION_ENABLED", "TRUE").upper() == "TRUE"

    # Google OAuth
    GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID")
    GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")

    # Google Calendar redirect URI
    GOOGLE_CALENDAR_REDIRECT_URI = os.getenv("GOOGLE_CALENDAR_REDIRECT_URI")

    # Google Gmail redirect URI
    GOOGLE_GMAIL_REDIRECT_URI = os.getenv("GOOGLE_GMAIL_REDIRECT_URI")

    # Airtable OAuth
    AIRTABLE_CLIENT_ID = os.getenv("AIRTABLE_CLIENT_ID")
    AIRTABLE_CLIENT_SECRET = os.getenv("AIRTABLE_CLIENT_SECRET")
    AIRTABLE_REDIRECT_URI = os.getenv("AIRTABLE_REDIRECT_URI")

    # LLM instances are now managed per-user through the LLMConfig system
    # Legacy environment variables removed in favor of user-specific configurations

    # Chonkie Configuration | Edit this to your needs
    EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
    # Used by the DB schema (pgvector) and avoids forcing model downloads at import-time.
    # For sentence-transformers/all-MiniLM-L6-v2 this should be 384.
    EMBEDDING_DIMENSION = int(os.getenv("EMBEDDING_DIMENSION", "384"))

    def __init__(self) -> None:
        # Heavy model objects are initialized lazily so the API can start quickly.
        self._embedding_model_instance: Any | None = None
        self._chunker_instance: Any | None = None
        self._code_chunker_instance: Any | None = None
        self._reranker_instance: Any | None = None

    @property
    def embedding_model_instance(self):
        if self._embedding_model_instance is None:
            if not self.EMBEDDING_MODEL:
                raise ValueError("EMBEDDING_MODEL must be set")

            # Import on demand to keep API startup fast and avoid import-time side effects.
            from chonkie import AutoEmbeddings

            emb = AutoEmbeddings.get_embeddings(self.EMBEDDING_MODEL)

            # Validation: PGVector has a practical upper bound in this project.
            dim = getattr(emb, "dimension", None)
            if dim is not None and dim > 2000:
                raise ValueError(
                    f"Embedding dimension for Model: {self.EMBEDDING_MODEL} "
                    f"has {dim} dimensions, which exceeds the maximum of 2000 allowed by PGVector."
                )

            self._embedding_model_instance = emb

        return self._embedding_model_instance

    @property
    def chunker_instance(self):
        if self._chunker_instance is None:
            from chonkie import RecursiveChunker

            max_len = getattr(self.embedding_model_instance, "max_seq_length", 512)
            self._chunker_instance = RecursiveChunker(chunk_size=max_len)
        return self._chunker_instance

    @property
    def code_chunker_instance(self):
        if self._code_chunker_instance is None:
            from chonkie import CodeChunker

            max_len = getattr(self.embedding_model_instance, "max_seq_length", 512)
            self._code_chunker_instance = CodeChunker(chunk_size=max_len)
        return self._code_chunker_instance

    # Reranker's Configuration | Pinecode, Cohere etc. Read more at https://github.com/AnswerDotAI/rerankers?tab=readme-ov-file#usage
    RERANKERS_MODEL_NAME = os.getenv("RERANKERS_MODEL_NAME")
    RERANKERS_MODEL_TYPE = os.getenv("RERANKERS_MODEL_TYPE")

    @property
    def reranker_instance(self):
        if self._reranker_instance is None:
            if not self.RERANKERS_MODEL_NAME or not self.RERANKERS_MODEL_TYPE:
                return None

            from rerankers import Reranker

            self._reranker_instance = Reranker(
                model_name=self.RERANKERS_MODEL_NAME,
                model_type=self.RERANKERS_MODEL_TYPE,
            )
        return self._reranker_instance

    # OAuth JWT
    SECRET_KEY = os.getenv("SECRET_KEY")

    # ETL Service
    ETL_SERVICE = os.getenv("ETL_SERVICE")

    if ETL_SERVICE == "UNSTRUCTURED":
        # Unstructured API Key
        UNSTRUCTURED_API_KEY = os.getenv("UNSTRUCTURED_API_KEY")

    elif ETL_SERVICE == "LLAMACLOUD":
        # LlamaCloud API Key
        LLAMA_CLOUD_API_KEY = os.getenv("LLAMA_CLOUD_API_KEY")

    elif ETL_SERVICE == "CHANDRA":
        # Chandra Configuration
        CHANDRA_METHOD = os.getenv("CHANDRA_METHOD", "hf")

    # Firecrawl API Key
    FIRECRAWL_API_KEY = os.getenv("FIRECRAWL_API_KEY", None)

    # Litellm TTS Configuration
    TTS_SERVICE = os.getenv("TTS_SERVICE")
    TTS_SERVICE_API_BASE = os.getenv("TTS_SERVICE_API_BASE")
    TTS_SERVICE_API_KEY = os.getenv("TTS_SERVICE_API_KEY")

    # STT Configuration
    STT_SERVICE = os.getenv("STT_SERVICE")
    STT_SERVICE_API_BASE = os.getenv("STT_SERVICE_API_BASE")
    STT_SERVICE_API_KEY = os.getenv("STT_SERVICE_API_KEY")

    @classmethod
    def get_settings(cls):
        """Get all settings as a dictionary."""
        return {
            key: value
            for key, value in cls.__dict__.items()
            if not key.startswith("_") and not callable(value)
        }


# Create a config instance
config = Config()

