// ✅ get hours and minutes from the current Date
// const now = new Date();

// const hoursAndMinutes = now.getDay() + ':' + now.getMinutes();
// console.log(hoursAndMinutes); // 👉️ 2:33

// const now = new Date();

// // 👇️ With PM / AM
// const hoursAndMinutes = now.toLocaleTimeString('en-US', {
//   hour: '2-digit',
//   minute: '2-digit',
// });

// console.log(hoursAndMinutes); // 👉️ 01:34 PM

function chekTime(currentTime, transactionTime) {
	const now = new Date(currentTime);
	const current = now.getMinutes();

	const timenow = new Date(transactionTime);
	const time = timenow.getMinutes();

	if (
		timenow.getDate() === now.getDate() &&
		timenow.getHours() === now.getHours()
	) {
		console.log((1686661243166 - 168642851399345) / 600000 > 12);
		return current - time < 12;
	} else {
		return 10;
	}
}

console.log(chekTime('2023-06-12T23:25:10.867Z', '2023-06-12T23:11:18.090Z'));

// console.log(new Date());
