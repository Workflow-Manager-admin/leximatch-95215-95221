#!/bin/bash
cd /home/kavia/workspace/code-generation/leximatch-95215-95221/main_container_for_leximatch
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

