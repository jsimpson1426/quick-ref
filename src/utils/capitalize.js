export function capitalize(stringToCapitalize){
  if(stringToCapitalize){
    try{
      return stringToCapitalize[0].toUpperCase() + stringToCapitalize.slice(1);
    } catch (err){
      console.log(err);
    }
  }
  else
    return "";
}