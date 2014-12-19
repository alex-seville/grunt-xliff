var xliff2json = require("xliff2json"),
    handlebars = require("handlebars"),
    i18n = require("i18n"),
    fs = require("fs"),
       _ = require("underscore");

module.exports = function(options){
    if (typeof options === "undefined"){
        throw new Error("You must provide options to the extract function.");
    }
    if (typeof options.templateList === "undefined" || !options.templateList instanceof Array){
        throw new Error("You must provide a filelist for the templates, or a string template.");
    }
    options.languageArray = options.languageArray || ["en"];
    options.translations = _.extend(options.translations || {"en": {}},options.extra);
    //Set up i18n configs
    i18n.configure({
        locales:options.languageArray,
        //register: global,
        updateFiles: false,
        extract:true,
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
        for (var k = 0; k < options.templateList.length; k++) {
            // parse I18n string from each Handlebars template
            var template = options.templateList[k],
                i18nPat = /\{\{\s*I18n\s+(['"])(.+?)([^\\])\1/gm,
                match = template.match(i18nPat),
                m,
                str,
                transStr;
            if (match) {
                while (match.length > 0) {
                    m = new RegExp(i18nPat.source).exec(match.pop());
                    if (m) {
                        str = m.splice(2).join('');
                        transStr = (i18n !== undefined ? i18n.__(str) : str);
                        translations[currLang][str] = transStr;
                    }
                }
            }
        }
    }
    return translations;
};