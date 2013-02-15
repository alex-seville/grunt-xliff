var xliff2json = require("xliff2json"),
    fs = require("fs");

module.exports = function(options){
    if (typeof options === "undefined"){
          throw new Error("You must provide options to the import function.");
    }
    if (typeof options.callback === "undefined" || typeof options.callback !== "function"){
        throw new Error("You must provide a callback function");
    }
    if (typeof options.translationFiles === "undefined" || !options.translationFiles instanceof Array){
          throw new Error("You must provide a list for the xliff translation files.");
    }
    var jsonFiles={};
    function loop(item){
        if(item){
           var x = new xliff2json({
                cleanJSON:true,
                decorateJSON:true
           });
           x.parseXliff(item,{ languageHeader:true },function(json){
                 var lang = Object.keys(json)[0];
                 jsonFiles[lang] = json[lang];
                 loop(options.translationFiles.shift());
            });
        }else{
            options.callback(jsonFiles);
        }
    }
    loop(options.translationFiles.shift());
};