import Event from '../../models/event'
import Booking from '../../models/booking'
import { transformBooking, transformEvent } from './merge'

export default {
  Query: {
    bookings: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const bookings = await Booking.find({ user: req.userId })
        return bookings.map(booking => {
          return transformBooking(booking)
        })
      } catch (err) {
        throw err
      }
    }
  },
  Mutation: {
    bookEvent: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      const fetchedEvent = await Event.findOne({ _id: args.eventId })
      const booking = new Booking({
        user: req.userId,
        event: fetchedEvent
      })
      const result = await booking.save()
      return transformBooking(result)
    },
    cancelBooking: async (args, req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!')
      }
      try {
        const booking = await Booking.findById(args.bookingId).populate('event')
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId })
        return event
      } catch (err) {
        throw err
      }
    }
  }
}
