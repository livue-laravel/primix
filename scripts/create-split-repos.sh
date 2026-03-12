#!/usr/bin/env bash

set -euo pipefail

ORG="livue-laravel"
VISIBILITY="public"
DRY_RUN=1
ASSUME_YES=0
REPOS_CSV="actions,details,forms,multi-tenant,notifications,panels,support,tables,widgets"

usage() {
    cat <<'EOF'
Create Primix split repositories in a GitHub organization.

Usage:
  scripts/create-split-repos.sh [options]

Options:
  --org <name>            GitHub organization (default: livue-laravel)
  --visibility <value>    public|private|internal (default: public)
  --repos <csv>           Comma-separated repo names
                          (default: actions,details,forms,multi-tenant,notifications,panels,support,tables,widgets)
  --execute               Actually create repositories (default is dry-run)
  --yes                   Skip confirmation prompt when used with --execute
  -h, --help              Show this help

Examples:
  scripts/create-split-repos.sh
  scripts/create-split-repos.sh --execute --yes
  scripts/create-split-repos.sh --org my-org --visibility private --execute
EOF
}

error() {
    echo "Error: $*" >&2
    exit 1
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --org)
            ORG="${2:-}"
            shift 2
            ;;
        --visibility)
            VISIBILITY="${2:-}"
            shift 2
            ;;
        --repos)
            REPOS_CSV="${2:-}"
            shift 2
            ;;
        --execute)
            DRY_RUN=0
            shift
            ;;
        --yes)
            ASSUME_YES=1
            shift
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

if [[ -z "$ORG" ]]; then
    error "--org cannot be empty"
fi

case "$VISIBILITY" in
    public|private|internal) ;;
    *)
        error "--visibility must be one of: public, private, internal"
        ;;
esac

if ! command -v gh >/dev/null 2>&1; then
    error "GitHub CLI (gh) is required but not installed."
fi

if ! gh auth status >/dev/null 2>&1; then
    error "GitHub CLI is not authenticated. Run: gh auth login"
fi

IFS=',' read -r -a REPOS <<< "$REPOS_CSV"
if [[ "${#REPOS[@]}" -eq 0 ]]; then
    error "No repositories provided."
fi

MODE_TEXT="DRY-RUN"
if [[ $DRY_RUN -eq 0 ]]; then
    MODE_TEXT="EXECUTE"
fi

echo "Organization: $ORG"
echo "Visibility:   $VISIBILITY"
echo "Mode:         $MODE_TEXT"
echo "Repositories: ${REPOS_CSV}"
echo

if [[ $DRY_RUN -eq 0 && $ASSUME_YES -eq 0 ]]; then
    read -r -p "Proceed with repository creation in '$ORG'? [y/N] " reply
    if [[ ! "$reply" =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 0
    fi
fi

created=0
skipped=0

for repo in "${REPOS[@]}"; do
    repo="$(echo "$repo" | xargs)"

    if [[ -z "$repo" ]]; then
        continue
    fi

    full_repo="${ORG}/${repo}"

    if gh repo view "$full_repo" >/dev/null 2>&1; then
        echo "SKIP  $full_repo (already exists)"
        ((skipped+=1))
        continue
    fi

    if [[ $DRY_RUN -eq 1 ]]; then
        echo "PLAN  gh repo create $full_repo --$VISIBILITY --disable-wiki --add-readme"
        continue
    fi

    echo "CREATE $full_repo"
    gh repo create "$full_repo" "--$VISIBILITY" \
        --description "Split repository for primix/${repo}" \
        --disable-wiki \
        --add-readme >/dev/null

    default_branch="$(gh api "repos/${full_repo}" --jq '.default_branch')"
    if [[ "$default_branch" != "main" ]]; then
        echo "WARN  $full_repo default branch is '$default_branch' (workflow currently expects 'main')"
    fi

    ((created+=1))
done

echo
if [[ $DRY_RUN -eq 1 ]]; then
    echo "Dry-run completed."
else
    echo "Done. Created: $created, Skipped: $skipped"
    echo "Next: verify GH_ACCESS_TOKEN secret in monorepo and run a tag to trigger split workflow."
fi
