import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from './../../components/Card/Card';
import uniqid from 'uniqid';
import { formatPrice } from './../../utils';
import { setTotalPrice } from './../../redux/reducers/builderReducer';
import TextFeild from './../../components/TextField/TextField';
import { useInput } from './../../hooks';
import './Builder.scss';

function Builder() {
    const menu = useSelector((state) => state.catalog.menu);
    const components = useSelector((state) => state.builder.cards);
    const totalPrice = useSelector((state) => state.builder.totalPrice);
    const user = useSelector((state) => state.user.user);
    const elRAM = useSelector((state) => state.builder.ram);
    const [builderList, setBuilderList] = useState([]);
    const [error, setError] = useState([]);
    const nameField = useInput('');
    const descField = useInput('');
    const dispatch = useDispatch();

    const createBuilder = async (e) => {
        e.preventDefault();
        if (!user.login) return;
        if (!nameField.value().trim()) {
            return nameField.setError('Введите название сборки');
        } else {
            if (/[<>*$-/_]/.test(nameField.value())) {
                return nameField.setError('Некорректное название');
            }
            if (nameField.value().trim().length > 36) {
                return nameField.setError('Название до 36 символов');
            } else {
                nameField.setError('');
            }
            nameField.setError('');
        }
        if (/[<>*$_]/.test(descField.value())) {
            return descField.setError('Не используйте <>*$_');
        } else {
            descField.setError('');
        }

        let list = builderList.filter((el) => el.price);
        let arr = [];
        for (let i = 0; i < list.length; i++) {
            arr.push({ ...list[i], quantity: 1 });
        }
        list = arr;

        if (elRAM.count > 1) {
            const ram = { ...list.find((el) => el.component === 'ram') };
            ram.quantity = elRAM.count;
            list = [...list.filter((el) => el.component !== 'ram'), ram];
        }

        const body = {};
        body.components = list;
        body.name = nameField.value().trim();
        body.desc = descField.value().trim();
        body.price = totalPrice;
        body.user = user;

        try {
            const req = await fetch('/api/builder/create', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
            });
            const res = await req.json();
            if (req.ok) {
                nameField.clear();
                descField.clear();
                alert(res.message);
            }
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    };

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
        let total = 0;
        let cpuSocket = null;
        let mbSocket = null;
        let coolerSocket = null;
        let countComponents = 0;
        let components = {
            cpu: null,
            motherboard: null,
            ram: null,
            cooler: null,
            videocard: null,
            bp: null,
            hdd: null,
            ssd: null,
            case: null,
        };

        builderList.forEach((el) => {
            if (el.price >= 0) {
                countComponents += 1;
                total += el.price;
                components[el.component] = JSON.parse(el.params);
            }
        });

        if (countComponents) {
            if (components.cpu && !components.videocard) {
                const cpuGraphic = components.cpu.filter(
                    (el) => el.name === 'Графическое ядро'
                )[0];
                if (cpuGraphic) {
                    if (!cpuGraphic.value || cpuGraphic.value === '-') {
                        error.push('Добавьте видеокарту');
                    }
                }
            }
            if (!components.cpu) error.push('Добавьте процессор');
            if (!components.motherboard)
                error.push('Добавьте материнскую плату');
            if (!components.cooler) error.push('Добавьте охлаждение');
            if (!components.bp) error.push('Добавьте блок питания');
            if (!components.ram) error.push('Добавьте оперативную память');
            if (!components.hdd && !components.ssd)
                error.push('Добавьте жёсткий диск или SSD-накопитель');
            if (!components.case) error.push('Добавьте корпус');
        }

        if (components.cpu && components.motherboard) {
            cpuSocket = components.cpu.filter((el) => el.name === 'Сокет')[0];
            mbSocket = components.motherboard.filter(
                (el) => el.name === 'Сокет'
            )[0];
            if (cpuSocket.value !== mbSocket.value) {
                error.push(
                    'Процессор не подходит к материнской плате по сокету'
                );
            }
        }

        if (components.motherboard && components.cooler) {
            if (!mbSocket) {
                mbSocket = components.motherboard.filter(
                    (el) => el.name === 'Сокет'
                )[0];
            }
            coolerSocket = components.cooler.filter(
                (el) => el.name === 'Сокет'
            )[0];

            const arr = coolerSocket.value.split(',');
            const el = arr.find((el) => el.trim() === mbSocket.value);
            if (!el) {
                error.push(
                    'Охлаждение не подходит к материнской плате по сокету'
                );
            }
        }

        if (components.cpu && components.cooler) {
            const cpuHeat = components.cpu.filter(
                (el) => el.name === 'Тепловыделение'
            )[0];
            const coolerHeat = components.cooler.filter(
                (el) => el.name === 'Тепловыделение процессора'
            )[0];
            if (parseInt(cpuHeat.value) > parseInt(coolerHeat.value)) {
                error.push(
                    'Охлаждение не подходит по тепловыделению процессора'
                );
            }
        }

        if (components.motherboard && components.ram) {
            const mbDDR = components.motherboard.filter(
                (el) => el.name === 'Тип поддерживаемой памяти'
            )[0];
            const ramDDR = components.ram.filter(
                (el) => el.name === 'Тип памяти'
            )[0];
            if (mbDDR.value !== ramDDR.value) {
                error.push('Оперативная память не подходит по DDR');
            }
        }

        if (components.motherboard && components.case) {
            const mbFormFactor = components.motherboard.filter(
                (el) => el.name === 'Форм-фактор'
            )[0];

            const caseFormFactor = components.case.filter(
                (el) => el.name === 'Форм-фактор'
            )[0];

            const arr = caseFormFactor.value.split(',');
            const el = arr.find((el) => el.trim() === mbFormFactor.value);
            if (!el) {
                error.push(
                    'Материнская плата не совместима с корпусом по форм-фактору'
                );
            }
        }

        if (components.videocard && components.bp) {
            const vcPower = components.videocard.filter(
                (el) => el.name === 'Мощность блока питания'
            )[0];
            const bpPower = components.bp.filter(
                (el) => el.name === 'Мощность'
            )[0];
            if (parseInt(vcPower.value) > parseInt(bpPower.value)) {
                error.push(
                    `Рекомендуемая мощность блока питания ${vcPower.value}`
                );
            }
        }

        if (components.ram && components.motherboard) {
            const mb = components.motherboard.filter(
                (el) =>
                    el.name === 'Максимальный объем памяти' ||
                    el.name === 'Слотов памяти'
            );
            const mbValue = +mb[1].value.split('ГБ')[0];
            const mbSlots = mb[0].value;
            if (mbValue < elRAM.value)
                error.push(
                    'Оперативная память превышает максимальный объем памяти у материнской платы'
                );
            if (mbSlots < elRAM.count)
                error.push(
                    'Материнская плата не подходит по количеству слотов для оперативной памяти'
                );
        }

        dispatch(setTotalPrice(total + elRAM.price));
        setError(error);
    }, [builderList, dispatch, elRAM]);

    return (
        <div className="builder">
            {totalPrice ? (
                <span className="builder__total">
                    Стоимость сборки{' '}
                    <b className="primary">{formatPrice(+totalPrice)}</b>
                </span>
            ) : null}

            {totalPrice && error.length < 1 && user.login ? (
                <form
                    className="builder__creator"
                    onSubmit={(e) => createBuilder(e)}
                >
                    <TextFeild
                        name="name"
                        field={nameField}
                        placeholder={'Название сборки'}
                    />
                    <textarea
                        className="builder__form-desc"
                        placeholder="Описание сборки"
                        {...descField.bind()}
                        rows="5"
                    ></textarea>
                    <span className="error">{descField.error()}</span>
                    <button className="builder__btn">Собрать сборку</button>
                </form>
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
                        return (
                            <Card
                                key={uniqid()}
                                card={el}
                                builder={true}
                                ram={el.component === 'ram'}
                            />
                        );
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
