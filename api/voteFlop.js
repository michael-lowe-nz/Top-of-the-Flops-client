import request from 'superagent'
import url from './apiUrl'

module.exports = (dispatch, state, flopId, userId, upvote, downvote) => {
  const sendInfo = {
    flopId,
    userId,
    upvote,
    downvote
  }
  dispatch({type: 'POST_VOTE', payload: sendInfo})
  dispatch({type: 'ATTACH_VOTES'})
  request
    .post(`${url}/api/v1/votes`)
    .withCredentials()
    .send(sendInfo)
    .end((err, res) => {
      if (err) {
        dispatch({type: 'CHANGE_PAGE', payload: '/unauthenticated'})
      }
    })
}
