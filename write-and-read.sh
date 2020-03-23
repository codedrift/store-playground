#!/bin/bash

STORE_KEY=my-store-key

echo "### WRITE ###"
curl -s -XPOST "http://localhost:8080/store/$STORE_KEY" -H "Content-Type: application/json" -d '{"foo": "bar"}' | jq

echo "### READ ###"
curl -s "http://localhost:8080/store/$STORE_KEY" |  jq