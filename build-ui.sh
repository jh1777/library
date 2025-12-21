# `npm login` should be done before running `npm publish`
ng build ui && cd dist/ui && npm pack && npm publish --access public && cd ../..