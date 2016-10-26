$(document).ready(function() {
    $('#calendar').fullCalendar({
            defaultView: 'agendaDay',
			defaultDate: '2016-09-07',
			editable: true,
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'agendaDay,agendaFourDay,agendaWeek,month'
			},
			views: {
				agendaFourDay: {
					type: 'agenda',
					duration: { days: 4 },
                    snapDuration: {minutes: 15},

					// views that are more than a day will NOT do this behavior by default
					// so, we need to explicitly enable it
					groupByResource: true

					//// uncomment this line to group by day FIRST with resources underneath
					//groupByDateAndResource: true
				}
			},

			//// uncomment this line to hide the all-day slot
			//allDaySlot: false,

			resources: function(callback) {
                callback($scope.currentUser.adminOfResources);
            },
			events: [
				{ id: '1', resourceId: 'a', start: '2016-09-06', end: '2016-09-08', title: 'event 1' },
				{ id: '2', resourceId: 'a', start: '2016-09-07T09:00:00', end: '2016-09-07T14:00:00', title: 'event 2' },
				{ id: '3', resourceId: 'b', start: '2016-09-07T12:00:00', end: '2016-09-08T06:00:00', title: 'event 3' },
				{ id: '4', resourceId: 'c', start: '2016-09-07T07:30:00', end: '2016-09-07T09:30:00', title: 'event 4' },
				{ id: '5', resourceId: 'd', start: '2016-09-07T10:00:00', end: '2016-09-07T15:00:00', title: 'event 5' }
			],

			select: function(start, end, jsEvent, view, resource) {
				console.log(
					'select',
					start.format(),
					end.format(),
					resource ? resource.id : '(no resource)'
				);
			},
			dayClick: function(date, jsEvent, view, resource) {
				console.log(
					'dayClick',
					date.format(),
					resource ? resource.id : '(no resource)'
				);
			}
		});
});
