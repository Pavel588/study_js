const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
    popupBtn = document.querySelectorAll('.popup-btn');
    

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            if (document.documentElement.clientWidth > 768) {
                popup.style.display = "block";
                popup.style.opacity = "0%";
                let counter = 0;
                const popupFadeIn = () => {
                    if (counter < 100) {
                        ++counter;
                        popup.style.opacity = counter + "%";
                    } else {
                        clearInterval(timer);
                    }
                };
                const timer = setInterval(popupFadeIn, 7);
            } else {
                popup.style.display = "block";
            }
        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;
        if(target.classList.contains('popup-close')){
            popup.style.display = 'none';
        } else { 
            target = target.closest('.popup-content');
            
            if(!target){
                popup.style.display = 'none';
            }
        }
    });

    

};
export default togglePopUp;