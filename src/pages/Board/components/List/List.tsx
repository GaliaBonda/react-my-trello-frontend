import React from 'react';
import ICard from '../../../../common/interfaces/ICard';

export default function List(props: { title: string; cards: ICard[]}) {
    return (<h2>{props.title}</h2>)
}
