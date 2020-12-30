 const changeImg = () => {
        const imgContainer = document.querySelector('.command');
        let imgSrc;

        imgContainer.addEventListener('mouseover', event => {
            const target = event.target;

            if (target.closest('.command__photo')) {
                imgSrc = target.src;
                target.src = target.dataset.img;
            }
        });

        imgContainer.addEventListener('mouseout', event => {
            const target = event.target;

            if (target.closest('.command__photo')) {
                target.src = imgSrc;
            }
        });
    };

    export default changeImg;