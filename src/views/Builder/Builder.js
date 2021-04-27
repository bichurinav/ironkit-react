import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './../../components/Card/Card';
import uniqid from 'uniqid';
import { formatPrice } from './../../utils';
import './Builder.scss';

function Builder() {
    const menu = useSelector((state) => state.catalog.menu);
    const components = useSelector((state) => state.builder.cards);
    const [builderList, setBuilderList] = useState([]);
    const [error, setError] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');

    useEffect(() => {
        let arr = [];
        menu.forEach((el) => {
            let flag = true;
            components.forEach((item) => {
                if (item.component === el.component) {
                    flag = false;
                    return arr.push(item);
                }
            });
            if (flag) arr.push(el);
        });

        setBuilderList(arr);
    }, [menu, components]);

    useEffect(() => {
        const error = [];
        let totalPrice = 0;
        let cpu = null;
        let motherboard = null;
        let ram = null;
        let cooler = null;
        let videocard = null;
        let bp = null;
        let cpuSocket = null;
        let mbSocket = null;
        let coolerSocket = null;
        builderList.forEach((el) => {
            if (el.count >= 0) {
                totalPrice += el.price;
                switch (el.component) {
                    case 'cpu':
                        cpu = JSON.parse(el.params);
                        break;
                    case 'motherboard':
                        motherboard = JSON.parse(el.params);
                        break;
                    case 'ram':
                        ram = JSON.parse(el.params);
                        break;
                    case 'cooler':
                        cooler = JSON.parse(el.params);
                        break;
                    case 'videocard':
                        videocard = JSON.parse(el.params);
                        break;
                    case 'bp':
                        bp = JSON.parse(el.params);
                        break;
                    default:
                        break;
                }
            }
        });

        if (cpu && motherboard) {
            cpuSocket = cpu.filter((el) => el.name === 'Сокет')[0];
            mbSocket = motherboard.filter((el) => el.name === 'Сокет')[0];
            if (cpuSocket.value !== mbSocket.value) {
                error.push(
                    'Процессор не подходит к материнской плате по сокету'
                );
            }
        }

        if (motherboard && cooler) {
            if (!mbSocket) {
                mbSocket = motherboard.filter((el) => el.name === 'Сокет')[0];
            }
            coolerSocket = cooler.filter((el) => el.name === 'Сокет')[0];

            const arr = coolerSocket.value.split(',');
            const el = arr.find((el) => el.trim() === mbSocket.value);
            if (!el) {
                error.push(
                    'Охлаждение не подходит к материнской плате по сокету'
                );
            }
        }

        if (cpu && cooler) {
            const cpuHeat = cpu.filter((el) => el.name === 'Тепловыделение')[0];
            const coolerHeat = cooler.filter(
                (el) => el.name === 'Тепловыделение процессора'
            )[0];
            if (parseInt(cpuHeat.value) > parseInt(coolerHeat.value)) {
                error.push(
                    'Охлаждение не подходит по тепловыделению процессора'
                );
            }
        }

        if (motherboard && ram) {
            const mbDDR = motherboard.filter(
                (el) => el.name === 'Тип поддерживаемой памяти'
            )[0];
            const ramDDR = ram.filter((el) => el.name === 'Тип памяти')[0];
            if (mbDDR.value !== ramDDR.value) {
                error.push('Оперативная память не подходит по DDR');
            }
        }

        if (videocard && bp) {
            const vcPower = videocard.filter(
                (el) => el.name === 'Мощность блока питания'
            )[0];
            const bpPower = bp.filter((el) => el.name === 'Мощность')[0];
            if (vcPower.value !== bpPower.value) {
                error.push(
                    `Рекомендуемая мощность блока питания ${vcPower.value}`
                );
            }
        }

        setTotalPrice(totalPrice);
        setError(error);
    }, [builderList]);

    return (
        <div className="builder">
            {totalPrice ? (
                <span>
                    Стоимость сборки{' '}
                    <b className="primary">{formatPrice(totalPrice)}</b>
                </span>
            ) : null}
            {error.map((err) => {
                return (
                    <div key={uniqid()} className="builder__error">
                        {err}
                    </div>
                );
            })}
            <div className="builder-list">
                {builderList.map((el) => {
                    if (el.params) {
                        return <Card key={uniqid()} card={el} builder={true} />;
                    } else {
                        return (
                            <div className="builder__item" key={uniqid()}>
                                {el.name}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default Builder;
