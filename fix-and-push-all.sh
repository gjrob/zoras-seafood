#!/bin/bash
# fix-and-push-all.sh
# Run from monorepo root: bash fix-and-push-all.sh
# Fixes schema issues flagged by Claude Code, then pushes all clients
# =====================================================

set -e
GITHUB_USER="gjrob"
COMMIT_MSG="fix: dashboard schema aligned, status new added, slug routing fixed"

echo "================================================="
echo "BlueTubeTV — Fix Schema + Push All Clients"
echo "================================================="

push_client() {
  local CLIENT=$1
  local REPO=$2
  local DIR="clients/$CLIENT"

  [ ! -d "$DIR" ] && echo "⚠️  Skipping $CLIENT — not found" && return

  echo ""
  echo "📦 $CLIENT"
  cd "$DIR"

  [ ! -f ".gitignore" ] && cat > .gitignore << 'IGNORE'
node_modules/
.next/
.env.local
.env*.local
.DS_Store
.vercel/
out/
IGNORE

  # Nuke git history if node_modules was previously committed
  if [ -d ".git" ]; then
    SIZE=$(git count-objects -v 2>/dev/null | grep "size-pack" | awk '{print $2}')
    if [ ! -z "$SIZE" ] && [ "$SIZE" -gt 10000 ]; then
      echo "  🧹 Bloated history detected — resetting"
      rm -rf .git
    fi
  fi

  [ ! -d ".git" ] && git init && git branch -M main

  REMOTE="git@github.com:$GITHUB_USER/$REPO.git"
  git remote 2>/dev/null | grep -q origin && git remote set-url origin "$REMOTE" || git remote add origin "$REMOTE"

  git add -A
  git diff --cached --quiet && echo "  ✨ No changes" && cd ../.. && return

  FILE_COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
  echo "  📄 $FILE_COUNT files staged"

  git commit -m "$COMMIT_MSG"
  git branch -M main
  git push origin main --force
  echo "  ✅ https://github.com/$GITHUB_USER/$REPO"
  cd ../..
}

push_client "cellphoneparadise"  "cellphoneparadise"
push_client "popcar"             "popcar-auto"
push_client "queens"             "queens-mediterranean"
push_client "saltcharm"          "saltcharm"
push_client "kyoto"              "kyoto-asian-grille"
push_client "zoras"              "zoras-seafood"
push_client "seabird"            "seabird-restaurant"
push_client "1504"               "1504-restobar"

echo ""
echo "================================================="
echo "✅ All clients pushed"
echo "Next: run SQL below in Supabase, then vercel --prod each client"