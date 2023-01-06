import {ListItem, ImageElement, Button} from './styledComponents'

const PlayingView = props => {
  const {eachItem, clickGameId} = props
  const {id, imageUrl, alt} = eachItem
  const onClickButton = () => {
    clickGameId(id, imageUrl)
  }
  return (
    <ListItem>
      <Button type="button" testid={alt}>
        <ImageElement
          alt="your choice"
          src={imageUrl}
          onClick={onClickButton}
        />
      </Button>
    </ListItem>
  )
}

export default PlayingView
