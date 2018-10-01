import React, { Component } from 'react';
import './ModalArea.css';
import Spinner from './Spinner/Spinner';
import { Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ModalArea extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    modalOpen: PropTypes.bool,
    responseMessages: PropTypes.array,
    handleFormClear: PropTypes.func,
    sentStatus: PropTypes.string,
    closeModal: PropTypes.func
  }

  render() {
    let modalContent = <Spinner />;
    if (this.props.loading) {
      modalContent = <Spinner />;
    } else {
      if (this.props.sentStatus === 'success') {
        modalContent =
          <div>
            <h1>email sent</h1>
            {
              this.props.responseMessages.map(error => (
                <p key={error.field}>{error.message}</p>
              ))
            }
            <div className="modalButton">
              <button onClick={this.props.handleFormClear}>Clear and Send Another Email</button>
            </div>
          </div>;
      }
      if (this.props.sentStatus === 'failed') {
        modalContent =
          <div>
            <h1>email failed to send</h1>
            {
              this.props.responseMessages.map(error => (
                <p key={error.field}>{error.message}</p>
              ))
            }
            <div className="modalButton">
              <button onClick={this.props.closeModal}>Close Modal</button>
            </div>
          </div>;
      }
    }
    return (
      <Modal open={this.props.modalOpen}>
        <Modal.Header>
          {
            this.props.loading ?
              'Sending Email' : 'Email Status'
          }
        </Modal.Header>
        <Modal.Content>
          {modalContent}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalArea;

