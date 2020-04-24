# Room Booking UI

This is a UI for a room booking web application, built on [Material Kit React](https://demos.creative-tim.com/material-kit-react/#/?ref=mkr-readme). 

[roombook-server](https://github.com/wenhongg/roombook-server)

## Steps
To deploy the UI, run:
```
    npm install
    npm start
```
To generate production build, run:
```
    npm build
```





# Overview of room booking project

## Functionality

### Express booking

On the main page, there is a form for users to quickly choose a date and duration. This assumes that users are not concerned about which room (can possibly be further work). A list of rooms and intervals will appear and users can book immediately.

### View specific room calendar

If user selects to view full list, they are given the list of rooms and the current availabilites. can then click on a specific room and see the calendar for that day, and also other days. They can book from the CalendarPage.

Calendar page can also be accessed by clicking the map.

## Todos (for both UI and server)

### Current limitations

1. Cannot book across days
2. If decimal is input into duration form, it just rounds up (intended)
3. Rooms have no specifications i.e. can add to sort by size
4. Shift more logic to server side?

### Known bugs

1. By manipulating URL users can access phantom rooms and book


## Stack chosen and why

1. React 

- Easy to understand mix of HTML and Javascript
- Reusable components for different needs; very OOP 

2. Django

- Very simple way to get a server up and running: removes need for dealing directly with database
- Clean design pattern, understandable

