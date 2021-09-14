#!/usr/bin/env bash
set -e

replaceOnFile () {
  CURRENT_VALUE=$1
  REPLACE_VALUE=$2
  FILENAME=$3
  echo "Replace ${CURRENT_VALUE} with ${REPLACE_VALUE} on file ${FILENAME}"

  O="${CURRENT_VALUE}" N="${REPLACE_VALUE}" perl -pi -e's/\Q$ENV{O}/$ENV{N}/g' ${FILENAME}
}

if [[ "$(./tools/build/is-a-production-branch.sh)" = "true" ]]; then
  # Get version from package.json
  CURRENT_VERSION_KEY_VALUE=$(cat package.json | grep "\"version\"")

  # Get version from Semantic Release
  SEMANTIC_RELEASE_OUTPUT=$(npx semantic-release --dry-run)
  NEW_VERSION=$(echo "${SEMANTIC_RELEASE_OUTPUT}" | grep "The next release version is" | sed -E 's/.*([0-9]+\.[0-9]+\.[0-9]+)$/\1/')
  NEW_VERSION_KEY_VALUE='  "version": "'${NEW_VERSION}'",'

  if [[ $NEW_VERSION ]]; then
    # Replace package.json version with Semantic Release version
    replaceOnFile "${CURRENT_VERSION_KEY_VALUE}" "${NEW_VERSION_KEY_VALUE}" "package.json"

    echo "Generate new version"
    npm run versiongen
  fi
fi

