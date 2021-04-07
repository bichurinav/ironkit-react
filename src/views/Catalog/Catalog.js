import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCards } from '../../redux/reducers/catalogReducer';
import IconButton from './../../components/IconButton/IconButton';
import LoadingCards from '../../components/LoadingCards/LoadingCards';
import { formatPrice } from './../../utils';
import { Link, useRouteMatch } from 'react-router-dom';
import uniqid from 'uniqid';
import box from './box.svg';
import './Catalog.scss';

export default function Catalog() {
    let { component } = useParams();
    const dispatch = useDispatch();
    const components = useSelector((state) => state.catalog.cards);
    const [loading, setLoading] = useState(true);
    const getComponent = (component) => {
        return async (dispatch) => {
            try {
                setLoading(true);
                const req = await fetch(`/api/component/${component}`);
                const res = await req.json();
                if (!res.length) {
                    throw new Error('Комплектующих нет!');
                }
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setCards(res));
                }, 500);
            } catch (e) {
                setLoading(true);
                dispatch(setCards([]));
            }
        };
    };

    useEffect(() => {
        dispatch(getComponent(component));
    }, [component, dispatch]);

    return (
        <div className="catalog">
            <div className="catalog__inner">
                {!loading ? (
                    <>
                        <div className="catalog__filter"></div>
                        <div className="catalog__content">
                            {components.map((card) => (
                                <Card key={uniqid()} card={card} />
                            ))}
                        </div>
                    </>
                ) : (
                    <LoadingCards />
                )}
            </div>
        </div>
    );
}

function Card({ card }) {
    const params = JSON.parse(card.params);
    const arParams = Object.keys(params);
    const paramFirst = arParams[0];
    const paramSecond = arParams[1];
    const paramThird = arParams[2];
    const { url } = useRouteMatch();

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
                        to={`${url}/${card.id}`}
                    >
                        подробнее
                    </Link>
                </div>
                <span className="card__price">{formatPrice(card.price)}</span>
                <IconButton className="card__btn-box" icon={box} size={40} />
            </div>
        </div>
    );
}
