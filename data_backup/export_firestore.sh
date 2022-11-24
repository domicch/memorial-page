#!/bin/sh

# login
gcloud beta auth login

# export firestore from dad-page to react-burger-app
gcloud config set project dad-page
gcloud firestore export gs://dad-page-export --async

# copy export data from asia-east2 to europe-west2
gsutil cp -r gs://dad-page-export/2021-02-13T00:16:11_47688 gs://dad-page-import

# import data
gcloud config set project react-burger-app-d02b2
gcloud firestore import gs://dad-page-import/2021-02-13T00:16:11_47688

# zip the file and download
zip -r data-page-export.zip dad-page-export