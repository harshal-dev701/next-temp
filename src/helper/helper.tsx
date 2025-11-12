 
 import moment from 'moment';
import { MONTHS } from '../global/constants';
import { nanoid } from 'nanoid';
/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isStirng(value: any) {
  const myRegEx = /^[a-zA-Z\s]*$/;
  const isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value: any) {
  const myRegEx = /^(\s*[0-9]+\s*)+$/;
  const isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value: any) {
   
  const myRegEx =
     
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value: any) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc Checks for Electron App
 */
export const isElectronApp = () => {
  if (navigator.userAgent) {
    return navigator.userAgent.toLowerCase().includes('electron');
  }
  return false;
};

/**
 * @desc Checks for MAC
 */
export const isMAC = () => {
  if (navigator.userAgent) {
    return navigator.userAgent.toLowerCase().includes('mac') || navigator.userAgent.toLowerCase().includes('macintosh');
  }
  return false;
};

/**
 * @desc Checks for Windows
 */
export const isWindows = () => {
  if (navigator.userAgent) {
    return navigator.userAgent.toLowerCase().includes('windows');
  }
  return false;
};

export const getCookie = (cname: string) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const isFloatOrNumber = (value: string) => {
  // Regular expression to check if the value is a float or number without alphabets
  const regex = /^[+-]?\d*(\.\d*)?$/;

  return regex.test(value);
};

/**
 * @desc: Check valid date
 */
export function isValidDate(d: any) {
  return d instanceof Date;
}

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
};

/**
 * @desc check does it dev mode or live mode
 * it return false only if its a production build
 */
export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  return false;
};

/**
 * @desc get query params
 */
export const getUrlParams = (queryParams: any) => {
  if (!queryParams) return new URLSearchParams();
  return new URLSearchParams(queryParams);
};

/**
 * @desc get query param by name
 */
export const getUrlParam = (query: any, name: any) => {
  let queryParams = new URLSearchParams();
  if (query) queryParams = new URLSearchParams(query);
  return queryParams.get(name);
};

export const appEnvironments = () => {
  if (isProduction()) return 'inDevlopment';
  return null;
};

export const isProduction = () => {
  try {
    const url = window.location.href;
    if (url && url.includes('beta.mailcanvas.app')) return false;
  } catch (e) {
    console.error(e);
  }

  if (!isDev()) return true;
  return false;
};

export function mathRound(number: any, digit = 2) {
  try {
    if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) {
    console.error(e);
  }
  return Number(0).toFixed(2);
}

/**
 * @desc get formatted date
 */
export const getFormattedDate = (date: any) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return (day < 10 ? `0${day}` : day) + '/' + (month < 10 ? `0${month}` : month) + '/' + year;
  // return day + '/' + month + '/' + year;
};

/**
 * @desc split user name into firstname and lastname
 */
export const getFirstAndLastName = (userName: any) => {
  let firstname, lastname;
  const args = (userName || '').split(' ');
  if (args && args.length >= 2) {
    firstname = args[0];
    lastname = args[1];
  }
  return { firstname, lastname };
};

export const getFormattedTime = (date: any) => {
  if (!date) date = new Date();
  else date = new Date(date);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const time = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
  return String(time);
};

export const getNameById = (array: any, id: any) => {
  if (!array || array.length === 0 || !id) return;
  const item = array.find((x: any) => x.id === id);
  if (item) return item.name;
};

export const removeWhiteSpaceRegex = (str: any) => {
  return str.replace(/ +/g, '');
};

export const replaceWhiteSpaceWithDash = (str: any) => {
  return str.replace(/\s+/g, '-');
};

export const removeSpecialCharactersFromNumber = (str: any) => {
  if (isEmpty(str)) return;
  return str?.replace(/[^0-9]/g, '');
};

export const getAPIErrorReason = (e: any) => {
  if (e) {
    if (e.response && e.response.data) {
      return e.response.data.reason || e.response.data.message || e.response.data.error;
    } else if (e.message) {
      return e.message;
    }
  }
};

export const currencyWithDecimal = (num: any) => {
  let returnValue = num;
  try {
    let digit = 2;
    if (num) {
      if (Number(num) < 1) digit = 3;
      if (Number(num) > 999) digit = 1;
      const num2 = Number(num).toFixed(digit);
      returnValue = num2;
    } else {
      returnValue = Number(0).toFixed(digit);
    }
  } catch (e) {
    console.error(e);
  }
  return returnValue;
};

export const getDateDifference = (startDate: any, endDate: any) => {
  try {
    const date1: any = new Date(startDate);
    const date2: any = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 0) return diffDays;
  } catch (e) {
    console.error(e);
  }
};

export const isPastDate = (date: any) => {
  if (!date) {
    return '';
  }
  const diff = moment().diff(date, 'days');
  return diff > 0;
};

export const displayRelativeDate = (date: any) => {
  if (!date) {
    return '';
  }
  const diff = moment(new Date(moment().format('YYYY-MMM-DD'))).diff(date, 'days');
  if (diff === 0) {
    return 'Today';
  } else if (diff === -1) {
    return 'Tomorrow';
  } else {
    return moment(date).fromNow();
  }
};

export const getFormattedAddress = (item: any) => {
  if (!item) return '';
  let formattedAdd = '';
  const address = [];
  if (!isEmpty(item.address_line1) || !isEmpty(item.addressLine1)) {
    address.push(item.address_line1 || item.addressLine1);
  }
  if (!isEmpty(item.city)) {
    address.push(item.city);
  }
  if (!isEmpty(item.state)) {
    address.push(item.state);
  }
  if (!isEmpty(item.pincode)) {
    address.push(item.pincode);
  }
  formattedAdd = address.join(', ');
  return formattedAdd;
};

export const getDateString = (date: any) => {
  //return yyyyMMdd
  if (date) {
    date = new Date(date);
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  }
  return;
};

export const getDateFromFormatedDate = (date: any) => {
  //parse yyyyMMdd and return date object
  if (date) {
    const year = Number(date.substr(0, 4));
    const month = Number(date.substr(4, 2));
    const day = Number(date.substr(6, 2));
    //here do -1 becuase month is always +1
    const result = new Date(year, month - 1, day);
    return result;
  }
  return;
};

export const getUTCDate = (date: any) => {
  if (date) date = new Date(date);
  else date = new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

export const hasProduction = () => {
  if (window.location.host.startsWith('dashboard.salescamp.app')) {
    return true;
  }
  return false;
};

export const randomIntFromInterval = (min: any, max: any) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSecondsFromHHMMSS = (value: any) => {
  const [str1, str2, str3] = value.split(':');
  const val1 = Number(str1);
  const val2 = Number(str2);
  const val3 = Number(str3);

  if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    return val1 * 60 + val2;
  }

  if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    return val1 * 60 * 60 + val2 * 60 + val3;
  }

  return 0;
};

export const toHHMMSS = (secs: any) => {
  const secNum = parseInt(secs.toString(), 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== '00' || index > 0)
    .join(':')
    .replace(/^0/, '');
};

export const calculateDay = (createdDate: any) => {
  const date = new Date();
  const oldDate = new Date(createdDate);
  const Difference_In_Time = date.getTime() - oldDate.getTime();
  const Difference_In_Days: any = Difference_In_Time / (1000 * 3600 * 24);
  if (Difference_In_Days < 1) return 'Today';
  else if (Difference_In_Days < 7) return `${Math.floor(Difference_In_Days)} days ago`;
  else if (Difference_In_Days < 30 && Math.floor(Difference_In_Days / 7) === 1) return `Week ago`;
  else if (Difference_In_Days < 30 && Math.floor(Difference_In_Days / 7) !== 1)
    return `${Math.floor(Difference_In_Days / 7)} Weeks ago`;
  const months = date.getMonth() - oldDate.getMonth() + 12 * (date.getFullYear() - oldDate.getFullYear());
  if (months < 12) return `${months} Months ago`;
  return `${Math.floor(months / 12)} Years ago`;
};

