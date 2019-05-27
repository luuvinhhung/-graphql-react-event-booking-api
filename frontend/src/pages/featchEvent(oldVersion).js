// fetchEvents(){
//   this.setState({ isLoading: true })
//   const requestBody = {
//     query: `
//         query {
//           events {
//             _id
//             title
//             description
//             date
//             price
//             creator {
//               _id
//               email
//             }
//           }
//         }
//       `
//   }
//   fetch('http://localhost:3001/graphql', {
//     method: 'POST',
//     body: JSON.stringify(requestBody),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(res => {
//       if (res.status !== 200 && res.status !== 201) {
//         throw new Error('Failed!')
//       }
//       return res.json()
//     })
//     .then(resData => {
//       // console.log(resData)
//       const events = resData.data.events
//       // console.log(events)
//       this.setState({
//         events,
//         isLoading: false
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       this.setState({ isLoading: false })
//     })
//   }

//   {
//     this.togglemodalVisible()
//     const title = this.titleEl.current.state.value
//     const price = +this.priceEl.current.state.value
//     const date = this.dateEl.current.picker.state.value.toISOString()
//     const description = this.descriptionEl.current.textAreaRef.value
//     const requestBody = {
//       // check type of variables in graphql/schema
//       query: `
//           mutation CreateEvent($title: String!, $desc: String!, $price: Float!, $date: String!) {
//             createEvent(eventInput: {title: $title, description: $desc, price: $price, date: $date}) {
//               _id
//               title
//               description
//               date
//               price
//             }
//           }
//         `,
//       variables: {
//         title: title,
//         desc: description,
//         price: price,
//         date: date
//       }
//     }
//     fetch('http://localhost:3001/graphql', {
//       method: 'POST',
//       body: JSON.stringify(requestBody),
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + this.token
//       }
//     })
//       .then(res => {
//         if (res.status !== 200 && res.status !== 201) {
//           throw new Error('Failed!')
//         }
//         return res.json()
//       })
//       .then(resData => {
//         this.setState(prevState => {
//           const updatedEvents = [...prevState.events]
//           updatedEvents.push({
//             _id: resData.data.createEvent._id,
//             title: resData.data.createEvent.title,
//             description: resData.data.createEvent.description,
//             date: resData.data.createEvent.date,
//             price: resData.data.createEvent.price,
//             creator: {
//               _id: this.userId
//             }
//           })
//           return { events: updatedEvents }
//         })
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }