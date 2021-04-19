import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from './../../components/Card/Card';
import uniqid from 'uniqid';
import './Builder.scss';

function Builder() {
    const menu = useSelector((state) => state.catalog.menu);
    const components = useSelector((state) => state.builder.cards);
    const [builderList, setBuilderList] = useState([]);

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

    return (
        <div className="builder">
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
