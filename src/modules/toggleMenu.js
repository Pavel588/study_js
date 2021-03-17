const toggleMenu = () => {

    const menu = document.querySelector('menu');
    const btnMenu = document.querySelector('.menu');    
    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    }; 
    btnMenu.addEventListener('click', handlerMenu);   
    menu.addEventListener('click', (event) => {
        let target = event.target;
        
        if(target.classList.contains('close-btn') || target.closest('.menu') || target.matches('menu>ul>li>a')){
            handlerMenu();
        } 
    })
};
export default toggleMenu;