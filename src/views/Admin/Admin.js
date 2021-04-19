import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useInput } from './../../hooks';
import FileUploader from '../../components/FileUploader/FileUploader';
import TempImage from './../../components/TempImage/TempImage';
import TextField from './../../components/TextField/TextField';
import uniqid from 'uniqid';
import './Admin.scss';

export default function Admin() {
    const menu = useSelector((state) => state.catalog.menu);

    return (
        <div className="admin">
            <h2 className="admin__title">ADMIN PANEL</h2>
            {menu.length ? <FormAdderComponent menu={menu} /> : null}
        </div>
    );
}

function FormAdderComponent({ menu }) {
    const [params, setParams] = useState([]);
    const [component, setComponent] = useState(menu[0].component);
    const current = menu.filter((el) => el.component === component)[0];
    const imageUpload = useInput('');

    useEffect(() => {
        getParams(component);
    }, [component]);

    const componentHandler = async (e) => {
        const component = e.target.value;
        setComponent(component);
    };

    const getParams = async (component) => {
        try {
            const req = await fetch(`/api/params/${component}`);
            const res = await req.json();
            setParams(res);
        } catch (e) {
            console.error(e);
        }
    };

    const formHandler = async (e) => {
        e.preventDefault();
        const form = e.target;
        let fullFields = true;

        if (!form.elements['Название'] && !form.elements['Цена']) {
            fullFields = false;
        }

        params.forEach((param) => {
            if (!form.elements[param.name].value) {
                fullFields = false;
            }
        });

        if (!imageUpload.files(0)) return alert('Загрузите картинку!');
        if (!fullFields) return alert('Заполните все поля!');

        const body = new FormData(e.target);
        body.append('image', imageUpload.files(0));
        try {
            const req = await fetch('/api/component/add', {
                method: 'POST',
                body,
            });
            const res = await req.text();
            imageUpload.clear();
            params.forEach((param) => {
                form.elements[param.name].value = '';
            });
            form.elements['Название'].value = '';
            form.elements['Цена'].value = '';
            return alert(res);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form
            className="form-adder"
            onSubmit={(e) => formHandler(e)}
            action="#"
        >
            <select
                onChange={(e) => componentHandler(e)}
                name="component"
                value={component}
            >
                {menu.map((el) => (
                    <option key={uniqid()} value={el.component}>
                        {el.name}
                    </option>
                ))}
            </select>

            <FileUploader
                className="form-adder__upload"
                file={imageUpload}
                model="txt"
            />
            {imageUpload.files(0) ? <TempImage upload={imageUpload} /> : null}

            <TextField name={'Название'} label={'Название'} />
            <TextField name={'Цена'} label={'Цена'} type="number" />

            {params.map((param) => (
                <TextField
                    key={uniqid()}
                    name={param.name}
                    label={param.name}
                />
            ))}

            <div className="wrapper-btn">
                <button className="button primary form-adder__btn">
                    Добавить {current.genetive}
                </button>
            </div>
        </form>
    );
}
