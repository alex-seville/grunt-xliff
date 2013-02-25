module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
       all: [
          'Gruntfile.js',
          'lib/exportLib.js',
          'lib/extract.js',
          'lib/importLib.js'
        ],
        options: {
          jshintrc: '.jshintrc'
        }
    },
    xliff:{
      extractText:{
        options:{
          extract:true,
          languages: ["en","fr"]
        },
        files: {
          'tmp/extract/': ['example/*.html']
        }
      },
      exportText:{
        options:{
          exportText:true,
           languages:["en","fr"]
        },
        files:{
          'tmp/export/': ['tmp/extract/*.json']
        }
      },
      importText:{
        options:{
          importText:true
        },
        files:{
          'tmp/import/':['example/*.xml']
        }
      },
      extractAndExport:{
        options:{
          extract:true,
          exportText:true,
          languages:["en","fr"]
        },
        files:{
          'tmp/extractAndExport/': ['example/*.html']
        }
      },
      realTest:{
        options:{
          extract:true,
          exportText:true,
          languages:["en","fr"]
        },
        files:{
          'example/real/': ['example/real/*.html']
        }
      },
      realImportTest:{
        options:{
          importText:true,
          languages:["en","fr"]
        },
        files:{
          'example/real/': ['example/real/*.xml']
        }
      }
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('exportForClient', ['xliff:extractAndExport']);
  grunt.registerTask('importFromClient', ['xliff:import']);


};