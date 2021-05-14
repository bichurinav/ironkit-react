import React, { useEffect, useState } from 'react';
import IconButton from './../../components/IconButton/IconButton';
import backIcon from './../DetailCard/back.svg';
import { useHistory, useParams } from 'react-router-dom';
import Card from './../../components/Card/Card';
import uniqid from 'uniqid';
import './DetailKit.scss';

function DetailKit() {
    const history = useHistory();
    const { user, id } = useParams();
    const [components, setComponents] = useState([]);
    const [info, setInfo] = useState({ name: '', description: '' });

    const getBuilder = async (user, id, history) => {
        try {
            const req = await fetch(`/api/builder/${user}/${id}`);
            const res = await req.json();
            if (!res.success) history.push('/kits');
            setComponents(res.builder);
            setInfo({ name: res.name, description: res.description });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        getBuilder(user, id, history);
    }, [user, id, history]);

    return (
        <div className="detail-kit">
            <IconButton
                onClick={() => {
                    history.push('/kits');
                }}
                className="detail-kit__back"
                icon={backIcon}
                size={28}
            />
            <h3 className="detail-kit__title">{info.name}</h3>
            <p className="detail-kit__desc">{info.description}</p>
            <div className="detail-kit__list">
                {components.map((el) => (
                    <Card key={uniqid()} card={el} kit={true} />
                ))}
            </div>
        </div>
    );
}

export default DetailKit;
