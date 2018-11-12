# Serverless Contact Form (using AWS Lambda)

by [James Wade](https://twitter.com/jpswade)

...because I didn't want to run an entire server just to send some emails from a simple static website.

## About

It's a simple serverless solution that uses AWS Lambda functions to handle POST requests coming from a contact form on your static website (ie: Hosted on S3/Cloudfront).

It uses Amazon kSES to send the emails.

It's based on [Lambda-Contact by Jason Pope](https://github.com/cowholio4/lambda-contact-form).

## Preface

This a "proof of concept" and probably not considered "ready for prime time" yet.

I want to see if it was possible, the good news is, it is, the bad news is, you'll likely want to handle bots and spam.

Consider this as a place to start.

## Getting started

### Install

You'll need the [serverless framework](https://serverless.com/):

`brew install severless`

2. This will install the node modules needed:

`npm install`

3. Rename "config.json.example" to "config.json" and set your configurations.

`cp config.json.example config.json`

### Run

```
Lifecycle scripts included in serverless-contact-form:
  test
    sh test.sh

available via `npm run-script`:
  offline
    AWS_REGION=eu-west-1 sls offline start --stage dev
  deploy
    sls deploy
```

### Test

Run `npm run offline`, then use `test.sh` or `example.html` to test it works.

## Roadmap

- Spam protection
- Improve data handling
