#!/bin/bash
# create-and-push-clients.sh
# Creates GitHub repos if they don't exist, then pushes
# Requires: gh CLI (GitHub CLI) — install: brew install gh
# Run: bash create-and-push-clients.sh
# =====================================================

MONOREPO_ROOT=$(pwd)
COMMIT_MSG="${1:-'feat: production build - chatbot, booking form, bilingual EN/ES, Supabase CRM'}"
GITHUB_USER="gjrob"

echo "🚀 BlueTubeTV — Create Repos + Push All Clients"
echo "================================================="

# Check gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI not installed"
  echo "   Run: brew install gh"
  echo "   Then: gh auth login"
  exit 1
fi

# Check authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ Not logged into GitHub CLI"
  echo "   Run: gh auth login"
  exit 1
fi

echo "✅ GitHub CLI authenticated as $(gh api user --jq .login)"
echo ""

create_and_push() {
  local CLIENT=$1
  local REPO_NAME=$2
  local DIR="$MONOREPO_ROOT/clients/$CLIENT"

  if [ ! -d "$DIR" ]; then
    echo "⚠️  Skipping $CLIENT — directory not found at $DIR"
    return
  fi

  echo "📦 Processing: $CLIENT → github.com/$GITHUB_USER/$REPO_NAME"
  cd "$DIR"

  # Create repo on GitHub if it doesn't exist
  if ! gh repo view "$GITHUB_USER/$REPO_NAME" &> /dev/null; then
    echo "  📝 Creating repo $REPO_NAME..."
    gh repo create "$GITHUB_USER/$REPO_NAME" --private --confirm 2>/dev/null || \
    gh repo create "$REPO_NAME" --private --source=. --remote=origin --push 2>/dev/null || true
    echo "  ✅ Repo created"
  else
    echo "  ✓  Repo already exists"
  fi

  # Init git if needed
  if [ ! -d ".git" ]; then
    git init
    git branch -M main
    echo "  ✅ Git initialized"
  fi

  # Set remote
  REMOTE_URL="git@github.com:$GITHUB_USER/$REPO_NAME.git"
  if git remote | grep -q origin; then
    git remote set-url origin "$REMOTE_URL"
  else
    git remote add origin "$REMOTE_URL"
  fi

  # Create .gitignore if missing
  if [ ! -f ".gitignore" ]; then
    cat > .gitignore << 'EOF'
node_modules/
.next/
.env.local
.env*.local
*.env
.DS_Store
dist/
.vercel/
EOF
    echo "  ✅ .gitignore created"
  fi

  # Stage and commit
  git add -A

  if git diff --cached --quiet; then
    echo "  ✨ No changes to commit"
  else
    git commit -m "$COMMIT_MSG"
    echo "  ✅ Committed"
  fi

  # Push
  git branch -M main
  git push -u origin main --force 2>&1 | tail -3
  echo "  🚀 Pushed: https://github.com/$GITHUB_USER/$REPO_NAME"
  echo ""

  cd "$MONOREPO_ROOT"
}

# =====================================================
# CLIENT → REPO NAME MAPPING
# =====================================================

create_and_push "cellphoneparadise"  "cellphoneparadise"
create_and_push "popcar"             "popcar-auto"
create_and_push "queens"             "queens-mediterranean"
create_and_push "saltcharm"          "saltcharm"
create_and_push "kyoto"              "kyoto-asian-grille"
create_and_push "zoras"              "zoras-seafood"
create_and_push "seabird"            "seabird-restaurant"
create_and_push "1504"               "1504-restobar"

echo "================================================="
echo "✅ Done. All clients pushed."
echo ""
echo "Next steps:"
echo "  1. Deploy each to Vercel:"
echo "     cd clients/cellphoneparadise && vercel --prod"
echo ""
echo "  2. Add Supabase env vars to each Vercel project:"
echo "     vercel env add NEXT_PUBLIC_SUPABASE_URL production"
echo "     vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production"
echo ""
echo "  3. Check repos at: https://github.com/$GITHUB_USER"