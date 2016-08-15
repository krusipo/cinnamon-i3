# cinnamon-i3

i3 as window manager for cinnamon sessions

Features:

Use Cinnamon desktop enviroment and replace muffin with i3 as window manager.

* bindings for fn-keys such as brightness, volume network from cinnamon.
* notifications from cinnamon
* improved look and feel of applications 
* screensaver from cinnamon
* Control system settings from cinnamon

Note: i3 replace cinnamon panels, desklets, applets etc.

Packages:

| distro        | package       |
| ------------- |:-------------:|
| debian        | [cinnamon-i3_{$version}_amd64.deb](https://github.com/krusipo/cinnamon-i3/releases/latest) |


Build from source:

    grunt [task]
        debian              Build debian package to dist/debian
        aur                 Build aur package to dist/aur

Install Debian Package

    sudo dpkg -i {$path_to_package}/cinnamon-i3_{$version}_amd64.deb;
    sudo apt-get -f install; 
    
    or

    sudo gdebi {$path_to_package}/cinnamon-i3_{$version}_amd64.deb;

Bindings for i3 config

    # exit i3 (logs you out of your X session)
    bindsym $mod+Shift+e exec cinnamon-session-quit --logout

    # unofficial binding suggestions

    bindsym $mod+Shift+h exec cinnamon-session-quit --power-off
    bindsym $mod+Shift+l exec cinnamon-screensaver-command -l

forked from https://github.com/Gigadoc2/i3-cinnamon
