#!/bin/sh

# for specifying data types for props
npm install --save prop-types

# axios for AJAX requests
npm install axios --save

# for routing
npm install react-router-dom --save

# redux
npm install --save redux react-redux redux-thunk

# material UI
npm install --save @material-ui/core

# for rendering markdown text format
npm install --save markdown-to-jsx

# firebase
npm install --save firebase

# for resize image before upload
npm install --save react-image-file-resizer

# install typescript as some plugins reports missing peer dependency
# npm WARN tsutils@3.20.0 requires a peer of typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta but none is installed. You must install peer dependencies yourself.
npm install --save typescript

# google login button
npm install --save react-google-button

# localization
npm install --save i18next react-i18next

# infinite scroll (pagination)
npm install --save react-infinite-scroll-component