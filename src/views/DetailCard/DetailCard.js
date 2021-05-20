import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { formatPrice } from './../../utils';
import IconButton from './../../components/IconButton/IconButton';
import { useSelector } from 'react-redux';
import { putComponentInBuilder } from './../../utils';
import uniqid from 'uniqid';
import load from './../../load.svg';
import back from './back.svg';
import './DetailCard.scss';

function DetailCard() {
    const activeBuilderMore = useSelector((state) => state.builder.activeMore);
    const menu = useSelector((state) => state.catalog.menu);
    const [card, setCard] = useState(null);
    const { id } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const component = url.split('/')[2];
    const apiUrl = `/api/component/${component}/${id}`;

    const formatParams = (params) => {
        return params.map((param) => {
            return (
                <div key={uniqid()} className="card-detail__param">
                    <span className="param-name">{param.name}:</span>{' '}
                    <span className="param-value">{param.value}</span>
                </div>
            );
        });
    };

    const getDetailCard = async (url, history, component) => {
        try {
            const req = await fetch(url);
            const res = await req.json();
            if (!req.ok) {
                throw new Error(res.error);
            }
            setTimeout(() => {
                setCard(res);
            }, 300);
        } catch (e) {
            return history.push(`/cards/${component}`);
        }
    };

    useEffect(() => {
        getDetailCard(apiUrl, history, component);
    }, [history, apiUrl, component]);

    return card ? (
        <div className="card-detail">
            <IconButton
                onClick={() => {
                    if (history.action === 'POP') {
                        history.push(`/cards/${card.component}`);
                    } else {
                        history.goBack();
                    }
                }}
                className="card-detail__back"
                icon={back}
                size={28}
            />
            <h2 className="card-detail__name">{card.name}</h2>
            <div className="card-detail__inner">
                <div className="card-detail__block">
                    <div className="card-detail__image">
                        <img
                            className="card-detail__image"
                            src={`../../${card.image}`}
                            alt=""
                        />
                    </div>
                    <div className="card-detail__main">
                        {/* <div className="card-detail__count">
                            <span>
                                На складе{' '}
                                <b className="primary">{card.count} шт.</b>
                            </span>
                        </div> */}
                        <div className="card-detail__price">
                            <span>Примерная цена</span>
                            <b className="primary">{formatPrice(card.price)}</b>
                        </div>
                        {activeBuilderMore ? null : (
                            <button
                                onClick={() =>
                                    putComponentInBuilder(card, menu)
                                }
                                className="button primary outlined in-builder"
                            >
                                В сборку!
                            </button>
                        )}
                    </div>
                </div>
                <div className="card-detail__block params">
                    <div className="card-detail__params">
                        {formatParams(JSON.parse(card.params)).map(
                            (param) => param
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <img src={load} alt="" />
    );
}

export default DetailCard;
