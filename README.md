#grunt-xliff

Grunt task to extract,export and import xliff data to json.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xliff --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xliff');
```

## The "xliff" task

### Overview
In your project's Gruntfile, add a section named `xliff` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xliff: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

-extract (Boolean), used to denote that you want to do an extract of i18n strings
-exportText (Boolean), used to denote that you want to export json to xliff.  Can be combined with `extract:true` to do an automatic extract+export
-importText (Boolean), used to denote that you want to import an xml files and have it parsed to json
-languages (Array), an array of languages in string.


### Usage Examples

#### Default Options
In this example, our html files are contained in 'public' and we want them to be extracted and the xliff files put in 'extracted' to be sent to the client.

```js
grunt.initConfig({
  xliff: {
    options: {
    	extract:true,
    	exportText:true,
    	languages: ["en","fr"]
    },
    files: {
      'extracted//': ['public/*.html']
    },
  },
})
```

In this example, we are importing client xliff files from 'extracted' and importing them into 'public/i18n'.

```js
grunt.initConfig({
  xliff: {
    options: {
    	importText:true
    	languages: ["en","fr"]
    },
    files: {
      'public/i18n/': ['extracted/*.xml']
    },
  },
})
```