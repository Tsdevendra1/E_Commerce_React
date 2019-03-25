import * as React from 'react';

export default function closeAnywhereToClose(capsuleElementInfo: string, clickTargetInfo: string, activeStateIndicator: string, event: React.MouseEvent<HTMLElement>, eventTargetAlsoClickToClose: boolean) {
    let capsuleElement = (document.querySelector(capsuleElementInfo) as HTMLElement);
    let clickTargetElement = (document.querySelector(clickTargetInfo) as HTMLElement);
    if (capsuleElement && clickTargetElement){
        if (!capsuleElement.contains((event.target as Element)) && clickTargetElement.classList.contains(activeStateIndicator)) {
            clickTargetElement.click();

            // We click again because for some reason when you click on an element which has a similar
            // clickAnhwhereToClose function, it only registers the first click (which is done by javascript) and
            // doesn't perform the second one done by the actual user
            if (eventTargetAlsoClickToClose){
                (event.target as HTMLElement).click();
            }
        }
    }
}