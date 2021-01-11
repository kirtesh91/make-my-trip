(function ($) {
    const DOM = {
        optionPlain: (data) => {
            return `<li
                        role="option"
                        data-id="${data.id}"
                        data-type="flight-city"
                    >
                        <div class="option">
                                  ${data.name}          
                        </div>
                    </li>`;
        },
        option: (data, extractor) => {
            return `<li
                        role="option"
                        data-id="${data.id}"
                        data-type="flight-city"
                    >
                        <div class="option">
                            <div class="flex-1">
                                <p class="name">
                                    ${extractor(data).name}
                                </p>
                                <p class="detail">
                                    ${extractor(data).detail}
                                </p>
                            </div>
                            <div class="extra">
                                    ${extractor(data).extra}
                            </div>
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
                extractor: () => {},
                plain: false,
            },
            options
        );
        const { data, extractor, plain } = settings;

        const Render = () => {
            let Options = "";

            data.forEach(
                (data) =>
                    (Options += plain
                        ? DOM.optionPlain(data)
                        : DOM.option(data, extractor))
            );

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
