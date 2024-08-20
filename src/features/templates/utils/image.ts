import { ArtPanelElement } from "../types";

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

export const getSvgColored = (element: ArtPanelElement) => {
    if(!element.shapeSvg) return undefined;

    let svgContainer: HTMLDivElement | null = document.createElement('div');
    svgContainer.innerHTML = element.shapeSvg;
    
    const svgElement = svgContainer.querySelector('svg');
    if (svgElement) {
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
    }

    const fillElements = svgContainer.querySelectorAll('[fill]');
    fillElements.forEach(function(fillElement, index) {
        const c = element.shapeColors ? element.shapeColors[index] : 'gray';
        fillElement.setAttribute('fill', c);
    });
    
    const html = svgContainer.innerHTML;
    svgContainer = null;
    return html;
};

export const getBlobUrl = (element: ArtPanelElement) => {
    if(!element.shapeSvg) return undefined;

    let svgContainer: HTMLDivElement | null = document.createElement('div');
    svgContainer.innerHTML = element.shapeSvg;
    
    const fillElements = svgContainer.querySelectorAll('[fill]');

    fillElements.forEach(function(fillElement, index) {
        const c = element.shapeColors ? element.shapeColors[index] : 'gray';
        fillElement.setAttribute('fill', c);
    });
    
    const blob = new Blob([svgContainer.innerHTML], { type: 'image/svg+xml' });
    svgContainer = null;
    return URL.createObjectURL(blob);
};

export const getSVGColors = (svg: string) => {
    if(!svg) return [];

    let svgContainer: HTMLDivElement | null = document.createElement('div');
    svgContainer.innerHTML = svg;
    
    const fillElements = svgContainer.querySelectorAll('[fill]');

    const colors : string[] = [];
    fillElements.forEach(function(fillElement) {
        const c = fillElement.getAttribute('fill');
        colors.push( c == 'inherit' || !c ? 'gray' : c);
    });

    svgContainer = null;

    return colors;
};