export const calculateDueTime = (inputDueDate: any) => {
  const currentDate = moment(moment().format('YYYY-MM-DD'));
  // const dueDate = moment(moment(moment(inputDueDate).toLocaleString()).format());
  const dueDate = moment(inputDueDate);
  const diffInDays = dueDate.diff(currentDate, 'days');
  const absoluteDiffInDays = Math.abs(diffInDays);
  let result;
  if (diffInDays === 0) {
    result = 'Today';
  } else if (diffInDays === 1) {
    result = 'Tomorrow';
  } else if (diffInDays === -1) {
    result = 'Yesterday';
  } else if (diffInDays > 1 && diffInDays <= 7) {
    result = `${diffInDays} days left`;
  } else if (diffInDays < -1 && diffInDays >= -7) {
    result = `${absoluteDiffInDays} days ago`;
  } else if (diffInDays > 7 && diffInDays <= 30) {
    const weeks = Math.floor(diffInDays / 7);
    result = `${weeks} week${weeks > 1 ? 's' : ''} left`;
  } else if (diffInDays < -7 && diffInDays >= -30) {
    const weeksLeft = Math.floor(absoluteDiffInDays / 7);
    result = `${weeksLeft} week${weeksLeft > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 30 && diffInDays <= 365) {
    const months = Math.floor(diffInDays / 30);
    result = `${months} month${months > 1 ? 's' : ''} left`;
  } else if (diffInDays < -30 && diffInDays >= -365) {
    const monthsLeft = Math.floor(absoluteDiffInDays / 30);
    result = `${monthsLeft} month${monthsLeft > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 365) {
    const years = Math.floor(diffInDays / 365);
    result = `${years} year${years > 1 ? 's' : ''} left`;
  } else if (diffInDays < -365) {
    const yearsLeft = Math.floor(absoluteDiffInDays / 365);
    result = `${yearsLeft} year${yearsLeft > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    result = `${months} month${months > 1 ? 's' : ''} ${diffInDays > 0 ? 'left' : 'ago'}`;
  }
  return { dueTime: result, overDue: diffInDays < 0 };
};

export const getNameOfDay = (date: any) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = days[date.getDay()];
  // const index = days.findIndex((x) => x === day);
  return day;
};

export const getDatetoMMMDD = (date: string) => {
  const month = Number(date.substring(4, 6));
  return `${date.substring(6, 8)} ${MONTHS[month]}`;
};

export const floatToHHMM = (num: number) => {
  const hours = Math.floor(num);
  const minutes = Math.round((num - hours) * 60);
  return `${hours > 9 ? hours : `0${hours}`} : ${minutes > 9 ? minutes : `0${minutes}`}`;
};

export const floatToHHMMSS = (num: number) => {
  const hours = Math.floor(num);
  const minutes = Math.floor((num - hours) * 60);
  const seconds = Math.round((num - hours) * 3600 - minutes * 60);
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours > 9 ? hours : `0${hours}`}h `;
  }
  timeString += `${minutes > 9 ? minutes : `0${minutes}`}m ${seconds > 9 ? seconds : `0${seconds}`}s`;
  return timeString;
};

export const getDateObjecttoMMMDD = (dateInput: any) => {
  const date = new Date(dateInput);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  return `${monthNames[monthIndex]} ${day} `;
};
export const getFloatTimeValue = (time: string) => {
  const timeRef = time.split(':');
  const floatValue = Number(timeRef[0]) + Math.round((Number(timeRef[1]) * 100) / 60) / 100;
  return floatValue;
};

export const getDateObjecttoDDMMM = (dateInput: any) => {
  const date = new Date(dateInput);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  return `${day} ${monthNames[monthIndex]}`;
};

export const getDateObjecttoMMMDDYYYY = (dateInput: any) => {
  const date = new Date(dateInput);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const day = date.getDate();
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  //current Date
  const currentDate = new Date();
  const curentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

  if (day === curentDay && year === currentYear && monthIndex === currentMonthIndex) return 'Today';
  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

// Get Date Formate By month

export const getDateByThisMonth = () => {
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  return `${startOfMonth}/${endOfMonth}`;
};

/**
 * @desc check for url
 */
export function isUrl(value: any) {
  const myRegEx = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  const isValid = myRegEx.test(value);
  return isValid ? true : false;
}

export const checkIsOverdue = (inputDateRef: Date) => {
  try {
    const inputDate = new Date(inputDateRef).getTime();
    const currentDate = new Date().getTime();
    const diffTime = Math.abs(inputDate - currentDate);
    if (diffTime >= 0) return false;
    else return true;
  } catch (e) {
    console.error(e);
  }
};

export const htmlToPlainText = (html: string) => {
  // Create a temporary DOM element
  const tempElement = document.createElement('div');

  // Set the HTML content of the temporary element
  tempElement.innerHTML = html;

  // Extract and return the text content
  return tempElement.textContent || tempElement.innerText || '';
};

export const getFileContent = (htmlSnippet: string) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = htmlSnippet;
  const linkElement = tempElement.querySelectorAll('a');
  let content: any = tempElement.querySelectorAll('p');
  const extractedLinks: any = [];

  if (!content) {
    content = document.createElement('p');
    content.innerHTML = tempElement.innerHTML;
  }

  let newDesc: string = '';
  content.forEach((item: any) => {
    if (item?.getAttribute('class') !== 'p') newDesc = newDesc + item?.innerHTML;
  });

  linkElement.forEach((linkElement) => {
    const href = linkElement.getAttribute('href');
    if (href?.startsWith('https://firebasestorage') || href?.startsWith('/projects/details')) {
      const size = linkElement.getAttribute('id');
      const name = linkElement.getAttribute('name') || '';
      const parts = name?.split('.');
      const extension = parts[parts.length - 1];

      extractedLinks.push({
        href: href || '',
        name: name.replace(/\s+/g, '-'),
        size: size || '0 MB',
        file_type: extension
      });
    }
  });
  return {
    content: !isEmpty(newDesc) ? `<p>${newDesc}</p>` : '',
    uploadedFiles: extractedLinks
  };
};

export const getFileIcon = (type: string) => {
  switch (type) {
    case '.iconpdf':
      return `
        <path
          fill="#F25123"
          d="m16.324 13.857 1.155-.667-1.155-2-1.155 2 1.155.667Zm3.824 6.624v1.333h2.31l-1.155-2-1.155.667Zm-7.648 0-1.155-.667-1.154 2H12.5V20.48Zm3.821-7.618-1.154.667 1.155 2 1.154-2-1.155-.666Zm1.691-2.93-1.154-.666 1.154.666ZM16.322 6.4l.074-1.331-.075-.004-.075.004.075 1.331ZM14.63 9.933l1.154-.666-1.154.666Zm11.542 14.27-1.189-.604-.438.862.684.684.943-.942Zm-5.622-3.246v-1.333h-2.31l1.155 2 1.155-.667Zm1.708 2.958 1.155-.666-1.155.666Zm3.915.288 1.117.728.59-.906-.764-.764-.944.942Zm-14.256-3.246 1.154.667 1.155-2h-2.31v1.333Zm-1.71 2.96-1.154-.668 1.155.667Zm-3.915.287-1.189.604.033.064.039.06 1.117-.728Zm8.877-9.68 3.824 6.623 2.31-1.333-3.824-6.624-2.31 1.334Zm4.979 4.623H12.5v2.667h7.648v-2.667Zm-6.493 2 3.824-6.623-2.31-1.334-3.824 6.624 2.31 1.333Zm3.821-7.617 1.691-2.93-2.31-1.333-1.69 2.93 2.31 1.333Zm1.691-2.93c.669-1.158 1.069-2.526.483-3.74-.608-1.262-1.955-1.718-3.254-1.791l-.15 2.662c.438.025.708.106.857.18a.496.496 0 0 1 .124.08.09.09 0 0 1 .021.027c.002.004.134.34-.39 1.249l2.31 1.333Zm-2.92-5.531c-1.3.073-2.647.53-3.255 1.79-.586 1.216-.186 2.583.483 3.741l2.31-1.333c-.525-.909-.393-1.245-.391-1.249a.09.09 0 0 1 .021-.027.499.499 0 0 1 .125-.08c.149-.074.419-.155.857-.18l-.15-2.662ZM13.474 10.6l1.692 2.93 2.309-1.333-1.692-2.93-2.31 1.333ZM27.36 24.807c.591-1.164.876-2.561.09-3.723-.757-1.121-2.145-1.46-3.485-1.46v2.667c1.051 0 1.275.284 1.276.286a.091.091 0 0 1 .013.033c.005.022.013.07.007.15-.012.168-.078.445-.279.839l2.378 1.208Zm-3.395-5.183H20.55v2.667h3.416v-2.667Zm-4.57 2 1.707 2.958 2.31-1.333-1.708-2.958-2.31 1.333Zm1.707 2.958c.67 1.16 1.658 2.193 3.007 2.289 1.4.099 2.467-.846 3.18-1.94l-2.235-1.456c-.24.37-.447.567-.587.661a.507.507 0 0 1-.134.07.093.093 0 0 1-.035.005c-.003 0-.36-.052-.886-.962l-2.31 1.333Zm6.013-1.321h-.001l-1.886 1.884 1.887-1.884ZM7.48 23.6c-.2-.395-.267-.671-.279-.84a.506.506 0 0 1 .007-.15.093.093 0 0 1 .013-.033c.002-.003.226-.287 1.277-.287v-2.667c-1.34 0-2.728.34-3.486 1.46-.786 1.162-.501 2.56.09 3.724L7.481 23.6Zm1.018-1.31h3.417v-2.667H8.5v2.667Zm2.263-2L9.053 23.25l2.31 1.333 1.708-2.959-2.31-1.333ZM9.053 23.25c-.526.911-.884.962-.887.962-.005 0-.014.001-.035-.005a.504.504 0 0 1-.134-.069c-.14-.094-.346-.29-.588-.661l-2.234 1.455c.712 1.094 1.78 2.04 3.18 1.94 1.35-.095 2.337-1.128 3.008-2.29l-2.31-1.332Z"
        />
        `;
    case '.dmg':
      return `
      <path
        fill="#20C474"
        d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
      />
      <path
        fill="#fff"
        d="M12.49 20.997c.278.091.52.272.685.514.138.197.236.42.287.655.049.22.075.445.076.67.015.477-.096.95-.322 1.37a1.452 1.452 0 0 1-1.349.755h-1.734V20.91h1.734c.21-.002.42.028.623.088Zm-1.54.616v2.643h.775a.84.84 0 0 0 .83-.59c.092-.248.135-.51.13-.773a1.908 1.908 0 0 0-.193-.95.81.81 0 0 0-.767-.33h-.776Zm5.886-.704h1.21v4.05h-.784v-3.07c0-.143.003-.252.003-.329l-.762 3.4h-.814l-.757-3.4c0 .077 0 .186.003.329.003.142 0 .252 0 .33v2.74h-.78v-4.05h1.223l.73 3.185.728-3.185Zm4.691 1.264a.793.793 0 0 0-.467-.58 1.138 1.138 0 0 0-.46-.09.999.999 0 0 0-.799.369 1.68 1.68 0 0 0-.312 1.109 1.382 1.382 0 0 0 .338 1.056c.207.199.483.31.77.31a.993.993 0 0 0 .693-.244c.182-.168.3-.395.332-.64h-.93v-.677h1.675v2.174h-.557l-.084-.504a1.928 1.928 0 0 1-.439.405 1.532 1.532 0 0 1-.818.205 1.695 1.695 0 0 1-1.308-.561 2.136 2.136 0 0 1-.532-1.533 2.258 2.258 0 0 1 .536-1.576 1.826 1.826 0 0 1 1.423-.594c.444-.022.881.117 1.232.39a1.46 1.46 0 0 1 .535.981h-.828Z"
      />
      <path
        fill="#000"
        d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
        opacity={0.19}
      />
      <path
        fill="#AAEBCB"
        d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
      />
      `;
    case '.folder':
      return `<path
          fill="#FFB125"
          d="M27.25 6.583H12.833a.417.417 0 0 0-.325.677l1.834 2.292a2.072 2.072 0 0 0 1.625.781h12.95a.417.417 0 0 0 .416-.416v-1.25a2.086 2.086 0 0 0-2.083-2.084Z"
        />
        <path
          fill="#FCD354"
          d="M29.333 9.5H15.967a1.248 1.248 0 0 1-.974-.468l-2.085-2.605a2.904 2.904 0 0 0-2.275-1.094H4.75a2.083 2.083 0 0 0-2.083 2.084v16.666a2.084 2.084 0 0 0 2.083 2.084h22.5a2.083 2.083 0 0 0 2.083-2.084V9.5Z"
        />`;
    case '.docx':
      return `<path
          fill="#3BA0F3"
          fillRule="evenodd"
          d="M3.733 7.461c0-.29.243-.528.536-.528H27.73c.296 0 .536.24.536.528v2.144a.534.534 0 0 1-.536.528H4.27a.534.534 0 0 1-.536-.528V7.461Zm0 7.467c0-.291.243-.528.536-.528H27.73c.296 0 .536.24.536.528v2.144a.534.534 0 0 1-.536.528H4.27a.534.534 0 0 1-.536-.528v-2.144Zm.533 6.939a.53.53 0 0 0-.533.528v2.144c.003.292.24.527.533.528H19.2a.53.53 0 0 0 .532-.528v-2.144a.533.533 0 0 0-.532-.528H4.266Z"
          clipRule="evenodd"
        />`;
    case '.jpg':
      return `<path
        fill="#637282"
        fillRule="evenodd"
        d="M19.2 10.667a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0ZM13.216 15.1c-.188-.232-.49-.233-.677-.008l-7.113 8.535c-.185.221-.103.408.188.408h20.762c.29 0 .384-.192.207-.428L22.55 18.23c-.176-.235-.479-.248-.673-.025l-2.833 3.244a.436.436 0 0 1-.69-.013L13.216 15.1Z"
        clipRule="evenodd"
      />`;
    case '.png':
      return `<path
        fill="#637282"
        fillRule="evenodd"
        d="M19.2 10.667a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0ZM13.216 15.1c-.188-.232-.49-.233-.677-.008l-7.113 8.535c-.185.221-.103.408.188.408h20.762c.29 0 .384-.192.207-.428L22.55 18.23c-.176-.235-.479-.248-.673-.025l-2.833 3.244a.436.436 0 0 1-.69-.013L13.216 15.1Z"
        clipRule="evenodd"
      />`;
    case '.svg':
      return `<path
        fill="#637282"
        fillRule="evenodd"
        d="M19.2 10.667a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0ZM13.216 15.1c-.188-.232-.49-.233-.677-.008l-7.113 8.535c-.185.221-.103.408.188.408h20.762c.29 0 .384-.192.207-.428L22.55 18.23c-.176-.235-.479-.248-.673-.025l-2.833 3.244a.436.436 0 0 1-.69-.013L13.216 15.1Z"
        clipRule="evenodd"
      />`;
    case '.jpeg':
      return `<path
      fill="#637282"
      fillRule="evenodd"
      d="M19.2 10.667a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0ZM13.216 15.1c-.188-.232-.49-.233-.677-.008l-7.113 8.535c-.185.221-.103.408.188.408h20.762c.29 0 .384-.192.207-.428L22.55 18.23c-.176-.235-.479-.248-.673-.025l-2.833 3.244a.436.436 0 0 1-.69-.013L13.216 15.1Z"
      clipRule="evenodd"
    />`;
    case '.doc':
      return `<path
      fill="#518FF5"
      d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.947.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
    />
    <path
      fill="#fff"
      d="M11.119 16.057h9.875v1.1h-9.875v-1.1Zm0 2.448h9.875v1.1h-9.875v-1.1Zm0 2.453h9.875v1.1h-9.875v-1.1Zm0 2.448h7.026v1.1h-7.026v-1.1Z"
    />
    <path
      fill="#000"
      d="m19.405 9.693 6.307 5.11V10L22.14 7.927l-2.734 1.766Z"
      opacity={0.19}
    />
    <path
      fill="#A6C5FA"
      d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
    />`;
    case '.image':
      return `<path
      fill="#DDEBFD"
      d="M22.933 5.333H8.711a2.844 2.844 0 0 0-2.844 2.845v15.644a2.844 2.844 0 0 0 2.844 2.845h14.222a2.844 2.844 0 0 0 2.845-2.845V8.178a2.844 2.844 0 0 0-2.845-2.845Z"
    />
    <path
      fill="#4071F7"
      d="M21.155 14.903a.711.711 0 0 0-.99.016L17.1 17.986a.711.711 0 0 0 0 1.006l7.27 7.271a2.833 2.833 0 0 0 1.409-2.44v-4.575l-4.622-4.345Z"
    />
    <path
      fill="#5392F9"
      d="M17.956 14.578a2.133 2.133 0 1 0 0-4.267 2.133 2.133 0 0 0 0 4.267ZM14.192 14.075a.732.732 0 0 0-1.006 0l-7.32 7.32v2.427a2.844 2.844 0 0 0 2.845 2.845h14.222a2.832 2.832 0 0 0 2.442-1.41L14.192 14.076Z"
    />`;
    case '.excel':
      return ` 
         <path
      fill="#23A566"
      d="M25.716 9.97v17.646c0 .95-.767 1.717-1.717 1.717H8.118c-.95 0-1.718-.767-1.718-1.717V4.384c0-.95.768-1.717 1.718-1.717h10.295l7.303 7.303Z"
    />
    <path
      fill="#fff"
      d="M20.282 15.943h-8.447a.548.548 0 0 0-.548.548v7.355c0 .303.245.549.548.549h8.452a.548.548 0 0 0 .548-.549v-7.35a.56.56 0 0 0-.553-.553Zm-7.9 3.529h3.128v1.394h-3.127v-1.394Zm4.224 0h3.127v1.394h-3.127v-1.394Zm3.127-1.097h-3.127v-1.33h3.127v1.33Zm-4.223-1.33v1.33h-3.127v-1.33h3.127Zm-3.127 4.922h3.127v1.331h-3.127v-1.33Zm4.223 1.331v-1.33h3.127v1.33h-3.127Z"
    />
    <path
      fill="#000"
      d="m19.394 9.704 6.322 5.121v-4.808L22.13 7.934l-2.736 1.77Z"
      opacity={0.19}
    />
    <path
      fill="#8ED1B1"
      d="M25.716 9.97H20.13c-.95 0-1.717-.767-1.717-1.717V2.667l7.303 7.303Z"
    />`;
    case '.pdf':
      return `<path
      fill="#F55151"
      d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.947.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M16.711 16.592c0 .667-.333 1.533-.6 2.4.378.756.933 1.444 1.533 2 .734-.244 1.69-.467 2.356-.467.578 0 1.067.467 1.067 1.045 0 .6-.49 1.067-1.067 1.067-.822 0-1.822-.378-2.511-.934-.956.222-1.956.6-2.89.978-.4.778-.866 1.622-1.244 2.067l-.022.022c-.2.2-.466.31-.755.31a1.082 1.082 0 0 1-1.067-1.066c0-.289.111-.555.311-.755l.022-.023c.534-.422 1.4-.71 2.378-1.088.489-.934.867-2.045 1.2-3.09-.422-.844-.822-1.755-.822-2.466 0-.578.466-1.067 1.044-1.067.6 0 1.067.49 1.067 1.067Zm-1.489 0c0 .333.222.911.489 1.533.2-.622.356-1.222.356-1.533a.409.409 0 0 0-.423-.422.422.422 0 0 0-.422.422Zm-.133 5.222c.6-.222 1.222-.444 1.844-.622a8.428 8.428 0 0 1-1.089-1.4 22.114 22.114 0 0 1-.755 2.022Zm3.222-.333c.533.311 1.222.511 1.689.511a.409.409 0 0 0 .422-.422.422.422 0 0 0-.422-.422c-.4 0-1.067.155-1.689.333Zm-6.044 2.244a.422.422 0 0 0-.112.29c0 .244.178.421.423.421a.422.422 0 0 0 .289-.11c.2-.245.51-.734.8-1.267-.623.244-1.156.466-1.4.666Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      d="m19.405 9.693 6.307 5.11V10L22.14 7.927l-2.734 1.766Z"
      opacity={0.19}
    />
    <path
      fill="#FAA6A6"
      d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
    />`;
    case '.form':
      return `<path
      fill="#744ABD"
      d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
    />
    <path
      fill="#fff"
      d="M12.462 16.088h8.532v1.1h-8.532v-1.1ZM10.525 17.25a.615.615 0 1 0 0-1.23.615.615 0 0 0 0 1.23ZM12.462 19.213h8.532v1.1h-8.532v-1.1ZM10.525 20.375a.615.615 0 1 0 0-1.23.615.615 0 0 0 0 1.23ZM12.462 22.338h8.532v1.1h-8.532v-1.1ZM10.525 23.5a.615.615 0 1 0 0-1.23.615.615 0 0 0 0 1.23Z"
    />
    <path
      fill="#000"
      d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
      opacity={0.19}
    />
    <path
      fill="#B7A2DD"
      d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
    />`;
    case '.mp4':
      return `<path
    fill="#F5A351"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#fff"
    d="M16 16a4.267 4.267 0 1 0 0 8.533A4.267 4.267 0 0 0 16 16Zm1.474 4.493-2.133 1.333a.268.268 0 0 1-.408-.226v-2.667a.267.267 0 0 1 .408-.226l2.133 1.334a.267.267 0 0 1 0 .452Z"
  />
  <path
    fill="#000"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#FACEA6"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.webm':
      return `<path
    fill="#F5A351"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#fff"
    d="M16 16a4.267 4.267 0 1 0 0 8.533A4.267 4.267 0 0 0 16 16Zm1.474 4.493-2.133 1.333a.268.268 0 0 1-.408-.226v-2.667a.267.267 0 0 1 .408-.226l2.133 1.334a.267.267 0 0 1 0 .452Z"
  />
  <path
    fill="#000"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#FACEA6"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.pptx':
      return `<path
    fill="#FD7541"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#fff"
    fillOpacity={0.75}
    d="M19.702 23.395a4.337 4.337 0 0 0 1.27-3.062h-8.664a4.333 4.333 0 0 0 4.334 4.334 4.336 4.336 0 0 0 3.06-1.272Z"
  />
  <path
    fill="#fff"
    fillOpacity={0.55}
    d="M16.638 16a4.344 4.344 0 0 0-4.333 4.333h4.333V16Z"
  />
  <path
    fill="#fff"
    fillOpacity={0.35}
    d="M16.638 16a4.344 4.344 0 0 1 4.333 4.333h-4.333V16Z"
  />
  <path
    fill="#fff"
    d="M11.477 17.857h4.128a.414.414 0 0 1 .414.414v4.128a.41.41 0 0 1-.41.41h-4.132a.41.41 0 0 1-.41-.406V18.27a.41.41 0 0 1 .41-.414Z"
  />
  <path
    fill="#FD7541"
    d="M13.543 18.788a1.27 1.27 0 0 1 .86.25.88.88 0 0 1 .296.708.838.838 0 0 1-.148.502.99.99 0 0 1-.414.354c-.196.091-.41.136-.626.131h-.58v1.121h-.605v-3.066h1.217Zm-.63 1.446h.52c.166.01.33-.039.463-.138a.354.354 0 0 0 .156-.314c0-.354-.198-.503-.598-.503h-.53l-.01.955Z"
  />
  <path
    fill="#000"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#FFB79B"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.psd':
      return `<path
    fill="#001834"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#00A9FF"
    d="M11.414 24.443v-7.259a.065.065 0 0 1 .074-.075c.53-.014 1.159-.058 1.98-.058.965 0 1.673.204 2.125.645a2.196 2.196 0 0 1 .674 1.632c0 .803-.28 1.4-.84 1.792-.56.391-1.263.587-2.109.587l-.597.01v2.715c0 .057-.024.085-.08.085h-1.143c-.056 0-.084-.025-.084-.074Zm1.307-6.347v2.62c.22-.017.44-.021.66-.012.47 0 .849-.105 1.14-.315.29-.21.435-.552.435-1.026 0-.42-.128-.743-.383-.971-.256-.229-.625-.343-1.106-.344h-.35c-.115 0-.21.006-.28.006-.07 0-.124.005-.116.038v.004Zm8.026 4.705a1.492 1.492 0 0 1-.532 1.188c-.032.03-.066.06-.101.089-.367.293-.864.44-1.489.44-.625 0-1.137-.114-1.536-.342a.1.1 0 0 1-.065-.108v-.995a.064.064 0 0 1 .027-.06.035.035 0 0 1 .048.006c.424.33.946.51 1.483.514a1.02 1.02 0 0 0 .57-.133.406.406 0 0 0 .195-.348.504.504 0 0 0-.16-.38c-.107-.104-.316-.216-.63-.337-.569-.221-.965-.459-1.188-.712a1.345 1.345 0 0 1-.355-.932 1.5 1.5 0 0 1 .523-1.136c.336-.3.812-.451 1.429-.451.576 0 1.041.078 1.355.236.035.02.053.067.053.138v.888c0 .086-.032.107-.093.064-.38-.241-.82-.37-1.27-.373-.248 0-.431.046-.548.139a.411.411 0 0 0-.138.516c.026.058.064.11.11.153.1.097.31.209.63.336.56.217.96.444 1.202.681l.006.007c.244.225.474.537.474.912Z"
  />
  <path
    fill="#fff"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#00A9FF"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.skech':
      return `<path
    fill="#FFF3CF"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#FFD54F"
    d="M13.02 19.034v-2.73l3.035-.57 3.035.57v2.73h-6.07Z"
  />
  <path fill="#FFECB3" d="m13.02 19.034 3.035-3.3 3.035 3.3h-6.07Z" />
  <path fill="#FFA000" d="m11.2 19.034 4.855 5.766 4.856-5.766H11.2Z" />
  <path fill="#FFCA28" d="m13.02 19.034 3.035 5.766 3.035-5.766h-6.07Z" />
  <path
    fill="#FFC107"
    d="m11.2 19.034 1.82-2.73v2.73H11.2Zm7.89-2.73v2.73h1.82l-1.82-2.73Z"
  />
  <path
    fill="#000"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#FFCA28"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.html':
      return `<path
    fill="#FF7F2A"
    d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
  />
  <path
    fill="#fff"
    d="M18.072 18.437a.384.384 0 0 0 .076.54l2.675 2.003-2.675 2.003a.386.386 0 0 0 .331.678.385.385 0 0 0 .135-.065l3.077-2.31a.386.386 0 0 0 0-.615l-3.074-2.313a.408.408 0 0 0-.545.079Zm-3.15 5.53a.388.388 0 0 0 .433.474.387.387 0 0 0 .318-.29l1.545-6.163a.385.385 0 0 0-.287-.467c-.23-.042-.41.068-.46.256l-1.549 6.19Zm-1.399-5.608-3.076 2.312a.386.386 0 0 0 0 .615l3.076 2.31a.386.386 0 0 0 .566-.5.384.384 0 0 0-.1-.113l-2.671-2.003 2.672-2.003a.384.384 0 0 0 .076-.54c-.158-.194-.39-.197-.543-.079Z"
  />
  <path
    fill="#000"
    d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
    opacity={0.19}
  />
  <path
    fill="#FCA"
    d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
  />`;
    case '.zip':
      return `<path
    fill="#FFB125"
    d="M27.25 6.583H12.833a.417.417 0 0 0-.325.677l1.834 2.292a2.072 2.072 0 0 0 1.625.781h12.95a.417.417 0 0 0 .416-.416v-1.25a2.086 2.086 0 0 0-2.083-2.084Z"
  />
  <path
    fill="#FCD354"
    d="M29.333 9.5H15.967a1.248 1.248 0 0 1-.974-.468l-2.085-2.605a2.904 2.904 0 0 0-2.275-1.094H4.75a2.083 2.083 0 0 0-2.083 2.084v16.666a2.083 2.083 0 0 0 2.083 2.084h22.5a2.083 2.083 0 0 0 2.083-2.084V9.5Z"
  />
  <path
    fill="#fff"
    d="M9.514 20.345V18.23a.407.407 0 0 0-.41-.41H7.963a.407.407 0 0 0-.41.41v2.114l-.638 1.867a1.703 1.703 0 0 0 .229 1.552c.314.448.838.714 1.39.714a1.715 1.715 0 0 0 1.62-2.267l-.639-1.866Zm-.266 2.933c-.324.467-1.105.467-1.438 0a.886.886 0 0 1-.115-.8l.21-.628h1.247l.22.628a.89.89 0 0 1-.124.8ZM6 6.468v1.163c0 .228.181.41.41.41h1.552v1.732H6.41a.407.407 0 0 0-.41.41v.895c0 .229.181.42.41.42h1.552v1.723H6.41c-.229 0-.41.181-.41.41v.904c0 .229.181.41.41.41h1.552v1.314c0 .229.19.41.419.41h2.276c.22 0 .41-.181.41-.41v-.905c0-.219-.19-.41-.41-.41H9.095v-1.723h1.562c.22 0 .41-.18.41-.41v-.904c0-.229-.19-.41-.41-.41H9.095V9.773h1.562c.22 0 .41-.19.41-.419V8.46a.421.421 0 0 0-.41-.419H9.095V6.46L6 6.468Z"
  />`;
    case '.mp3':
      return `<path
  fill="#147AF3"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#fff"
  d="M18.57 21.459c.28-.471.47-1.07.506-1.658a2.379 2.379 0 0 0-.244-1.15c-.29-.589-.779-.915-1.259-1.241-.353-.236-.688-.462-.924-.779l-.045-.054c-.136-.19-.299-.408-.326-.589-.018-.181-.19-.308-.362-.299a.348.348 0 0 0-.327.353v6.214a1.98 1.98 0 0 0-1.05-.29c-.96 0-1.74.625-1.74 1.394 0 .77.78 1.395 1.74 1.395s1.748-.625 1.748-1.395v-4.066c.525.208 1.377.715 1.612 1.902-.045.063-.082.136-.136.19a.357.357 0 0 0 .036.498.345.345 0 0 0 .49-.036c.09-.109.18-.226.253-.362l.027-.027Z"
/>
<path
  fill="#000"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#A0C9FB"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.txt':
      return `<path
  fill="#E5E5E5"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#BABABA"
  d="M10.133 13.153c0-.259.21-.469.47-.469h10.794c.26 0 .47.21.47.47v.497H10.603a.47.47 0 0 1-.47-.47v-.028Zm0 2.154c0-.259.21-.469.47-.469h10.794c.26 0 .47.21.47.47v.028c0 .26-.21.47-.47.47H10.603a.47.47 0 0 1-.47-.47v-.029Zm0 2.16c0-.26.21-.47.47-.47h7.41c.258 0 .468.21.468.47v.028c0 .259-.21.469-.469.469h-7.41a.47.47 0 0 1-.469-.47v-.028ZM11.654 25.067v-3.34h-1.22V20.8h3.527v.927h-1.215v3.34h-1.092Zm6.274 0h-1.145l-.78-1.31-.78 1.31h-1.151l1.356-2.277-1.186-1.99h1.145l.616 1.033.61-1.033h1.15l-1.185 1.995 1.35 2.272Zm1.326 0v-3.34H18.04V20.8h3.528v.927h-1.221v3.34h-1.092Z"
/>
<path
  fill="#CCC"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.6}
/>
<path
  fill="#BABABA"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.ttf':
      return `<path
  fill="#F70100"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#fff"
  d="M11.93 25.067v-3.344h-1.222V20.8h3.532v.923h-1.223v3.344H11.93Zm3.69 0v-3.344H14.4V20.8h3.531v.923h-1.222v3.344h-1.087Zm2.634 0V20.8h3.038v.923h-1.945v.687h1.557v.923h-1.557v1.734h-1.093ZM12.412 16.747a.28.28 0 0 1-.079-.201c0-.034.01-.076.032-.127l1.608-3.796a.483.483 0 0 1 .142-.186.348.348 0 0 1 .223-.072h.064c.088 0 .162.024.223.072.061.049.109.11.142.186l1.608 3.796c.021.05.032.093.032.127a.28.28 0 0 1-.079.201.272.272 0 0 1-.205.082.301.301 0 0 1-.271-.177l-.41-.983h-2.144l-.41.984a.3.3 0 0 1-.271.176.272.272 0 0 1-.205-.082Zm1.107-1.601h1.702l-.851-2.05-.851 2.05Zm4.007 1.601a.895.895 0 0 1-.514-.832c0-.311.123-.56.37-.744.245-.185.606-.278 1.08-.278h.764v-.05c0-.277-.069-.477-.205-.6-.137-.121-.35-.182-.64-.182-.16 0-.302.013-.426.038a3.552 3.552 0 0 0-.413.113.355.355 0 0 1-.082.013.224.224 0 0 1-.164-.07.233.233 0 0 1-.07-.17c0-.113.055-.193.165-.24a2.77 2.77 0 0 1 1.09-.226c.29 0 .535.059.735.176.2.118.347.27.442.457.095.189.143.398.142.609v1.785c0 .08-.029.147-.086.201a.285.285 0 0 1-.205.082.274.274 0 0 1-.201-.082.275.275 0 0 1-.082-.201v-.165c-.311.32-.707.48-1.186.48a1.171 1.171 0 0 1-.514-.114Zm1.265-.526a1.49 1.49 0 0 0 .435-.338v-.53h-.688c-.635 0-.952.167-.952.5 0 .15.052.272.155.365.103.092.274.139.514.139.187-.001.37-.048.536-.136Z"
/>
<path
  fill="#000"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#F8ABAA"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.apk':
      return `<path
  fill="#0CA647"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#fff"
  d="m12.96 25.067-.275-.81h-1.407l-.276.81h-1.13l1.59-4.267h1.03l1.59 4.267h-1.121Zm-1.37-1.71h.782l-.395-1.132-.386 1.131Zm2.833 1.71V20.8h1.82c.442 0 .8.129 1.067.377.276.248.405.58.405.993 0 .414-.129.745-.405.993-.266.248-.625.368-1.066.368h-.727v1.536h-1.094Zm1.094-2.465h.607a.594.594 0 0 0 .377-.11.43.43 0 0 0 .129-.322.415.415 0 0 0-.129-.322c-.092-.082-.22-.12-.377-.12h-.607v.874Zm5.242 2.465-1.14-1.757-.36.387v1.37h-1.094V20.8h1.095v1.444l1.324-1.444H22l-1.619 1.72 1.748 2.547h-1.37Z"
/>
<path
  fill="#000"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#8DDCAB"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.ai':
      return `<path
  fill="#300"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#FF9A00"
  d="M16.051 22.65h-2.385l-.616 1.779c-.007.058-.044.088-.111.088h-1.12c-.075 0-.1-.037-.078-.11l2.16-6.418c.062-.196.092-.4.09-.604a.06.06 0 0 1 .04-.064.06.06 0 0 1 .027-.003h1.567c.046 0 .072.019.08.055l2.417 7.045c.023.067.004.099-.056.099h-1.253a.116.116 0 0 1-.112-.067l-.65-1.8Zm-2.118-1.2h1.858c-.045-.097-.88-2.794-.94-3.021h-.011l-.908 3.022Zm5.526-2.799a.786.786 0 0 1-.574-.214.77.77 0 0 1-.22-.58.78.78 0 0 1 .226-.585.8.8 0 0 1 .58-.22.768.768 0 0 1 .58.22.805.805 0 0 1 .213.586.772.772 0 0 1-.22.58.805.805 0 0 1-.585.213Zm-.661 5.765v-5.142a.078.078 0 0 1 .053-.086.08.08 0 0 1 .036-.003h1.155a.079.079 0 0 1 .085.053.08.08 0 0 1 .004.036v5.153a.078.078 0 0 1-.022.067.08.08 0 0 1-.067.023h-1.144a.087.087 0 0 1-.075-.026.09.09 0 0 1-.025-.075Z"
/>
<path
  fill="#fff"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#FF9A00"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.js':
      return `<path
  fill="#F3BA2C"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#fff"
  d="M12.546 23.858c.103.018.206.028.31.028.43 0 .646-.206.646-.61V19.79h1.256v3.561c0 .553-.14.975-.422 1.266-.272.281-.656.43-1.143.43-.197 0-.413-.018-.647-.065v-1.124Zm4.874 1.209a2.15 2.15 0 0 1-1.387-.478c-.394-.328-.61-.722-.638-1.2l1.144-.328c.028.253.131.468.31.637a.91.91 0 0 0 .627.253.793.793 0 0 0 .469-.131.372.372 0 0 0 .178-.328.364.364 0 0 0-.14-.29.97.97 0 0 0-.366-.197c-.15-.047-.319-.104-.506-.15a3.358 3.358 0 0 1-.563-.197 2.346 2.346 0 0 1-.497-.282 1.24 1.24 0 0 1-.374-.459 1.566 1.566 0 0 1-.141-.684c0-.431.187-.787.553-1.069.366-.29.806-.43 1.322-.43.506 0 .956.121 1.34.374.375.244.61.572.703.975l-1.19.497c-.057-.225-.15-.403-.3-.534a.815.815 0 0 0-.553-.197c-.17 0-.3.037-.404.103a.318.318 0 0 0-.14.272c0 .112.066.197.197.271.122.066.28.122.478.15a4.224 4.224 0 0 1 1.247.431c.187.113.346.291.477.526.132.234.188.515.188.852 0 .479-.188.872-.563 1.172-.374.29-.862.44-1.471.44Z"
/>
<path
  fill="#000"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#F8DFA3"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.gif':
      return `<path
  fill="#41A5EE"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#fff"
  d="M13.297 25.067c-.394 0-.705-.083-.933-.249a1.326 1.326 0 0 1-.486-.694 3.352 3.352 0 0 1-.144-1.032V21.18c0-.404.051-.754.155-1.05.093-.283.28-.526.532-.687.25-.162.592-.243 1.024-.243.423 0 .755.07.997.211.233.132.416.338.518.585.108.278.16.575.155.873v.367h-1.233v-.466c0-.114-.008-.227-.024-.339a.468.468 0 0 0-.113-.248c-.059-.064-.154-.096-.286-.096-.136 0-.234.037-.295.11a.539.539 0 0 0-.117.27 2.237 2.237 0 0 0-.024.339v2.64c-.001.12.012.24.039.356.02.1.069.194.14.268a.394.394 0 0 0 .29.102.421.421 0 0 0 .303-.106.572.572 0 0 0 .148-.275c.029-.117.043-.238.042-.359v-.669h-.511v-.74h1.646v2.96h-.828l-.07-.473a1.022 1.022 0 0 1-.332.398c-.147.105-.344.158-.593.159Zm2.62-.085v-5.706h1.261v5.706h-1.26Zm2.114 0v-5.706h2.465v.853h-1.204v1.436h1.05v.88h-1.05v2.537H18.03Z"
/>
<path
  fill="#000"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#C0E5FF"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.xd':
      return `<path
  fill="#470137"
  d="M25.712 9.969v17.646a1.72 1.72 0 0 1-1.718 1.718H8.119a1.72 1.72 0 0 1-1.72-1.718V4.385c0-.948.772-1.718 1.72-1.718H18.41l7.302 7.302Z"
/>
<path
  fill="#FF61F6"
  d="m16.39 17.42-1.934 3.322 2.084 3.537c.042.072.024.107-.054.107h-1.3a.161.161 0 0 1-.16-.085l-1.466-2.69h-.01l-1.428 2.69a.157.157 0 0 1-.14.085h-1.249c-.071 0-.085-.035-.042-.107l2.048-3.44-1.952-3.44c-.042-.057-.028-.086.043-.086h1.302a.146.146 0 0 1 .139.075l1.375 2.658h.01l1.369-2.658a.147.147 0 0 1 .138-.075h1.184c.079 0 .092.036.043.108Zm3.176 7.097c-.76 0-1.344-.215-1.798-.645-.454-.43-.682-1.067-.682-1.909 0-.765.244-1.394.732-1.886a2.62 2.62 0 0 1 1.93-.8c.162-.002.322.015.479.052v-2.216a.054.054 0 0 1 .06-.062h1.198c.034 0 .05.02.05.062v6.205c0 .262.114.485.131.677a.082.082 0 0 1-.05.092c-.588.287-1.358.43-2.05.43Zm.664-1.014v-3.168c-.043-.075-.268-.14-.499-.14a1.282 1.282 0 0 0-1.008.448 1.915 1.915 0 0 0-.458 1.271c0 .574.196.967.452 1.24a1.303 1.303 0 0 0 .971.446c.244 0 .483-.036.542-.097Z"
/>
<path
  fill="#fff"
  d="m19.405 9.719 6.307 5.11V10.03l-3.578-2.078-2.729 1.766Z"
  opacity={0.19}
/>
<path
  fill="#FF61F6"
  d="M25.712 9.969H20.13A1.72 1.72 0 0 1 18.41 8.25V2.667l7.302 7.302Z"
/>`;
    case '.csv':
      return `<path
      fill="#23A566"
      d="M25.716 9.97v17.646c0 .95-.767 1.717-1.717 1.717H8.118c-.95 0-1.718-.767-1.718-1.717V4.384c0-.95.768-1.717 1.718-1.717h10.295l7.303 7.303Z"
    />
    <path
      fill="#fff"
      d="M13.048 23.616h.96c-.034.282-.144.55-.32.779-.17.21-.389.38-.64.491-.27.118-.563.18-.859.18-.276.01-.55-.038-.806-.14a1.912 1.912 0 0 1-.671-.45 2.094 2.094 0 0 1-.576-1.535 2.144 2.144 0 0 1 .565-1.536c.179-.196.4-.351.648-.455.248-.105.516-.156.787-.15.272-.005.542.046.792.15s.472.26.653.455c.228.255.374.568.421.9h-.954a.803.803 0 0 0-.315-.45 1.05 1.05 0 0 0-.587-.159 1.027 1.027 0 0 0-.439.086.989.989 0 0 0-.355.263 1.326 1.326 0 0 0-.299.896c-.014.325.096.643.31.896a1 1 0 0 0 .358.26c.139.059.29.087.441.083.192.01.381-.039.54-.14.16-.102.281-.25.346-.424Zm1.787.154h.88a.7.7 0 0 0 .286.424.753.753 0 0 0 .508.129.78.78 0 0 0 .47-.128.415.415 0 0 0 .132-.15.396.396 0 0 0 .043-.193.383.383 0 0 0-.074-.249.41.41 0 0 0-.219-.15c-.039 0-.217-.052-.533-.154a3.218 3.218 0 0 1-.95-.358c-.141-.1-.256-.231-.332-.383a.99.99 0 0 1-.105-.488c-.007-.17.025-.34.094-.498.07-.158.174-.299.306-.413a1.561 1.561 0 0 1 1.067-.343 1.73 1.73 0 0 1 1.066.317c.135.095.244.218.32.36a.99.99 0 0 1 .118.46h-.89a.512.512 0 0 0-.22-.315.55.55 0 0 0-.383-.085.687.687 0 0 0-.411.113.352.352 0 0 0-.155.302.323.323 0 0 0 .046.186.34.34 0 0 0 .146.131c.214.086.438.148.667.184.296.048.581.145.843.287.17.104.308.25.402.421.093.172.138.364.13.557a1.18 1.18 0 0 1-.147.621 1.24 1.24 0 0 1-.455.465c-.302.168-.648.25-.997.235a1.659 1.659 0 0 1-.775-.12 1.593 1.593 0 0 1-.622-.458 1.446 1.446 0 0 1-.256-.707Zm5.285 1.218-1.6-4.095h.954l1.04 2.764.891-2.764h.933l-1.413 4.095h-.805Z"
    />
    <path
      fill="#000"
      d="m19.394 9.704 6.322 5.121v-4.808L22.13 7.934l-2.736 1.77Z"
      opacity={0.19}
    />
    <path
      fill="#8ED1B1"
      d="M25.716 9.97H20.13c-.95 0-1.717-.767-1.717-1.717V2.667l7.303 7.303Z"
    />
  `;
    case '.xlsx':
      return `<path
      fill="#23A566"
      d="M25.716 9.97v17.646c0 .95-.767 1.717-1.717 1.717H8.118c-.95 0-1.718-.767-1.718-1.717V4.384c0-.95.768-1.717 1.718-1.717h10.295l7.303 7.303Z"
    />
    <path
      fill="#fff"
      d="M13.048 23.616h.96c-.034.282-.144.55-.32.779-.17.21-.389.38-.64.491-.27.118-.563.18-.859.18-.276.01-.55-.038-.806-.14a1.912 1.912 0 0 1-.671-.45 2.094 2.094 0 0 1-.576-1.535 2.144 2.144 0 0 1 .565-1.536c.179-.196.4-.351.648-.455.248-.105.516-.156.787-.15.272-.005.542.046.792.15s.472.26.653.455c.228.255.374.568.421.9h-.954a.803.803 0 0 0-.315-.45 1.05 1.05 0 0 0-.587-.159 1.027 1.027 0 0 0-.439.086.989.989 0 0 0-.355.263 1.326 1.326 0 0 0-.299.896c-.014.325.096.643.31.896a1 1 0 0 0 .358.26c.139.059.29.087.441.083.192.01.381-.039.54-.14.16-.102.281-.25.346-.424Zm1.787.154h.88a.7.7 0 0 0 .286.424.753.753 0 0 0 .508.129.78.78 0 0 0 .47-.128.415.415 0 0 0 .132-.15.396.396 0 0 0 .043-.193.383.383 0 0 0-.074-.249.41.41 0 0 0-.219-.15c-.039 0-.217-.052-.533-.154a3.218 3.218 0 0 1-.95-.358c-.141-.1-.256-.231-.332-.383a.99.99 0 0 1-.105-.488c-.007-.17.025-.34.094-.498.07-.158.174-.299.306-.413a1.561 1.561 0 0 1 1.067-.343 1.73 1.73 0 0 1 1.066.317c.135.095.244.218.32.36a.99.99 0 0 1 .118.46h-.89a.512.512 0 0 0-.22-.315.55.55 0 0 0-.383-.085.687.687 0 0 0-.411.113.352.352 0 0 0-.155.302.323.323 0 0 0 .046.186.34.34 0 0 0 .146.131c.214.086.438.148.667.184.296.048.581.145.843.287.17.104.308.25.402.421.093.172.138.364.13.557a1.18 1.18 0 0 1-.147.621 1.24 1.24 0 0 1-.455.465c-.302.168-.648.25-.997.235a1.659 1.659 0 0 1-.775-.12 1.593 1.593 0 0 1-.622-.458 1.446 1.446 0 0 1-.256-.707Zm5.285 1.218-1.6-4.095h.954l1.04 2.764.891-2.764h.933l-1.413 4.095h-.805Z"
    />
    <path
      fill="#000"
      d="m19.394 9.704 6.322 5.121v-4.808L22.13 7.934l-2.736 1.77Z"
      opacity={0.19}
    />
    <path
      fill="#8ED1B1"
      d="M25.716 9.97H20.13c-.95 0-1.717-.767-1.717-1.717V2.667l7.303 7.303Z"
    />
  `;
    case '.figma':
      return `<path
    fill="#1E1E1E"
    d="M25.716 9.97v17.646c0 .95-.767 1.717-1.717 1.717H8.118c-.95 0-1.718-.767-1.718-1.717V4.384c0-.95.768-1.717 1.718-1.717h10.295l7.303 7.303Z"
  />
  <path
    fill="#fff"
    d="m19.394 9.704 6.322 5.121v-4.808L22.13 7.934l-2.736 1.77Z"
    opacity={0.08}
  />
  <path
    fill="#696969"
    d="M25.716 9.97H20.13c-.95 0-1.717-.767-1.717-1.717V2.667l7.303 7.303Z"
  />
  <path
    fill="#00BCFF"
    d="M16.205 20.267a1.956 1.956 0 1 1 3.912 0 1.956 1.956 0 0 1-3.912 0Z"
  />
  <path
    fill="#00CF7F"
    d="M12.294 24.178c0-1.08.876-1.956 1.956-1.956l1.042-.55.913.55v1.956a1.956 1.956 0 0 1-3.91 0Z"
  />
  <path
    fill="#FF7361"
    d="m16.205 14.4-1.064 1.849 1.064 2.062h1.928a1.956 1.956 0 1 0 0-3.911h-1.928Z"
  />
  <path
    fill="#FF4D12"
    d="M12.267 16.355c0 1.08.875 1.956 1.955 1.956l1.037.4.946-.4V14.4h-1.983c-1.08 0-1.955.875-1.955 1.955Z"
  />
  <path
    fill="#B659FF"
    d="M12.294 20.267c0 1.08.876 1.955 1.956 1.955h1.955v-3.91H14.25c-1.08 0-1.956.875-1.956 1.955Z"
  />`;
    case '.otf':
      return `<path
    fill="#E31A60"
    d="M25.716 9.97v17.646c0 .95-.767 1.717-1.717 1.717H8.118c-.95 0-1.718-.767-1.718-1.717V4.384c0-.95.768-1.717 1.718-1.717h10.295l7.303 7.303Z"
  />
  <path
    fill="#000"
    d="m19.394 9.704 6.322 5.121v-4.808L22.13 7.934l-2.736 1.77Z"
    opacity={0.19}
  />
  <path
    fill="#ED8BAC"
    d="M25.716 9.97H20.13c-.95 0-1.717-.767-1.717-1.717V2.667l7.303 7.303Z"
  />
  <path
    fill="#fff"
    d="M12.61 25.163c-1.226 0-1.943-.926-1.943-2.103 0-1.238.79-2.164 2.01-2.164 1.27 0 1.962.95 1.962 2.09 0 1.355-.822 2.177-2.03 2.177Zm5.828-4.199h2.525v.766h-1.587v.944h1.483v.76h-1.483v1.662h-.938v-4.132Zm-.496 0v.785h-1.128v3.347h-.937v-3.347h-1.11v-.785h3.175Z"
  />
  <path
    fill="#E31A60"
    d="M12.653 21.638c-.632 0-1 .6-1 1.404 0 .81.38 1.38 1.006 1.38.631 0 .993-.601.993-1.404 0-.742-.356-1.38-1-1.38Z"
  />`;
    default:
      return `<path
      fill="#637282"
      fillRule="evenodd"
      d="M19.2 10.667a3.2 3.2 0 1 0 6.4 0 3.2 3.2 0 0 0-6.4 0ZM13.216 15.1c-.188-.232-.49-.233-.677-.008l-7.113 8.535c-.185.221-.103.408.188.408h20.762c.29 0 .384-.192.207-.428L22.55 18.23c-.176-.235-.479-.248-.673-.025l-2.833 3.244a.436.436 0 0 1-.69-.013L13.216 15.1Z"
      clipRule="evenodd"
    />`;
  }
};

export const generateRandomFilename = () => {
  let lastTimestamp = 0;
  let timestamp = Date.now();
  if (timestamp <= lastTimestamp) {
    timestamp = lastTimestamp + 1;
  }
  lastTimestamp = timestamp;
  return timestamp;
};

export const convertBase64ToFile = async (base64String: any, isScreenRecording?: boolean) => {
  if (base64String?.startsWith('blob:')) {
    base64String = await convertBlobUrlToDataUrl(base64String);
  }
  if (isEmpty(base64String)) return;
  const cleanedBase64String = base64String?.replace(/^data:(.*?;base64,)?/, '');
   
  const contentType = base64String?.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-+.]+)?;base64,(.+)$/)?.[1];
  const extension = contentType?.split('/')[1];
  const fileName = isScreenRecording ? `Screen_recording_${nanoid(8)}.mp4` : `file.${extension}`;

  try {
    const decodedString = atob(cleanedBase64String);
    const byteNumbers = new Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
      byteNumbers[i] = decodedString.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    const file = new File([blob], fileName, { type: contentType });
    return file;
  } catch (error) {
    console.error(error);
    console.error('Error decoding base64 string: ', error);
  }
};

