#!/bin/bash

# Chrome拡張機能のビルドスクリプト
# 提出用のzipファイルを作成します

set -e

echo "🔨 Building Chrome Extension..."

# ビルド先ディレクトリ
BUILD_DIR="build"
ZIP_NAME="NewWindowWithoutToolbar.zip"

# 既存のビルドディレクトリを削除
if [ -d "$BUILD_DIR" ]; then
  echo "📁 Cleaning old build directory..."
  rm -rf "$BUILD_DIR"
fi

# ビルドディレクトリを作成
mkdir -p "$BUILD_DIR"

# 必要なファイルをコピー
echo "📋 Copying files..."

# ルートファイル
cp manifest.json "$BUILD_DIR/"
cp background.js "$BUILD_DIR/"
cp options.html "$BUILD_DIR/"
cp options.js "$BUILD_DIR/"

# ディレクトリ
cp -r _locales "$BUILD_DIR/"
cp -r icons "$BUILD_DIR/"

# zipファイルを作成
echo "📦 Creating zip file..."
cd "$BUILD_DIR"
zip -r "../$ZIP_NAME" ./*
cd ..

echo "✅ Build complete!"
echo "📦 Created: $ZIP_NAME"
echo ""
echo "This zip file is ready for submission to Chrome Web Store."
