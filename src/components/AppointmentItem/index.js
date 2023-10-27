// Write your code here

const AppointmentItem = props => {
  const {AppointmentDetails, toggleIsFavorite} = props
  const {id, Title, isFavorite, date} = AppointmentDetails
  const starImgUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavoriteIcon = () => {
    toggleIsFavorite(id)
  }
  return (
    <li>
      <div>
        <p>{Title}</p>
        <p>Date: {date}</p>
        <div>
          <button
            type="button"
            onClick={onClickFavoriteIcon}
            data-testid="star"
          >
            <img src={starImgUrl} alt="star" />
          </button>
        </div>
      </div>
    </li>
  )
}

export default AppointmentItem
