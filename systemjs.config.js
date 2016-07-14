(function(global) {

    // map tells the System loader where to look for things
    var map = {
        'app':                        'dist/tmp/app/',
        'rxjs':                       'node_modules/rxjs',
        '@angular':                   'node_modules/@angular',
        '@ngrx':                      'node_modules/@ngrx'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' },
        '@ngrx/core':                 { main: 'index.js', defaultExtension: 'js' },
        '@ngrx/store':                { main: 'index.js', defaultExtension: 'js' },
        '@ngrx/store-devtools':       { main: 'index.js', defaultExtension: 'js' },
        '@ngrx/store-log-monitor':    { main: 'index.js', defaultExtension: 'js' },
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/router',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);
