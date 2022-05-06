'use strict';

test(() => {
  assert_throws_js(
      TypeError,
      () => navigator.mediaDevices.setCaptureHandleConfig(
          {handle: 'X'.repeat(1025)}),
      'handle length must be 1024 characters or less');
}, 'setCaptureHandleConfig raises TypeError if handle is invalid.');

test(() => {
  assert_throws_dom(
      'NotSupportedError',
      () => navigator.mediaDevices.setCaptureHandleConfig(
          {permittedOrigins: ['*', '*']}),
      'asterisk character is allowed only once');

  assert_throws_dom(
      'NotSupportedError',
      () => navigator.mediaDevices.setCaptureHandleConfig(
          {permittedOrigins: ['http://example.com', 'about://blank']}),
      'all origins must be valid');
}, 'setCaptureHandleConfig raises NotSupportedError if permittedOrigins is invalid.');


test(() => {
  const iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  const mediaDevices = iframe.contentWindow.navigator.mediaDevices;
  const iframeDOMException = iframe.contentWindow.DOMException;

  assert_throws_dom('InvalidStateError', iframeDOMException, () => {
    mediaDevices.setCaptureHandleConfig();
  });
}, 'setCaptureHandleConfig raises InvalidStateError if not from top-level browsing context.');