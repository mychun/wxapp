const util = require('../../utils/util.js')

Page({
  data: {
    input: '',
    todos: [],
    completed: false,
    currNum: 0,
    logs: []
  },
  save(){
    wx.setStorageSync('todo_list', this.data.todos)
    wx.setStorageSync('todo_logs', this.data.logs)
  },
  load(){
    let todos = wx.getStorageSync('todo_list')
    if(todos){
      let currNum = todos.filter((item)=>{
        return !item.completed
      }).length
      this.setData({
        todos,
        currNum
      })
    }

    let logs = wx.getStorageSync('todo_logs')
    if(logs){
      this.setData({
        logs
      })
    }
  },
  onLoad(){
    this.load()
  },
  inputChangeHandle(e){
    this.setData({
      input: e.detail.value
    })
  },
  addLog(action, name){
    let logs = this.data.logs
    logs.push({
      timestamp: util.formatTime(),
      action,
      name
    })
    this.setData({
      logs
    })
  },
  addTodosHandle(){
    if(!this.data.input || !this.data.input.trim()) return

    let todos = this.data.todos
    todos.push({
      name: this.data.input,
      completed: false
    })

    let currNum = this.data.currNum + 1

    this.addLog('Add', this.data.input)

    this.setData({
      todos,
      currNum
    })

    this.save()
  },
  toggleTodoHandle(e){
    let todos = this.data.todos
    let index = e.currentTarget.dataset.index
    todos[index].completed = !todos[index].completed

    let currNum = this.data.currNum + ( todos[index].completed ? -1 : 1 )

    this.addLog( todos[index].completed ? 'Finish' : 'Restart' , todos[index].name)

    this.setData({
      todos,
      currNum
    })

    this.save()
  },
  removeTodoHandle(e){
    let index = e.currentTarget.dataset.index
    let todos = this.data.todos
    let item = todos.splice(index, 1)[0]

    let currNum = this.data.currNum - ( item.completed ? 0 : 1 )

    this.addLog( 'Remove' , item.name)

    this.setData({
      todos,
      currNum
    })

    this.save()
  },
  togglAllHandle(){
    this.data.completed = !this.data.completed
    let todos = this.data.todos
    todos.forEach((item)=>{
      item.completed = this.data.completed
    })

    let currNum = this.data.completed ? 0 : this.data.todos.length

    this.addLog( this.data.completed ? 'Finish' : 'Restart' , 'All todos')

    this.setData({
      todos,
      currNum
    })

    this.save()
  },
  clearCompletedHandle(){
    let todos = this.data.todos.filter((item)=>{
      return !item.completed
    })

    this.addLog( 'Clear' , 'Completed todo')

    this.setData({
      todos
    })

    this.save()
  }
})