var React = require('react');
var reactDOM = require('react-dom');
var classNames = require('classnames');

class AmountInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayValue : this.props.value === null ? null : this.props.value/this.props.denominator,
      value        : this.props.value
    };
  }

  handleChange(e) {
    var displayValue = e.target.value,
        value;

    displayValue = displayValue === '' ? null : displayValue;
    if( displayValue !== null ) {
      if ( this.props.isDecimal) {
        if (displayValue.indexOf('.') != -1 && displayValue.split('.')[1].length > 2) {
          return;
        }
      } else {
          displayValue = displayValue.substring(0, displayValue.indexOf('.'));
      }
    }
    value = displayValue === null ? null : displayValue * this.props.denominator;
    this.setState({
      displayValue : displayValue,
      value : value 
    }, this.props.onChange.bind(null, value));
  }

  handleBlur() {
    var value = this.state.value === null ? null : this.state.value;
    this.props.onBlur.call( null, value);
  }

  componentDidMount() {
    var inputBox = $(reactDOM.findDOMNode(this)).find('.tool-input-box');
    inputBox.popover({placement: this.props.tooltipPlacement ? this.props.tooltipPlacement : Tooltip.placement(200)});
  }

  render() {
    var props = this.props,
        value = this.state.value,
        errorMessage,
        suffix,
        info,
        inputBoxClassName;

      if(props.suffix !== undefined ) {
        suffix = (
          <span className='bd-number-box__placeholder'>{props.suffix}</span>
        );
      }
      if( value !== '' && props.enableInfo ) {
          info = (
            <div className='bd-number-box--amount__info u-f-small u-c-grey-dark'>
              {value < 0 ? '(' : ''}
              <span className='indian-rupee' />
              {Common.numberToWords(value)}
              {value < 0 ? ')' : ''}
            </div>
          );
      }

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

    inputBoxClassName = classNames( 'tool-input-box',
                                    {
                                      'tool-input-box--no-placeholder' : props.suffix === '',
                                      'invalid'                        : props.validationErrors && props.validationErrors.length > 0
                                    }
                                  );

    return (
      <div className={props.className}>
        <div className='bd-number-box--amount js-input-info-trigger rupee-amount indian-rupee'>
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
                 value={this.state.displayValue}
                 data-content={props.tooltip}
                 data-trigger='focus'
                 required={props.required
                             ? 'required'
                             : undefined}
                 onChange={this.handleChange.bind(this)}
                 onBlur={this.handleBlur.bind(this, this.state.value)}
                 onKeyDown={props.onKeyDown} />

          {suffix}

          <span className='bd-number-box__placeholder'>{props.suffix}</span>
        </div>
        {info}
        {errorMessage}
      </div>
    );
  }

};

AmountInput.defaultProps = {
  min               : 0,
  max               : 10000,
  placeholder       : 'eg. 20',
  step              : 1,
  className         : '',
  disabled          : false,
  suffix            : '',
  required          : true,
  isDecimal         : true,
  denominator       : 1,
  validationErrors  : undefined,
  classes           : {},
  name              : '',
  id                : undefined,
  displayValue      : null,
  value             : null,
  typeErrorMessage  : 'Please enter a valid number',
  onChange          : () => {},
  onBlur            : () => {},
  onKeyDown         : () => {}
};

module.exports = AmountInput;