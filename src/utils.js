import BuilderStore from './BuilderStore';

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

export const checkAuth = async () => {
    try {
        const req = await fetch('/api/users/auth');
        const res = await req.json();
        if (res.login) {
            return res;
        }
    } catch (e) {
        console.error(e);
    }
};

export const removeAuth = async () => {
    try {
        const req = await fetch('/api/users/auth-exit');
        const res = await req.json();
        if (res.auth === false) {
            return res;
        }
        return res;
    } catch (e) {
        console.error(e);
    }
};

export const putComponentInBuilder = (card, menu) => {
    if (card.count < 1)
        return alert(`На складе больше не осталось ${card.name}`);
    const isChange = BuilderStore().set(card);
    if (!isChange) {
        const component = menu.filter(
            (el) => el.component === card.component
        )[0];
        return alert(`${component.name} уже лежит в сборщике!`);
    }
    return true;
};
