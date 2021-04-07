export const formatPrice = (price) => {
    const arrNums = price.toString().split('');
    const length = arrNums.length;
    let offset = 0;
    if (length > 3 && length < 7) {
        offset = 1;
        while (length - offset !== 3) {
            offset++;
        }
        const firstPart = [...arrNums].splice(0, offset).join('');
        const secondPart = [...arrNums].splice(offset).join('');
        return getFormatRU(firstPart + ' ' + secondPart);
    }
    return getFormatRU(price);
    function getFormatRU(price) {
        return '≈ ' + price + ' ₽';
    }
};
