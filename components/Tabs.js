import React, { Component } from "react";
import styled from "styled-components";

class Tabs extends Component {
    state = {
        selected: this.props.selected || 0
    };

    handleChange(index) {
        this.setState({ selected: index });
    }

    render() {
        return (
            <>
                <TabUl>
                    {this.props.children.map((elem, index) => {
                        let style = index === this.state.selected ? "selected" : "";
                        return (
                            <li
                                key={index}
                                className={style}
                                onClick={() => this.handleChange(index)}
                            >
                                {elem.props.title}
                            </li>
                        );
                    })}
                </TabUl>
                <TabDiv>{this.props.children[this.state.selected]}</TabDiv>
            </>
        );
    }
}

export default Tabs;

const TabDiv = styled.div`
    width: 100%;
    color: #444
`

const TabUl = styled.ul`
   .inline {
        list-style: none;
        padding: 0;
        margin-bottom: 0;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        -webkit-padding-start: 0px;
        }

    .inline,
    li {
        display: inline-block;
        margin-right: 10px;
        padding: 10px;
        border-bottom: 2px solid #eee;
        transition: all 0.5s;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        font-weight: 300;
        cursor: pointer;
        color: #aaa;
    }
    .inline,
    li.selected {
        border-bottom: 2px solid #337ab7;
        color: #444;
}
`