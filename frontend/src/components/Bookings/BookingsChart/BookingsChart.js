import React from 'react'
import { Bar as BarChart } from 'react-chartjs-2'

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 20000
  },
  Normal: {
    min: 20000,
    max: 30000
  },
  Expensive: {
    min: 30000,
    max: 10000000
  }
}

const BookingsChart = props => {
  const chartData = { labels: [], datasets: [] }
  let values = []
  let hue = 0
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = props.bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price <= BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1
      } else {
        return prev
      }
    }, 0)
    // console.log(filteredBookingsCount)
    values.push(filteredBookingsCount)
    chartData.labels.push(bucket)
    // console.log(values)
    // moi loai deu co 3 cot data =[2,0,0] neu ko du 3 cot tu fill 0
    chartData.datasets.push({
      label: bucket,
      backgroundColor: `hsl(${hue}, 100%, 50%)`,
      data: values
    })
    values = [...values]
    values[values.length - 1] = 0
    hue += 20
  }
  // chartData.datasets = [
  //   {
  //     label: 'A',
  //     backgroundColor: 'rgba(255, 99, 132, 0.8)',
  //     data: [2]
  //   },
  //   {
  //     label: 'B',
  //     backgroundColor: 'rgba(255, 99, 132, 0.8)',
  //     data: [0, 1]
  //   },
  //   {
  //     label: 'C',
  //     backgroundColor: 'rgba(255, 99, 132, 0.8)',
  //     data: [0, 0, 2]
  //   }
  // ]
  // console.log(chartData.datasets)
  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <BarChart data={chartData} />
    </div>
  )
}

export default BookingsChart
