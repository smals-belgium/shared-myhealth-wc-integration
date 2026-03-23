# Migration guides

## Migrate v5 to v6

### Change the package name

The 'scope' of the package name has changed from `@smals-belgium` to `@smals-belgium-shared`,
so make sure to replace the package entirely. You will not be able to upgrade the existing one.

```shell
$ npm uninstall @smals-belgium/myhealth-wc-integration
$ npm install @smals-belgium-shared/myhealth-wc-integration
```

### Adjust existing print events

This only applies if you were using the `print` event prior to v6.

The `print` event as it was defined since v4 was ambiguous with respect to the usage of base64 encoded content.
In v6, as we are adding more similar document handling capabilities, we're taking the opportunity to remove this
ambiguity and align the `print` event with the new `download`, `share` and `view` events.

* If you were using the `PrintMimeType` type, rename this to the more generic `DocumentMimeType`
* If you were using `PrintMimeType.BASE64`, replace it with the actual mime type of the document you're sending to 
the host. Your document content can now be sent as a `Blob`. If you must send it as a string there are two options:
  - if it's a text-based file type, send the text content as-is; supported file types are
    - plain text (`text/plain`)
    - html (`text/html`)
    - svg images (`image/svg+xml`)
  - it's a binary file type: send as a base64 encoded string (not a URL format)

Alternatively, the host can also access your documents directly from your server if you provide a `url` property
instead of `content`. Note that in this case, the mime type must provided as a response header.
