import _ from 'lodash';

export const correctEmail = (value: string) => {
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
};

export const correctPassword = (value: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
    value
  );
};

export const isVietnamesePhoneNumberValid = (num: string) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(num);
};

export const checkNumberPhone = (number: string) => {
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number);
};

export const onScrollBottom = (callBack: Function) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event);
    }
  };
};

export const getRandomId = (): number => {
  return +Math.floor(Math.random() * 10000000000);
};

export function isArrayHasValue(array: any) {
  return array && _.isArray(array) && array.length > 0;
}

export function isObjectHasValue(object: any) {
  return object && _.isObject(object) && Object.keys(object).length > 0;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end);
};

// hàm định dạng tiền việt nam
// export function formatMoneyVND(num: string) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
// }
export const FormatNumber = (money: number, separator = ',') => {
  if (!money) return '0';
  return (money + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator);
};

export const formatNumberDec = (
  nStr: string,
  decSeparate: string,
  groupSeparate: string
) => {
  nStr += '';
  let x = nStr.split(decSeparate);
  let x1 = x[0];
  let x2 = x.length > 1 ? '.' + x[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + groupSeparate + '$2');
  }
  return x1 + x2;
};
// hàm định dạng tiền việt nam

export function formatMoneyVND(num: number | string) {
  if (typeof num == 'number') {
    num = Math.floor(num);
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ`;
  } else if (typeof num == 'string') {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} đ`;
  }
}

export function formatNumberInput(value: string, separator = ',') {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
