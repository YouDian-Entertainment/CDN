import qiniuLogo from '@assets/logo/qiniu.svg';
import aliyunLogo from '@assets/logo/aliyun.svg';
import tencentLogo from '@assets/logo/tencent.svg';
import qingyunLogo from '@assets/logo/qingyun.svg';
import youpaiLogo from '@assets/logo/youpaiyun.svg';

const PLATFORM_LIST = [{
    key: 'qiniu',
    name: '七牛云',
    logo: qiniuLogo,
    path: '/qiniuyun',
// }, {
//     key: 'aliyun',
//     name: '阿里云',
//     logo: aliyunLogo,
//     path: '/aliyun',
// }, {
//     key: 'tencent',
//     name: '腾讯云',
//     logo: tencentLogo,
//     path: '/tencentyun',
// }, {
//     key: 'qingyun',
//     name: '青云',
//     logo: qingyunLogo,
//     path: '/qinyun',
// }, {
//     key: 'youpai',
//     name: '又拍云',
//     logo: youpaiLogo,
//     path: '/youpaiyun',
}];

export const PLATFORM_VALUE = {
    qiniu: '七牛云',
    aliyun: '阿里云',
    tencent: '腾讯云',
    qingyun: '青云',
    youpai: '又拍云',
};

export default PLATFORM_LIST;
