const replacePhoto = () => {
    const commandPhoto = document.getElementById('command');
    let base;
    
    commandPhoto.addEventListener('mouseover', event => {
        const target = event.target;
        if (target.matches('img')) {
            base = target.src;
            target.src = target.dataset.img;
            target.dataset.img = base;
        }
        });
        commandPhoto.addEventListener('mouseout', event => {
        const target = event.target;
        if (target.matches('img')) {
            base = target.src;
            target.src = target.dataset.img;
            target.dataset.img = base;
        }
        });
};
export default replacePhoto;