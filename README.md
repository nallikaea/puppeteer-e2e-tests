# puppeteer-api-typescript-examples
This repo contains examples of how to create page objects and tests using [puppeteer](https://github.com/GoogleChrome/puppeteer) and TypeScript. The application under test is tourdedave's "[the-internet](https://github.com/tourdedave/the-internet)" project which contains examples of hard to automate pages. The test framework is [mocha](https://mochajs.org/). 

# Dependencies
* Node.js version 8 or greater

# Test execution
To run the tests, execute ```npm install```, ```npm run build``` then ```npm test```.

# Run single spec file without transpiling
```
./node_modules/.bin/mocha --timeout 10000 --require ts-node/register <spec_file>.ts
./node_modules/.bin/mocha --timeout 10000 --require ts-node/register src/tests/brokenimages.spec.ts
```
