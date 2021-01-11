$(function () {
    let guests = 1;

    const details = {
        location: null,
        checkIn: null,
        checkOut: null,
        guests: {
            adults: 1,
            children: 0,
        },
    };

    const onDateChange = (date, type) => {
        date = new Date(date);
        const typeKebab = type === "checkIn" ? "check-in" : "check-out";
        details[type] = date;

        $(`#${typeKebab}-date`).html(
            `${date.getDate()} <bdi>${getMonthName(
                date.getMonth(),
                true
            )}' ${date.getFullYear().toString().substr(-2)}</bdi>`
        );

        $(`#${typeKebab}-popup`).hide();

        if (type === "checkIn") {
            if (details.checkOut) {
                if (details.checkOut.getTime() < date.getTime()) {
                    $("#check-out-datepicker").datepicker("setDate", date);
                    onDateChange(date, "checkOut");
                }
            }

            $("#check-out-datepicker").datepicker("change", {
                minDate: date,
            });
        }
    };

    const onLocationChange = (_, { target, current }) => {
        details.location = current;

        target = $(`#${target}`);

        target.find(".value").text(current.name);
        target.find(".info").text(current.country);

        $(".selectpicker").hide();
    };

    const onGuestChange = (_, { target, current, previous }) => {
        current = parseInt(current.val);
        previous = previous ? parseInt(previous.val) : 0;

        details.guests[target] = current;

        guests = guests - previous + current;

        $("#guests").text(guests);
    };

    $("#villa-location-selectpicker")
        .selectpicker({
            data: DATA.hotelLocations,
            extractor: (data) => {
                return {
                    name: data.name,
                    detail: data.info,
                    extra: data.type,
                };
            },
        })
        .change(onLocationChange);

    $("#check-in-datepicker").datepicker({
        minDate: 0,
        onSelect: (date) => onDateChange(date, "checkIn"),
    });

    $("#check-out-datepicker").datepicker({
        minDate: 0,
        onSelect: (date) => onDateChange(date, "checkOut"),
    });

    $("#adults-listpicker")
        .listpicker({
            data: [
                { name: "1", val: 1, active: true },
                { name: "2", val: 2 },
                { name: "3", val: 3 },
                { name: "4", val: 4 },
                { name: "5", val: 5 },
                { name: "6", val: 6 },
                { name: "7", val: 7 },
                { name: "8", val: 8 },
                { name: "9", val: 9 },
                { name: "10", val: 10 },
                { name: "11", val: 11 },
                { name: "12", val: 12 },
            ],
        })
        .change(onGuestChange);

    $("#children-listpicker")
        .listpicker({
            data: [
                { name: "0", val: 0, active: true },
                { name: "1", val: 1 },
                { name: "2", val: 2 },
                { name: "3", val: 3 },
                { name: "4", val: 4 },
            ],
        })
        .change(onGuestChange);
});
