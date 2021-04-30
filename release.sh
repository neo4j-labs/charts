# bump the version number
# npm version patch

# remove old tgz files
rm -f *.tgz

# build
npm run build

# create the .tgz file
npm pack

# unzip it
tar xvf *.tgz package

# remove it
rm -f *.tgz

# sign the code
npx @neo4j/code-signer --app ./package \
  --private-key ~/.ssh/vendor.neo4j-labs.key.pem \
  --cert ~/.ssh/vendor.neo4j-labs.cert.pem \
  --passphrase $GRAPH_APP_PASSPHRASE

# verify it
npx @neo4j/code-signer --verify \
  --app ./package \
  --root-cert ~/.ssh/neo4j_desktop.cert

# pack it back up again
cd package
npm pack

# move it out of the package folder
mv *.tgz ../

# remove the package folder
cd ../
rm -rf package

# verify it again
tar xvf *.tgz package

npx @neo4j/code-signer --verify \
  --app ./package \
  --root-cert ~/.ssh/neo4j_desktop.cert

npm publish --access public *.tgz

# Deploy to S3
aws s3 sync --acl public-read dist s3://charts.graphapp.io/

# Push to github
git push origin main