$(function () {
    // Search Items
    $('#search').on('keyup', function (e) {
        var value = $(this).val();
        
        var $el_namespace = $('nav ul.list');
        var $el = $('nav ul.class-list');

        if (value) {
            // 隐藏命名空间el
            $el_namespace.hide();

            var regexp = new RegExp(value, 'i');
            $el.find('li, .item').hide();

            // 显示类
            $el.show();

            $el.find('li').each(function (i, v) {
                var $item = $(v);

                if ($item.data('name') && regexp.test($item.data('name'))) {
                    $item.show();
                    $item.closest('.item').show();
                }
            });
        } else {
            $el_namespace.show();
            $el.hide();
        }

        $el_namespace.scrollTop(0);
        $el.scrollTop(0);
    });
});
