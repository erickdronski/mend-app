#!/bin/bash
# Re-dispatches the TestFlight workflow every 20 minutes until a run actually
# starts (billing-refused runs die in <60s and cost nothing). Stops the moment
# a run is queued/running/succeeded, or after 18 attempts (~6 hours).
cd "$(dirname "$0")/.." || exit 1

for i in $(seq 1 18); do
  STATUS=$(gh run list --workflow=testflight.yml --limit 1 --json status,conclusion --jq '.[0] | .status + ":" + (.conclusion // "none")')
  case "$STATUS" in
    queued:*|in_progress:*)
      echo "RUN STARTED (attempt $i): $STATUS — watching"
      gh run watch "$(gh run list --workflow=testflight.yml --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
      echo "FINAL: $?"
      exit 0
      ;;
    completed:success)
      echo "ALREADY SUCCEEDED"
      exit 0
      ;;
  esac
  echo "attempt $i: dispatching (last: $STATUS)"
  gh workflow run testflight.yml
  sleep 60
  S2=$(gh run list --workflow=testflight.yml --limit 1 --json status,conclusion --jq '.[0] | .status + ":" + (.conclusion // "none")')
  if [[ "$S2" == queued:* || "$S2" == in_progress:* ]]; then
    echo "RUN STARTED (attempt $i): $S2 — watching"
    gh run watch "$(gh run list --workflow=testflight.yml --limit 1 --json databaseId --jq '.[0].databaseId')" --exit-status
    echo "FINAL: $?"
    exit 0
  fi
  sleep 1140
done
echo "GAVE UP after 18 attempts (~6h) — billing still blocking"
exit 3
