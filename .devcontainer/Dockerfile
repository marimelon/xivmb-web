FROM ubuntu:20.04

WORKDIR /work

ENV NVM_DIR="/usr/local/share/nvm"
ENV NODE_VERSIO=16.16.0 \
    NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}
COPY library-scripts/node-debian.sh /tmp/library-scripts/
RUN apt-get update && bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}"
