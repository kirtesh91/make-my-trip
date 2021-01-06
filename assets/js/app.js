$(function () {
    let travellers = 1;

    const details = {
        from: null,
        to: null,
        departure: null,
        return: null,
        travellers: {
            class: "E",
            adults: 1,
            children: 0,
            infants: 0,
        },
    };

    const onTravellerChange = (_, { target, current, previous }) => {
        current = parseInt(current.val);
        previous = previous ? parseInt(previous.val) : 0;

        details.travellers[target] = current;

        travellers = travellers - previous + current;

        $("#travellers").text(travellers);
    };

    const onFlightCityChange = (_, { target, current }) => {
        const key = target === "flight-from" ? "from" : "to";
        details[key] = current;

        target = $(`#${target}`);

        target.find(".value").text(current.name);
        target
            .find(".info")
            .text(`${current.code}, ${current.airport}, ${current.location}`);

        $(".selectpicker").hide();
    };

    const onDateChange = (date, type) => {
        date = new Date(date);
        details[type] = date;

        $(`#${type}-date`).html(
            `${date.getDate()} <bdi>${getMonthName(
                date.getMonth(),
                true
            )}' ${date.getFullYear().toString().substr(-2)}</bdi>`
        );

        $(`#${type}-popup`).hide();

        if (type === "departure") {
            if (details.return) {
                if (details.return.getTime() < date.getTime()) {
                    $("#return-datepicker").setDate(date);
                }
            }

            $("#return-datepicker").datepicker("change", {
                minDate: date,
            });
        }
    };

    $("#adults-listpicker")
        .listpicker({
            data: [
                { name: "1", val: 1, active: true },
                { name: "2", val: 2 },
                { name: "3", val: 3 },
                { name: "4", val: 4 },
                { name: "5", val: 5 },
                { name: "6", val: 6 },
                { name: "6+", val: 7 },
            ],
        })
        .change(onTravellerChange);

    $("#children-listpicker")
        .listpicker({
            data: [
                { name: "0", val: 0, active: true },
                { name: "1", val: 1 },
                { name: "2", val: 2 },
                { name: "3", val: 3 },
                { name: "4", val: 4 },
                { name: "5", val: 5 },
                { name: "6", val: 6 },
            ],
        })
        .change(onTravellerChange);

    $("#infants-listpicker")
        .listpicker({
            data: [
                { name: "0", val: 0, active: true },
                { name: "1", val: 1 },
                { name: "3", val: 3 },
                { name: "4", val: 4 },
                { name: "5", val: 5 },
                { name: "6", val: 6 },
                { name: "6+", val: 7 },
            ],
        })
        .change(onTravellerChange);

    $("#class-listpicker")
        .listpicker({
            data: [
                { name: "Economy/Premium Economy", val: "E", active: true },
                { name: "Premium Economy", val: "P" },
                { name: "Business", val: "B" },
            ],
        })
        .change((_, { target, current }) => {
            details.travellers.class = current.val;
            $(`#${target}`).text(current.name);
        });

    $("#flight-to-selectpicker")
        .selectpicker({
            data: DATA.fromCities,
        })
        .change(onFlightCityChange);

    $("#flight-from-selectpicker")
        .selectpicker({
            data: DATA.fromCities,
        })
        .change(onFlightCityChange);

    $("#departure-datepicker").datepicker({
        minDate: 0,
        onSelect: (date) => onDateChange(date, "departure"),
    });

    $("#return-datepicker").datepicker({
        minDate: 0,
        onSelect: (date) => onDateChange(date, "return"),
    });

    $("[data-toggle-visible]").click(function (e) {
        e.stopPropagation();
        $(".picker-popup").hide();
        const target = $(this).attr("data-toggle-visible");
        $(`#${target}`).toggle();
    });

    $("[data-hide-visible]").click(function (e) {
        e.stopPropagation();
        const target = $(this).attr("data-hide-visible");
        $(`#${target}`).hide();
    });

    $(".picker-popup").click(function (e) {
        e.stopPropagation();
    });

    $(window).click(function () {
        $(".picker-popup").hide();
    });
});
