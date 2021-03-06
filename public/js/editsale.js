$(document).ready(function () {
    var url;
    url = window.location.href;
    console.log("url" + url + typeof (url));
    url = url.split("/");
    for (i = 0; i < url.length; i++) {
        if (url[i] === "edit") {
            url[i] = "api/edit"
        };
    }
    id = url[url.length-1];
    url = url.join("/");
    console.log("url after changes" + url);
    $(".cancel").on("click", function (event) {
        event.preventDefault();
        location.href = "/manage";
    });

    $.ajax({
            url: url,
            method: "GET"
        })
        .then(function (editData) {
            var d = editData.sale;
            console.log(editData);
            $('#title').val(d.title);
            $('#sale_type').append($('<option>', {
                value: d.sale_type,
                text: d.sale_type,
                selected: true
            }));
            $('#startDate').val(d.start_date);
            $('#endDate').val(d.end_date);
            $('#startTime').val(d.start_time);
            $('#endTime').val(d.end_time);
            if (d.on_street_parking === "1") {
                $('#parking option:selected').text('Yes');
            } else {
                $('#parking option:selected').text('No');
            }
            if (d.inside_outside === "1") {
                $('#inside_outside option:selected').text('Yes');
            } else {
                $('#inside_outside option:selected').text('No');
            }
            if (d.weather_cancel === "1") {
                $('#weather_cancel option:selected').text('Yes');
            } else {
                $('#weather_cancel option:selected').text('No');
            }
            $('#address').val(d.address);
            $('#desc').val(d.items_desc);
            $('#city').val(d.city);
            $('#state').append($('<option>', {
                value: d.state,
                text: d.state,
                selected: true
            }));
            $('#zip').val(d.zip_cd);


        });



    $(".editsale").on("click", function (event) {
        event.preventDefault();
        //var id = this.id;
        var fullAddress = $("#address").val().trim() + " " + $("#city").val().trim() + " " + $("#state").val().trim() + " " + $("#zip").val().trim()
        console.log("sale id: " + id);


        var newSale = {
            title: $("#title").val().trim(),
            sale_type: $("#sale_type").val().trim(),
            start_date: $("#rangestart").val().trim(),
            end_date: $("#rangeend").val().trim(),
            start_time: $("#startTime").val().trim(),
            end_time: $("#endTime").val().trim(),
            on_street_parking: $("#parking").val().trim(),
            inside_outside: $("#inside_outside").val().trim(),
            weather_cancel: $("#weather_cancel").val().trim(),
            items_desc: $("#desc").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zip_cd: $("#zip").val().trim(),
            full_address: fullAddress,
            address: $("#address").val().trim(),
            active: 1,
        };
        console.log(newSale);
        var puturl = "/api/editsale/" + id
        $.ajax(puturl, {
            type: "PUT",
            data: newSale
        }).then(function (data) {
            console.log("Updated sale: " + data);
            location.href = "/manage";
        });

    });
});
