var    importLib = require("../lib/importLib"),
        assert = require("assert");

function normalizeWhitespace(str) {
  return str.replace(/\r\n/g, '\n')
                  .replace(/\r/g, '\n')
                  .replace(/\s+\n/g, '\n')
                  .replace(/\n\s+/g, '\n');
}

var data = [
  '<?xml version="1.0" encoding="UTF-8"?>\r\n<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\r\n<xliff version="1.0">\r\n  <file source-language="en" target-language="en" datatype="plaintext" original="messages" date="2012-03-05T14:54:29Z" product-name="messages">\r\n  <header/>\r\n    <body>\r\n      <trans-unit id="1">\r\n        <source>This is a test.</source>\r\n        <target>This is a test.</target>\r\n      </trans-unit>\r\n      \r\n    </body>\r\n  </file>\r\n</xliff>',
  '<?xml version="1.0" encoding="UTF-8"?>\r\n<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\r\n<xliff version="1.0">\r\n  <file source-language="en" target-language="fr" datatype="plaintext" original="messages" date="2012-03-05T14:54:29Z" product-name="messages">\r\n  <header/>\r\n    <body>\r\n      <trans-unit id="1">\r\n        <source>This is a test.</source>\r\n        <target>This is a test.</target>\r\n      </trans-unit>\r\n      \r\n    </body>\r\n  </file>\r\n</xliff>'
];

var expected = {
                        "en": {"This is a test.": "This is a test."},
                        "fr": {"This is a test.": "This is a test."}
                      };

describe('Import xliff to json', function(){
    it('should produce json for each xliff', function(done){
     importLib({
        translationFiles: data,
        callback: function(result){
            assert.equal(JSON.stringify(result),JSON.stringify(expected));
            done();
        }
      });
    });
});
