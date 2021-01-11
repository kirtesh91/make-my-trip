$(function () {
    let guests = 0;

    const details = {
        location: null,
        checkIn: null,
        checkOut: null,
        rooms: [],
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
        const { id, type } = JSON.parse(target);
        current = parseInt(current.val);
        previous = previous ? parseInt(previous.val) : 0;

        details.rooms = details.rooms.map((_room) => {
            if (_room.id === id) {
                _room[type] = current;
            }
            return _room;
        });

        guests = guests - previous + current;

        Rooms.updateDOM("guests");
    };

    const Rooms = {
        totalRooms: 0,
        updateDOM: (type = "guests") => {
            $(`#${type}`).text(type === "guests" ? guests : Rooms.totalRooms);
        },
        initialize: (id) => {
            $(`#${id}-adults-listpicker`)
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

            $(`#${id}-children-listpicker`)
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
        },
        render: (id) => {
            const dataFor = (type) => {
                return JSON.stringify({ id: id, type: type });
            };

            const DOM = `
                <div class="room" data-room-id="${id}" data-toggle-visible="${id}-content">
                    <h3 class="title">Room Details <i class="fas fa-chevron-right"></i></h3>
                    <div id="${id}-content">
                        <div class="section">
                            <p class="name">
                                ADULTS (12y +)
                            </p>
                            <div
                                id="${id}-adults-listpicker"
                                data-for='${dataFor("adults")}'
                            ></div>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="section">
                                <p class="name">
                                    CHILDREN (12y and below)
                                </p>
                                <div
                                    id="${id}-children-listpicker"
                                    data-for='${dataFor("children")}'
                                ></div>
                            </div>
                            <button class="color-danger remove-room-btn" data-room-id="${id}">Remove</button>
                        </div>
                    </div>
                </div>`;

            $("#rooms-guests").append(DOM);
        },
        add: (id) => {
            details.rooms.push({
                id: id,
                adults: 1,
                children: 0,
            });

            guests++;
            Rooms.totalRooms++;
        },
        remove: (id) => {
            if (Rooms.totalRooms <= 1) return;
            let room = details.rooms.filter((_room) => _room.id === id);

            if (!room.length) return;
            room = room[0];
            $(`[data-room-id=${id}]`).remove();

            guests = guests - room.adults - room.children;
            Rooms.totalRooms--;
            Rooms.updateDOM("guests");
            Rooms.updateDOM("rooms");
        },
        create: () => {
            const id = uuidv4();

            Rooms.add(id);
            Rooms.render(id);
            Rooms.initialize(id);

            Rooms.updateDOM("guests");
            Rooms.updateDOM("rooms");
        },
    };

    // Initialize App

    Rooms.create();

    $("#hotel-location-selectpicker")
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

    $("#add-room-btn").click(function () {
        Rooms.create();
    });

    $("#rooms-guests-picker").on("click", ".remove-room-btn", function () {
        Rooms.remove($(this).attr("data-room-id"));
    });
});
