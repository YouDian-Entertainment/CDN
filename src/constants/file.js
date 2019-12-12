// 文件类型
export const FILE_TYPE = {
    image: ['image/jpeg', 'image/jpg', 'image/png', 'image/svg'],
    font: ['application/x-font-ttf'],
    code: ['text/javascript'],
    cert: ['application/octet-stream'],
    macApp: ['application/x-apple-diskimage'],
};

// 文件后缀

export const FILE_EXT = {
    // 图片、音频、视频
    image: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'ico'],
    imageFull: ['bmp', 'tif', 'pcx', 'tga', 'exif', 'fpx', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF'],
    audio: ['wav', 'flac', 'ape', 'alac', 'wv', 'cda', 'mp3', 'aac', 'wma', 'ogg'],
    video: ['mkv', 'avi', 'mp4', 'rmvb', 'mov', 'flv', '3gp', 'rm'],
    // code
    md: ['md'],
    js: ['js'],
    ts: ['ts'],
    html: ['html', 'htm'],
    css: ['css'],
    less: ['less'],
    sass: ['sass', 'scss'],
    json: ['json'],
    // 应用程序
    android: ['apk'],
    ios: ['ipa'],
    mac: ['pkg', 'dmg'],
    window: ['exe', 'msi', 'msix'],
    // 文本相关
    word: ['doc', 'docx', 'docm', 'dotx', 'dotm'],
    excel: ['xls', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xlam'],
    ppt: ['ppt', 'pptx', 'pptm', 'ppsx', 'ppsx', 'potx', 'potm', 'ppam'],
    txt: ['txt'],
    // 压缩文件
    compress: ['rar', 'zip', 'gzip', '7z', 'iso', 'img', 'gz', 'jar', 'xar'],
};

export const FILE_ICON = {
    file: require('@assets/icon/file.svg'),
    audio: require('@assets/icon/audio.svg'),
    video: require('@assets/icon/video.svg'),
    // code
    md: require('@assets/icon/md.svg'),
    js: require('@assets/icon/js.svg'),
    ts: require('@assets/icon/ts.svg'),
    html: require('@assets/icon/html.svg'),
    css: require('@assets/icon/css.svg'),
    less: require('@assets/icon/less.svg'),
    sass: require('@assets/icon/sass.svg'),
    json: require('@assets/icon/json.svg'),
    // 应用程序
    android: require('@assets/icon/android.svg'),
    ios: require('@assets/icon/ios.svg'),
    mac: require('@assets/icon/mac.svg'),
    window: require('@assets/icon/window.svg'),
    // 文本相关
    word: require('@assets/icon/word.svg'),
    excel: require('@assets/icon/excel.svg'),
    ppt: require('@assets/icon/ppt.svg'),
    txt: require('@assets/icon/txt.svg'),
    // 压缩文件
    compress: require('@assets/icon/compress.svg'),
};
