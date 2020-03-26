import React from 'react';
import '../App.css';

export default function SearchForm(props) {
    return (
        <div>
            <form onSubmit={(e) => props.search(e)}>
                <input placeholder="Enter Location" onChange={(e) => 
                    {props.input(e.target.value)}
                }/>
            </form>
        </div>
    )
}
