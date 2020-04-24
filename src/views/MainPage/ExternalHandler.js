
const SEARCH_URL='http://localhost:8000/rooms';
const PROXY_URL='https://cors-anywhere.herokuapp.com/'


export async function getAllRoomData(q){
	//only GET. nothing supplied.
	let url_str = SEARCH_URL + "/overview";
	let response = await fetch(url_str);
	response = await response.json();

	await console.log(response)
	return response;
}

const s1 = [{name: 'S01', appts: '2014-03-12.13'}]; 
export async function getAllRoomDataTest(){
	return roomData;
}

export async function postRoomBooking(data){
	let url_str = SEARCH_URL + "/placeBooking";
	let response = await fetch(url_str, {method: 'POST', body: JSON.stringify(data)});
	response = await response.json();
	
	return response['response'];
}

export async function getSingleRoomData(room, date){
	let url_str = SEARCH_URL + "/getRoomData";
	let obj = await {room: room, date: date}
	let response = await fetch(url_str, {method: 'POST', body: JSON.stringify(obj)});
	response = await response.json();
	response = await processData(date, response);
	return response;
	//inprog
	//let c = await processData(date, data[date]);
	//return c;
	//return data[date];
}

function processData(date, data){
	
	let today = new Date();
	var d = today.getDate();
	var m = today.getMonth()+1; //As January is 0.
	var y = today.getFullYear();
	if(d<10) d='0'+d;
	if(m<10) m='0'+m;
	let dateStr = d + "-" + m + "-" + y;


  	//consider and append empty gaps
	let now = today.getHours();
	let last = 0;

	//set last to now if today is the date. (assumes no searching previous dates)
	(dateStr==date) && (last = now);

	let newData = []
	let i;
	let start,end, item;
	if(data!=null){
	  for(i=0;i<data.length;i++){
	    start = data[i]['start'];
	    end = data[i]['end'];

	    if(start>last){
	      //free time betwen last and start of next
	      item = {
	        name : "",
	        contact: "",
	        start: last,
	        end: start,
	        duration: start-last,
	        isBooked: false
	      };
	      newData.push(item);
	    }
	    data[i]['isBooked'] = true;
	    newData.push(data[i]);
	    if(end>last){
	      last = end;
	    }
	  }
	}
	if(last<24){
	item = {
	  name : "",
	  contact: "",
	  start: last,
	  end: 24,
	  duration: 24-last,
	  isBooked: false
	};
	newData.push(item);
	}
	return newData;
}
const data = {
  '25-04-2020': [
    {start: 3, end: 6, duration: 3, name: 'Edwin', contact: 'edwin@example.com'},
    {start: 9, end: 12, duration: 3, name: 'Jane', contact: 'jane@example.com'}
  ],
  '24-04-2020': [
    {start:4, end:9, duration: 5, name: 'Edwin', contact: 'edwin@example.com'},
    {start:9, end:12, duration: 3, name: 'Jane', contact: 'jane@example.com'},
    {start:13, end:15, duration: 2, name: 'Tane', contact: 'tane@example.com'}
  ],
};

//attempt to follow iso8601 dates
const roomData = [{name:'S01',booked: false},{name:'S02',booked: true},{name:'S03',booked: false}]