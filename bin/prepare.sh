#!/bin/bash

next_version=$1

function update_json() {
  new_json="$(jq -r '.version = "'$next_version'"' $path)"
  echo "$new_json" >$path
}

path='package.json'

update_json

path='src/manifest.json'

update_json
