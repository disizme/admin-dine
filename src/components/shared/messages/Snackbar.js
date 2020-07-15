import React from 'react';
import './snackbar.css'
import connect from "react-redux/es/connect/connect";

import store from "../../../Store"
import {deleteSuccessMessage} from "../../../actions/successMessage/success_message";

class ShowSnackbar extends React.Component {
  state = {
    open: false,
    message: null,
    // timer: null,
    // openTime: null,
    // stop: false
  };

  handleClick = () => {
    this.setState({open: !this.state.open});
    clearTimeout(this.timer)
  };

  stopTimer() {
    clearTimeout(this.timer)
  }

  startTimer() {
    this.timer = setTimeout(() => this.setState({
      open: false,
      message: null
    }), 10000)
  }

  // interval() {
  //   this.timer = setInterval(() =>
  //     this.setState({openTime: (this.state.openTime && !this.state.stop) ? this.state.openTime + 1 : 1}, () => {
  //       if (this.state.openTime === 5) {
  //         this.handleClick()
  //         this.stopTimer()
  //       }
  //     }), 1000)
  // }

  resetMessage() {
    store.dispatch(deleteSuccessMessage())
  }

  componentDidUpdate(prevProps) {
    let {successMessage} = this.props;
    let color = ''
    if (successMessage !== prevProps.successMessage) {
      if (successMessage.message) {
        this.setState({
          message: successMessage.message.message,
          open: true,
          color: color
        }, () => {
          // console.log("message", this.state.message.message)
          this.resetMessage()
        })
      }
    }
    this.timer = setTimeout(()=> this.setState({
      open: false,
      message: null
    }),10000)
  }

  render() {
    if (this.state.open) {
      return (
        <div className={`snackbar ${this.state.message.variant}`} onMouseEnter={() => this.stopTimer()}
             onMouseLeave={() => this.startTimer()}>
          <span className='icon'
                style={{marginRight: "10px"}}>{this.state.message.variant === 'success' ? 'check' : this.state.message.variant}</span>
          <span className="message">{this.state.message.message}</span>
          <button className='icon' onClick={() => this.handleClick()}>close</button>
        </div>
      );
    } else return null
  }

}


function mapStateToProps(state) {
  let {getLoginRequest, createUser, successMessage} = state
  return {
    getLoginRequest, createUser, successMessage
  }
}

export default connect(mapStateToProps)(ShowSnackbar)
