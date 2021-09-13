let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPosition;

let items = [...document.querySelectorAll('.slider-item')];
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, index) => {
    image.style.backgroundImage = `url(./images/${index+1}.png)`
})

items.forEach(item => {
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
})

function getClonesWidth() {
    let width = 0;
    clones.forEach(clone => {
        width += clone.offsetWidth;
    })
    return width;
}

function getScrollPosition() {
    return window.scrollY;
}

function setScrollPosition(position) {
    window.scrollTo({top: position})
}

function scrollUpdate() {
    scrollPosition = getScrollPosition();
    if(clonesWidth + scrollPosition >= sliderWidth) {
        window.scrollTo({top: 1});
    }else if(scrollPosition <= 0){
        window.scrollTo({top: sliderWidth - clonesWidth - 1})
    }

    slider.style.transform = `translateX(${-window.scrollY}px)`

    requestAnimationFrame(scrollUpdate)
}

function onLoad() {
    calculateDimensions();
    document.body.style.height = `${sliderWidth}px`;
    window.scrollTo({top: 1});
    scrollUpdate();

}

function calculateDimensions() {
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}

onLoad();