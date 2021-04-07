import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DetailCard.scss';

function DetailCard() {
    const { id } = useParams();
    const cards = useSelector((state) => state.catalog.cards);
    const card = cards.filter((el) => el.id === +id)[0];

    return <div>{card.name}</div>;
}

export default DetailCard;
