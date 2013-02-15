var xliff2json = require("xliff2json"),
    fs = require("fs");

module.exports = function(options){
    if (typeof options === "undefined"){
          throw new Error("You must provide options to the export function.");
    }
    if (typeof options.callback === "undefined" || typeof options.callback !== "function"){
        throw new Error("You must provide a callback function");
    }
    if (typeof options.translationObj === "undefined" || typeof options.translationObj !== "object"){
          throw new Error("You must provide a list for the json translation objects.");
    }
    var xliffs=[];
    var languages = Object.keys(options.translationObj);
    function loop(item){      
        if(item){
           var x = new xliff2json({
                    cleanJSON:true,
                    decorateJSON:true
           });
           x.parseJSON(options.translationObj[item],{destLanguage: item},function(xliff){
                 xliffs.push(xliff);
                 return loop(languages.shift());
            });
        }else{
            options.callback(xliffs);
        }
    }
    loop(languages.shift());
};