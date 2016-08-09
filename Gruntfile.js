module.exports = function(grunt) {
  var globalConfig = {
    pkgver : '0.3.0',
    pkgname : 'cinnamon-i3',
    pkgrev : '1'
  };
  grunt.initConfig({
    globalConfig: globalConfig,
    copy: {
    	cinnamoni3: {
        files: [
          {
            src: ['src/session/<%= globalConfig.pkgname %>-xsession.desktop'], 
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/xsessions/<%= globalConfig.pkgname %>.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>.session'], 
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/cinnamon-session/sessions/<%= globalConfig.pkgname %>.session'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-app.desktop'], 
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/applications/<%= globalConfig.pkgname %>.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>'], 
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/<%= globalConfig.pkgname %>'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-session'], 
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/cinnamon-session-i3'
          },
          {
            src: ['debian/control'],
            dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/control'
          }
        ]
      }
    },
    concat: {
      postinst: {
        src: ['debian/postinst/1.sh', '<%= globalConfig.pkgname %>.install', 'debian/postinst/3.sh'],
        dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postinst'
      },
      postrm: {
        src: ['debian/postrm/1.sh', '<%= globalConfig.pkgname %>.install', 'debian/postrm/3.sh'],
        dest: 'dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postrm'
      }
    },
    exec: {
      chmod_postrm: {
        cmd: 'chmod 0755 dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postrm',
        stdout: true
      },
      chmod_postinst: {
        cmd: 'chmod 0755 dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postinst',
        stdout: true
      },
      chmod_control: {
        cmd: 'chmod 0755 dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/control',
        stdout: true
      },
      dpkg_deb: {
        cmd: 'dpkg-deb --build dist/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %> dist/',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['copy:cinnamoni3', 'concat:postinst','concat:postrm','exec:chmod_postinst','exec:chmod_postrm','exec:chmod_control', 'exec:dpkg_deb']);
  //grunt.registerTask('default', ['copy:cinnamoni3', 'concat:postinst']);
};
