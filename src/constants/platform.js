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

const PLATFORM_LIST = [{
    key: PLATFORM_KEY_MAP.qiniu,
    name: '七牛云',
    logo: qiniuLogo,
    path: '/qiniuyun',
}, {
    key: PLATFORM_KEY_MAP.aliyun,
    name: '阿里云',
    logo: aliyunLogo,
    path: '/aliyun',
}, {
    key: PLATFORM_KEY_MAP.tencent,
    name: '腾讯云',
    logo: tencentLogo,
    path: '/tencentyun',
}, {
    key: PLATFORM_KEY_MAP.qingyun,
    name: '青云',
    logo: qingyunLogo,
    path: '/qinyun',
}, {
    key: PLATFORM_KEY_MAP.youpai,
    name: '又拍云',
    logo: youpaiLogo,
    path: '/youpaiyun',
}];

export const PLATFORM_VALUE = {
    [PLATFORM_KEY_MAP.qiniu]: '七牛云',
    [PLATFORM_KEY_MAP.aliyun]: '阿里云',
    [PLATFORM_KEY_MAP.tencent]: '腾讯云',
    [PLATFORM_KEY_MAP.qingyun]: '青云',
    [PLATFORM_KEY_MAP.youpai]: '又拍云',
};

export default PLATFORM_LIST;
