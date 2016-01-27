var React = require('react');
var _     = require('lodash').noConflict();
var FormSectionHeading = require('./core/FormSectionHeading');

var Question = require('./question');

class QuestionSet extends React.Component {

  render() {
    var questions = this.props.questions.map(question => {
      let extraprops = {};

      if (question.props) {
        extraprops = question.props;
      }
      return (
        <Question key={question.questionId}
                  questionSetId={this.props.id}
                  questionId={question.questionId}
                  question={question.question}
                  validateOn={question.validateOn}
                  validations={question.validations}
                  text={question.text}
                  postText={question.postText}
                  value={this.props.questionAnswers[question.questionId]}
                  input={question.input}
                  classes={this.props.classes}
                  renderError={this.props.renderError}
                  renderRequiredAsterisk={this.props.renderRequiredAsterisk}
                  questionAnswers={this.props.questionAnswers}
                  validationErrors={this.props.validationErrors}
                  onAnswerChange={this.props.onAnswerChange}
                  onQuestionBlur={this.props.onQuestionBlur}
                  onKeyDown={this.props.onKeyDown}
                  {...extraprops}  />
      );
    });

    return (
      <div className='form-section form-section__horizontal'>
        <div className='pure-g'>
          <div className='pure-u-1'>
            { this.props.questionSetHeader 
              ? (
                  <FormSectionHeading labelText={this.props.questionSetHeader.text} 
                                      iconClass={this.props.questionSetHeader.iconClass}
                                      fontClas={this.props.questionSetHeader.fontClass} />
                )
              : undefined
            }
          </div>
          <div className='pure-u-1'>
            {typeof this.props.questionSetText !== 'undefined'
              ? 
                <div className='form-group--section'>
                  <div className={'form-group__label u-t-bold ' + this.props.questionSetText.class}>
                    {this.props.questionSetText.text}
                  </div>
                </div>
              : undefined}
          </div>
                   
          {questions}
        </div>
      </div>
    );
  }

};

QuestionSet.defaultProps = {
  id                     : undefined,
  name                   : '',
  questionSetHeader      : undefined,
  questionSetText        : undefined,
  questions              : [],
  questionAnswers        : {},
  classes                : {},
  validationErrors       : {},
  renderError            : undefined,
  renderRequiredAsterisk : undefined,
  onAnswerChange         : () => {},
  onQuestionBlur         : () => {},
  onKeyDown              : () => {}
};

module.exports = QuestionSet;