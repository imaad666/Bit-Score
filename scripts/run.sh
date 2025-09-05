#!/bin/zsh
set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/.logs"
mkdir -p "$LOG_DIR"

echo "Starting Bitscore..."

if ! command -v mvn >/dev/null 2>&1; then
  echo "Maven not found. Please install Maven (brew install maven)." >&2
  exit 1
fi

# Prefer Java 21 if available
if [ -x "/opt/homebrew/opt/openjdk@21/bin/java" ]; then
  export JAVA_HOME="/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home"
fi

cd "$ROOT_DIR/backend"
echo "Launching backend on http://localhost:8080 ..."
nohup mvn -q -DskipTests spring-boot:run > "$LOG_DIR/backend.log" 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$LOG_DIR/backend.pid"

cd "$ROOT_DIR"
echo "Installing frontend deps (if needed)..."
npm install --no-fund --no-audit --loglevel=error > "$LOG_DIR/npm-install.log" 2>&1 || true
echo "Launching frontend on http://localhost:3000 ..."
nohup npm start --silent > "$LOG_DIR/frontend.log" 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$LOG_DIR/frontend.pid"

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Logs at $LOG_DIR"
echo "Open http://localhost:3000 (frontend)"
echo "API http://localhost:8080/api/trending (backend)"


