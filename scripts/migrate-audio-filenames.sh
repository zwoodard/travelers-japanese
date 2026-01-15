#!/bin/bash
#
# One-time migration: rename audio files from {id}.mp3 to {romaji}.mp3
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
AUDIO_DIR="$PROJECT_ROOT/assets/audio"
PHRASES_FILE="$PROJECT_ROOT/phrases.js"

# Sanitize romaji to create filename
sanitize_filename() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g'
}

echo "Migrating audio files from ID-based to romaji-based naming..."

renamed=0
skipped=0

# Read the file and extract id/romaji pairs
while IFS= read -r line; do
    if [[ $line =~ id:\ *\"([^\"]+)\" ]]; then
        current_id="${BASH_REMATCH[1]}"
    fi

    if [[ $line =~ romaji:\ *\"([^\"]+)\" ]]; then
        current_romaji="${BASH_REMATCH[1]}"

        if [ -n "$current_id" ] && [ -n "$current_romaji" ]; then
            old_file="$AUDIO_DIR/${current_id}.mp3"
            new_filename=$(sanitize_filename "$current_romaji")
            new_file="$AUDIO_DIR/${new_filename}.mp3"

            if [ -f "$old_file" ]; then
                if [ "$old_file" != "$new_file" ]; then
                    mv "$old_file" "$new_file"
                    echo "Renamed: $current_id.mp3 -> $new_filename.mp3"
                    ((renamed++))
                fi
            else
                ((skipped++))
            fi

            current_id=""
            current_romaji=""
        fi
    fi
done < "$PHRASES_FILE"

echo ""
echo "Done! Renamed: $renamed, Skipped (not found): $skipped"
