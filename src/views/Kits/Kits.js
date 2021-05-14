import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import uniqid from 'uniqid';
import caseIcon from './case.svg';
import { setList } from './../../redux/reducers/builderReducer';
import load from './../DetailCard/load.svg';
import './Kits.scss';

function Kits() {
    const list = useSelector((state) => state.builder.list);
    const user = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const getBuilders = () => {
        setLoading(true);
        return async (dispatch) => {
            try {
                const req = await fetch('/api/builder');
                const res = await req.json();
                setLoading(false);
                dispatch(setList(res));
            } catch (e) {
                console.error(e);
            }
        };
    };

    const delBuilder = async (user, id) => {
        window.location.href = '/kits';
        try {
            await fetch(`/api/builder/${user}/${id}`, {
                method: 'DELETE',
            });
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        dispatch(getBuilders());
    }, [dispatch]);

    return (
        <div className="kits">
            {!loading ? (
                <div className="kits__list">
                    {list.length ? (
                        list.map((el) => (
                            <Link
                                key={uniqid()}
                                className="kits__item"
                                to={`/kits/${el.user}/${el.id}`}
                            >
                                <img src={caseIcon} alt="" />
                                <div className="kits__item-info">
                                    <h3 className="kits__item-title">
                                        {el.name}
                                    </h3>
                                    <p className="kits__item-desc">
                                        {el.description}
                                    </p>
                                </div>

                                {user.login === el.user || user.admin ? (
                                    <div
                                        onClick={() => {
                                            delBuilder(el.user, el.id);
                                        }}
                                        className="card__del"
                                    >
                                        &times;
                                    </div>
                                ) : null}

                                <span className="kits__item-user">
                                    {el.user}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <h2 className="primary">Сборок нет</h2>
                    )}
                </div>
            ) : (
                <img src={load} alt="" />
            )}
        </div>
    );
}

export default Kits;
