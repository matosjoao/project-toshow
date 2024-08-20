import { ArtPanelElement } from "../types";

export const measureText = (element: ArtPanelElement) => {
    const tempElement = document.createElement('p');
    tempElement.innerText = element.text || '';
    tempElement.style.position = 'absolute';
    tempElement.style.wordBreak = 'break-word';
    tempElement.style.width = `${element.width}px`;
    const cssProperties = element.style;
    if(cssProperties) {
        for (const key in cssProperties) {
            if (Object.hasOwnProperty.call(cssProperties, key)) {
                tempElement.style[key] = cssProperties[key];
            }
        }
    }
    document.body.appendChild(tempElement);
    const { width, height } = tempElement.getBoundingClientRect();
    document.body.removeChild(tempElement);
    return { width, height };
};