export const getIsDarkMode = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return isDark;
};

export const calculateEndTime = (startTime: string, totalHours: number): string => {
  const startDate = new Date(startTime);
  const endDate = new Date(startDate.getTime() + totalHours * 60 * 60 * 1000);

  // Format the date as a string in the same format as the input
  const endTimeString = endDate.toISOString();

  return endTimeString;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Format time as "7:58 pm"
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Format date as "Sep 29"
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return { time, formattedDate };
};

export const countDays = (dateString: string) => {
  const currentDate = moment();
  const targetDate = moment(dateString);
  const daysDifference = targetDate.diff(currentDate, 'days') + 1;
  return daysDifference;
};

export const replaceWhiteSpaceWithUnderscore = (str: string) => {
  return str.replace(/\s+/g, '_');
};

export const fetchAndConvertToBase64 = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read image as data URL.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read image as data URL.'));
    };
    reader.readAsDataURL(blob);
  });
};

export const convertBlobUrlToDataUrl = (blobUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!blobUrl.startsWith('blob')) {
      // If it's not a Blob URL, resolve immediately with the original URL
      resolve(blobUrl);
    } else {
      // Create a new XMLHttpRequest
      const xhr = new XMLHttpRequest();
      // Set the responseType to 'blob'
      xhr.responseType = 'blob';
      // Define the onload callback function
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Get the recovered Blob
          const recoveredBlob = xhr.response;

          // Create a new FileReader
          const reader = new FileReader();

          // Define the onload callback function for the FileReader
          reader.onload = function () {
            // Get the Blob as a data URL
            const blobAsDataUrl = reader.result as string;
            // Use the Blob as a regular URL
            resolve(blobAsDataUrl);
          };
          // Read the recovered Blob as a data URL
          reader.readAsDataURL(recoveredBlob);
        } else {
          // Reject the Promise if the request fails
          reject(new Error(`Failed to fetch Blob: ${xhr.status}`));
        }
      };
      // Open the XMLHttpRequest with the Blob URL
      xhr.open('GET', blobUrl);
      // Send the XMLHttpRequest
      xhr.send();
    }
  });
};

