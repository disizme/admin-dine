// import React, { Component } from 'react'
// import store from '../../../store'
// import { changePassword } from '../../../actions/login'
// import { localize } from '../../../language'
// import { fetchError } from '../../../actions/calendar'

// export default class ForgetPass extends Component{
//     state = {
//         data: {},
//         error: false
//     }
    
//     onChange(e){
//         let data= this.state.data
//         data[e.target.name] = e.target.value
//         this.setState({data})
//     }

//     changePass(e){
//         e.preventDefault()
//         let data = this.state.data
//         if(data.new_password === data.new_password_confirmation){
//             let token = this.props.location.pathname.split('/')[2]
//             let postData = { token: token, ...data}
//             store.dispatch(changePassword(postData))
//         } else {
//             this.setState({error: true})
//             let err = {response: {data : {message: 'Passwords does not match'}}}
//             store.dispatch(fetchError(err))
//         }
//     }

//     render(){
//         const {error} = this.state
//         return  <div className='gray-bg login-page pt-4'>
//         <div className="fadeIn mx-auto p-4" style={{width: '60vw', minWidth: '300px',maxWidth:'600px'}}>
//                     <div className="ibox-content">
//                     <h3 className="np-color" >{localize('forgot_password')}?</h3>
//                     <div className="px-2">
//                         <form className="m-t" onSubmit={(e) => this.changePass(e)}>
//                             <div className="form-group">
//                                 <label>{localize('new_pass')}</label>
//                                 <input type="password" name='new_password' 
//                                     className={`form-control ${error && 'error'} `} placeholder="Enter New Password"
//                                     onChange={(e) => this.onChange(e)} 
//                                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" 
//                                      title="Must contain at least one capital letter, one number and one non-alphanumeric character (For example: !, $, #, or %) and at least 8 or more characters"
//                                     required />
//                             </div>
//                             <div className="form-group">
//                                 <label>{localize('confirm_pass')}</label>
//                                 <input type="password" name='new_password_confirmation' 
//                                     className={`form-control ${error && 'error'} `} placeholder="Confirm New Password"
//                                     onChange={(e) => this.onChange(e)} 
//                                     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" 
//                                     title="Must contain at least one capital letter, one number and one non-alphanumeric character (For example: !, $, #, or %) and at least 8 or more characters"
//                                    required />
//                             </div>
//                             <div className='text-center'>
//                             <button type="submit" className="btn btn-primary modal-button ml-0" >
//                                 {localize('change_pass')}</button>
//                             </div>
//                         </form>
//                         </div>

//                     </div>
//             </div>
//     </div>
//     }
// }