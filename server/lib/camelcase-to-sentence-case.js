'use strict';

// TODO: Add unit test for this helper
export default function (string) {
  return 
    // insert a space before all caps
    string.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function (str) { return str.toUpperCase(); })
}