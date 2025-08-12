#!/bin/bash

# Ambil path asli skrip ini
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
PORT=7100

# Cek apakah http-server sudah terinstall
if ! command -v http-server &> /dev/null
then
    echo "❌ http-server tidak ditemukan. Menginstall secara global..."
    npm install -g http-server
fi

# Jalankan server
echo "🚀 Menjalankan Frontend CatatanApp di port $PORT..."
cd "$FRONTEND_DIR" || { echo "❌ Folder frontend tidak ditemukan!"; exit 1; }
http-server -p $PORT
