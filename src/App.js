import {Component} from 'react'

import Popup from 'reactjs-popup'

import {RiCloseLine} from 'react-icons/ri'

import PlayingView from './components/PlayingView'

import {
  MainBgContainer,
  GameContainer,
  ScoreContainer,
  ScoreText,
  Para,
  ScoreValueContainer,
  ScorePara,
  PopupContainer,
  UnListContainer,
  ResultContainer,
  Heading,
} from './StyledComponents'

import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    alt: 'rockButton',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    alt: 'scissorsButton',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    alt: 'paperButton',
  },
]

class App extends Component {
  state = {
    isGameView: true,
    yourImage: '',
    oppImage: '',
    resultText: '',
    score: 0,
    yourChoice: '',
    oppChoice: '',
  }

  onClickPlayAgain = () => {
    this.setState({isGameView: true})
  }

  getScore = () => {
    const {resultText} = this.state
    if (resultText === 'YOU WON') {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else if (resultText === 'YOU LOSE') {
      this.setState(prevState => ({score: prevState.score - 1}))
    }
  }

  getPlaygame = () => {
    const {yourChoice, oppChoice} = this.state
    if (yourChoice === 'ROCK' && oppChoice === 'SCISSORS') {
      this.setState({resultText: 'YOU WON'}, this.getScore)
    } else if (yourChoice === 'SCISSORS' && oppChoice === 'PAPER') {
      this.setState({resultText: 'YOU WON'}, this.getScore)
    } else if (yourChoice === 'PAPER' && oppChoice === 'ROCK') {
      this.setState({resultText: 'YOU WON'}, this.getScore)
    } else if (yourChoice === 'SCISSORS' && oppChoice === 'ROCK') {
      this.setState({resultText: 'YOU LOSE'}, this.getScore)
    } else if (yourChoice === 'PAPER' && oppChoice === 'SCISSORS') {
      this.setState({resultText: 'YOU LOSE'}, this.getScore)
    } else if (yourChoice === 'ROCK' && oppChoice === 'PAPER') {
      this.setState({resultText: 'YOU LOSE'}, this.getScore)
    } else {
      this.setState({resultText: 'IT IS DRAW'}, this.getScore)
    }
  }

  getRandomImage = () => {
    const random = Math.floor(Math.random() * 3)
    const choiceItem = choicesList[random]
    this.setState(
      {oppChoice: choiceItem.id, oppImage: choiceItem.imageUrl},
      this.getPlaygame,
    )
  }

  clickGameId = (id, imageUrl) => {
    this.setState({yourImage: imageUrl, yourChoice: id, isGameView: false})
    this.getRandomImage()
  }

  renderGameResultView = () => {
    const {yourImage, oppImage, resultText} = this.state
    return (
      <ResultContainer>
        <div className="result-image-container">
          <div>
            <Para>YOU</Para>
            <img alt="your choice" src={yourImage} className="your-image" />
          </div>
          <div>
            <Para>OPPONENT</Para>
            <img alt="opponent choice" src={oppImage} className="your-image" />
          </div>
        </div>
        <div>
          <Para>{resultText}</Para>
          <button
            type="button"
            className="play-again-button"
            onClick={this.onClickPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </ResultContainer>
    )
  }

  renderPlayingView = () => (
    <UnListContainer>
      {choicesList.map(eachList => (
        <PlayingView
          eachItem={eachList}
          key={eachList.id}
          clickGameId={this.clickGameId}
        />
      ))}
    </UnListContainer>
  )

  render() {
    const {isGameView, score} = this.state
    return (
      <MainBgContainer>
        <GameContainer>
          <ScoreContainer>
            <ScoreText>
              <Heading>ROCK PAPER SCISSORS</Heading>
            </ScoreText>
            <ScoreValueContainer>
              <ScorePara>Score</ScorePara>
              <ScorePara>{score}</ScorePara>
            </ScoreValueContainer>
          </ScoreContainer>
          {isGameView ? this.renderPlayingView() : this.renderGameResultView()}
          <PopupContainer>
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  Rules
                </button>
              }
            >
              {close => (
                <div className="pop-up-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                    className="rules-image"
                  />

                  <button
                    type="button"
                    className="close-button"
                    onClick={() => close()}
                  >
                    <RiCloseLine />
                  </button>
                </div>
              )}
            </Popup>
          </PopupContainer>
        </GameContainer>
      </MainBgContainer>
    )
  }
}

export default App
