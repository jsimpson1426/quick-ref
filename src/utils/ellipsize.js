//if 'someText' has a length greater than 'maxLength' 
//then this takes 'someText' and minimizes it to be length 'maxLength'
//by slicing off from the end. Afterwards and ellipsis is added and that
//string is returned.
//
//if 'someText' has a length less than or equal to 'maxLength'
//then this returns 'someText'
export function ellipsize(someText, maxLength){
    if(maxLength == null){
        return someText;
    }
    return someText.length <= maxLength ? someText : someText.substring(0,maxLength) + "...";
}