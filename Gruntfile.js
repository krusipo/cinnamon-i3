module.exports = function(grunt) {
  var globalConfig = {
    pkgver : '0.4.0',
    pkgname : 'cinnamon-i3',
    pkgrev : '1'
  };
  grunt.initConfig({
    globalConfig: globalConfig,
    copy: {
    	debian: {
        files: [
          {
            src: ['src/session/<%= globalConfig.pkgname %>-xsession.desktop'], 
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/xsessions/<%= globalConfig.pkgname %>.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>.session'], 
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/cinnamon-session/sessions/<%= globalConfig.pkgname %>.session'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-app.desktop'], 
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/share/applications/<%= globalConfig.pkgname %>.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>'], 
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/<%= globalConfig.pkgname %>'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-session'], 
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/<%= globalConfig.pkgname %>-session'
          },
          {
            src: ['debian/control'],
            dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/control'
          }
        ]
      },
      aur: {
        files: [
          {
            src: ['src/session/<%= globalConfig.pkgname %>-xsession.desktop'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>-xsession.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>.session'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>.session'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-app.desktop'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>-app.desktop'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>-session'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>-session'
          },
          {
            src: ['src/session/<%= globalConfig.pkgname %>.install'], 
            dest: 'dist/aur/<%= globalConfig.pkgname %>/<%= globalConfig.pkgname %>.install'
          },
          {
            src: ['aur/PKGBUILD'],
            dest: 'dist/aur/<%= globalConfig.pkgname %>/PKGBUILD'
          },
          {
            src: ['README.md'],
            dest: 'dist/aur/<%= globalConfig.pkgname %>/README.md'
          }
        ]
      }
    },
    concat: {
      postinst: {
        src: ['debian/postinst/1.sh', 'src/session/<%= globalConfig.pkgname %>.install', 'debian/postinst/3.sh'],
        dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postinst'
      },
      postrm: {
        src: ['debian/postrm/1.sh', 'src/session/<%= globalConfig.pkgname %>.install', 'debian/postrm/3.sh'],
        dest: 'dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postrm'
      }
    },
    exec: {
      chmod_postrm: {
        cmd: 'chmod 0755 dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postrm',
        stdout: true
      },
      chmod_postinst: {
        cmd: 'chmod 0755 dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/postinst',
        stdout: true
      },
      chmod_control: {
        cmd: 'chmod 0755 dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/DEBIAN/control',
        stdout: true
      },
      chmod_session: {
        cmd: 'chmod 0755 dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/<%= globalConfig.pkgname %>-session',
        stdout: true
      },
      chmod_cinnamon: {
        cmd: 'chmod 0755 dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %>/usr/bin/<%= globalConfig.pkgname %>',
        stdout: true
      },
      dpkg_deb: {
        cmd: 'dpkg-deb --build dist/debian/<%= globalConfig.pkgname %>_<%= globalConfig.pkgver %>-<%= globalConfig.pkgrev %> dist/debian',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', ['copy:debian', 'concat:postinst','concat:postrm','exec:chmod_postinst','exec:chmod_postrm','exec:chmod_control', 'exec:chmod_session','exec:chmod_cinnamon', 'exec:dpkg_deb']);
  grunt.registerTask('debian', ['copy:debian', 'concat:postinst','concat:postrm','exec:chmod_postinst','exec:chmod_postrm','exec:chmod_control', 'exec:chmod_session','exec:chmod_cinnamon', 'exec:dpkg_deb']);
    grunt.registerTask('aur', ['copy:aur']);
};
