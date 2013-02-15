var    extract = require("../lib/extract"),
     exportLib = require("../lib/exportLib"),
     importLib = require("../lib/importLib");

//Here we simulate the dev creating the template
var xtest = extract({
	templateList: ["<p>{{ I18n 'This is a test.' }}</p>"],
	languageArray: ["en","fr"]
});

console.log("Extract:",xtest);

//now we want to export it for the client
var expTest = exportLib({
	translationObj: xtest,
	callback: function(result){
		console.log("\n\n\nExport:",result);
		//now we simulate the client changing the translation file
		result[1] = result[1].replace("<target>This is a test.</target>","<target>Ceci est un teste</target>");
		//we feed the update file into the importer
		var impTest = importLib({
			translationFiles: result,
			callback: function(json){
				console.log("\n\n\nImport:",json);
				//now let's do a final simulation of the dev adding more content to the returned translations
				var xtest2 = extract({
					templateList: ["<p>{{ I18n 'This is a test.' }}</p><p>{{ I18n 'This is added after the import' }}</p>"],
					languageArray: ["en","fr"],
					translations: json
				});

				console.log("\n\n\nSecond Extract:",xtest2);
			}
		});
	}
});



