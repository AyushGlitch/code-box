#!/bin/sh

# Install Go
GO_VERSION="1.21.6"  # Update this to the version you need

apk add --no-cache wget

wget https://golang.org/dl/go${GO_VERSION}.linux-amd64.tar.gz
tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz
rm go${GO_VERSION}.linux-amd64.tar.gz

# Set up Go environment variables
export PATH=$PATH:/usr/local/go/bin
export GOPATH=/go
export PATH=$PATH:$GOPATH/bin

# Add environment variables to profile
echo "export PATH=\$PATH:/usr/local/go/bin" >> /etc/profile
echo "export GOPATH=/go" >> /etc/profile
echo "export PATH=\$PATH:\$GOPATH/bin" >> /etc/profile

# Verify Go installation
go version

echo "Go installation completed."
