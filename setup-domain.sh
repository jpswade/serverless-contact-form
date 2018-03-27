#!/usr/bin/env bash
DOMAIN=$(cat config.json | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["domain"]')
[[ -f verify-domain-identity.json ]] || aws ses verify-domain-identity --domain ${DOMAIN}>verify-domain-identity.json
VerificationToken=$(cat verify-domain-identity.json | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["VerificationToken"]')
TXT=$(cat amazonses-txt.json)
# @see https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/ResourceRecordTypes.html#TXTFormat
printf -v CHANGE_BATCH "${TXT}" ${DOMAIN} "\\\"${VerificationToken}\\\""
printf -v query_expr "HostedZones[?Name == '%s.'].[Id]" ${DOMAIN}
ZONE_ID=$( aws route53 list-hosted-zones --query "${query_expr}" --output=text |cut -d'/' -f3)
aws route53 change-resource-record-sets --hosted-zone-id "${ZONE_ID}" --change-batch "${CHANGE_BATCH}">change.json
cat change.json
#EOF