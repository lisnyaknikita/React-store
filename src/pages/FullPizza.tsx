import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

export default function FullPizza() {
    const {id} = useParams();

    const [pizza, setPizza] = useState<{
        imageUrl: string,
        name: string
    } >();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const response = await axios.get(
                    'https://63cff232109824043789b00f.mockapi.io/items/' + id
                );
                setPizza(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPizza();
    }, []);

    if (!pizza){
        return <>Загрузка...</>
    }

    return (
        <div>
            <img src={pizza.imageUrl} alt='pizza'/>
            <h2>{pizza.name}</h2>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, veniam?
            </p>
            <Link to={'/'}>На главную</Link>
        </div>
    );
}
