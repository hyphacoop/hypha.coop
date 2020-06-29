#! /bin/bash
#
# Deploy the website to production.
#
# Usage:
#
#     ./deploy.sh [[[[ <ssh user> ] <ssh identity file> ] <server host> ] <ssh port> ]
#
#
USER="${1:-hyphacoop}"
IDENTITY_FILE="${2:-_scripts/id_rsa}"
SERVER="${3:-hypha.coop}"
PORT="${4:-22}"
SITE_DIR="${5:-/var/www/html}"

# This is done to skip the fingerprint check on new connection
# - Skip the host fingerprint check
# - Don't save the fingerprint to known_hosts
rsync -v -r \
  --delete-after \
  -e "ssh -i $IDENTITY_FILE -o StrictHostKeyChecking=no -p $PORT" \
  ./* $USER@$SERVER:$SITE_DIR