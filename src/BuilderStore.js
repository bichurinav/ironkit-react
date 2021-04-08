import { setCount } from './redux/reducers/builderReducer';
import { store } from './redux/store';

function BuilderStore() {
    let builderStore = JSON.parse(localStorage.getItem('builderCards')) || [];
    let count = +localStorage.getItem('builderCount') || 0;

    return {
        set(card) {
            const existComponent = builderStore.filter(
                (el) => el.component === card.component
            )[0];

            if (existComponent) return false;
            if (!existComponent) {
                const changeableStore = JSON.stringify([...builderStore, card]);
                localStorage.setItem('builderCards', changeableStore);
                count += 1;
                store.dispatch(setCount(count));
                localStorage.setItem('builderCount', count);
                return true;
            }
        },
        get() {
            return builderStore;
        },
        count() {
            return count;
        },
    };
}

export default BuilderStore;
