#!/bin/bash
#
# Generate Japanese audio files using Google Cloud TTS Chirp3-HD
#
# Setup:
#   1. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
#   2. Authenticate: gcloud auth application-default login
#   3. Enable Text-to-Speech API in your Google Cloud project
#
# Usage:
#   ./scripts/generate-audio.sh YOUR_PROJECT_ID
#
# Example:
#   ./scripts/generate-audio.sh my-gcp-project
#
# The script will:
#   - Generate MP3 files for all phrases in phrases.js
#   - Save them to assets/audio/{romaji}.mp3 (lowercase, hyphenated)
#   - Skip any files that already exist (safe to re-run)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
AUDIO_DIR="$PROJECT_ROOT/assets/audio"
PHRASES_FILE="$PROJECT_ROOT/phrases.js"

# Chirp3-HD voice for Japanese (high quality, natural sounding)
VOICE_NAME="ja-JP-Chirp3-HD-Aoede"
LANGUAGE_CODE="ja-JP"

# Get project ID from argument, env var, or gcloud config
QUOTA_PROJECT="${1:-${GOOGLE_CLOUD_PROJECT:-$(gcloud config get-value project 2>/dev/null)}}"
if [ -z "$QUOTA_PROJECT" ]; then
    echo "Error: No project ID found."
    echo "Usage: ./scripts/generate-audio.sh PROJECT_ID"
    exit 1
fi
echo "Using project: $QUOTA_PROJECT"

# Create audio directory if it doesn't exist
mkdir -p "$AUDIO_DIR"

# Check for gcloud authentication
if ! command -v gcloud &> /dev/null; then
    echo "Error: gcloud CLI not found."
    echo "Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

if ! gcloud auth application-default print-access-token &> /dev/null 2>&1; then
    echo "Error: Not authenticated."
    echo "Run: gcloud auth application-default login"
    exit 1
fi

echo "Authenticated with gcloud"

# Function to call Google TTS API
synthesize_speech() {
    local text="$1"
    local output_file="$2"

    local request_body=$(cat <<EOF
{
  "input": {
    "text": "$text"
  },
  "voice": {
    "languageCode": "$LANGUAGE_CODE",
    "name": "$VOICE_NAME"
  },
  "audioConfig": {
    "audioEncoding": "MP3",
    "speakingRate": 0.9
  }
}
EOF
)

    local access_token=$(gcloud auth application-default print-access-token)
    local response=$(curl -s -X POST \
        "https://texttospeech.googleapis.com/v1/text:synthesize" \
        -H "Authorization: Bearer $access_token" \
        -H "Content-Type: application/json" \
        -H "x-goog-user-project: $QUOTA_PROJECT" \
        -d "$request_body")

    # Check for errors
    if echo "$response" | grep -q '"error"'; then
        echo "Error from API: $response"
        return 1
    fi

    # Extract audio content and decode base64
    echo "$response" | grep -o '"audioContent": *"[^"]*"' | sed 's/"audioContent": *"//' | sed 's/"$//' | base64 -d > "$output_file"
}

# Sanitize romaji to create filename: lowercase, spaces to hyphens, remove special chars
sanitize_filename() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g'
}

# Extract phrases from phrases.js and generate audio
echo "Extracting phrases from $PHRASES_FILE..."

phrase_count=0
generated_count=0
skipped_count=0

# Read the file and extract phrase blocks
while IFS= read -r line; do
    # Look for japanese field
    if [[ $line =~ japanese:\ *\"([^\"]+)\" ]]; then
        current_japanese="${BASH_REMATCH[1]}"
    fi

    # Look for romaji field
    if [[ $line =~ romaji:\ *\"([^\"]+)\" ]]; then
        current_romaji="${BASH_REMATCH[1]}"

        if [ -n "$current_japanese" ] && [ -n "$current_romaji" ]; then
            filename=$(sanitize_filename "$current_romaji")
            output_file="$AUDIO_DIR/${filename}.mp3"
            ((phrase_count++))

            if [ -f "$output_file" ]; then
                echo "[$phrase_count] Skipping $filename (already exists)"
                ((skipped_count++))
            else
                echo "[$phrase_count] Generating $filename: $current_japanese"
                if synthesize_speech "$current_japanese" "$output_file"; then
                    ((generated_count++))
                else
                    echo "  Failed to generate audio for $filename"
                fi
                # Small delay to avoid rate limiting
                sleep 0.1
            fi

            # Reset for next phrase
            current_japanese=""
            current_romaji=""
        fi
    fi
done < "$PHRASES_FILE"

echo ""
echo "Done!"
echo "  Total phrases: $phrase_count"
echo "  Generated: $generated_count"
echo "  Skipped (existing): $skipped_count"
