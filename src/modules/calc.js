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

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            counterAnimation(total, totalValue);
        };

          const counterAnimation = (num, elem) => {
        let time = 10;

        let step = 100,
            count = 0;

        if (num > 10000 && num <= 30000) {
            time = 20;
        } else if (num > 30000 && num <= 100000) {
            time = 60;
        } else if (num > 100000) {
            time = 100;
        }

        const speed = Math.round(time / (num / step));

        let interval = setInterval(() => {
            if (count < num) {
                count += step;
                elem.textContent = count;
            }
        }, speed);

    };

        calcBlock.addEventListener('change', event => {
            const target = event.target;

            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount) {

                countSum();
            }
        });

        calcBlock.addEventListener('input', event => {
            const target = event.target;

            if (target === calcSquare || target === calcDay || target === calcCount) {
                target.value = target.value.replace(/\D/g, "");
            }
        });
    };

    export default calc;