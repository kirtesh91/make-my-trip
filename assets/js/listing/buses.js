$(function () {
    const seats = [
        [
            {
                number: 1,
                type: "unavailable",
            },
            {
                number: 2,
                type: "available",
            },
            {
                number: null,
            },
            {
                number: 3,
                type: "available",
            },
            {
                number: 4,
                type: "available",
            },
        ],
        [
            {
                number: 5,
                type: "unavailable",
            },
            {
                number: 6,
                type: "ladies",
            },
            {
                number: null,
            },
            {
                number: 7,
                type: "available",
            },
            {
                number: 8,
                type: "unavailable",
            },
        ],
        [
            {
                number: 9,
                type: "unavailable",
            },
            {
                number: 10,
                type: "unavailable",
            },
            {
                number: null,
            },
            {
                number: 11,
                type: "available",
            },
            {
                number: 12,
                type: "ladies",
            },
        ],
        [
            {
                number: 13,
                type: "blocked",
            },
            {
                number: 14,
                type: "ladies",
            },
            {
                number: null,
            },
            {
                number: 15,
                type: "available",
            },
            {
                number: 16,
                type: "unavailable",
            },
        ],
        [
            {
                number: 17,
                type: "blocked",
            },
            {
                number: 18,
                type: "ladies",
            },
            {
                number: 19,
                type: "unavailable",
            },
            {
                number: 20,
                type: "available",
            },
            {
                number: 21,
                type: "unavailable",
            },
        ],
    ];
    let selectedSeats = [];

    $("#pickup-point-picker")
        .listpicker({
            data: [
                { name: "Mori Gate Near Golchakkar", val: 0, active: true },
                { name: "Akshardham Bus Stand (Opp Metro Station)", val: 1 },
            ],
        })
        .change(() => {});

    $("#drop-point-picker")
        .listpicker({
            data: [
                { name: "Mori Gate Near Golchakkar", val: 0, active: true },
                { name: "Akshardham Bus Stand (Opp Metro Station)", val: 1 },
            ],
        })
        .change(() => {});

    $("#seatpicker")
        .seatpicker({
            data: seats,
        })
        .change((_, { selected }) => (selectedSeats = selected));

    $(document).on("click", "[data-toggle-visible]", function (e) {
        e.stopPropagation();
        const target = $(this).attr("data-toggle-visible");
        $(`#${target}`).toggle();
    });
});
