export function scrollAndHighlight(elementCoordinates) {
    // Extracting coordinates
    const { top, left, bottom, right, width, height } = elementCoordinates;

    // Scroll to the element
    window.scrollTo({
        top: top - (window.innerHeight / 2) + (height / 2),
        left: left - (window.innerWidth / 2) + (width / 2),
        behavior: 'smooth'
    });

    // Highlight the element
    const highlight = document.createElement('div');
    highlight.style.position = 'absolute';
    highlight.style.border = '2px solid red';
    highlight.style.top = `${top}px`;
    highlight.style.left = `${left}px`;
    highlight.style.bottom = `${bottom}px`;
    highlight.style.right = `${right}px`;
    highlight.style.height = `${height}px`;
    highlight.style.width = `${width * 8}px`;
    highlight.style.zIndex = '9999';

    document.body.appendChild(highlight);
}

// export function populatePopup(darkPattern) {
    
// }

export function ajioHardcode() {
    scrollAndHighlight(document.querySelector(".stockleftsize").getBoundingClientRect());
}
