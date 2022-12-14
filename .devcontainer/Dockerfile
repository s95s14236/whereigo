# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.234.0/containers/javascript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT="16.16.0-alpine"
FROM --platform=linux/arm64/v8 node:16.16.0-alpine

# [Optional] Uncomment this section to install additional OS packages.
RUN npm install -g firebase-tools
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>
RUN apk update && apk upgrade && \
    apk add --no-cache git

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
