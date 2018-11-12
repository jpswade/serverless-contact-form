# Serverless Contact Form (using AWS Lambda) by [James Wade](https://wade.be/)

...because I didn't want to run an entire server just to send some emails from a simple static website.

## Preface

This a "proof of concept" and probably not considered "ready for prime time" yet.

I want to see if it was possible, the good news is, it is, the bad news is, you'll likely want to handle bots and spam.

Perhaps consider this a place to start.

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

## Also see

* [Serverless Framework](https://serverless.com/)