(function ($) {
    const DOM = {
        option: (data) => {
            return `<li
                        role="option"
                        data-id="${data.id}"
                        data-type="flight-city"
                    >
                        <div class="option">
                            <div class="flex-1">
                                <p class="name">
                                    ${data.name}, ${data.location}
                                </p>
                                <p class="detail">
                                    ${data.airport}
                                </p>
                            </div>
                            <div class="extra">${data.code}</div>
                        </div>
                    </li>`;
        },
    };

    $.fn.selectpicker = function (options) {
        let selected = null;
        const self = this;

        let settings = $.extend(
            {
                data: [],
            },
            options
        );
        const { data } = settings;

        const Render = () => {
            let Options = "";

            data.forEach((data) => (Options += DOM.option(data)));

            $(this).html(`
                <input
                    type="text"
                    placeholder="Search..."
                />
                <ul class="options">
                    ${Options}
                </ul>
            `);
        };

        this.addClass("selectpicker");

        Render();

        $(this).on("click", "li", function (e) {
            e.stopPropagation();

            const val = $(this).attr("data-id");

            const _selected = data.filter(
                (_data) => _data.id.toString() === val.toString()
            );

            if (!_selected.length) return;
            const previous = selected ? { ..._selected } : null;
            selected = _selected[0];

            const target = $(self).attr("data-for");

            $(self).trigger("change", {
                target: target,
                current: selected,
                previous: previous,
            });
        });

        return $(this);
    };
})(jQuery);
