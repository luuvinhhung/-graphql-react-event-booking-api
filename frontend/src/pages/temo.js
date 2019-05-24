fetchEvents() {
  this.setState({ isLoading: true })
  const requestBody = {
    query: `
        query {
          events {
            _id
            title
            description
            date
            price
            creator {
              _id
              email
            }
          }
        }
      `
  }
  fetch('http://localhost:3001/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      // console.log(resData)
      const events = resData.data.events
      // console.log(events)
      this.setState({
        events,
        isLoading: false
      })
    })
    .catch(err => {
      console.log(err)
      this.setState({ isLoading: false })
    })
  }