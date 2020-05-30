### Why not npm install?

According to the issues on material-kit-react's repository, there are issues with installing the product using npm.

[Link 1](https://github.com/creativetimofficial/material-kit-react/issues/71)
[Link 2](https://github.com/creativetimofficial/ct-material-dashboard-pro-react/issues/50#issuecomment-407030675)

As such, the recommended usage is to download a zip file (of the repository) through the website or clone the repository directly.


# Room Booking UI

This is a UI for a room booking web application, built on [Material Kit React](https://demos.creative-tim.com/material-kit-react/#/?ref=mkr-readme). 

[roombook-server](https://github.com/wenhongg/roombook-server)

## Steps
To start the UI, run:
```
    npm install
    npm start
```
To generate production build, run:
```
    npm build
    serve -s build
```
Deploy
```
	gcloud app deploy
```

# Overview of room booking project

The app has been deployed to [roomsbook.df.r.appspot.com](https://roomsbook.df.r.appspot.com/).

All my code is in src/views/MainPage. Other folders in views are starter code from material UI.

## Assumptions

1. People will book and use rooms in units of hours.
2. No fixed list of authorized users (anyone can book, with name and contact)
3. No limit on hours the room can be booked for (up to 24 hours - see limitation 1).

## Functionality

### Express booking

On the main page, there is a form for users to quickly choose a date and duration. This assumes that users are not concerned about which room (can possibly be further work). A list of rooms and intervals will appear and users can book immediately.

### View specific room calendar

If user selects to view full list, they are given the list of rooms and the current availabilites. can then click on a specific room and see the calendar for that day, and also other days. They can book from the CalendarPage.

Calendar page can also be accessed by clicking the map.

## Todos (for both UI and server)

### Current limitations/Future Work

1. Cannot book across days
2. Rooms currently have no specifications i.e. can add to sort by size of room.
3. Cannot delete
4. Shift more logic to server side?

### Known bugs

1. Not sufficiently phone optimized; some elements overlap on small screens

## Stack chosen and why

1. React 

- Easy to understand mix of HTML and Javascript
- Reusable components for different needs; very OOP 

2. Django

- Very simple way to get a server up and running: removes need for dealing directly with database
- Clean design pattern, understandable

## Other notes

Heroku server sleeps after some inactivity; first connection might take slightly longer.