import React, { Component } from 'react'

export default class Result extends Component {
  render() {
    const { score, totalQuestions } = this.props;
    return (
        <div className="result">
        <h3>Quiz Result</h3>
        <p>
          You scored {score}% ({score} out of {totalQuestions} correct)
        </p>
      </div>
    )
  }
}
