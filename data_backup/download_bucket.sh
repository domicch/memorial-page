#!/bin/sh
gcloud config set project dad-page
# firestore
gsutil cp -r gs://dad-page.appspot.com .
# zip the file and download
zip -r dad-page.appspot.com.zip dad-page.appspot.com