import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
// TODO: them button vao row: https://www.ag-grid.com/javascript-grid-cell-rendering-components/
import ChildMessageRenderer from './ChildMessageRenderer'
import 'ag-grid-enterprise'
import { Spin } from 'antd'
import './Grid.scss'

export default class Grid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      events: this.props.events,
      columnDefs: [],
      rowData: [],
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true
        // width: 100,
        // sortable: true,
        // resizable: true,
        // filter: true
      },
      // frameworkComponents: {
      //   childMessageRenderer: ChildMessageRenderer
      // }
    }
  }
  convertColumnDefs () {
    const { events } = this.state
    const columnDefs = []
    const keysOfEvent =
      typeof this.props.events[0] === 'object' ? Object.keys(events[0]) : ''
    // console.log('TCL: Grid -> convertData -> keysOfEvent', typeof keysOfEvent)
    keysOfEvent.length !== 0
      ? keysOfEvent.forEach(key => {
        if (key === 'title' || key === 'date') {
          const obj = {
            field: key,
            sortable: true,
            filter: 'agTextColumnFilter'
          }
          columnDefs.push(obj)
        } else if (key === 'price') {
          const obj = {
            field: key,
            sortable: true,
            filter: 'agNumberColumnFilter'
          }
          columnDefs.push(obj)
        }
      })
      : (columnDefs.length = 0)
    columnDefs.length !== 0
      ? this.setState({
        columnDefs
      })
      : this.setState({
        columnDefs: []
      })
    // const columnAction = {
    //   headerName: 'Child/Parent',
    //   field: 'value',
    //   cellRenderer: 'childMessageRenderer',
    //   colId: 'params',
    //   width: 180
    // }
    // this.setState({
    //   columnDefs: this.state.columnDefs.push(columnAction)
    // })
    // console.log('TCL: Grid -> convertData -> columnDefs', this.state.columnDefs)
  }
  convertData () {
    const { events } = this.state
    const rowData = []
    events.forEach(event => {
      let row = {}
      for (let [key, value] of Object.entries(event)) {
        if (key === 'title' || key === 'date' || key === 'price') {
          if (key === 'date') {
            row[key] = new Date(value).toLocaleDateString()
          } else {
            row[key] = value
          }
        }
      }
      rowData.push(row)
    })
    console.log('TCL: Grid -> convertData -> row', rowData)
    this.setState({
      rowData
    })
  }
  // componentDidMount () {
  //   setTimeout(
  //     function () {
  //       this.convertColumnDefs()
  //     }.bind(this),
  //     500
  //   )
  //   setTimeout(
  //     function () {
  //       this.convertData()
  //     }.bind(this),
  //     1000
  //   )
  // }
  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.convertColumnDefs()
    this.convertData()
    // HACK: method chi thuc hien sau khi co data va render ra
    params.api.sizeColumnsToFit()

    // setTimeout(function () {
    //   var rowCount = 0;
    //   params.api.forEachNode(function (node) {
    //     node.setExpanded(rowCount++ === 1);
    //   });
    // }, 500);
  }
  render () {
    const { rowData, events } = this.state
    return (
      <div
        className='ag-theme-balham'
        style={{
          height: '400px',
          width: '100%'
        }}
      >
        {events.length !== 0 ? (
          <AgGridReact
            columnDefs={this.state.columnDefs}
            onGridReady={this.onGridReady}
            animateRows={'true'}
            floatingFilter={'true'}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
          />
        ) : (
          <Spin style={{ padding: '30px 50%' }} tip='Loading...' />
        )}
      </div>
    )
  }
}
