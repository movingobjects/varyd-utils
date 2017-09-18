
import * as text from "./text";

export function xhrFetch(path, body = null) {

  return new Promise(function(resolve, reject) {

    const xhr = new XMLHttpRequest();

    xhr.onload = function(data) {

      // Successful local files will not return 200 OK status,
      // but they will hit the onerror handler if they fail,
      // so we don't need to check their status

      const statusOK  = (xhr.status === 200),
            isLocal   = text.beginsWith(xhr.responseURL, 'file:');

      if (statusOK || isLocal) {
        resolve(new Response(xhr.responseText));
      } else {
        reject(new TypeError('Problem loading: ' + path));
      }

    }
    xhr.onerror = function(data) {
      reject(new TypeError('Problem loading: ' + path));
    }

    xhr.open('GET', path);
    xhr.send(body);

  });

}
