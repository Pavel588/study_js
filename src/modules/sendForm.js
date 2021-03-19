const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    
    const forms = document.querySelectorAll('form');

    
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size 2rem;';

    const postData = (body) => fetch('./server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            const target = event.target;
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.style.color = 'white';
            const formElem = [...target.elements].filter(item => item.tagName.toLowerCase() !== 'button');
            const formData = new FormData(target);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            if (formElem[0].value !== '' && formElem[1].value !== '' &&  formElem[2].value !== '') {
                statusMessage.textContent = loadMessage;
                postData(body)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('network failed');
                    }
                    statusMessage.textContent = successMessage;
                    setTimeout(() => {
                        statusMessage.textContent = '';
                        if (target.id === 'form3') {
                            document.querySelector('.popup').style.display = 'none';
                        }
                    }, 3000);
                    formElem.forEach(item => {
                        item.value = '';
                    });

                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                    setTimeout(() => {
                        statusMessage.textContent = '';
                    }, 5000);
                });
            form.querySelectorAll('input').forEach((item) => {
                item.value = '';
            });
            } else {
                event.preventDefault();
                alert('Введите корректные данные в поля формы');
            }
        });

    });
};
export default sendForm;