import React from 'react'
import { withApollo } from 'react-apollo'
import { eventsQuery } from '../../graphql/queries/eventsQueries'
import Grid from '../../components/Grid/Grid'
import { Spin } from 'antd'

class EventListPage extends React.Component {
  state = {
    modalVisible: false,
    events: [],
    isLoading: false
  }
  componentDidMount () {
    this.fetchEvents()
  }
  fetchEvents () {
    this.setState({ isLoading: true })
    // truyen client apollo qua props
    // HACK: apollo client
    this.props.client
      .query({ query: eventsQuery })
      .then(resData => {
        this.setState({
          events: resData.data.events,
          isLoading: false
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isLoading: false })
      })
  }
  render () {
    const { events } = this.state
    return (
      <>
        {this.state.isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin tip='Loading...' />
          </div>
        ) : (
          <Grid events={events} />
        )}
      </>
    )
  }
}
export default withApollo(EventListPage)
