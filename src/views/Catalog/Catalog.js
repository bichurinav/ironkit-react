import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCards } from '../../redux/reducers/catalogReducer';
import LoadingCards from '../../components/LoadingCards/LoadingCards';
import uniqid from 'uniqid';
import Card from './../../components/Card/Card';
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
                if (!req.ok) {
                    throw new Error('Комплектующих нет!');
                }
                setTimeout(() => {
                    setLoading(false);
                    dispatch(setCards(res));
                }, 300);
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
