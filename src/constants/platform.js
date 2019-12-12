import qiniuLogo from '@assets/logo/qiniu.svg';
import aliyunLogo from '@assets/logo/aliyun.svg';
import tencentLogo from '@assets/logo/tencent.svg';
import qingyunLogo from '@assets/logo/qingyun.svg';
import youpaiLogo from '@assets/logo/youpaiyun.svg';

export const PLATFORM_KEY_MAP = {
    qiniu: 'qiniu',
    aliyun: 'aliyun',
    tencent: 'tencent',
    qingyun: 'qingyun',
    youpai: 'youpai',
};

export const PLATFORM_VALUE = {
    [PLATFORM_KEY_MAP.qiniu]: '七牛云',
    [PLATFORM_KEY_MAP.aliyun]: '阿里云',
    [PLATFORM_KEY_MAP.tencent]: '腾讯云',
    [PLATFORM_KEY_MAP.qingyun]: '青云',
    [PLATFORM_KEY_MAP.youpai]: '又拍云',
};

export const PLATFORM_LOGO = {
    [PLATFORM_KEY_MAP.qiniu]: qiniuLogo,
    [PLATFORM_KEY_MAP.aliyun]: aliyunLogo,
    [PLATFORM_KEY_MAP.tencent]: tencentLogo,
    [PLATFORM_KEY_MAP.qingyun]: qingyunLogo,
    [PLATFORM_KEY_MAP.youpai]: youpaiLogo,
};

const PLATFORM_LIST = [{
    key: PLATFORM_KEY_MAP.qiniu,
    name: PLATFORM_VALUE.qiniu,
    logo: PLATFORM_LOGO.qiniu,
    path: '/qiniuyun',
}, {
    key: PLATFORM_KEY_MAP.aliyun,
    name: PLATFORM_VALUE.aliyun,
    logo: PLATFORM_LOGO.aliyun,
    path: '/aliyun',
}, {
    key: PLATFORM_KEY_MAP.tencent,
    name: PLATFORM_VALUE.tencent,
    logo: PLATFORM_LOGO.tencent,
    path: '/tencentyun',
}, {
    key: PLATFORM_KEY_MAP.qingyun,
    name: PLATFORM_VALUE.qingyun,
    logo: PLATFORM_LOGO.qingyun,
    path: '/qinyun',
}, {
    key: PLATFORM_KEY_MAP.youpai,
    name: PLATFORM_VALUE.youpai,
    logo: PLATFORM_LOGO.youpai,
    path: '/youpaiyun',
}];


export default PLATFORM_LIST;