export const extensionName = (item: any) => {
  const filename = item?.name;
  const parts = filename?.split('.');
  const extension = parts?.length > 1 ? parts[parts?.length - 1] : '';
  return `.${isEmpty(extension) && !isEmpty(item?.file_type) ? item?.file_type : extension}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getCurrentDomain = () => {
  return window.location.hostname;
};
export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  let timeString = '';
  if (hours > 0) {
    timeString += `${hours.toString().padStart(2, '0')}h `;
  }
  timeString += `${minutes.toString().padStart(2, '0')}m ${remainingSeconds.toString().padStart(2, '0')}s`;
  return timeString;
};

export const getColorWithOpacity = (color: string) => {
  const rgbValues = color.match(/[0-9a-f]{2}/gi);
  if (rgbValues && rgbValues.length === 3) {
    // Convert RGB values to rgba format with opacity 0.9
    return `rgba(${parseInt(rgbValues[0], 16)}, ${parseInt(rgbValues[1], 16)}, ${parseInt(rgbValues[2], 16)}, 0.9)`;
  } else {
    // If the color format is not supported or invalid, return null or original color
    return null;
  }
};

export const isMediaRecordingSupported = () => {
  return navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia === 'function';
};

// Helper function to push to dataLayer got google conversation tracking
export const pushToDataLayer = (data: any) => {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer.push(data);
  }
};

//Add this code in function for google converstion Leads traking from the web
// pushToDataLayer({
//   event: 'Search Widget Detailed Inquiry',
//   email: formik?.values?.email,
//   phone :  selectedCountry?.dial_code + String(formik?.values?.phone) || "",
//   user : { name :"abc", address :  "xyz"}
// });
