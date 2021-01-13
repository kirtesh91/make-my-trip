(function ($) {
    $.fn.seatpicker = function (options) {
        let selected = [];
        const self = this;

        let settings = $.extend(
            {
                data: [],
            },
            options
        );

        const { data } = settings;

        const DOM = {
            // Seat Types: available, unavailable, ladies, blocked

            seat: (data, seatIndex, rowIndex) => {
                return `<span data-seat-index="${seatIndex}" data-seat-number="${
                    data.number
                }" data-row-index="${rowIndex}" class="${
                    data.number === null ? "" : "seat"
                } ${data.type || ""}">${data.number || ""}</span>`;
            },
        };

        const Render = () => {
            let Seats = "";

            data.forEach((row, rowIndex) => {
                let Row = `<div class="seat-row">`;

                row.forEach((seat, seatIndex) => {
                    Row += DOM.seat(seat, seatIndex, rowIndex);
                });

                Row += `</div>`;
                Seats += Row;
            });

            this.html(`
                <div class="seats-container">${Seats}</div>
            `);
        };

        this.addClass("listpicker");

        Render();

        $(this).on("click", ".seat", function (e) {
            const seatNumber = parseInt($(this).attr("data-seat-number"));
            const rowIndex = parseInt($(this).attr("data-seat-number"));
            const columnIndex = parseInt($(this).attr("data-seat-number"));

            if (!selected.includes(seatNumber)) {
                $(this).addClass("active");
                selected.push(seatNumber);
            } else {
                $(this).removeClass("active");
                selected = selected.filter(
                    (_seatNumber) => _seatNumber !== seatNumber
                );
            }

            $(self).trigger("change", {
                selected: selected,
            });
        });

        return $(this);
    };
})(jQuery);
