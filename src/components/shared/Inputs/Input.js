import React, {useState} from 'react'
import {
  // Button,
  // Card,
  // CardBody,
  // CardHeader,
  Label,
  Col,
  // Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row, FormGroup, InputGroupButtonDropdown
} from 'reactstrap';
// import TableButton from '../../shared/tables/TableButton'
// import {
//   passwordStrengthClass,
//   containsNumbers,
//   isInvalidPhoneNumber,
//   containsOnlyLetter
// } from '../../shared/helpers/GeneralHelpers';
import fallbackImg from '../../../assets/img/imgplace.png';


export function InputField(props) {
 let [touched, setTouched] = useState(false)
  let [open, setOpen] = useState({})

  if(!props.input){
    let {name, onChange, value} = props
    return <Row>
    <Col sm="3">
    <Label className="label-right">Option</Label>
    </Col>
    <Col sm="3">
    <Input
          type="text"
          placeholder="Add Key"
          name={`${name}-key`}
          value={value ? value.key : ""}
          onChange={e => {
            onChange(e)
          }}
          // rows={4}
          // invalid={error || (required && !value && touched) }
        />
      </Col>
    <Col sm="6">
      <InputGroup className='mb-3'>
        <Input
          type="text"
          placeholder="Add Value"
          name={`${name}-val`}
          value={value ? value.val : ""}
          onChange={e => {
            onChange(e)
          }}
          // rows={4}
          // invalid={error || (required && !value && touched) }
        />
        {/* { error || (required && !value && touched) ?
          <FormFeedback>{placeholder} {(type !=="text" && type!=="textarea") ? `(${type})`: ''} is required.</FormFeedback> 
          : <div></div>} */}
      
      </InputGroup>
    </Col>
  </Row>

  }else{
    const {icon, name,dropdown_name, placeholder, type, sub_type, value,dropdown_value, error, option, required, acceptable, multiple, disabled} = props.input
  

  function onChange(e) {
    setTouched(true)
    // console.log(e.target.value)
    props.onChange(e)
  }

  function onOpenChange(name) {
    let _open = {...open}
    _open[name] = !_open[name]
    setOpen(_open)
  }
    if (type === 'dropdown') {
      return <Row>
        <Col sm="3">
          <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
        </Col>
        <Col sm="9">
          <InputGroup className='mb-3'>
            {icon &&
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={icon}></i>
              </InputGroupText>
            </InputGroupAddon>
            }
            <Input type="select" name={name} value={value} 
                        invalid={error || (required && !value && touched)}
                        onChange={e => {
              onChange(e)
            }}>
              <option value="">Please select</option>
              {option && option.map((o, i) => {
                  return <option value={o.id} key={i}>{o.name}</option>
                }
              )}
            </Input>
            {error || (required && !value && touched) ?
              <FormFeedback>{placeholder} is required.</FormFeedback> : <div></div>}
          </InputGroup>
        </Col>
      </Row>
  
    }
  
    else if (type === 'input-dropdown') {
      return <Row>
        <Col sm="3">
          <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
        </Col>
        <Col sm="9">
          <InputGroup className='mb-3'>
            <InputGroupButtonDropdown addonType="prepend"
                                      isOpen={open[dropdown_name]}
                                      toggle={() => onOpenChange(dropdown_name)}>
              <DropdownToggle caret className="input-group-text">
                {dropdown_value? dropdown_value: `Select ${placeholder} type`}
              </DropdownToggle>
              <DropdownMenu>
                {
                  option.map((o,i) => {
                    return (
                  <DropdownItem key={i} name={dropdown_name} value={o.id} onClick={(e) => onChange(e)}>{o.name}</DropdownItem>
                  )
                })
                }
              </DropdownMenu>
            </InputGroupButtonDropdown>
            <Input
              type={sub_type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={e => {
                onChange(e)
              }}
              invalid={error || (required && !value && touched)}
            />
            {error || (required && !value && touched) ?
              <FormFeedback>{placeholder} is required.</FormFeedback> : <div></div>}
          </InputGroup>
        </Col>
      </Row>
  
    }
    else if (type === 'radio') {
      return <Row>
        <Col sm="3">
          <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
        </Col>
        <Col sm="9">
          <InputGroup className='mb-3'>
            {option && option.map((o, i) => {
                return (
                  <FormGroup check inline key={i}>
                    <Input className="form-check-input" type="radio" id={`${placeholder}-${o.id}`} name={name} value={o.value}
                           onChange={e => onChange(e)} checked = {value+"" === o.value+""} 
                           invalid={error || (required && !value && touched)}
                           />
                    <Label className="form-check-label" check htmlFor={`${placeholder}-${o.id}`}>{o.name}</Label>
                  </FormGroup>
                )
              }
            )}
            {error || (required && !value && touched) ?
              <FormFeedback>{placeholder} is required.</FormFeedback> : <div></div>}
          </InputGroup>
        </Col>
      </Row>
  
    }else if (type === 'checkbox') {
      return <Row>
        <Col sm="3">
          <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
        </Col>
        <Col sm="9">
          <InputGroup className='mb-3'>
            {props.input.customOptions ? <>
            {Object.keys(option).map((o, i) => {
              return <div key={i} style={{width: "100%"}}>
              <div className="mb-1">{o}</div>
              <div className="mb-2">
              {option[o].map((j, k) => {
                return (
                  <FormGroup check inline key={k}>
                    <Input className="form-check-input mb-1" type="checkbox" id={`${placeholder}-${j.id}`} name={name} value={j.id}
                           onChange={e => onChange(e)} checked= {value.includes(j.id)} 
                           invalid={error || (required && !value && touched)}
                           />
                    <Label className="form-check-label mb-1" check htmlFor={`${placeholder}-${j.id}`}>{j.display_name}</Label>
                  </FormGroup>
                )
              })}</div>
              </div>
            })}
            </>
            : <>{option && option.map((o, i) => {
                return (
                  <FormGroup check inline key={i}>
                    <Input className="form-check-input" type="checkbox" id={`${placeholder}-${o.id}`} name={name} value={o.value}
                           onChange={e => onChange(e)} checked= {value.includes(o.value)} 
                           invalid={error || (required && !value && touched)}
                           />
                    <Label className="form-check-label" check htmlFor={`${placeholder}-${o.id}`}>{o.name}</Label>
                  </FormGroup>
                )
              }
            )}</>}
            {error || (required && !value && touched) ?
              <FormFeedback>{placeholder} is required.</FormFeedback> : <div></div>}
          </InputGroup>
        </Col>
      </Row>
  
    } else if(type === "file"){
      return <Row>
      <Col sm="3">
      <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
      </Col>
      <Col sm="9">
      {/* <Row className="px-3"> */}
      <InputGroup className='mb-3'>
        {props.impaths[name] && props.impaths[name].map((i, index) => {
          return <div key={index} className="doc-container mb-3">
            <img alt={`name-${index}`} src={i}
              onError={(e) => {
                e.target.onerror = null 
                e.target.src = fallbackImg}}
             className='uploadedDoc' />
            {!disabled && <i className="icon-close remove-upload"
            onClick={() => props.onRemove({index: index, name: name})}
            />}
          </div>
        }
        )}
        {!disabled && <div className="uploadDocument">
          <i className={`${icon} mx-2`} />
          <Input type={type} accept={acceptable} className="form-control"
            name={name} onChange={(e) => onChange(e)} multiple={multiple}
            invalid={error} />
            {error ?
              <FormFeedback>{placeholder} is required.</FormFeedback> : <div></div>}
        </div>}
            </InputGroup>
      {/* </Row> */}
      </Col>
      </Row>
    } else {
      return <Row>
        <Col sm="3">
          <Label htmlFor={name} className="label-right">{placeholder}{required && ' *'}</Label>
        </Col>
        <Col sm="9">
          <InputGroup className='mb-3'>
            {icon &&
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <i className={icon}></i>
              </InputGroupText>
            </InputGroupAddon>
            }
            <Input
              type={type}
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={e => {
                onChange(e)
              }}
              rows={4}
              disabled={disabled ? true : false}
              invalid={error || (required && !value && touched) }
            />
            { error || (required && !value && touched) ?
              <FormFeedback>{placeholder} {(type !=="text" && type!=="textarea") ? `(${type})`: ''} is required.</FormFeedback> : <div></div>}
          </InputGroup>
        </Col>
      </Row>
    }
  }
  
}


