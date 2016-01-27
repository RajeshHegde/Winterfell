var React = require('react');
var reactDOM = require('react-dom');
var classNames = require('classnames');

class NumberInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value : this.props.value
    };
  }

  handleChange(e) {
    var value = e.target.value;
    if (this.props.isDecimal) {
      if (value.indexOf('.') != -1 && value.split('.')[1].length > 2) {
        return;
      }
    } else {
        value = value.substring(0, value.indexOf('.'));
    }
    this.setState({
      value : value
    }, this.props.onChange.bind(null, value));
  }

  componentDidMount() {
    var inputBox = $(reactDOM.findDOMNode(this)).find('.tool-input-box');
    inputBox.popover({placement: this.props.tooltipPlacement ? this.props.tooltipPlacement : Tooltip.placement(200)});
  }

  render() {
    var props = this.props,
        errorMessage,
        inputBoxClassName;
    if( props.validationErrors && props.validationErrors.length > 0 ) {
      errorMessage = (
        <div className='error-msg--expense'>{props.validationErrors[0].message} </div>
      );
    }
    else {
      errorMessage = (
        <div className='u-v-hidden error-msg--expense'>{props.typeErrorMessage } </div>
      );
    }

    inputBoxClassName = classNames( 'tool-input-box ',
                                    {
                                      'invalid' : props.validationErrors && props.validationErrors.length > 0
                                    });

    return (
      <div className={props.className}>
        <div className='bd-number-box--amount js-input-info-trigger'>
          <input type='number'
                 name={props.name}
                 id={props.id}
                 aria-labelledby={props.labelId}
                 className={inputBoxClassName}
                 min={props.min}
                 max={props.max}
                 step={props.step}
                 disabled= {props.disabled} 
                 placeholder={props.placeholder}
                 defaultValue={props.defaultValue}
                 value={this.state.value}
                 data-content={props.tooltip}
                 data-trigger='focus'
                 required={props.required
                             ? 'required'
                             : undefined}
                 onChange={this.handleChange.bind(this)}
                 onBlur={props.onBlur.bind(null, this.state.value)}
                 onKeyDown={props.onKeyDown} />

          <span className='bd-number-box__placeholder'>{props.suffix}</span>
        </div>
        {errorMessage}
      </div>
    );
  }

};

NumberInput.defaultProps = {
  min               : 0,
  max               : 1000000000,
  placeholder       : 'eg. 20',
  step              : 1,
  className         : '',
  disabled          : false,
  suffix            : '',
  required          : true,
  isDecimal         : true,
  validationErrors  : undefined,
  classes           : {},
  name              : '',
  id                : undefined,
  value             : null,
  typeErrorMessage  : 'Please enter a valid number',
  onChange          : () => {},
  onBlur            : () => {},
  onKeyDown         : () => {}
};

module.exports = NumberInput;