# Node.js v20（Debianベース、Linux x86用）
FROM node:20

# 作業ディレクトリ
WORKDIR /app

# 必要最低限のツールのみインストール
# - curl: AWS CLIのZIPをダウンロード
# - unzip: ZIPを展開
# - ca-certificates: HTTPS通信に必要
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl unzip ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# AWS CLI v2（Linux x86_64用）を公式手順でインストール
# コンテナのアーキに合わせて AWS CLI を入れる（マルチアーキ対応）
# ARMコンテナなら aarch64 用、x86コンテナなら x86_64 用を落とす。
ARG TARGETARCH
RUN set -eux; \
    if [ "$TARGETARCH" = "amd64" ]; then ARCH="x86_64"; \
    elif [ "$TARGETARCH" = "arm64" ]; then ARCH="aarch64"; \
    else echo "Unsupported arch: $TARGETARCH" && exit 1; fi; \
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-${ARCH}.zip" -o "awscliv2.zip"; \
    unzip -q awscliv2.zip; \
    ./aws/install; \
    rm -rf aws awscliv2.zip

# AWS CDK CLI と TypeScript開発に必要なツールをインストール
RUN npm install -g aws-cdk typescript ts-node

# 対話作業用
CMD ["/bin/bash"]