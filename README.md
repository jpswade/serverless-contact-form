# Lambda Contact Form (Serverless)

...because I didn't want to run an entire server just to send some emails from a simple static website.

## Getting started

### Installing

This will install the node modules needed:

`npm install`

### Running

```
Lifecycle scripts included in lamdba-contact-form:
  test
    sh test.sh

available via `npm run-script`:
  offline
    AWS_REGION=eu-west-1 sls offline start --stage dev
  build
    sh build.sh
  deploy
    sls deploy
```
