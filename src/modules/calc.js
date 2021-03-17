const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

const countSum = () => {
    let total = 0,
    countValue = 1,
    dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

    if(calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
    }
    
    if(calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
    }

    if(typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
    }

    //Анимация total для калькулятора
    const animateCalc = ({timing, draw, duration}) => {

    let start = performance.now();
    
    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
    
        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);
    
        draw(progress); // отрисовать её
    
        if (timeFraction < 1) {
        requestAnimationFrame(animate);
        }
    
    });
    };
    animateCalc({

        duration: 1500,
        timing(timeFraction) {
        return timeFraction;
        },
        draw(progress) {
            totalValue.textContent = Math.floor(total * progress);
        }
    });

    totalValue.textContent = total;
};        


calcBlock.addEventListener('change', (event) => {
    const target = event.target;

    if(target.matches('select') || target.matches('input')) {
        countSum();
    }

})    
};
export default calc;