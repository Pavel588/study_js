const formValidation = () => {
    const calcItems = document.querySelectorAll('.calc-item'),
        inputName = document.querySelectorAll('input[name="user_name"]'),
        inputEmail = document.querySelectorAll('.form-email'),
        inputPhone = document.querySelectorAll('.form-phone'),
        inputMessage = document.querySelector('.mess');
        

    calcItems.forEach((item, index) => {
        item.addEventListener('input', () => {
            if (index === 0) {
                return;
            }
            item.value = item.value.replace(/[^\d]/g, '');
        });
    });

    inputName.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^а-я\s]/gi, '').replace(/\s+/g, " ");
        });
    });

  
    inputMessage.addEventListener('input', () => {

        inputMessage.value = inputMessage.value.replace(/[^-а-я\s0-9.,?!]/gi, '').replace(/-+/g, '-');
    });
      
    inputEmail.forEach((item) => {

        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^a-z@\-_.!~*']/gi, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');
        });
    });
  
    inputPhone.forEach((item) => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/[^+\d-()]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, ' ');
            if (item.value.length > 16) {
                item.value = item.value.slice(0, 15);
            }
        });
    });

    document.addEventListener('blur', (event) => {
        const target = event.target;
        if (target.matches('.form-email')){
            target.value = target.value.replace(/^-/g, '').replace(/-$/g, '');
        }
    }, true);   
};
export default formValidation;