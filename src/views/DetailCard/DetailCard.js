import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
import { formatPrice } from './../../utils';
import IconButton from './../../components/IconButton/IconButton';
import uniqid from 'uniqid';
import load from './load.svg';
import back from './back.svg';
import './DetailCard.scss';

function DetailCard({ urlBack = null }) {
    const [card, setCard] = useState(null);
    const { id } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const component = url.split('/')[2];
    const apiUrl = `/api/component/${component}/${id}`;

    const formatParams = (params) => {
        return Object.keys(params).map((param) => {
            return (
                <div key={uniqid()} className="card-detail__param">
                    <span className="param-name">{param}:</span>{' '}
                    <span className="param-value">{params[param]}</span>
                </div>
            );
        });
    };

    const returnBackPage = () => {
        return history.push(urlBack || `/cards/${component}`);
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
                    returnBackPage();
                }}
                className="card-detail__back"
                icon={back}
                size={28}
            />
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
                        <button className="button primary outlined in-builder">
                            В сборку!
                        </button>
                        <div className="card-detail__price">
                            <span>Примерная цена</span>
                            <b className="primary">{formatPrice(card.price)}</b>
                        </div>
                    </div>
                </div>
                <div className="card-detail__block params">
                    <h2 className="card-detail__name">{card.name}</h2>
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
