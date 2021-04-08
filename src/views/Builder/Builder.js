import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import BuilderStore from '../../BuilderStore';
import uniqid from 'uniqid';
import './Builder.scss';

function Builder() {
    const menu = useSelector((state) => state.catalog.menu);
    const [builderList, setBuilderList] = useState(menu);

    useEffect(() => {
        console.log(BuilderStore().get());
    }, []);

    return (
        <div className="builder">
            <div className="builder-list">
                {builderList.map((el) => (
                    <div key={uniqid()}>{el.name}</div>
                ))}
            </div>
        </div>
    );
}

export default Builder;
