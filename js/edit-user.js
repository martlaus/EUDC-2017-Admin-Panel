var userArray = [];
$(function () {

    $('#submit-user').on('click', function (event) {
        event.preventDefault();

        if ($('#user-email').val() === "") {
            $('.create-user-notification').text("Email field can't be empty!");
            $('#user-email').focus();
            return false;
        }
        var emailFieldData = $("#user-email").val(),
            roleFieldData = $("#user-role").val();

        var postData = {
            "email": emailFieldData,
            "role": roleFieldData
        };

        var pwFieldVal = $("#user-pw").val();
        var id = $.urlParam('id');

        if (pwFieldVal) {
            postData.password = pwFieldVal;
        }

        var idUrl = '';

        if (id) {
            postData.id = id;
            idUrl = '/' + id;
        }

        makeCall('/user' + idUrl,
            'POST',
            JSON.stringify(postData),
            true,
            function (data) {
                $('.create-user-notification').html("User editing successful!" + "<br> e-mail:" + emailFieldData + "<br>role:" + roleFieldData);
                return false;
            },
            function () {
                $('.create-user-notification').html("Some kind of error has revealed itself! Run to the hills!<br>Perhaps such a user already exists?<br>Otherwise pls wait for monkeys in Apaches to be dispatched.");
            });

    });
});

$(document).ready(function () {
    var userId = $.urlParam('id');
    makeCall('/user/',
        'GET',
        {},
        false,
        function (data) {
            for (var id in data) {
                if (data[id].id == userId) {
                    $('#user-email').val(data[id].email);
                    $('#user-role').val(data[id].role);
                    userArray.push(data[id]);
                    break;
                }
            }
        }
    );
});