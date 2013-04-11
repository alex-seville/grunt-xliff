var    exportLib = require("../lib/exportLib"),
        assert = require("assert");

function normalizeWhitespace(str) {
  return str.replace(/\r\n/g, '\n')
                  .replace(/\r/g, '\n')
                  .replace(/\s+\n/g, '\n')
                  .replace(/\n\s+/g, '\n');
}

var data = {
                        "en": {
                          "This is a test.": "This is a test.",
                          "Hello %%This is a test%%": "Hey %%This is a test%%"
                        },
                        "fr": {
                          "This is a test.": "This is a test.",
                          "Hello %%This is a test%%": "Bonjour %%This is a test%%"
                        }
                      };
var expected = [
  '<?xml version="1.0" encoding="UTF-8"?>\r\n<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\r\n<xliff version="1.0">\r\n  <file source-language="en" target-language="en" datatype="plaintext" original="messages" date="2012-03-05T14:54:29Z" product-name="messages">\r\n  <header/>\r\n    <body>\r\n      <trans-unit id="1">\r\n        <source>This is a test.</source>\r\n        <target>This is a test.</target>\r\n      </trans-unit>\r\n      <trans-unit id="2">\r\n        <source>Hello %%This is a test%%</source>\r\n        <target>Hey %%This is a test%%</target>\r\n      </trans-unit>\r\n\r\n    </body>\r\n  </file>\r\n</xliff>',
  '<?xml version="1.0" encoding="UTF-8"?>\r\n<!DOCTYPE xliff PUBLIC "-//XLIFF//DTD XLIFF//EN" "http://www.oasis-open.org/committees/xliff/documents/xliff.dtd">\r\n<xliff version="1.0">\r\n  <file source-language="en" target-language="fr" datatype="plaintext" original="messages" date="2012-03-05T14:54:29Z" product-name="messages">\r\n  <header/>\r\n    <body>\r\n      <trans-unit id="1">\r\n        <source>This is a test.</source>\r\n        <target>This is a test.</target>\r\n      </trans-unit>\r\n      <trans-unit id="2">\r\n        <source>Hello %%This is a test%%</source>\r\n        <target>Bonjour %%This is a test%%</target>\r\n      </trans-unit>\r\n\r\n    </body>\r\n  </file>\r\n</xliff>'
];

describe('Export json to xliff', function(){
    it('should produce xliff for each json', function(done){
     exportLib({
        translationObj: data,
        callback: function(result){
            assert.equal(result.length,2);
            assert.equal(normalizeWhitespace(result[0]),normalizeWhitespace(expected[0]));
            assert.equal(normalizeWhitespace(result[1]),normalizeWhitespace(expected[1]));
            done();
        }
      });
    });
});
