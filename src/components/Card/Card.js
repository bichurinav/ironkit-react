import React, { useEffect } from 'react';
import { formatPrice } from './../../utils';
import BuilderStore from './../../BuilderStore';
import IconButton from './../IconButton/IconButton';
import { Link, useRouteMatch } from 'react-router-dom';
import { setActiveMore, setRAM } from './../../redux/reducers/builderReducer';
import { useSelector, useDispatch } from 'react-redux';
import { putComponentInBuilder } from './../../utils';
import { useInput } from './../../hooks';
import boxIcon from './box.svg';
import plusIcon from './plus.svg';
import minusIcon from './minus.svg';
import deleteIcon from './delete.svg';
import './Card.scss';

function Card({ card, builder = false, ram, kit }) {
    const params = JSON.parse(card.params);
    const dispatch = useDispatch();
    const menu = useSelector((state) => state.catalog.menu);
    const user = useSelector((state) => state.user.user);
    const activeMore = useSelector((state) => state.builder.activeMore);
    const elRAM = useSelector((state) => state.builder.ram);
    const imageUpload = useInput('');
    const priceField = useInput('');
    // const countField = useInput('');
    const { url } = useRouteMatch();

    useEffect(() => {
        if (imageUpload.value()) {
            changeImageCard(card, imageUpload);
        }
    }, [imageUpload, card]);

    const changeImageCard = async (card, imageUpload) => {
        try {
            const body = new FormData();
            body.append('image', imageUpload.files(0));
            body.append('imageName', card.image);

            const req = await fetch(`/api/component/update-image`, {
                method: 'PUT',
                body,
            });
            if (req.ok) {
                window.location.href = `/cards/${card.component}`;
            }
        } catch (e) {
            console.error(e);
        }
    };

    const changeIntParam = async (e, field, paramName) => {
        try {
            e.preventDefault();
            if (isNaN(+field.value())) return;
            if (card[paramName] === +field.value()) return;
            const req = await fetch(
                `/api/component/${paramName}/${card.component}/${card.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ [paramName]: field.value() }),
                }
            );
            if (req.ok) {
                window.location.href = `/cards/${card.component}`;
            }
        } catch (e) {
            console.error(e);
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

    const plusRAM = (price) => {
        dispatch(
            setRAM({
                count: elRAM.count + 1,
                value: (elRAM.count + 1) * +params[1].value.split('ГБ')[0],
                price: elRAM.price + price,
            })
        );
    };

    const minusRAM = (price) => {
        if (elRAM.count === 1) return;
        dispatch(
            setRAM({
                count: elRAM.count - 1,
                value: +params[1].value.split('ГБ')[0] / 2,
                price: elRAM.price - price,
            })
        );
    };

    const removeCard = async (image) => {
        try {
            const body = new FormData();
            body.append('imageName', image);
            const req = await fetch(
                `/api/component/${card.component}/${card.id}`,
                {
                    method: 'DELETE',
                    body,
                }
            );
            if (req.ok) {
                window.location.href = `/cards/${card.component}`;
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="card">
            <div className="card__inner">
                {user.admin && !builder && !kit ? (
                    <ImageChanger
                        image={card.image}
                        imageUpload={imageUpload}
                    />
                ) : (
                    <div className="card__block-image">
                        <img
                            className="card__image"
                            src={'../../' + card.image}
                            alt=""
                        />
                    </div>
                )}
                <div className="card__info">
                    <h2 className="card__name">{card.name}</h2>
                    <div className="card__params">
                        <div className="card__param">
                            {params[0].name}: {params[0].value}
                        </div>
                        <div className="card__param">
                            {params[1].name}:{' '}
                            {ram
                                ? elRAM.count *
                                      +params[1].value.split('ГБ')[0] +
                                  ' ГБ'
                                : params[1].value}
                        </div>
                        <div className="card__param">
                            {params[2].name}: {params[2].value}
                        </div>
                    </div>
                    <Link
                        className="primary card__more"
                        onClick={() => activeBuilderMore()}
                        to={`${
                            builder || kit
                                ? `/cards/${card.component}/${card.id}`
                                : url + '/' + card.id
                        }`}
                    >
                        подробнее
                    </Link>
                </div>

                {/* {user.admin && !builder && !kit ? (
                    <ParamChanger
                        paramValue={card.count}
                        field={countField}
                        callback={changeIntParam}
                        paramName={'count'}
                    />
                ) : (
                    <span className="card__count">{card.count || 0} шт.</span>
                )} */}

                {user.admin && !builder && !kit ? (
                    <div
                        onClick={() => removeCard(card.image)}
                        className="card__del"
                    >
                        &times;
                    </div>
                ) : null}

                {user.admin && !builder && !kit ? (
                    <ParamChanger
                        paramValue={card.price}
                        field={priceField}
                        callback={changeIntParam}
                        paramName={'price'}
                    />
                ) : (
                    <span className="card__price">
                        {ram
                            ? formatPrice(elRAM.count * card.price)
                            : formatPrice(
                                  card.quantity
                                      ? card.quantity * card.price
                                      : card.price
                              )}
                    </span>
                )}
                {card.quantity > 1 ? (
                    <span className="card__count-ram">{`x${card.quantity}`}</span>
                ) : null}

                {builder && ram ? (
                    <>
                        <span className="card__count-ram">
                            {elRAM.count > 1 ? `x${elRAM.count}` : null}
                        </span>
                        <IconButton
                            className="card__btn-minus"
                            onClick={() => {
                                minusRAM(card.price);
                            }}
                            icon={minusIcon}
                            size={24}
                        />
                        <IconButton
                            className="card__btn-plus"
                            onClick={() => {
                                plusRAM(card.price);
                            }}
                            icon={plusIcon}
                            size={24}
                        />
                    </>
                ) : null}

                {!builder ? (
                    <IconButton
                        className="card__btn-box"
                        onClick={() => {
                            putComponentInBuilder(card, menu);
                        }}
                        icon={boxIcon}
                        size={40}
                    />
                ) : (
                    <IconButton
                        className="card__btn-del"
                        onClick={() => {
                            if (ram) {
                                dispatch(
                                    setRAM({
                                        count: 1,
                                        value: null,
                                        price: 0,
                                    })
                                );
                            }
                            BuilderStore().delete(card);
                        }}
                        icon={deleteIcon}
                        size={25}
                    />
                )}
            </div>
        </div>
    );
}

function ImageChanger({ image, imageUpload }) {
    return (
        <div className="card__block-image">
            <label className="card-img-changer">
                <img className="card__image" src={'../' + image} alt="" />
                <input {...imageUpload.bind()} type="file" accept="image/*" />
            </label>
        </div>
    );
}

function ParamChanger({ paramValue, field, callback, paramName }) {
    return (
        <form onSubmit={(e) => callback.call(null, e, field, paramName)}>
            <input
                className={`card__${paramName}-changer`}
                type="text"
                placeholder={paramValue}
                {...field.bind()}
            />
        </form>
    );
}

export default Card;
