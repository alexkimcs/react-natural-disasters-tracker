import React, { useState } from 'react';
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Load = (props) => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#36D7B7");
    return [
        <div className="loading">
            <RingLoader color={color}/>
        </div>
    ];
}

export default Load;