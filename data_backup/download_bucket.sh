#!/bin/sh
gcloud config set project dad-page
gsutil cp -r gs://dad-page.appspot.com .

