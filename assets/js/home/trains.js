$(function () {
    const details = {
        from: null,
        to: null,
        travelDate: new Date(),
        class: null,
    };

    const onTrainCityChange = (_, { target, current }) => {
        const key = target === "train-from" ? "from" : "to";
        details[key] = current;

        target = $(`#${target}`);

        target.find(".value").text(current.name);
        target
            .find(".info")
            .text(`${current.code}, ${current.airport}, ${current.location}`);

        $(".selectpicker").hide();
    };

    const onClassChange = (_, { target, current }) => {
        details.class = current;

        target = $(`#class`);
        target.find(".value").text(current.val);
        target.find(".info").text(current.name);

        $(".selectpicker").hide();
    };

    const onDateChange = (date, type) => {
        date = new Date(date);
        details.travelDate = date;

        $(`#travel-date`).html(
            `${date.getDate()} <bdi>${getMonthName(
                date.getMonth(),
                true
            )}' ${date.getFullYear().toString().substr(-2)}</bdi>`
        );

        $(`#travel-date-popup`).hide();
    };

    const dataExtractor = (data) => {
        return {
            name: `${data.name}, ${data.location}`,
            detail: data.airport,
            extra: data.code,
        };
    };

    $("#train-to-selectpicker")
        .selectpicker({
            data: DATA.fromCities,
            extractor: dataExtractor,
        })
        .change(onTrainCityChange);

    $("#train-from-selectpicker")
        .selectpicker({
            data: DATA.fromCities,
            extractor: dataExtractor,
        })
        .change(onTrainCityChange);

    $("#class-selectpicker")
        .selectpicker({
            data: DATA.trainClasses,
            extractor: dataExtractor,
            plain: true,
        })
        .change(onClassChange);

    $("#travel-date-datepicker").datepicker({
        minDate: 0,
        onSelect: (date) => onDateChange(date, "travel-date"),
    });
});
