var React = require('react'),
    classNames = require('classnames'),
    //TooltipInfo = require('./TooltipInfo.jsx'),
    shallowCompare = require('react-addons-shallow-compare');

class FormSectionHeading extends React.Component {

  shouldComponentUpdate( nextProps, nextState ) {
    // return true;
    return shallowCompare( this, nextProps, nextState );
  }

  render() {
    var props = this.props;
        var fontClass = classNames(
            'u-c-secondary u-t-bold form-group__label__text',
            props.fontClass !== undefined ? props.fontClass : ''
        );
        var blockWidthClass = classNames(
            'pure-u-1',
             props.blockWidthClass !== undefined ? props.blockWidthClass : ''
        );

        // var tooltip = null;
        // if(props.tooltip)
        // {
        //     tooltip = (
        //         <TooltipInfo tooltip={this.props.tooltip} />
        //     );
        // }

        var iconClass = null;
        var icon = null;
        if(props.iconClass !== undefined) {
            iconClass = classNames(
                'form-group__label__icon', 
                props.iconClass !== null ? props.iconClass : '',
                {
                    'u-v-hidden' : props.iconClass === null
                }
            );
            icon = (
                <span className={iconClass}></span>
            );
        }

        return (
             <div className={blockWidthClass}>
                <div className="u-c-font-light form-group__label">
                    {icon}
                    <span className={fontClass}>{props.labelText}</span>
                    {/*tooltip*/}
                </div>
            </div>
        );
  }

};

FormSectionHeading.defaultProps = {
  iconClass         : undefined,
  fontClass         : undefined,
  blockWidthClass   : undefined,
  tooltip           : undefined,
  labelText         : null
};

module.exports = FormSectionHeading;