import dayjs from 'dayjs';
import { FILE_EXT, FILE_TYPE, FILE_ICON } from '@constants/file';

// 文件相关处理

/**
 * 获取文件类型枚举
 * @param {String} fileType 文件类型
 */
export const getFileType = (filename='') => {
    const arr = filename.split('.');
    if (arr.length > 1) {
        return arr[arr.length - 1];
    }
    return '';
};

/**
 * 判断文件是否为图片
 * @param {String} filename 文件名
 * @param {String} type 文件类型
 */
export const fileIsImage = (filename='', type='') => {
    const fileExt = getFileType(filename);
    return FILE_EXT.image.indexOf(fileExt) > -1 || FILE_TYPE.image.indexOf(type) > -1;
};

/**
 * 获取文件图标（非图片文件）
 * @param {String} filename 文件名
 */
export const fileIcon = (filename='') => {
    let icon = FILE_ICON.file;
    let ext = getFileType(filename);
    for (let key in FILE_EXT) {
        if (FILE_EXT[key].indexOf(ext) > -1) {
            icon = FILE_ICON[key];
            break;
        }
    }
    return icon;
};

/**
 * 获取文件大小
 * @param {Number} number 文件大小
 */
export const fileSize = (number) => {
    let size = number / 1024;
    if (size > 1024) {
        size = size / 1024;
        if (size > 1024) {
            size = size / 1024;
            if (size > 1024) {
                size = size / 1024;
                return `${size.toFixed(2)} TB`;
            } else {
                return `${size.toFixed(2)} GB`;
            }
        } else {
            return `${size.toFixed(2)} MB`;
        }
    } else {
        return `${size.toFixed(2)} KB`;
    }
};

/**
 * 处理七牛数据对象为公共数据结构
 * @param {Object} item 七牛数据对象
 */
export const dealQiniuBucketItem = (item) => {
    const { key, fsize, mimeType, putTime } = item;
    // fsize: 48977
    // hash: "FgdHXtyBbGT6Y_bPlRYtgUfbQ2eC"
    // key: "01dc17593fc245a8012193a3226762.png"
    // mimeType: "image/png"
    // putTime: 15317336572861536
    // status: 0
    // type: 0
    const isImage = fileIsImage(key, mimeType);
    return {
        isImage, // 是否是图片，用户直接展示缩略图
        fileExt: getFileType(key) || '无', // 文件后缀
        name: key, // 内容名称，用于列表显示
        icon: isImage ? '' : fileIcon(key), // 除图片外，文件展示的图标
        size: fileSize(fsize), // 文件大小
        date: dayjs(putTime / 10000).format('YYYY-MM-DD HH:mm:ss'), // 文件最后更新时间
    };
};
