# Browser Extensions Library

## Building

### Pre-requisites

- Webpack/Brunch (`npm install -g webpack@3.11.0 brunch`)
- Configuring npm account setting

### Build

```bash
npm start
```

## Test
```bash
npm test
```

### General npm configuration with auth token for npmjs

Use a project-specific .npmrc file with a variable for your token to securely authenticate your CI/CD server with npm.

In the root directory of your project, create a custom .npmrc file with the following contents:

```bash
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
```

Check in the .npmrc file.

or npm login with the `fillrscraper` account on bitwarden.

### Uploading npm packages on npmjs

you can simply run the default npm publish command:

```bash
./publish.sh
```

Check the latest package on npmjs: https://www.npmjs.com/settings/fillr_letspop/packages

### License

[Copyright (c) 2015-present Pop Tech Pty Ltd.](LICENSE)