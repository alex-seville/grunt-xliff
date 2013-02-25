module.exports = function(grunt) {

    var extract = require("../lib/extract"),
      exportLib = require("../lib/exportLib"),
        importLib = require("../lib/importLib");

    grunt.registerMultiTask('xliff', 'Xliff tasks', function() {
        var done = this.async();

        var options = this.options({languages: ["en"]});
        grunt.verbose.writeflags(options, 'Options');
      
        
        grunt.util.async.forEachSeries(this.files, function(f, nextFileObj) {
            var files = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                      grunt.log.warn('Source file "' + filepath + '" not found.');
                      return false;
                } else {
                      return true;
                }
            });

            if (files.length === 0) {
                // No src files, goto next target. Warn would have been issued above.
                return nextFileObj();
            }
            var fileContents = files.map(function(filepath){
                return grunt.file.read(filepath);
            });

            var destFile = f.dest,
                result,currLang;

            if (options.extract){
                grunt.log.writeln('xliff extract task.');
                result = extract({
                    templateList: fileContents,
                    languageArray: options.languages
               });
               if (!options.exportText){
                   for(var lang in options.languages){
                     currLang = options.languages[lang];
                     grunt.file.write(destFile+currLang+".json",JSON.stringify(result[currLang],null,'\t'));
                     console.log("Extract file created for",currLang);
                   }        
                   nextFileObj();
               }
            }
            if (options.exportText){
                grunt.log.writeln('xliff export task.');
                if (!result){
                    var parsed = fileContents.map(function(j){
                        return JSON.parse(j);
                    });
                    result = { };
                    for (var k=0;k<parsed.length;k++){
                        result[options.languages[k]] = parsed[k];
                    }
                }
                var langs=Object.keys(result);
                exportLib({
                    translationObj: result,
                    callback: function(xliff){
                        for(var i=0;i<xliff.length;i++){
                            grunt.file.write(destFile+langs[i]+".xml",xliff[i]);
                            console.log("Export file created for",langs[i]);           
                        }
                        nextFileObj();
                    }
                });
  
            }
            if (options.importText){
                grunt.log.writeln('xliff import task.');
                importLib({
                    translationFiles: fileContents,
                    callback: function(json){
                        var keys = Object.keys(json);
                        for(var l =0;l<keys.length;l++ ){
                            currLang = keys[l];
                            grunt.file.write(destFile+currLang+".json",JSON.stringify(json[currLang],null,'\t'));
                        }                    
                        nextFileObj();
                    }
                });              
            }          
        },done);
        
    });

};