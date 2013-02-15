var    extract = require("../lib/extract"),
        assert = require("assert");

var expected = {
                        "en": {"This is a test.": "This is a test."},
                        "fr": {"This is a test.": "This is a test."}
                      };

describe('Extract json from template', function(){
    it('should produce a json object for each language', function(){
     var result = extract({
        templateList: ["<p>{{ I18n 'This is a test.' }}</p>"],
        languageArray: ["en","fr"]
      });
     assert.equal(JSON.stringify(result),JSON.stringify(expected));
    });
});
