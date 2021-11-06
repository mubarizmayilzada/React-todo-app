import {string} from "prop-types";
import React from 'react';


const Flex = ({display, justifyContent, alignItems, children}) => {
    return (
        <div 
        style={{
            display,
            justifyContent,
            alignItems,
        }}
        > 
            {children}
        </div>
    );
}

Flex.propTypes ={
    display: string,
    justifyContent: string,
    alignItems: string,
};

Flex.defaultProps = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "initial",
};

export default Flex;