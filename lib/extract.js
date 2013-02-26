var xliff2json = require("xliff2json"),
    handlebars = require("handlebars"),
    i18n = require("i18n"),
    fs = require("fs");

module.exports = function(options){
    if (typeof options === "undefined"){
        throw new Error("You must provide options to the extract function.");
    }
    if (typeof options.templateList === "undefined" || !options.templateList instanceof Array){
        throw new Error("You must provide a filelist for the templates, or a string template.");
    }
    options.languageArray = options.languageArray || ["en"];
    options.translations = options.translations || {"en": {}};
    //Set up i18n configs
    i18n.configure({
        locales:options.languageArray,
        //register: global,
        updateFiles: false,
        extension: options.extension || '.json',
        readFcn: function(language){
            return options.translations[language] || options.translations["en"] || options.translations;
        },
        writeFcn: function(locale,data){
            options.translations[locale] = data;
        }
    });

    var handlebarsTemplates = [];
    
    //find the templatelist or the string
   
    for (var i=0;i<options.templateList.length;i++){
        handlebarsTemplates.push(
            handlebars.compile(
                options.templateList[i]
            )
        );
    }
    
    var translations = {};
    
    handlebars.registerHelper('I18n',
      function(str){
        var transStr =  (i18n !== undefined ? i18n.__(str) : str);
        translations[i18n.getLocale()][str] = transStr;
        return transStr;
      }
    );
    handlebars.registerHelper('I18ns',
      function(str){
        
        var transStr = str;// (i18n !== undefined ? i18n.__.apply(this,arguments) : str);

        translations[i18n.getLocale()][str] = transStr;
        return transStr;
        
       
      }
    );
    handlebars.registerHelper('I18np',
      function(str){
        
        var transStr = str;// (i18n !== undefined ? i18n.__n.apply(this,arguments) : str);

        translations[i18n.getLocale()][str] = transStr;
        return transStr;
        
      
      }
    );

    //now we apply the template so that i18n can generate the files
    for(var j=0;j<options.languageArray.length;j++){
        var currLang = options.languageArray[j];
        translations[currLang] = {};
        i18n.setLocale(currLang);
        for(var k=0;k<handlebarsTemplates.length;k++){
            //we don't need to keep this result
            var result = handlebarsTemplates[k](options.translations[currLang]);
            
        }
    }
    return translations;
};