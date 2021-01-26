import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    //anonymous class
    return class extends Component{
        constructor (props) {
            super(props);

            this.state = {
                error: null
            };

            // clear error whenever request is sent
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            // to ensure that axios interceptors are removed when component is unmount to prevent memory leak
            console.log(this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        clearErrorHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.clearErrorHandler}
                    >
                        {this.state.error?this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            );
        }
    }
}

export default withErrorHandler;