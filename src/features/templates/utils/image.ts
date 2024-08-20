export const getImageFitContainerDimensions = (containerWidth: number, containerHeight: number, imageWidth: number, imageHeight: number): {width: number, height: number} => {
    if(containerWidth < containerHeight) {
        if(imageWidth < imageHeight){
            return { width: containerWidth, height: imageHeight / (imageWidth / containerWidth) };
        }else {
            return { width: imageWidth / (imageHeight / containerHeight), height: containerHeight };
        }
    } else {
        if(imageWidth < imageHeight){
            return { width: containerWidth, height: imageHeight / (imageWidth / containerWidth) };
        }else {
            return { width: imageWidth / (imageHeight / containerHeight), height: containerHeight };
        }
    }
};