import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../Components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../Components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component{

state = {
    results:{},
    isFinished: false,
    activeQuestion:0,
    answerState:null,
    quiz:[
        {
            question: 'Какого цвета небо?',
            rightAnswerId:2,
            id:1,
            answers:[
                {text:'Черный',id:1},
                {text:'Синий',id:2},
                {text:'Красный',id:3},
                {text:'Зеленый',id:4},
            ]
        },
        {
            question: 'В каком году основали Санкт-Петербург?',
            rightAnswerId:3,
            id:2,
            answers:[
                {text:'1700',id:1},
                {text:'1702',id:2},
                {text:'1703',id:3},
                {text:'1803',id:4},
            ]
        }
    ]
}

    onAnswerClickHandler =(answerId)=>{

        if(this.state.answerState){
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] === 'success'){
              return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId ){
            if(!results[question.id]){
                results[question.id] = 'success'
            }


            this.setState({
                answerState:{[answerId]:'success'},
                results
            })


            const timeout = window.setTimeout(()=>{

                if(this.isQuizFinished()){
                    this.setState({
                        isFinished:true
                    })
                }else{
                    this.setState({
                        activeQuestion: this.state.activeQuestion +1,
                        answerState:null,

                    })
                }

                window.clearTimeout(timeout);
            },100)
        }else{
            results[question.id] = 'error'
            this.setState({
                answerState:{[answerId]:'error'},
                results
            })
        }


    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () =>{
        this.setState({
            activeQuestion: 0,
            answerState:null,
            isFinished:false,
            results:{}
        })
    }

    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz
                        results ={this.state.results}
                        quiz={this.state.quiz}
                        onRetry={this.retryHandler}
                        />
                        :<ActiveQuiz
                        onAnswerClick = {this.onAnswerClickHandler}
                        question = {this.state.quiz[this.state.activeQuestion].question}
                        answers = {this.state.quiz[this.state.activeQuestion].answers}
                        quizLength={this.state.quiz.length}
                        answerNumber={this.state.activeQuestion +1}
                        state={this.state.answerState}
                        />
                    }

                </div>
            </div>
        )
    }
}

export default Quiz