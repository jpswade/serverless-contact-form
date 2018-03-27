#!/usr/bin/env bash
FROM=$(cat config.json | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["from"]')
TO=$(cat config.json | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["to"]')
aws ses verify-email-identity --email-address ${TO}
aws ses verify-email-identity --email-address ${FROM}
# EOF