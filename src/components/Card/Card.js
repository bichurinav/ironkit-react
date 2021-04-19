import React from 'react';
import { formatPrice } from './../../utils';
import BuilderStore from './../../BuilderStore';
import IconButton from './../IconButton/IconButton';
import { Link, useRouteMatch } from 'react-router-dom';
import { setActiveMore } from './../../redux/reducers/builderReducer';
import { useSelector, useDispatch } from 'react-redux';
import boxIcon from './box.svg';
import deleteIcon from './delete.svg';
import './Card.scss';

function Card({ card, builder = false }) {
    const params = JSON.parse(card.params);
    const arParams = Object.keys(params);
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.catalog.menu);
    const activeMore = useSelector((state) => state.builder.activeMore);

    const paramFirst = arParams[0];
    const paramSecond = arParams[1];
    const paramThird = arParams[2];
    const { url } = useRouteMatch();

    const putComponentInBuilder = (card) => {
        const isChange = BuilderStore().set(card);
        if (!isChange) {
            const component = menu.filter(
                (el) => el.component === card.component
            )[0];
            alert(`${component.name} уже лежит в сборщике!`);
        }
    };

    const activeBuilderMore = () => {
        if (builder) {
            if (!activeMore) {
                dispatch(setActiveMore(true));
            }
        } else {
            if (activeMore) {
                dispatch(setActiveMore(false));
            }
        }
    };

    return (
        <div className="card">
            <div className="card__inner">
                <img className="card__image" src={'../' + card.image} alt="" />
                <div className="card__info">
                    <h2 className="card__name">{card.name}</h2>
                    <div className="card__params">
                        <div className="card__param">
                            {paramFirst}: {params[paramFirst]}
                        </div>
                        <div className="card__param">
                            {paramSecond}: {params[paramSecond]}
                        </div>
                        <div className="card__param">
                            {paramThird}: {params[paramThird]}
                        </div>
                    </div>
                    <Link
                        className="primary card__more"
                        onClick={() => activeBuilderMore()}
                        to={`${builder ? `cards/${card.component}` : url}/${
                            card.id
                        }`}
                    >
                        подробнее
                    </Link>
                </div>
                <span className="card__price">{formatPrice(card.price)}</span>
                {!builder ? (
                    <IconButton
                        className="card__btn-box"
                        onClick={() => {
                            putComponentInBuilder(card);
                        }}
                        icon={boxIcon}
                        size={40}
                    />
                ) : (
                    <IconButton
                        className="card__btn-del"
                        onClick={() => {
                            BuilderStore().delete(card);
                        }}
                        icon={deleteIcon}
                        size={30}
                    />
                )}
            </div>
        </div>
    );
}

export default Card;
