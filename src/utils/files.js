export const acceptableFileTypesHtml = ".xls,.xlsx,.csv,.doc,.docx,.txt,.png,.gif,.jpg,.mp4,.pdf";
export const acceptableFileTypes = ['.xls','.xlsx','.csv','.doc','.docx','.txt','.png','.gif','.jpg','.mp4','.pdf'];
export const pictureFileTypes = ['.png','.gif','.jpg'];
export const videoFileTypes = [".mp4"];

//returns the file type given a filename
//e.g. filename.js returns 'js'
export function determineFileType(name){
  return name.split(".")[1];
};

export default {
  acceptableFileTypesHtml,
  acceptableFileTypes,
  pictureFileTypes,
  videoFileTypes,
  determineFileType
};