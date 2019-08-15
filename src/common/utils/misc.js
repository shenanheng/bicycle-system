// node 加密模块
const crypto = require('crypto');

const utils = {
  // base64转file
  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  },
  codeInToName(value, list) {
    // 对应的编码转化成name
    if (!Array.isArray(list)) {
      return '';
    }
    if (value !== null) {
      const array = list.filter(item => item.value === value)[0];
      if (array) {
        return array.label;
      }
      return '';
    }
    return '';
  },
  byIdCardGetUserInfo(idCard) {
    // 根据身份证号码来获取用户信息
    if (!idCard) {
      return {
        birth: '',
        sex: {},
        age: ''
      };
    }
    const birth = `${idCard.substring(6, 10)}-${idCard.substring(
      10,
      12
    )}-${idCard.substring(12, 14)}`;
    let sex = {
      value: '2',
      label: '女'
    };
    if ((1 * idCard.substr(16, 1)) % 2 === 1) {
      sex = {
        value: '1',
        label: '男'
      };
    }
    const myDate = new Date();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    let age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
    if (
      idCard.substring(10, 12) < month ||
      (idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day)
    ) {
      age += 1;
    }
    return {
      birth,
      sex,
      age
    };
  },
  // 解密登录的信息并返回userInfo的对象
  decUserInfo() {
    let login = localStorage.getItem('login');
    if (typeof login === 'string' && login !== '') {
      return JSON.parse(this.decAse192(login, 'login'));
    } else {
      return {};
    }
  },
  // button的显示与否
  showButtonFlag(val) {
    const userObj = this.decUserInfo();
    const { domIds } = userObj;
    return domIds.some(item => item === val);
  },
  // 获取url问号后面的字符串
  getQuesteMarkString() {
    const url = window.location.search; // 获取url中"?"符后的字串
    if (url.indexOf('?') !== -1) {
      return url.substr(1);
    }
    return '';
  },
  // 下载流的文件
  downBolbFile({ httpType = 'GET', url }) {
    return new Promise((resolve, reject) => {
      const userObj = this.decUserInfo();
      const http = new XMLHttpRequest();
      http.open(httpType, url);
      http.setRequestHeader('token', userObj.token);
      http.setRequestHeader('Content-Type', 'application/json');
      http.responseType = 'blob';
      http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
          const name = http
            .getResponseHeader('Content-Disposition')
            .split(';')[1]
            .split('=')[1];
          const blob = new Blob([http.response]);
          const csvUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          document.body.appendChild(link); // 创建的标签添加到body，解决Firefox下无法打开页面的问题
          link.href = csvUrl;
          link.target = '_blank';
          link.id = 'linkId';
          link.className = 'linkId';
          link.download = decodeURI(name);
          document.getElementById('linkId').click();
          link.remove(); // 将a标签移除
          resolve();
        }
        if (http.readyState === 4 && http.status !== 200) {
          reject();
        }
      };
      http.send(null);
    });
  },
  judgeIsLogin() {
    const userObj = utils.decUserInfo();
    // 判断是否登录
    if (!(userObj && userObj.token)) {
      utils.signOut();
      return false;
    }
    return true;
  },
  // 退出登录
  signOut() {
    // 清空登录
    localStorage.removeItem('login');
    const ipHost = `${window.location.protocol}//${window.location.host}`;
    window.location.href = `${ipHost}#/login`;
  },
  /**
   * @aes192加密模块
   * @param str string 要加密的字符串
   * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
   * @retrun string 加密后的字符串
   * */
  encAse192(str, secret) {
    const cipher = crypto.createCipher('aes192', secret); // 设置加密类型 和 要使用的加密密钥
    let enc = cipher.update(str, 'utf8', 'hex'); // 编码方式从utf-8转为hex;
    enc += cipher.final('hex'); // 编码方式从转为hex;
    return enc; // 返回加密后的字符串
  },
  /**
   * @aes192解密模块
   * @param str string 要解密的字符串
   * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
   * @retrun string 解密后的字符串
   * */
  decAse192(str, secret) {
    if (!str) return JSON.stringify({});
    const decipher = crypto.createDecipher('aes192', secret);
    let dec = decipher.update(str, 'hex', 'utf8'); // 编码方式从hex转为utf-8;
    dec += decipher.final('utf8'); // 编码方式从utf-8;
    return dec;
  },
  createTreeData({ list = [], id = 'id', parentId = 'parentId', rooId = 0 }) {
    const tree = list.filter(father => {
      // 循环所有项
      const fatherCopy = father;
      const branchArr = list.filter(
        child => fatherCopy[id] === child[parentId]
      ); // 返回每一项的子级数组
      if (branchArr.length > 0) {
        fatherCopy.children = branchArr; // 如果存在子级，则给父级添加一个children属性，并赋值
      }
      return fatherCopy.parentId === rooId; // 返回第一层
    });
    return tree; // 返回树形数据
  },
  /**
   * 最多显示length个剩下的用...来表示
   * @param {*传入的字符串} item
   * @param {*超过多少个字显示...} length
   */
  overName(item, length) {
    if (item.length > length) {
      return `${item.slice(0, length)}...`;
    }
    return item;
  },
  /**
   * 去除对象的null只限于一级
   * @param {对象} obj
   *
   */
  reMoveNull(obj) {
    const newObj = {};
    Object.keys(obj).forEach(item => {
      if (obj[item] !== null && obj[item] !== '') {
        newObj[item] = obj[item];
      }
    });
    return newObj;
  },
  /**
   * 多选框或者单选框分离
   * @param {*需要分离的数组} array
   * @param {*以哪种方式来分割} type
   */
  splieIdCode(array, type) {
    const ids = [];
    const names = [];
    array
      .map(item => item.split(type))
      .forEach(item => {
        const [id, name] = item;
        ids.push(id);
        names.push(name);
      });
    return {
      ids: ids.join(type),
      names: names.join(type)
    };
  },
  /**
   * 多选框或者单选框组合
   * @param {*需要用来组合的ids} ids
   * @param {*需要用来组合的labels} labels
   * @param {*以哪种方式来组合} type
   * @param {*默认返回值需要符合哪种类型} defaultValue
   */
  combinateIdCode({
    ids,
    labels,
    type,
    checkType = 'multiple',
    defaultValue = []
  }) {
    if (ids === null || ids.length === 0) {
      return defaultValue;
    }
    const arrayIds = ids.toString().split(type);
    const arrayLabels = labels.toString().split(type);
    if (checkType === 'multiple') {
      return arrayIds.map(
        (item, index) => `${item}${type}${arrayLabels[index]}`
      );
    }
    return `${arrayIds}${type}${arrayLabels}`;
  },
  // 格式化日期，将Date实例转换成格式化的字符串
  formatDate(thing, showHours = false) {
    let date = thing;
    if (!thing) return '';
    if (typeof thing === 'string') return thing;
    if (typeof thing === 'number') {
      date = new Date(thing);
    }
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    let extra = '';
    if (showHours) {
      const hours = `0${date.getHours()}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);
      const seconds = `0${date.getSeconds()}`.slice(-2);
      extra = ` ${hours}:${minutes}:${seconds}`;
    }
    return `${year}-${month}-${day}${extra}`;
  },
  isPic(fileSuffix) {
    // 判断是否是图片
    const reg = /(jpg|png|gif|bmp|jpeg|JPG|PNG|GIF|BMP|JPEG)/i;
    return reg.test(fileSuffix);
  }
};
export default utils;
