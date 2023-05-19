import React, { Component } from "react";
import "./quiz.css";
import Confetti from "react-confetti";
// import Result from "./Result";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      questionsPerPage: 1,
      selectedAnswers: {},
      progress: 0,
      correctAnswers: [],
      wrongAnswers: [],
      timeRemaining: 10,
      showResult: false,
      isTimerRunning: true,
    };
  }
  questions = [
    {
      id: "1.",
      question: "Which of the following is the correct name of React.js?",
      options: ["React", "React.js", "ReactJS", "All of the above"],
      answer: "All of the above",
    },
    {
      id: "2.",
      question: "Which of the following are the advantages of React.js?",
      options: [
        "React.js can increase the application's performance with Virtual DOM.",
        "React.js is easy to integrate with other frameworks such as Angular, BackboneJS since it is only a view library.",
        "React.js can render both on client and server side.",
        "All of the above",
      ],
      answer: "All of the above",
    },
    {
      id: "3.",
      question: "Which of the following is not a disadvantage of React.js?",
      options: [
        "React.js has only a view layer. We have put your code for Ajax requests, events and so on.",
        "The library of React.js is pretty large.",
        "The JSX in React.js makes code easy to read and write.",
        "The learning curve can be steep in React.js.",
      ],
      answer: "The JSX in React.js makes code easy to read and write.",
    },
    {
      id: "4.",
      question:
        "Which of the following command is used to install create-react-app?",
      options: [
        "npm install -g create-react-app",
        "npx create-react-app my-app",
        "npm install create-react-app",
        "npm install -f create-react-app",
      ],
      answer: "npx create-react-app my-app",
    },
    {
      id: "5.",
      question:
        "What of the following is used in React.js to increase performance?",
      options: [
        "Original DOM",
        "Virtual DOM",
        "Both A and B.",
        "None of the above.",
      ],
      answer: "Virtual DOM",
    },
    {
      id: "6.",
      question: "What is the default port where webpack-server runs?",
      options: ["3000", "8080", "3030", "6060"],
      answer: "3000",
    },
    {
      id: "7.",
      question:
        "How many numbers of elements a valid react component can return?",
      options: ["1", "2", "3", "Unlimited"],
      answer: "1",
    },
    {
      id: "8.",
      question:
        "What is the declarative way to render a dynamic list of components based on values in an array?",
      options: [
        "Using the reduce array method",
        "Using the <Each /> component",
        "Using the Array.map() method",
        "With a for/while loop",
      ],
      answer: "Using the Array.map() method",
    },
    {
      id: "9.",
      question: "What is a state in React?",
      options: [
        "A permanent storage.",
        "Internal storage of the component.",
        "External storage of the component.",
        "None of the above.",
      ],
      answer: "Internal storage of the component.",
    },
    {
      id: "10",
      question: "What are the two ways to handle data in React?",
      options: [
        "State & Props",
        "Services & Components",
        "State & Services",
        "State & Component",
      ],
      answer: "State & Props",
    },
  ];
  componentDidMount() {
    this.startTimer();

  }
  handleNextPage = () => {
    clearInterval(this.timer);
    this.setState({ timeRemaining: 10 });
    const { currentPage } = this.state;
    const totalPages = Math.ceil(
      this.questions.length / this.state.questionsPerPage
    );

    const newProgress = (currentPage / totalPages) * 100;
    console.log(newProgress);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1, progress: newProgress });
      this.startTimer();
    }
  };
  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        const { timeRemaining } = prevState;

        if (timeRemaining > 0) {
          return { timeRemaining: timeRemaining - 1 };
        } else {
          clearInterval(this.timer);
          this.handleNextPage();
          return null;
        }
      });
    }, 1000);
  };


  handlePreviousPage = () => {
    const { currentPage } = this.state;
    this.setState({ timeRemaining: 10 });
    const totalPages = Math.ceil(
      this.questions.length / this.state.questionsPerPage
    );
    const newProgress = (currentPage / totalPages) * 100 - 20;
    console.log(newProgress);
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1, progress: newProgress });
      this.startTimer();
    }
  };
  handleAnswerSelection = (questionId, option) => {
    const { selectedAnswers, correctAnswers, wrongAnswers } = this.state;
    const { questions } = this;

    const selectedAnswer = selectedAnswers[questionId];
    if (selectedAnswer === option) {
      this.setState((prevState) => ({
        selectedAnswers: {
          ...prevState.selectedAnswers,
          [questionId]: option,
        },
        correctAnswers: correctAnswers.filter(
          (answerId) => answerId !== questionId
        ),
        wrongAnswers: wrongAnswers.filter(
          (answerId) => answerId !== questionId
        ),
      }));
    } else {
      this.setState((prevState) => ({
        selectedAnswers: {
          ...prevState.selectedAnswers,
          [questionId]: option,
        },
        correctAnswers: questions.find(
          (question) => question.id === questionId && question.answer === option
        )
          ? [...correctAnswers, questionId]
          : correctAnswers,
        wrongAnswers: questions.find(
          (question) => question.id === questionId && question.answer !== option
        )
          ? [...wrongAnswers, questionId]
          : wrongAnswers,
      }));
    }
  };

  calculateResult = () => {
    const { selectedAnswers } = this.state;
    const correctAnswers = this.questions.reduce((acc, question) => {
      return selectedAnswers[question.id] === question.answer ? acc + 1 : acc;
    }, 0);
    const totalQuestions = this.questions.length;
    const score = (correctAnswers / totalQuestions) * 100;
    this.setState({ showResult: true, score });

    alert(
      `You scored ${score}% (${correctAnswers} out of ${totalQuestions} correct)`
    );
  };
  isOptionSelected(questionId, option) {
    const { selectedAnswers } = this.state;
    if (selectedAnswers && Object.keys(selectedAnswers).length > 0) {
      return selectedAnswers[questionId] === option;
    }
    return false;
  }


  render() {
    const { timeRemaining, showResult,
      score } = this.state;
    const { currentPage, questionsPerPage } = this.state;
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = this.questions.slice(
      indexOfFirstQuestion,
      indexOfLastQuestion
    );
    const buttonenable =
      currentPage === Math.ceil(this.questions.length / questionsPerPage);
    // const isLastPage = currentPage === Math.ceil(this.questions.length / questionsPerPage);
    return (
      <>
        <div
          className={`modal d-block ${this.state.currentPage > 0 ? "fadeIn" : ""
            }`}
          tabIndex="-1"
        >
          <Confetti width={window.innerWidth} height={window.innerHeight} />

          <div className="modal-dialog  slideInDown">
            <div className="modal-content zoomIn">
              <div className="modal-header bounceInDown">
                <h3 className="modal-title">PLAY QUIZ</h3>
              </div>
              <div className="modal-body">
                <div className="question-timer">
                  Time Remaining: {timeRemaining} seconds
                </div>
                {currentQuestions.map((question) => {
                  const { id, question: questionText, options } = question;
                  const selectedAnswer = this.state.selectedAnswers[id];

                  return (
                    <div className="questionColor" key={question.id}>
                      <p>
                        <strong>
                          {question.id} {question.question}
                        </strong>
                      </p>
                      {question.options.map((option) => {
                        const isOptionSelected = selectedAnswer === option;
                        const isOptionCorrect =
                          isOptionSelected &&
                          selectedAnswer === question.answer;

                        return (

                          <div
                            key={option}
                            className={`form-check ${isOptionSelected ? "selected" : ""
                              } ${isOptionCorrect ? "correct" : ""}`}
                          >

                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question_${question.id}`}
                              id={`${question.id}_${option}`}
                              onChange={() =>
                                this.handleAnswerSelection(question.id, option)
                              }
                              checked={isOptionSelected}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`${question.id}_${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div className="modal-footer justify-content-between fadeIn">
                <div className="progress-bar">
                  <div
                    className="progress-bar-inner"
                    style={{ width: `${this.state.progress}%` }}
                  ></div>
                </div>
                <button
                  type="button"
                  className="button login__submit"
                  onClick={this.handlePreviousPage}
                >
                  <span>&larr;</span>Prev
                </button>

                <button
                  type="button"
                  className="button login__submit "
                  onClick={this.handleNextPage}
                >
                  Next <span>&rarr;</span>
                </button>
                {buttonenable && (
                  <button
                    type="button"
                    className="button login__submit"
                    onClick={this.calculateResult}
                  >
                    Calculate Result
                  </button>

                )}

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Quiz;
