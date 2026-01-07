import os
import subprocess
import logging
from pathlib import Path
from typing import Optional, Dict, Any
import json

logger = logging.getLogger(__name__)

class ChandraService:
    """
    Service for processing documents using the Chandra OCR model.
    """
    
    def __init__(self, model_method: str = "hf"):
        """
        Initialize the Chandra service.
        
        Args:
            model_method (str): The inference method to use. Options: 'hf' (HuggingFace, local), 'vllm' (vLLM server).
                            Default is 'hf' for local processing.
        """
        self.model_method = model_method

    def process_document(self, file_path: str, output_dir: str, 
                        include_images: bool = True, 
                        include_headers_footers: bool = False) -> Dict[str, Any]:
        """
        Process a document using Chandra OCR.
        
        Args:
            file_path (str): Path to the input file (PDF or image).
            output_dir (str): Directory to save the output.
            include_images (bool): Whether to extract and save images.
            include_headers_footers (bool): Whether to include headers and footers.
            
        Returns:
            Dict[str, Any]: A dictionary containing the processed text (markdown) and metadata.
        """
        file_path_obj = Path(file_path)
        if not file_path_obj.exists():
            raise FileNotFoundError(f"Input file not found: {file_path}")
            
        output_dir_obj = Path(output_dir)
        output_dir_obj.mkdir(parents=True, exist_ok=True)
        
        # Construct the command
        # chandra input.pdf ./output --method hf
        cmd = [
            "chandra",
            str(file_path_obj),
            str(output_dir_obj),
            "--method", self.model_method
        ]
        
        if not include_images:
            cmd.append("--no-images")
        else:
            cmd.append("--include-images")
            
        if include_headers_footers:
            cmd.append("--include-headers-footers")
        else:
            cmd.append("--no-headers-footers")
            
        logger.info(f"Running Chandra OCR: {' '.join(cmd)}")
        
        try:
            # Run the command
            # Note: This assumes 'chandra' is in the PATH. 
            # If running in a venv, it should be available if the package is installed.
            result = subprocess.run(cmd, check=True, capture_output=True, text=True)
            logger.info(f"Chandra OCR completed successfully. Output: {result.stdout}")
        except subprocess.CalledProcessError as e:
            logger.error(f"Chandra OCR failed: {e.stderr}")
            raise RuntimeError(f"Chandra OCR failed: {e.stderr}")
            
        # Read the results
        # According to docs, each processed file creates a subdirectory with the filename
        base_name = file_path_obj.stem
        
        # Check if it created a subdirectory or put files directly (CLI behavior might vary)
        # Based on docs: "Each processed file creates a subdirectory with..."
        result_dir = output_dir_obj / base_name
        
        # Fallback check if it didn't create a subdir (just in case docs are slightly off or version changed)
        if not result_dir.exists():
             # maybe it's directly in output_dir?
             md_file_direct = output_dir_obj / f"{base_name}.md"
             if md_file_direct.exists():
                 result_dir = output_dir_obj

        md_file = result_dir / f"{base_name}.md"
        json_file = result_dir / f"{base_name}_metadata.json"
        
        output_data = {
            "markdown": "",
            "metadata": {},
            "output_path": str(result_dir)
        }
        
        if md_file.exists():
            output_data["markdown"] = md_file.read_text(encoding="utf-8")
        else:
            logger.warning(f"Markdown output not found at {md_file}")
            
        if json_file.exists():
            try:
                output_data["metadata"] = json.loads(json_file.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                logger.warning(f"Failed to parse metadata file: {json_file}")
                
        return output_data
