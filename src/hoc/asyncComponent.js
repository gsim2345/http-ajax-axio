import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            // returns a promise
            importComponent()
                .then(cmp => {
                    // returns the default export from the imported module
                    this.setState({component: cmp.default});
                })
        }

        render() {
            const C = this.state.component;
            // if C is set, return C as a component with its props
            return C ? <C {...this.props}/> : null;
        }
    }
}

export default asyncComponent;