import { setCount, setCards } from './redux/reducers/builderReducer';
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
                const changeableStore = [...builderStore, card];
                localStorage.setItem(
                    'builderCards',
                    JSON.stringify(changeableStore)
                );
                count += 1;
                localStorage.setItem('builderCount', count);
                store.dispatch(setCount(count));
                store.dispatch(setCards(changeableStore));
                return true;
            }
        },
        get() {
            return builderStore;
        },
        delete(card) {
            const changeableStore = builderStore.filter((el) => {
                return el.component !== card.component;
            });
            localStorage.setItem(
                'builderCards',
                JSON.stringify(changeableStore)
            );
            count -= 1;
            store.dispatch(setCount(count));
            store.dispatch(setCards(changeableStore));
            localStorage.setItem('builderCount', count);
        },
        count() {
            return count;
        },
    };
}

export default BuilderStore;
