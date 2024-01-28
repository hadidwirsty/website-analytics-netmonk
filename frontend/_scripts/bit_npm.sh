# !/bin/sh

BIT_TOKEN=eb2c6821-9359-42af-8bff-cc07f2a6d750

> .npmrc
echo "Adding bit.cloud to npm registry"
echo "always-auth=true" >> .npmrc
echo "@netmonk:registry=https://node.bit.cloud" >> .npmrc
echo "//node.bit.cloud/:_authToken=$BIT_TOKEN" >> .npmrc
echo "Completed adding bit.cloud to npm registry"