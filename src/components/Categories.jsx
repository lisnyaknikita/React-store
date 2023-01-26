import React from "react";
import {useState} from "react";

export default function Categories({categoryId, onClickCategory}) {

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => {
                    return <li
                        className={categoryId === i ? "active" : ""}
                        onClick={() => onClickCategory(i)}
                        key={i}
                    >
                        {category}
                    </li>;

                })}
            </ul>
        </div>
    );
}
