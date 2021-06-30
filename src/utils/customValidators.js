export function noSpaces(value, helpers){
  const reg = new RegExp(/^(?!\s)[0-9a-zA-Z!@#$%^&*()-_+=`~|]+$/);
  if(value.match(reg)){
    throw new Error('You may not use spaces in tags.');
  }

  return value;

};