
const SEARCH_URL='http://localhost:8000/rooms';
const PROXY_URL='https://cors-anywhere.herokuapp.com/';
/*
	Query functions:
*/

export async function getSearchResults(date,duration){
	let url_str = SEARCH_URL + "/search";
	let obj = await {date: date, duration: duration}
	let response = await fetch(url_str, {method: 'POST', body: JSON.stringify(obj)});
	response = await response.json();

	if(response['status']!=200){
		throw "Error 400";
	}
	return response["data"];
}

export async function getOverview(q){
	//only GET. nothing supplied.
	let url_str = SEARCH_URL + "/overview";
	let response = await fetch(url_str);
	response = await response.json();

	if(response['status']!=200){
		throw "Error 400";
	}
	return response["data"];
}

export async function postRoomBooking(data){
	let url_str = SEARCH_URL + "/placeBooking";
	let response = await fetch(url_str, {method: 'POST', body: JSON.stringify(data)});
	response = await response.json();
	
	if(response['status']!=200){
		throw "Error 400";
	}
	return response["response"];
}

export async function getSingleRoomData(room, date){
	let url_str = SEARCH_URL + "/getRoomData";
	let obj = await {room: room, date: date}

	let response = await fetch(url_str, {method: 'POST', body: JSON.stringify(obj)});
	response = await response.json();

	if(response['status']!=200){
		throw "Error 400";
	}

	response = await response["data"];
	response = await processData(date, response);

	return response;
}

/*
	Important helper functions
*/

export function intToTime(num){
//Convers integer to time.
	let c = num%24;
	let str ="";
	if(c<10){
	str += "0"
	}
	str += c.toString();
	str += "00";
	return str;
}

//Check if datestring represents today's date.
function isToday(date){
	let today = new Date();
	var d = today.getDate();
	var m = today.getMonth()+1; //As January is 0.
	var y = today.getFullYear();
	if(d<10) d='0'+d;
	if(m<10) m='0'+m;
	let dateStr = d + "-" + m + "-" + y;
	return (dateStr==date);
}

//consider moving this to backend.
function processData(date, data){
	let today = new Date();
  	//consider and append empty gaps
	let now = today.getHours();
	let last = 0;

	//set last to now if today is the date. (assumes no searching previous dates)
	(isToday(date)) && (last = now);

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
	        booker : "",
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
	  booker : "",
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