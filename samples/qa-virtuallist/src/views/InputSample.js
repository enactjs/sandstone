import React from 'react';
import Item from '@enact/sandstone/Item';
import Dropdown from '@enact/sandstone/Dropdown';
import Scroller from '@enact/sandstone/Scroller';

const list = [1,2,3,4,5];

class InputSample extends React.Component {
    constructor() {
        super();
        this.state = {
            isShow: true
        };
    }

    handleSelect = () => {
        this.setState({
            isShow: false
        });
    }

    render () {
        return (
            <div style={{display: 'flex'}}>
                <Dropdown title="first" onSelect={this.handleSelect}>{['a', 'b', 'c']}</Dropdown>
                {this.state.isShow ? <Dropdown title="second">{['a', 'b', 'c']}</Dropdown> : null}                
                {this.state.isShow ? <Scroller style={{width: 300, height: 300}}>
                    {
                        list.map((n) => <Item>{n}</Item>)
                    }
                </Scroller> : null}
                <Dropdown title="third">{['a', 'b', 'c']}</Dropdown>
            </div>
        );
    }
}

export default InputSample;
